const SUPABASE_ASSISTANT_URL =
  "https://vwyudrmxatuukcbncats.supabase.co/functions/v1/maderas-assistant";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "Escribe un mensaje." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "El mensaje es demasiado largo." });
  }

  try {
    const response = await fetch(SUPABASE_ASSISTANT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Maderas assistant error:", data);
      return res.status(response.status || 502).json({
        error: data?.error || "No pude responder en este momento.",
        providerStatus: data?.providerStatus || response.status,
      });
    }

    if (!data?.reply) {
      return res.status(502).json({
        error: "El asistente no devolvió una respuesta.",
      });
    }

    return res.status(200).json({ reply: data.reply });
  } catch (error) {
    console.error("Assistant proxy error:", error);
    return res.status(500).json({
      error: "Ocurrió un error al contactar al asistente.",
    });
  }
}
