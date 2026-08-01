// /api/ai.js — Vercel Serverless Function
// Proxies chat requests to Google Gemini so the API key never reaches the browser.
// Requires an environment variable in Vercel: GEMINI_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server is missing GEMINI_API_KEY. Add it in Vercel → Project → Settings → Environment Variables.' });
    return;
  }

  const { system, messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) {
    res.status(400).json({ error: 'messages must be a non-empty array' });
    return;
  }

  // Convert {role: 'user'|'assistant', content: string}[] into Gemini's format.
  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content || '').slice(0, 8000) }],
  }));

  const body = {
    contents,
    generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
  };
  if (system) body.systemInstruction = { parts: [{ text: String(system).slice(0, 4000) }] };

  try {
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await r.json();

    if (!r.ok) {
      res.status(r.status).json({ error: data?.error?.message || 'Gemini API error' });
      return;
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') ||
      'I could not generate a response right now.';

    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Unknown server error' });
  }
}
