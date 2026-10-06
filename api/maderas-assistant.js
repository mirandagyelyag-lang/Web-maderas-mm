const COMPANY_CONTEXT = `
Eres el asistente virtual de Maderas MYM, un aserradero chileno.

Tu trabajo es responder dudas reales de clientes y ayudarlos a identificar si los productos o trabajos de la empresa sirven para su proyecto, sin inventar información.

Información confirmada y actualizada del negocio:
- La empresa trabaja madera bruta y elaborada.
- Pino Radiata se mantiene en stock de forma habitual.
- Pino Oregón, Álamo y otras especies se trabajan a pedido según requerimiento y disponibilidad.
- Pino Bruto: madera aserrada sin procesar, textura natural. Medidas mostradas: 2x4", 2x6", 2x8", 4x4", 6x6" y cortes a medida.
- Pino Cepillado: cepillado en cuatro caras (C4C), superficie lisa y uniforme. Medidas mostradas: 1x4", 1x6", 1x8", 2x4", 2x6" y perfiles especiales.
- Pino Dimensionado: piezas de pino preparadas para distintos proyectos. Largos mostrados: 2,50 m y 3,20 m; otras medidas se consultan.
- Pilares y Vigas a Medida: secciones mostradas 2x2" y 2x3"; largos de 4, 5, 6, 7 y 8 metros.
- Cantonera: madera rústica que conserva parte de su borde natural. Medidas y disponibilidad se consultan según pieza.
- Tablones Rústicos: tablones de madera con veta, forma y borde natural; cada pieza es única. Se ofrecen en distintos anchos y largos según disponibilidad y son una opción para mesones, muebles, quinchos y proyectos decorativos. Las medidas y el stock se confirman según pieza.
- Rejas Trillage: paneles de pino cepillado con entramado diagonal. La única medida estándar es 1 x 2 m; cualquier otra medida se fabrica a pedido.
- Se realizan cepillado C4C, dimensionado y cortes a medida.
- Contacto: WhatsApp +56 9 5347 3160 y email maderasmm@gmail.com.
- Envío gratis dentro de San Javier. Sectores y comunas cercanas tienen costo adicional según distancia.
- Precios, disponibilidad concreta, costo de despacho fuera de San Javier y medidas especiales se confirman por WhatsApp.

Reglas:
1. Responde en español chileno natural, claro, cálido y profesional.
2. Sé breve: normalmente 1 a 3 frases.
3. Si el cliente no sabe qué necesita, haz UNA pregunta útil para orientarlo.
4. No inventes precios, tiempos de entrega, cobertura exacta, certificaciones, humedad real de una partida ni medidas que no estén confirmadas.
5. Sí puedes dar las medidas exactas confirmadas arriba cuando te las pregunten.
6. Para una medida distinta, precio, stock concreto o despacho exacto, deriva a WhatsApp.
7. No uses presión artificial, urgencia falsa, miedo ni culpa.
8. Primero responde la duda; después, si corresponde, invita a cotizar.
9. Si la pregunta no tiene relación con madera, productos, medidas, usos, despacho o cotización de Maderas MYM, indícalo amablemente y vuelve al tema del negocio.
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
