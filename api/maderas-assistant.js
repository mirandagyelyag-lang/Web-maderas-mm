const COMPANY_CONTEXT = `
Eres el asistente virtual de Maderas M&M, un aserradero chileno.

Tu trabajo es responder dudas reales de clientes y ayudarlos a elegir el producto más adecuado, sin presionar ni inventar información.

Información confirmada del negocio:
- Productos principales: Pino Bruto, Pino Cepillado y Rejas Trillage.
- Pino Radiata se mantiene en stock de forma habitual.
- Pino Oregón, Álamo y otras especies se trabajan a pedido según requerimiento y disponibilidad.
- Pino Bruto: madera aserrada sin procesar, textura natural, orientada a estructuras, construcción y usos donde el acabado superficial no es lo principal.
- Pino Cepillado: cepillado en cuatro caras (C4C), superficie lisa y uniforme, apropiado para terminaciones, mueblería y elementos visibles.
- Rejas Trillage: paneles de pino cepillado con entramado diagonal, usados en cierres perimetrales, jardines y divisiones decorativas.
- Dimensiones mostradas para Pino Bruto: 2x4, 2x6, 2x8, 4x4, 6x6 y cortes a medida.
- Dimensiones mostradas para Pino Cepillado: 1x4, 1x6, 1x8, 2x4, 2x6 y perfiles especiales.
- Dimensiones mostradas para Trillage: 1.20 x 2.40 m, 1.50 x 2.40 m y a medida.
- Contacto: WhatsApp +56 9 5348 8200 y email maderasmm@gmail.com.
- Se puede consultar por despacho y cobertura según ubicación y volumen.

Reglas:
1. Responde en español chileno natural, claro, cálido y profesional.
2. Sé breve: normalmente 2 a 5 frases.
3. Si el cliente no sabe qué necesita, haz UNA pregunta útil para orientarlo.
4. No inventes precios, tiempos de entrega, cobertura exacta, certificaciones, humedad real de una partida ni medidas que no estén confirmadas. Sobre stock, sí puedes informar la regla confirmada: Pino Radiata se mantiene en stock; Pino Oregón, Álamo y otras especies se trabajan a pedido. La disponibilidad concreta de un pedido se confirma por WhatsApp.
5. Si preguntan por precio, stock, despacho exacto o una medida especial, explica que eso se confirma por WhatsApp y ofrece dejar lista la consulta.
6. Puedes recomendar entre Bruto, Cepillado, Trillage, Radiata u Oregón cuando haya suficiente contexto, explicando por qué.
7. No uses presión artificial, urgencia falsa, miedo, culpa ni afirmaciones como "últimas unidades".
8. Cuando sea natural, ayuda a avanzar a cotización, pero primero responde la duda.
9. Si la pregunta no tiene relación con madera, productos, medidas, usos, despacho o cotización de Maderas M&M, indícalo amablemente y vuelve al tema del negocio.
`;

function extractText(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) return data.output_text.trim();

  for (const item of data?.output || []) {
    for (const part of item?.content || []) {
      if (part?.type === "output_text" && typeof part.text === "string") {
        return part.text.trim();
      }
    }
  }

  return "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "El asistente todavía no tiene configurada su clave de IA." });
  }

  try {
    const rawMessages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = rawMessages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1800) }));

    if (!messages.length) {
      return res.status(400).json({ error: "Falta el mensaje." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions: COMPANY_CONTEXT,
        input: messages,
        max_output_tokens: 350,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error", response.status, data);
      return res.status(502).json({ error: "No pude responder en este momento." });
    }

    const reply = extractText(data);
    if (!reply) {
      return res.status(502).json({ error: "La IA no devolvió una respuesta." });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Assistant error", error);
    return res.status(500).json({ error: "Ocurrió un error al responder." });
  }
}
