import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, ExternalLink } from "lucide-react";

const phoneRaw = "56953488200";

const starterQuestions = [
  "¿Qué diferencia hay entre bruto y cepillado?",
  "¿Qué madera me conviene para construir?",
  "Quiero una reja para el jardín",
];

export default function WhatsAppPulse() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente de Maderas M&M. Pregúntame por tipos de madera, medidas, terminaciones, usos o qué producto te conviene para tu proyecto.",
    },
  ]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const sendMessage = async (text = input) => {
    const clean = text.trim();
    if (!clean || sending) return;

    const nextMessages = [...messages, { role: "user", content: clean }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/maderas-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "No pude responder.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error?.message ||
            "No pude responder justo ahora. Puedes escribirnos por WhatsApp y te ayudamos directamente.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const whatsappSummary = () => {
    const conversation = messages
      .slice(1)
      .map((m) => `${m.role === "user" ? "Cliente" : "Asistente"}: ${m.content}`)
      .join("\n");

    const text =
      "Hola Maderas M&M 👋\nEstuve conversando con el asistente de la web y quiero continuar mi consulta.\n\n" +
      conversation.slice(-2500);

    return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Abrir asistente M&M"
      >
        <span className="absolute inset-0 rounded-full bg-[#A67C52] animate-ping opacity-25" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#A67C52] text-[#F9F7F2] shadow-lg shadow-[#A67C52]/40 hover:bg-[#8B693A] transition-colors">
          <MessageCircle size={26} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm sm:px-5">
          <div className="w-full sm:max-w-md h-[82vh] sm:h-[680px] sm:max-h-[86vh] bg-[#F9F7F2] border border-[#A67C52]/25 shadow-2xl flex flex-col">
            <div className="bg-[#1F1B18] text-[#F9F7F2] px-5 py-4 flex items-center justify-between border-b border-[#A67C52]/20 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A67C52]" />
                  <p className="font-heading font-bold text-sm">Asistente M&M</p>
                </div>
                <p className="text-[11px] text-[#F9F7F2]/55 mt-0.5">
                  Pregunta lo que necesites sobre madera
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="text-[#F9F7F2]/70 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[86%] px-4 py-3 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-[#A67C52] text-[#F9F7F2] rounded-2xl rounded-br-sm"
                        : "bg-white border border-[#A67C52]/15 text-[#2C2926] rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="pt-1 space-y-2">
                  <p className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#A67C52]">
                    Puedes preguntarme
                  </p>
                  {starterQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left bg-[#F3ECE3] border border-[#A67C52]/18 px-4 py-3 text-sm text-[#3E424B] hover:border-[#A67C52] transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {sending && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#A67C52]/15 px-4 py-3 rounded-2xl rounded-bl-sm text-[#A67C52]">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {messages.length > 2 && (
              <div className="px-4 pb-3 shrink-0">
                <a
                  href={whatsappSummary()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-[#A67C52]/25 bg-white text-[#1F1B18] px-4 py-3 font-heading font-semibold text-xs hover:border-[#A67C52] transition-colors"
                >
                  <MessageCircle size={16} className="text-[#A67C52]" />
                  CONTINUAR CON UNA PERSONA POR WHATSAPP
                  <ExternalLink size={13} className="opacity-50" />
                </a>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="border-t border-[#A67C52]/18 bg-white p-3 flex items-end gap-2 shrink-0"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Escribe tu pregunta..."
                className="flex-1 max-h-28 resize-none bg-[#F9F7F2] border border-[#A67C52]/18 px-4 py-3 text-sm text-[#1F1B18] placeholder:text-[#3E424B]/40 focus:outline-none focus:border-[#A67C52]"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#A67C52] text-white disabled:opacity-35 hover:bg-[#8B693A] transition-colors"
                aria-label="Enviar pregunta"
              >
                {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
