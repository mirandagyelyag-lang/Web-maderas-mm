import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Bot, Sparkles, X, Send, Loader2, ExternalLink, ImagePlus } from "lucide-react";

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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente de Maderas MYM. Pregúntame por tipos de madera, medidas, terminaciones, usos o qué producto te conviene para tu proyecto.",
    },
  ]);

  const endRef = useRef(null);
  const fileRef = useRef(null);
  const sessionIdRef = useRef(crypto.randomUUID());

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("La foto debe pesar menos de 4 MB.");
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(null);
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const sendMessage = async (text = input) => {
    const clean = text.trim();
    if ((!clean && !image) || sending) return;

    const userContent = clean || "¿Esto lo hacen ustedes?";
    const nextMessages = [...messages, { role: "user", content: userContent, image: imagePreview || null }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    const currentImage = image;

    try {
      const response = await fetch("https://vwyudrmxatuukcbncats.supabase.co/functions/v1/maderas-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: userContent,
          image: currentImage
            ? {
                mimeType: currentImage.type,
                data: await fileToBase64(currentImage),
              }
            : null,
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
      clearImage();
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
      "Hola Maderas MYM 👋\nEstuve conversando con el asistente de la web y quiero continuar mi consulta.\n\n" +
      conversation.slice(-2500);

    return `https://wa.me/${phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-3"
        aria-label="Abrir asistente MYM"
      >
        <span className="hidden sm:flex items-center gap-2 rounded-full border border-[#A67C52]/45 bg-[#211C18]/95 px-4 py-2.5 text-[#F9F7F2] shadow-lg shadow-black/20 backdrop-blur-sm transition-all group-hover:border-[#A67C52] group-hover:-translate-x-0.5">
          <Sparkles size={15} className="text-[#C99561]" />
          <span className="font-heading text-xs font-semibold tracking-[0.04em]">Asistente IA</span>
        </span>

        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#A67C52] text-[#F9F7F2] shadow-lg shadow-[#A67C52]/35 transition-all group-hover:bg-[#8B693A] group-hover:scale-105">
          <span className="absolute inset-0 rounded-full bg-[#A67C52] animate-ping opacity-20" />
          <Bot size={27} strokeWidth={1.8} className="relative z-10" />
          <span className="absolute -top-1 -right-1 z-20 min-w-[22px] h-[22px] px-1.5 rounded-full border-2 border-[#1F1B18] bg-[#F9F7F2] text-[#1F1B18] flex items-center justify-center font-heading text-[9px] font-bold tracking-tight">
            IA
          </span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm sm:px-5">
          <div className="w-full sm:max-w-[520px] h-[78vh] sm:h-auto sm:max-h-[78vh] bg-[#F7F1E8] border border-[#A67C52]/35 shadow-2xl flex flex-col rounded-t-[24px] sm:rounded-[24px] overflow-hidden">
            <div className="bg-[#1F1B18] text-[#F9F7F2] px-5 py-4 flex items-center justify-between border-b border-[#A67C52]/35 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#A67C52] text-white flex items-center justify-center shadow-md shadow-black/20">
                  <Bot size={21} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-bold text-[15px]">Asistente MYM</p>
                    <span className="rounded-full border border-[#A67C52]/45 bg-[#A67C52]/10 px-2 py-0.5 font-mono-tech text-[8px] uppercase tracking-[0.16em] text-[#C99561]">
                      IA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#F9F7F2]/55 mt-0.5">
                    Te ayudo a elegir y entender nuestros productos
                  </p>
                  <p className="text-[9px] text-[#F9F7F2]/35 mt-1">
                    La conversación puede guardarse para atención y seguimiento.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="text-[#F9F7F2]/70 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 text-[14px] leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-[#A67C52] text-[#F9F7F2] rounded-[18px] rounded-br-[5px]"
                        : "bg-[#FFFDFC] border border-[#A67C52]/18 text-[#2C2926] rounded-[18px] rounded-bl-[5px]"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Foto enviada por el cliente"
                        className="mb-2 max-h-48 w-full rounded-xl object-cover"
                      />
                    )}
                    {message.content}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-[#A67C52]" />
                    <p className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#A67C52]">
                      Preguntas rápidas
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {starterQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => sendMessage(question)}
                        className="group w-full text-left rounded-xl bg-[#EFE4D7] border border-[#A67C52]/22 px-4 py-3 text-[13px] leading-5 text-[#3E424B] hover:bg-[#E8DACB] hover:border-[#A67C52]/55 transition-all"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>{question}</span>
                          <span className="text-[#A67C52] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            →
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
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
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-[#A67C52]/30 bg-[#FFFDFC] text-[#1F1B18] px-4 py-3 font-heading font-semibold text-xs hover:border-[#A67C52] hover:bg-[#F5EEE6] transition-colors"
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
              className="border-t border-[#A67C52]/22 bg-[#FFFDFC] p-3 sm:p-4 shrink-0"
            >
              {imagePreview && (
                <div className="mb-3 flex items-center gap-3 rounded-xl border border-[#A67C52]/25 bg-[#F7F1E8] p-2.5">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#2C2926]">Foto lista para enviar</p>
                    <p className="text-[11px] text-[#2C2926]/55">La IA solo confirmará si Maderas MYM hace algo así.</p>
                  </div>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="rounded-full p-1.5 text-[#2C2926]/50 hover:bg-[#A67C52]/10 hover:text-[#A67C52]"
                    aria-label="Quitar foto"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files?.[0])}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border border-[#A67C52]/25 bg-[#F7F1E8] text-[#A67C52] hover:bg-[#EFE4D7] transition-colors"
                  aria-label="Agregar foto"
                  title="Agregar foto"
                >
                  <ImagePlus size={19} />
                </button>
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
                className="flex-1 max-h-28 resize-none rounded-xl bg-[#F7F1E8] border border-[#A67C52]/25 px-4 py-3 text-sm text-[#1F1B18] placeholder:text-[#3E424B]/40 focus:outline-none focus:border-[#A67C52] focus:ring-2 focus:ring-[#A67C52]/10"
              />
                <button
                  type="submit"
                  disabled={(!input.trim() && !image) || sending}
                  className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-[#A67C52] text-white shadow-sm shadow-[#A67C52]/25 disabled:opacity-35 hover:bg-[#8B693A] transition-colors"
                  aria-label="Enviar pregunta"
                >
                  {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
