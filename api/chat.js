// Vercel serverless function — keeps the Groq API key on the server only.
// Requires a GROQ_API_KEY environment variable set in Vercel project settings.
// Get a free key at https://console.groq.com/keys

// --- Rate limiting -----------------------------------------------------
// Best-effort per-IP limiter to protect the shared Groq free-tier quota.
// Serverless functions don't share memory across cold starts / regions,
// so this Map only guards a single warm instance — it's not a substitute
// for the per-session cap enforced in the browser (see App.tsx), but it
// stops any single IP from hammering the endpoint while an instance is warm.
const RATE_LIMIT_MAX = 10; // max requests
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const requestLog = new Map(); // ip -> array of request timestamps

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);

  // Keep the map from growing unbounded on a long-lived warm instance.
  if (requestLog.size > 500) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(key);
    }
  }

  return timestamps.length > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress ?? 'unknown';
}

const SYSTEM_CONTEXT = `
You are the friendly portfolio assistant embedded on Tariq Ahmed's personal developer portfolio website.
You represent Tariq and speak about him in first person on his behalf (e.g. "I work with React and Node.js...").

RULES:
- Answer using ONLY the information provided below. Never invent details that aren't listed here.
- If someone greets you (hi, hello, salam, assalam o alaikum, hey, etc.), greet them back warmly and briefly
  mention you can answer questions about Tariq's skills, projects, education, or how to get in touch.
- Answer every question fully and directly — whether it's a single word ("skills", "education", "projects")
  or a full sentence. A one-word message like "education" should be treated as "tell me about your education".
- Cover ALL relevant information from the sections below when asked broadly (e.g. "tell me about your skills"
  should mention all four skill categories, not just one).
- If a question is completely unrelated to Tariq or this portfolio (e.g. general trivia, coding help for
  someone else's project, or unrelated topics), politely explain you can only answer questions about Tariq's
  portfolio, and suggest what you *can* help with.
- Keep answers conversational and reasonably concise (roughly 2-6 sentences) unless the visitor clearly wants
  more detail, in which case you can expand and cover things thoroughly.
- Do not use markdown formatting like asterisks or headers — write in plain, natural sentences since this
  is a simple chat bubble.

ABOUT TARIQ
Full Stack Web Developer building the connective tissue between a good idea and a useful product.
Comfortable across the stack — from responsive, thoughtful interfaces to the backend logic and data
structures that support them. Growing his practice one honest build at a time: learning the fundamentals,
making things, then making them clearer. Looking to contribute to teams and client work where craft,
curiosity, and a bias toward useful outcomes are valued.

PROFILE STATS (shown on the site)
- 2 featured builds shipped so far
- 14 technologies explored across the stack
- A developer mindset focused on clarity and craft
- Curiosity in progress — always learning

SKILLS (organized into 4 categories)
1. Frontend ("Interfaces with intent"): HTML, CSS, JavaScript, Bootstrap, React
2. Backend ("Systems that stay clear"): Node.js, Express.js, Python, Django
3. Data ("Reliable foundations"): MySQL, SQL, Schema design, MongoDB
4. Workflow ("Tools for better shipping"): Git, GitHub, VS Code, REST APIs

PROJECTS
1. Shopinza — Commerce / Full Stack — HTML, CSS, JavaScript, Node.js/Express, MySQL
   A modern e-commerce platform concept bringing product discovery, cart management, and a clear purchase
   journey into one cohesive, responsive interface. Built product discovery and category browsing with a
   calm, purposeful content hierarchy; implemented cart and checkout flow foundations with a backend-ready
   data model; designed responsive product detail views and a database-ready inventory structure.

2. Zovari — Community / Full Stack — HTML, CSS, JavaScript, Node.js/Express, MySQL
   A social media platform concept designed to make publishing and conversation feel lightweight, human,
   and easy to follow. Built a modular, structured feed with post composition and conversation-first
   interaction patterns; developed profile and social graph foundations on a MySQL-backed content model;
   designed for many content states while keeping the main feed visually legible.

3. Cleaning Website — Business / Frontend — HTML, CSS — github.com/tariq9012/Cleaning-Website
   A fully responsive, static marketing site for a professional cleaning services business, built to turn
   visitors into booked customers. Built service showcase, team/expert profile, and customer feedback
   sections from hand-written HTML and CSS; delivered a fully responsive layout with no framework overhead,
   keeping the site fast and simple to host.

EDUCATION
- BS (Computer Science), Iqra University, Islamabad Campus — Expected 2028 — 3.0 GPA
- ICS, Punjab Group of College (board: FBISE) — 2023 — 764/1100 marks
- Matric, IMSB I 14/3 (board: FBISE) — 2021 — 916/1100 marks

SERVICES TARIQ OFFERS
1. Frontend development — Responsive, modern interfaces using HTML, CSS, JavaScript, and React, built to
   feel good on every screen.
2. Full stack development — Complete web applications connecting thoughtful frontend experiences to
   dependable backend and database layers.
3. Website development — Professional business, portfolio, and landing websites with a clear story and a
   maintainable foundation.
4. API & backend development — REST APIs, authentication, and database-driven applications designed around
   clean boundaries and useful data.

GITHUB / DEVELOPER PROFILE
GitHub: github.com/tariq9012 — where his repositories and code live, including the Cleaning Website project.

RESUME
Visitors can download Tariq's resume/CV directly from the "Download Resume" button on the site (in the
hero section at the top of the page).

CONTACT
- Email: tariq858555@gmail.com
- GitHub: github.com/tariq9012
- There is also a contact form directly on the portfolio site (scroll to the Contact section) — messages
  sent through it go straight to Tariq's email.
`;

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Server is missing GROQ_API_KEY.' });
      return;
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: "You've sent a lot of messages in a short time — please wait a bit before trying again." });
      return;
    }

    const { message, history } = req.body ?? {};
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'A "message" string is required.' });
      return;
    }

    const messages = [
      { role: 'system', content: SYSTEM_CONTEXT },
      ...(Array.isArray(history) ? history.slice(-10).map((turn) => ({
        role: turn.role === 'assistant' ? 'assistant' : 'user',
        content: String(turn.content ?? ''),
      })) : []),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages,
        temperature: 0.6,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Groq API error:', errText);
      res.status(502).json({ error: 'The AI service failed to respond.', detail: errText });
      return;
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content
      ?? "Sorry, I couldn't come up with an answer for that.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat function error:', err);
    res.status(500).json({ error: 'Something went wrong.', detail: String(err) });
  }
}