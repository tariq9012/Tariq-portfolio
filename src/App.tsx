import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight, ArrowUpRight, Bot, BriefcaseBusiness, Check, ChevronRight,
  Code2, Database, Download, FileCode2, GraduationCap, Github, Globe2, Layers3, Linkedin, Mail,
  Menu, Monitor, Moon, MoveRight, Send, Server, Sparkles, Sun, Terminal, X,
} from 'lucide-react';

const queryClient = new QueryClient();

type Project = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  learned: string;
  categories: string[];
  stack: string[];
  tone: string;
  number: string;
  repoUrl?: string;
  images?: string[];
};

const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Services', 'Contact'];

const socials = [
  { label: 'GitHub', href: 'https://github.com/tariq9012', icon: Github },
  { label: 'LinkedIn', href: 'www.linkedin.com/in/tariq-jamil-khan', icon: Linkedin },
  { label: 'Email', href: 'mailto:tariq858555@gmail.com', icon: Mail },
];

const stats = [
  { value: '02', label: 'Featured builds' },
  { value: '14', label: 'Technologies explored' },
  { value: '01', label: 'Developer mindset' },
  { value: '∞', label: 'Curiosity in progress' },
];

const skillGroups = [
  { title: 'Frontend', detail: 'Interfaces with intent', icon: Monitor, skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React'] },
  { title: 'Backend', detail: 'Systems that stay clear', icon: Server, skills: ['Node.js', 'Express.js', 'Python', 'Django'] },
  { title: 'Data', detail: 'Reliable foundations', icon: Database, skills: ['MySQL', 'SQL', 'Schema design', 'MongoDB'] },
  { title: 'Workflow', detail: 'Tools for better shipping', icon: Terminal, skills: ['Git', 'GitHub', 'VS Code', 'REST APIs'] },
];

const projects: Project[] = [
  {
    id: 'shopina', name: 'Shopinza', eyebrow: 'Commerce / Full Stack',
    description: 'A focused e-commerce experience built around confident browsing and a simple path to checkout.',
    overview: 'Shopinza is a modern e-commerce platform concept that brings product discovery, cart management, and a clear purchase journey into one cohesive interface.',
    problem: 'Online stores can make simple decisions feel complicated when hierarchy, product information, and navigation compete for attention.',
    solution: 'A calm, responsive storefront system with purposeful content hierarchy and a backend-ready data model.',
    features: ['Product discovery and category browsing', 'Cart and checkout flow foundations', 'Responsive product detail views', 'Database-ready inventory structure'],
    challenges: 'Balancing a rich catalog with a low-friction shopping path across smaller screens.',
    learned: 'The best commerce interfaces make the next useful action obvious without removing the sense of exploration.',
    categories: ['Full Stack', 'JavaScript'], stack: ['HTML', 'CSS', 'JavaScript', 'Node.js / Express', 'MySQL'], tone: 'mint', number: '01',
    images: ['/projects/shopinza/1.jpg', '/projects/shopinza/2.jpg', '/projects/shopinza/3.jpg', '/projects/shopinza/4.jpg'],
  },
  {
    id: 'zovari', name: 'Zovari', eyebrow: 'Community / Full Stack',
    description: 'A social platform direction for sharing ideas, finding signal, and staying connected.',
    overview: 'Zovari is a modern social media platform concept designed to make publishing and conversation feel lightweight, human, and easy to follow.',
    problem: 'Social products often overwhelm the user with noisy feeds and unclear context around each conversation.',
    solution: 'A modular feed experience that gives posts room to breathe while keeping actions and relationships close at hand.',
    features: ['Structured feed and post composition', 'Profile and social graph foundations', 'Conversation-first interaction patterns', 'MySQL-backed content model'],
    challenges: 'Designing for many content states while keeping the main feed visually legible.',
    learned: 'Good social software is less about adding more interactions and more about giving existing ones better rhythm.',
    categories: ['Full Stack', 'JavaScript'], stack: ['HTML', 'CSS', 'JavaScript', 'Node.js / Express', 'MySQL'], tone: 'apricot', number: '02',
    images: ['/projects/zovari/1.jpg', '/projects/zovari/2.jpg', '/projects/zovari/3.jpg'],
  },
  {
    id: 'cleaning-website', name: 'Cleaning Website', eyebrow: 'Business / Frontend',
    description: 'A clean, service-focused website for a professional cleaning business, built to turn visitors into booked customers.',
    overview: 'A static, fully responsive marketing site for a cleaning services company — covering services offered, the team, customer feedback, and a clear path to get in touch.',
    problem: 'Local service businesses need a simple, trustworthy web presence that loads fast and clearly explains what they offer, without any unnecessary complexity.',
    solution: 'A structured single-page site built with plain HTML and CSS, focused on clear sections: services, expert profiles, a gallery of work, and customer feedback.',
    features: ['Service showcase with imagery', 'Team / expert profile section', 'Customer feedback section', 'Fully responsive layout with no framework overhead'],
    challenges: 'Keeping the design polished and modern using only hand-written HTML and CSS, without relying on a component framework.',
    learned: 'Strong fundamentals in layout and styling go a long way — a fast, clean static site can be just as effective as a complex one for a business like this.',
    categories: ['Frontend', 'HTML/CSS'], stack: ['HTML', 'CSS'], tone: 'blue', number: '03',
    repoUrl: 'https://github.com/tariq9012/Cleaning-Website',
    images: ['/projects/cleaning-website/1.jpg', '/projects/cleaning-website/2.jpg', '/projects/cleaning-website/3.jpg'],
  },
];

const timeline = [
  { type: 'Internship', date: 'Editable date', title: 'Internship detail to be added', copy: 'A clear place for an internship, practical placement, or supervised experience.', icon: BriefcaseBusiness },
  { type: 'Freelance', date: 'Editable date', title: 'Freelance experience to be added', copy: 'Add a project, client engagement, or independent work story here when ready.', icon: Globe2 },
];

const education = [
  { degree: 'Matric', institute: 'IMSB I 14/3', board: 'FBISE', year: '2021', score: '916/1100' },
  { degree: 'ICS', institute: 'Punjab Group of College', board: 'FBISE', year: '2023', score: '764/1100' },
  { degree: 'BS (CS)', institute: 'Iqra University, Islamabad Campus', board: 'Iqra University', year: 'Expected 2028', score: '3.0 GPA' },
];

const projectToneClasses: Record<Project['tone'], string> = {
  mint: 'bg-[#cce8db]',
  apricot: 'bg-[#f0d6c8]',
  blue: 'bg-[#d7e7ef]',
};

function ScrollReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'reveal' : 'opacity-0 translate-y-6'}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function AppLink({ href, children, className = '', onClick, testId }: { href: string; children: ReactNode; className?: string; onClick?: () => void; testId?: string }) {
  return <a data-testid={testId ?? `link-${href.replace('#', '').replace('/', '') || 'home'}`} href={href} className={className} onClick={onClick}>{children}</a>;
}

function SectionHeading({ kicker, title, copy, align = 'left' }: { kicker: string; title: string; copy?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className="section-kicker mb-4">{kicker}</p>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-.045em] text-[hsl(var(--foreground))] sm:text-5xl">{title}</h2>
      {copy && <p className="mt-5 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">{copy}</p>}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  return (
    <button
      data-testid="button-toggle-theme"
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
    >
      {mounted && (isDark ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}

function Education() {
  return (
    <div className="mt-14">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--accent))]"><GraduationCap size={16} /></span>
        <h3 className="font-display text-xl font-semibold tracking-[-.03em]">Education</h3>
      </div>

      {/* Desktop / tablet: table */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-[hsl(var(--border))] sm:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-[hsl(var(--secondary))]">
              <th className="px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">Degree</th>
              <th className="px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">Institute</th>
              <th className="px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">Board</th>
              <th className="px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">Year</th>
              <th className="px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">GPA / Marks</th>
            </tr>
          </thead>
          <tbody>
            {education.map((row) => (
              <tr key={row.degree} data-testid={`row-education-${row.degree.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="border-t border-[hsl(var(--border))]">
                <td className="px-5 py-4 font-display font-semibold">{row.degree}</td>
                <td className="px-5 py-4 text-[hsl(var(--muted-foreground))]">{row.institute}</td>
                <td className="px-5 py-4 text-[hsl(var(--muted-foreground))]">{row.board}</td>
                <td className="px-5 py-4 text-[hsl(var(--muted-foreground))]">{row.year}</td>
                <td className="px-5 py-4 font-mono-ui text-xs text-[hsl(var(--accent))]">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="mt-6 grid gap-4 sm:hidden">
        {education.map((row) => (
          <div key={row.degree} data-testid={`card-education-${row.degree.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
            <div className="flex items-center justify-between"><h4 className="font-display text-lg font-semibold">{row.degree}</h4><span className="font-mono-ui text-[10px] text-[hsl(var(--accent))]">{row.score}</span></div>
            <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{row.institute}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono-ui text-[10px] uppercase tracking-[.06em] text-[hsl(var(--muted-foreground))]"><span>{row.board}</span><span>{row.year}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? 'border-b border-[hsl(var(--border)/.75)] bg-[hsl(var(--background)/.88)] shadow-[0_8px_30px_hsl(var(--foreground)/.05)] backdrop-blur-xl' : ''}`}>
      <div className="container-wide flex h-[76px] items-center justify-between">
        <AppLink href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-[11px] bg-[hsl(var(--primary))] font-display text-sm font-bold tracking-[-.08em] text-[hsl(var(--primary-foreground))] transition-transform group-hover:rotate-[-6deg]">TA</span>
          <span className="hidden font-mono-ui text-[11px] uppercase tracking-[.16em] text-[hsl(var(--muted-foreground))] sm:block">Tariq Ahmed</span>
        </AppLink>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <AppLink key={item} href={`#${item.toLowerCase()}`} className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--accent))]">{item}</AppLink>)}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AppLink href="#contact" testId="link-lets-talk" className="hidden items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-4 py-2.5 font-mono-ui text-[10px] font-medium uppercase tracking-[.08em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-0.5 sm:flex">Let's Talk <ArrowUpRight size={14} /></AppLink>
          <button data-testid="button-toggle-menu" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] lg:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && <nav className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <div className="container-wide grid gap-1">
          {navItems.map((item) => <AppLink key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="border-b border-[hsl(var(--border)/.65)] py-3 font-mono-ui text-xs uppercase tracking-[.1em]">{item}</AppLink>)}
          <AppLink href="#contact" onClick={() => setOpen(false)} className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-4 py-3 font-mono-ui text-[10px] uppercase text-[hsl(var(--accent-foreground))]">Let's Talk <ArrowUpRight size={14} /></AppLink>
        </div>
      </nav>}
    </header>
  );
}

function WorkspaceVisual() {
  return (
    <div className="workspace-float relative mx-auto h-[390px] w-full max-w-[470px]" aria-label="Tariq Ahmed profile photo" role="img">
      <div className="absolute inset-0 rounded-[2rem] bg-[hsl(var(--primary))] shadow-[20px_25px_70px_hsl(var(--primary)/.18)]" />
      <div className="absolute -right-3 top-9 h-28 w-28 rounded-full border border-[hsl(var(--accent)/.55)] sm:-right-8" />
      <div className="absolute -left-3 bottom-7 h-16 w-16 rounded-full bg-[hsl(var(--accent)/.9)] sm:-left-8" />
      <div className="absolute left-6 right-6 top-6 bottom-6 overflow-hidden rounded-xl border border-white/15 shadow-2xl sm:left-9 sm:right-9">
        <img
          src="/profile.jpg"
          alt="Tariq Ahmed"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-6 right-8 rounded-lg border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm sm:right-14">
        <span className="font-mono-ui text-[9px] text-[#9fe0c9]">status: shipping</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 grid-paper opacity-70" />
      <div className="absolute -right-48 top-24 -z-10 h-[500px] w-[500px] rounded-full bg-[hsl(var(--accent)/.07)] blur-3xl" />
      <div className="container-wide grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr]">
        <div className="reveal">
          <div className="mb-7 flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--accent))]"><span className="pulse-soft h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /> Available for thoughtful work</div>
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[.9] tracking-[-.08em] text-[hsl(var(--foreground))]">Hi, I'm<br /><span className="text-[hsl(var(--accent))]">Tariq</span> Ahmed<span className="text-[hsl(var(--accent))]">.</span></h1>
          <p className="mt-8 font-display text-xl font-medium tracking-[-.02em] text-[hsl(var(--foreground)/.75)] sm:text-2xl">Full Stack Web Developer</p>
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">I create modern, responsive and scalable web experiences with clean code and thoughtful user experiences.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <AppLink href="#projects" testId="link-view-work" className="group inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--primary-foreground))]">View My Work <MoveRight size={15} className="transition-transform group-hover:translate-x-1" /></AppLink>
            <AppLink href="#contact" testId="link-hero-contact" className="inline-flex items-center gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.6)] px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.08em] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">Let's Talk <ArrowUpRight size={14} /></AppLink>
            <a href="/Tariq_Ahmed_Resume.pdf" download data-testid="link-download-resume" className="inline-flex items-center gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card)/.6)] px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.08em] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">Download Resume <Download size={14} /></a>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <span className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Find me on</span>
            <span className="h-px w-8 bg-[hsl(var(--border))]" />
            {socials.map(({ label, href, icon: Icon }) => <a key={label} data-testid={`link-social-${label.toLowerCase()}`} href={href} aria-label={label} className="text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--accent))]"><Icon size={17} strokeWidth={1.7} /></a>)}
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative">
          <div className="absolute -left-4 top-12 hidden -rotate-90 font-mono-ui text-[9px] uppercase tracking-[.25em] text-[hsl(var(--muted-foreground))] lg:block">Selected / workspace</div>
          <WorkspaceVisual />
          <div className="absolute bottom-3 left-1 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card)/.9)] px-4 py-3 shadow-xl backdrop-blur sm:left-4">
            <p className="font-mono-ui text-[9px] uppercase tracking-[.09em] text-[hsl(var(--muted-foreground))]">Current focus</p>
            <p className="mt-1 font-display text-sm font-semibold">Useful by default.</p>
          </div>
        </div>
      </div>
      <div className="container-wide mt-20 flex items-center gap-3 border-t border-[hsl(var(--border))] pt-5 font-mono-ui text-[9px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]"><ArrowDownRight size={15} className="text-[hsl(var(--accent))]" /> Scroll to explore <span className="ml-auto hidden sm:block">01 — 08 / portfolio index</span></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--primary-foreground))] sm:py-32">
      <ScrollReveal className="container-wide">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="section-kicker text-[#82d0b7]">02 / About</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-6xl">A developer who<br /><span className="text-[#82d0b7]">cares about the why.</span></h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-8 text-white/85 sm:text-2xl">I like working where thoughtful design meets dependable engineering.</p>
            <div className="mt-9 grid gap-7 text-sm leading-7 text-white/55 sm:grid-cols-2">
              <p><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.1em] text-[#82d0b7]">Introduction</span>I'm Tariq, a Full Stack Web Developer building the connective tissue between a good idea and a useful product.</p>
              <p><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.1em] text-[#82d0b7]">Journey</span>My practice is growing one honest build at a time: learning the fundamentals, making things, then making them clearer.</p>
              <p><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.1em] text-[#82d0b7]">Interests</span>Product interfaces, backend logic, visual systems, and the small details that make software feel calm.</p>
              <p><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.1em] text-[#82d0b7]">Goal</span>To contribute to teams and client work where craft, curiosity, and a bias toward useful outcomes are valued.</p>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((stat) => <div key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replaceAll(' ', '-')}`} className="bg-[hsl(var(--primary))] p-5 sm:p-7"><p className="font-display text-3xl font-semibold tracking-[-.05em] text-[#82d0b7] sm:text-4xl">{stat.value}</p><p className="mt-2 max-w-[110px] font-mono-ui text-[9px] uppercase leading-4 tracking-[.08em] text-white/45">{stat.label}</p></div>)}
        </div>
      </ScrollReveal>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <ScrollReveal className="container-wide">
        <SectionHeading kicker="03 / Skills" title="Tools I use to turn thinking into working software." copy="A practical toolkit, always in motion. These are technologies I work with — not a scoreboard." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map(({ title, detail, icon: Icon, skills }, index) => <article key={title} className="card-lift rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6" data-testid={`card-skill-${title.toLowerCase()}`}>
            <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[hsl(var(--secondary))] text-[hsl(var(--accent))]"><Icon size={19} strokeWidth={1.7} /></span><span className="font-mono-ui text-[10px] text-[hsl(var(--muted-foreground))]">0{index + 1}</span></div>
            <h3 className="mt-9 font-display text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{detail}</p>
            <ul className="mt-7 space-y-3">{skills.map((skill) => <li key={skill} className="flex items-center justify-between border-b border-[hsl(var(--border)/.7)] pb-2.5 font-mono-ui text-[11px] text-[hsl(var(--muted-foreground))]"><span>{skill}</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /></li>)}</ul>
          </article>)}
        </div>
      </ScrollReveal>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[hsl(var(--primary)/.72)] p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-2xl">
        <div className={`relative h-32 overflow-hidden ${projectToneClasses[project.tone]} sm:h-40`}>
          <div className="absolute inset-0 grid-paper opacity-50" />
          <div className="absolute bottom-5 left-6 flex items-end gap-4 sm:left-9"><span className="font-mono-ui text-xs text-[hsl(var(--foreground)/.5)]">{project.number}</span><h2 id="project-modal-title" className="font-display text-4xl font-semibold tracking-[-.06em] sm:text-5xl">{project.name}</h2></div>
          <button data-testid="button-close-project-modal" type="button" aria-label="Close project details" onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--background)/.75)]"><X size={17} /></button>
        </div>
        <div className="grid gap-9 p-6 sm:p-9 lg:grid-cols-[1fr_.8fr]">
          <div>{project.images && project.images.length > 0 && <div className="mb-8"><ProjectGallery project={project} /></div>}<p className="section-kicker">{project.eyebrow}</p><p className="mt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{project.overview}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2"><div><h3 className="font-display text-sm font-semibold">The problem</h3><p className="mt-2 text-xs leading-6 text-[hsl(var(--muted-foreground))]">{project.problem}</p></div><div><h3 className="font-display text-sm font-semibold">The approach</h3><p className="mt-2 text-xs leading-6 text-[hsl(var(--muted-foreground))]">{project.solution}</p></div></div>
            <div className="mt-8"><h3 className="font-display text-sm font-semibold">Features</h3><ul className="mt-3 space-y-2">{project.features.map((feature) => <li key={feature} className="flex gap-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]"><Check size={14} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />{feature}</li>)}</ul></div>
          </div>
          <aside className="rounded-xl bg-[hsl(var(--secondary)/.55)] p-5"><h3 className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Stack</h3><div className="mt-4 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-2.5 py-1.5 font-mono-ui text-[10px]">{tech}</span>)}</div><div className="mt-8 border-t border-[hsl(var(--border))] pt-5"><h3 className="font-display text-sm font-semibold">Challenges & learning</h3><p className="mt-2 text-xs leading-6 text-[hsl(var(--muted-foreground))]">{project.challenges}</p><p className="mt-3 text-xs leading-6 text-[hsl(var(--muted-foreground))]">{project.learned}</p></div><div className="mt-8 flex gap-2"><a data-testid={`link-modal-github-${project.id}`} href={project.repoUrl ?? 'https://github.com/tariq9012'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-3 py-2 font-mono-ui text-[10px] text-[hsl(var(--primary-foreground))]">GitHub <Github size={13} /></a><a data-testid={`link-modal-demo-${project.id}`} href="#contact" onClick={onClose} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] px-3 py-2 font-mono-ui text-[10px]">Discuss <ArrowUpRight size={13} /></a></div></aside>
        </div>
      </article>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.images && project.images.length > 0) {
    return (
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[hsl(var(--secondary))]">
        <img src={project.images[0]} alt={`${project.name} screenshot`} className="h-full w-full object-contain" />
      </div>
    );
  }
  return <div className={`relative h-52 overflow-hidden ${projectToneClasses[project.tone]}`}><div className="absolute inset-0 grid-paper opacity-60" /><div className="absolute right-[-10%] top-[-30%] h-64 w-64 rounded-full border-[24px] border-[hsl(var(--foreground)/.08)]" /><div className="absolute bottom-5 left-6 right-6 rounded-lg border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card)/.55)] p-4 shadow-xl backdrop-blur-sm"><div className="mb-3 flex items-center justify-between"><span className="font-mono-ui text-[9px] uppercase tracking-[.1em] text-[hsl(var(--foreground)/.5)]">{project.eyebrow}</span><FileCode2 size={15} className="text-[hsl(var(--foreground)/.5)]" /></div><div className="h-2 w-3/4 rounded bg-[hsl(var(--foreground)/.13)]" /><div className="mt-2 h-2 w-1/2 rounded bg-[hsl(var(--foreground)/.09)]" /><div className="mt-4 flex gap-2"><span className="h-5 w-16 rounded bg-[hsl(var(--accent)/.6)]" /><span className="h-5 w-12 rounded border border-[hsl(var(--foreground)/.15)]" /></div></div></div>;
}

function ProjectGallery({ project }: { project: Project }) {
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  return (
    <div>
      <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] sm:h-80">
        <img data-testid={`img-gallery-${project.id}`} src={images[active]} alt={`${project.name} screenshot ${active + 1}`} className="h-full w-full object-contain" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              data-testid={`button-thumb-${project.id}-${index}`}
              onClick={() => setActive(index)}
              className={`flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-[hsl(var(--secondary))] transition-colors ${active === index ? 'border-[hsl(var(--accent))]' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <img src={src} alt={`${project.name} thumbnail ${index + 1}`} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const filters = ['All', 'Frontend', 'Full Stack', 'JavaScript', 'React'];
  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter)), [filter]);
  return (
    <section id="projects" className="bg-[hsl(var(--secondary)/.5)] py-24 sm:py-32">
      <ScrollReveal className="container-wide">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading kicker="04 / Selected work" title="A few things I've been building." copy="Real projects, clear decisions, and plenty of room for the next chapter." /><div className="flex flex-wrap gap-2 md:pb-1">{filters.map((item) => <button key={item} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`} type="button" onClick={() => setFilter(item)} className={`rounded-full border px-3.5 py-2 font-mono-ui text-[10px] uppercase tracking-[.06em] transition-colors ${filter === item ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] bg-[hsl(var(--card)/.6)] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]'}`}>{item}</button>)}</div></div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">{filtered.map((project, index) => <article key={project.id} data-testid={`card-project-${project.id}`} className={`card-lift overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${index === 2 ? 'lg:col-span-2 lg:grid lg:grid-cols-[.95fr_1.05fr]' : ''}`}><ProjectVisual project={project} /><div className="flex flex-col p-6 sm:p-8"><div className="flex items-start justify-between gap-5"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{project.number} / {project.eyebrow}</p><h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em]">{project.name}</h3></div><button data-testid={`button-details-${project.id}`} type="button" onClick={() => setSelected(project)} aria-label={`View ${project.name} details`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[hsl(var(--border))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"><ArrowUpRight size={17} /></button></div><p className="mt-5 max-w-md text-sm leading-7 text-[hsl(var(--muted-foreground))]">{project.description}</p><div className="mt-7 flex flex-wrap gap-2">{project.stack.slice(0, 4).map((tech) => <span key={tech} className="rounded-full bg-[hsl(var(--secondary))] px-2.5 py-1.5 font-mono-ui text-[9px] text-[hsl(var(--muted-foreground))]">{tech}</span>)}</div><div className="mt-auto flex gap-5 pt-8"><a data-testid={`link-github-${project.id}`} href={project.repoUrl ?? 'https://github.com/tariq9012'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.08em] hover:text-[hsl(var(--accent))]">GitHub <Github size={14} /></a><button data-testid={`button-view-details-${project.id}`} type="button" onClick={() => setSelected(project)} className="inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--accent))]">View details <ChevronRight size={14} /></button></div></div></article>)}</div>
        {filtered.length === 0 && <div className="rounded-xl border border-dashed border-[hsl(var(--border))] p-12 text-center text-sm text-[hsl(var(--muted-foreground))]">No projects in this category yet. This space is ready for the next build.</div>}
      </ScrollReveal>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <ScrollReveal className="container-wide grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <SectionHeading kicker="05 / Path so far" title="The timeline is still being written." copy="No invented titles or credentials here. Just clear, editable places for the work and learning that matter." />
        <div className="relative border-l border-[hsl(var(--border))] pl-7 sm:pl-10">{timeline.map(({ type, date, title, copy, icon: Icon }, index) => <article key={type} className="relative pb-12 last:pb-0"><span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--accent))] sm:-left-[58px]"><Icon size={14} /></span><div className="flex flex-wrap items-center gap-3"><span className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--accent))]">{type}</span><span className="h-px w-5 bg-[hsl(var(--border))]" /><span className="font-mono-ui text-[10px] text-[hsl(var(--muted-foreground))]">{date}</span></div><h3 className="mt-4 font-display text-xl font-semibold tracking-[-.03em]">{title}</h3><p className="mt-2 max-w-lg text-sm leading-7 text-[hsl(var(--muted-foreground))]">{copy}</p>{index === 0 && <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--secondary))] px-3 py-1.5 font-mono-ui text-[9px] text-[hsl(var(--muted-foreground))]"><Sparkles size={12} className="text-[hsl(var(--accent))]" /> Open to adding the next chapter</span>}</article>)}</div>
        <Education />
      </ScrollReveal>
    </section>
  );
}

const services = [
  { title: 'Frontend development', copy: 'Responsive, modern interfaces using HTML, CSS, JavaScript, and React — built to feel good on every screen.', icon: Code2 },
  { title: 'Full stack development', copy: 'Complete web applications connecting thoughtful frontend experiences to dependable backend and database layers.', icon: Layers3 },
  { title: 'Website development', copy: 'Professional business, portfolio, and landing websites with a clear story and a maintainable foundation.', icon: Globe2 },
  { title: 'API & backend development', copy: 'REST APIs, authentication, and database-driven applications designed around clean boundaries and useful data.', icon: Server },
];

function Services() {
  return (
    <section id="services" className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--primary-foreground))] sm:py-32">
      <ScrollReveal className="container-wide"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="section-kicker text-[#82d0b7]">06 / Services</p><h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.03] tracking-[-.05em] sm:text-6xl">Useful work for<br /><span className="text-[#82d0b7]">real-world needs.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/50">From a first idea to a working system, let's make the right thing clear.</p></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">{services.map(({ title, copy, icon: Icon }, index) => <article key={title} className="group bg-[hsl(var(--primary))] p-7 transition-colors hover:bg-white/[.045] sm:p-9"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-[#82d0b7]"><Icon size={20} strokeWidth={1.5} /></span><span className="font-mono-ui text-[10px] text-white/30">0{index + 1}</span></div><h3 className="mt-12 font-display text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-white/50">{copy}</p><ArrowUpRight size={18} className="mt-8 text-white/25 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#82d0b7]" /></article>)}</div></ScrollReveal>
    </section>
  );
}

function DeveloperArea() {
  return (
    <section id="developer" className="py-24 sm:py-32">
      <ScrollReveal className="container-wide grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-2xl bg-[hsl(var(--secondary))] p-7 sm:p-9"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><Github size={21} /></span><span className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Developer area</span></div><h2 className="mt-12 font-display text-4xl font-semibold leading-[1.02] tracking-[-.06em]">Where the<br /><span className="text-[hsl(var(--accent))]">code lives.</span></h2><p className="mt-5 max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">An editable home for GitHub profile details, repositories, activity, and open-source work when those stories are ready to share.</p><a data-testid="link-view-github" href="https://github.com/tariq9012" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-3 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[hsl(var(--primary-foreground))]">View GitHub <ArrowUpRight size={14} /></a></div>
        <div className="grid gap-4 sm:grid-cols-2"><article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 sm:col-span-2"><div className="flex items-center justify-between"><h3 className="font-display text-lg font-semibold">Repository notes</h3><Code2 size={18} className="text-[hsl(var(--accent))]" /></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{['Featured repository', 'Repository to add', 'Open-source work'].map((item, index) => <div key={item} className="rounded-lg bg-[hsl(var(--secondary)/.6)] p-4"><span className="font-mono-ui text-[9px] text-[hsl(var(--accent))]">0{index + 1}</span><p className="mt-5 text-xs font-medium">{item}</p><p className="mt-1 font-mono-ui text-[9px] text-[hsl(var(--muted-foreground))]">Details to be added</p></div>)}</div></article><article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"><h3 className="font-display text-lg font-semibold">Activity</h3><div className="mt-5 flex items-end gap-1.5">{Array.from({ length: 28 }, (_, index) => <span key={index} style={{ height: `${8 + (index % 4) * 5}px` }} className={`flex-1 rounded-sm ${index % 5 === 0 ? 'bg-[hsl(var(--accent)/.75)]' : 'bg-[hsl(var(--secondary))]'}`} />)}</div><p className="mt-4 font-mono-ui text-[9px] uppercase tracking-[.08em] text-[hsl(var(--muted-foreground))]">Contribution placeholder</p></article><article className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"><h3 className="font-display text-lg font-semibold">Currently learning</h3><div className="mt-5 space-y-3">{['Systems thinking', 'Product polish', 'Shipping rhythm'].map((item) => <p key={item} className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />{item}</p>)}</div></article></div>
      </ScrollReveal>
    </section>
  );
}

type ContactForm = { name: string; email: string; subject: string; message: string };
function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const update = (key: keyof ContactForm, value: string) => { setStatus('idle'); setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: '' })); };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<ContactForm> = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please add a valid email.';
    if (!form.subject.trim()) next.subject = 'Please add a subject.';
    if (form.message.trim().length < 15) next.message = 'Please share a little more detail.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };
  const field = (label: string, key: keyof ContactForm, type = 'text') => <label className="block"><span className="font-mono-ui text-[10px] uppercase tracking-[.08em] text-white/55">{label}</span><input data-testid={`input-${key}`} type={type} value={form[key]} onChange={(event) => update(key, event.target.value)} className={`mt-2 w-full border-0 border-b bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:ring-0 ${errors[key] ? 'border-[#db8d7c]' : 'border-white/15 focus:border-[#82d0b7]'}`} />{errors[key] && <span data-testid={`error-${key}`} className="mt-1 block text-xs text-[#e8a293]">{errors[key]}</span>}</label>;
  return (
    <section id="contact" className="bg-[hsl(var(--primary))] py-24 text-white sm:py-32">
      <ScrollReveal className="container-wide grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><p className="section-kicker text-[#82d0b7]">07 / Contact</p><h2 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-7xl">Let's build<br /><span className="text-[#82d0b7]">something great.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-white/55">Have a project, an opportunity, or a thoughtful question? Send a note. The inbox is open.</p><div className="mt-12 space-y-4">{socials.map(({ label, href, icon: Icon }) => <a key={label} data-testid={`link-contact-${label.toLowerCase()}`} href={href} className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-[#82d0b7]"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/15"><Icon size={15} /></span>{label === 'Email' ? 'tariq.ahmed.dev@example.com' : `Connect on ${label}`}<ArrowUpRight size={14} className="ml-auto" /></a>)}</div></div>
        <form data-testid="form-contact" onSubmit={submit} noValidate className="rounded-2xl border border-white/10 bg-white/[.045] p-6 sm:p-9"><div className="grid gap-7 sm:grid-cols-2">{field('Name', 'name')}{field('Email', 'email', 'email')}{field('Subject', 'subject')}<div className="hidden sm:block" /></div><label className="mt-7 block"><span className="font-mono-ui text-[10px] uppercase tracking-[.08em] text-white/55">Message</span><textarea data-testid="input-message" value={form.message} onChange={(event) => update('message', event.target.value)} rows={5} className={`mt-2 w-full resize-none border-0 border-b bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:ring-0 ${errors.message ? 'border-[#db8d7c]' : 'border-white/15 focus:border-[#82d0b7]'}`} placeholder="Tell me a little about what you're building..." />{errors.message && <span data-testid="error-message" className="mt-1 block text-xs text-[#e8a293]">{errors.message}</span>}</label><div className="mt-8 flex flex-wrap items-center gap-4"><button data-testid="button-submit-contact" type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-3 rounded-full bg-[#82d0b7] px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.08em] text-[#17283b] transition-transform hover:-translate-y-0.5 disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send message'} <Send size={14} /></button>{status === 'sent' && <p data-testid="status-contact-success" className="flex items-center gap-2 text-xs text-[#82d0b7]"><Check size={15} /> Thanks — your message is on its way.</p>}{status === 'error' && <p data-testid="status-contact-error" className="text-xs text-[#e8a293]">Something went wrong — please try again or email me directly.</p>}</div></form>
      </ScrollReveal>
    </section>
  );
}

function Footer() {
  return <footer className="bg-[hsl(var(--primary))] text-white"><div className="container-wide border-t border-white/10 py-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="font-display text-lg font-semibold">Tariq Ahmed<span className="text-[#82d0b7]">.</span></p><p className="mt-1 font-mono-ui text-[9px] uppercase tracking-[.1em] text-white/35">Full Stack Web Developer</p></div><div className="flex flex-wrap items-center gap-5 font-mono-ui text-[9px] uppercase tracking-[.08em] text-white/40">{['About', 'Projects', 'Services', 'Contact'].map((item) => <AppLink key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-[#82d0b7]">{item}</AppLink>)}</div><p className="font-mono-ui text-[9px] text-white/30">© 2026 Tariq Ahmed</p></div></div></footer>;
}

function Home() {
  useEffect(() => {
    document.title = 'Tariq Ahmed — Full Stack Web Developer';
    const description = 'Tariq Ahmed is a Full Stack Web Developer building modern, responsive and thoughtful web experiences.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const og = [['og:title', document.title], ['og:description', description], ['og:type', 'website']];
    og.forEach(([property, content]) => { let tag = document.querySelector(`meta[property="${property}"]`); if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); } tag.setAttribute('content', content); });
  }, []);
  return <div className="noise min-h-[100dvh]"><Nav /><main><Hero /><About /><Skills /><Projects /><Experience /><Services /><DeveloperArea /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm Tariq's portfolio assistant. Ask me about his skills, projects, or education." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: nextMessages.slice(0, -1) }),
      });
      const data = await response.json();
      const reply = response.ok ? data.reply : "Sorry, I'm having trouble answering right now — please try again in a moment.";
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div data-testid="panel-chat-widget" className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--primary))] px-4 py-3.5 text-[hsl(var(--primary-foreground))]">
            <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><Bot size={16} /></span><div><p className="text-sm font-semibold">Ask about Tariq</p><p className="font-mono-ui text-[9px] text-white/50">AI portfolio assistant</p></div></div>
            <button data-testid="button-close-chat" type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"><X size={16} /></button>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p data-testid={`message-${msg.role}-${index}`} className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-6 ${msg.role === 'user' ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]'}`}>{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start"><p className="rounded-xl bg-[hsl(var(--secondary))] px-3.5 py-2.5 text-sm text-[hsl(var(--muted-foreground))]">Typing…</p></div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-[hsl(var(--border))] p-3">
            <input
              data-testid="input-chat-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') send(); }}
              placeholder="Ask a question…"
              className="flex-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2.5 text-sm outline-none focus:border-[hsl(var(--accent))]"
            />
            <button data-testid="button-send-chat" type="button" onClick={send} disabled={loading || !input.trim()} aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] transition-opacity disabled:opacity-40">
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
      <button
        data-testid="button-toggle-chat"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-xl transition-transform hover:-translate-y-0.5"
      >
        {open ? <X size={20} /> : <Bot size={22} />}
      </button>
    </>
  );
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /><ChatWidget /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;