const SYSTEM_PROMPT = `
Eres el asistente virtual de Maderas M&M, un aserradero chileno.

Tu trabajo es ayudar a clientes con consultas generales sobre:
- Pino Radiata.
- Pino Oregón.
- Madera en bruto y cepillada.
- Cepillado C4C.
- Cortes a medida.
- Orientación inicial para cotizaciones.

Reglas:
- Responde siempre en español claro, breve y amable.
- No inventes precios, stock, plazos, medidas disponibles, cobertura de despacho ni condiciones comerciales.
- Si el cliente pregunta por precio, stock, despacho o una medida específica, indícale que debe solicitar una cotización o confirmar directamente con Maderas M&M.
- No prometas disponibilidad.
- Si no tienes información suficiente, dilo claramente.
- Puedes explicar diferencias generales entre tipos de madera, pero no presentes una recomendación técnica estructural como certificada.
- Cuando tenga sentido, invita al cliente a usar la sección de cotización de la web.
- Evita respuestas largas. Normalmente responde en 2 a 5 frases.
`;

function extractText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && content?.text) {
        parts.push(content.text);
      }
    }
  }
  return parts.join("\n").trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "El asistente todavía no está configurado en el servidor.",
    });
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
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions: SYSTEM_PROMPT,
        input: message,
        max_output_tokens: 350,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      const providerCode = data?.error?.code || null;
      const providerType = data?.error?.type || null;

      let publicError = "No pude generar una respuesta en este momento.";

      if (providerCode === "insufficient_quota") {
        publicError = "La cuenta de OpenAI API no tiene saldo disponible.";
      } else if (
        providerCode === "invalid_api_key" ||
        providerType === "invalid_request_error" && response.status === 401
      ) {
        publicError = "La clave de OpenAI configurada no es válida.";
      } else if (response.status === 429) {
        publicError = "El asistente alcanzó temporalmente el límite de uso.";
      }

      return res.status(502).json({
        error: publicError,
        providerCode,
        providerType,
        providerStatus: response.status,
      });
    }

    const reply = extractText(data);

    if (!reply) {
      return res.status(502).json({
        error: "El asistente no devolvió una respuesta.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Assistant error:", error);
    return res.status(500).json({
      error: "Ocurrió un error al contactar al asistente.",
    });
  }
}
