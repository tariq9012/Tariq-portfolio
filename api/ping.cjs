module.exports = async (req, res) => {
  res.status(200).json({ ok: true, message: 'Serverless function is working!', time: new Date().toISOString() });
};
