import React, { useMemo, useState } from "react";
import { MessageCircle, X, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

const phoneRaw = "56953488200";

const questions = [
  {
    key: "need",
    text: "¿Qué estás buscando para tu proyecto?",
    options: ["Madera para construcción", "Madera para terminaciones", "Rejas Trillage", "No estoy segura/o"],
  },
  {
    key: "priority",
    text: "¿Qué es lo más importante para ti?",
    options: ["Precio", "Terminación", "Resistencia", "Que me asesoren"],
  },
  {
    key: "quantity",
    text: "¿Qué cantidad necesitas aproximadamente?",
    options: ["Poca", "Media", "Alta", "Todavía no sé"],
  },
  {
    key: "delivery",
    text: "¿Necesitas despacho?",
    options: ["Sí", "No", "Quiero consultar"],
  },
];

function getRecommendation(answers) {
  if (answers.need === "Rejas Trillage") {
    return {
      title: "Rejas Trillage",
      reason: "Para cierres y divisiones decorativas, es la opción más directa. Podemos ayudarte con formato, cantidad y despacho.",
    };
  }

  if (answers.need === "Madera para terminaciones" || answers.priority === "Terminación") {
    return {
      title: "Pino Cepillado",
      reason: "Si buscas una superficie limpia y lista para quedar a la vista, el cepillado suele ser la alternativa más conveniente.",
    };
  }

  if (answers.need === "Madera para construcción" || answers.priority === "Precio") {
    return {
      title: "Pino Bruto",
      reason: "Para estructura y obra, el bruto conserva la terminación de aserrado y suele ser una opción práctica y eficiente.",
    };
  }

  if (answers.priority === "Resistencia") {
    return {
      title: "Pino Oregón",
      reason: "Si tu prioridad es una madera firme y con presencia, conviene consultar disponibilidad y medidas en Pino Oregón.",
    };
  }

  return {
    title: "Te ayudamos a elegir",
    reason: "Con tus respuestas ya podemos orientarte mejor y confirmar qué formato conviene para tu proyecto.",
  };
}

export default function WhatsAppPulse() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const finished = step >= questions.length;
  const recommendation = useMemo(() => getRecommendation(answers), [answers]);

  const choose = (value) => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.key]: value }));
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const message = useMemo(() => {
    if (!finished) return "";
    const lines = [
      "Hola Maderas M&M 👋",
      "Estuve usando el asistente de la web y me gustaría cotizar.",
      "",
      `• Necesidad: ${answers.need || "-"}`,
      `• Prioridad: ${answers.priority || "-"}`,
      `• Cantidad aprox.: ${answers.quantity || "-"}`,
      `• Despacho: ${answers.delivery || "-"}`,
      `• Recomendación mostrada: ${recommendation.title}`,
      "",
      "¿Me pueden orientar con disponibilidad, medidas y valor?",
    ];
    return lines.join("\n");
  }, [finished, answers, recommendation]);

  const whatsappHref = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Abrir asistente de cotización"
      >
        <span className="absolute inset-0 rounded-full bg-[#A67C52] animate-ping opacity-25" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#A67C52] text-[#F9F7F2] shadow-lg shadow-[#A67C52]/40 hover:bg-[#8B693A] transition-colors">
          <MessageCircle size={26} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-sm px-0 sm:px-5">
          <div className="w-full sm:max-w-md bg-[#F9F7F2] border border-[#A67C52]/25 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-[#1F1B18] text-[#F9F7F2] px-5 py-4 flex items-center justify-between border-b border-[#A67C52]/20">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#A67C52] flex items-center justify-center">
                  <Sparkles size={18} />
                </span>
                <div>
                  <p className="font-heading font-bold text-sm">Asistente M&M</p>
                  <p className="text-[11px] text-[#F9F7F2]/55">Te orienta antes de cotizar</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-[#F9F7F2]/70 hover:text-white">
                <X size={22} />
              </button>
            </div>

            {!finished ? (
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A67C52]">
                    Pregunta {step + 1} de {questions.length}
                  </span>
                  <span className="text-xs text-[#3E424B]/45">{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>

                <div className="h-1 bg-[#E8DED2] mb-7 overflow-hidden">
                  <div className="h-full bg-[#A67C52] transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
                </div>

                <h3 className="font-heading font-bold text-[#1F1B18] text-2xl leading-tight mb-5">
                  {questions[step].text}
                </h3>

                <div className="space-y-3">
                  {questions[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => choose(option)}
                      className="w-full flex items-center justify-between gap-3 text-left px-4 py-4 bg-white border border-[#A67C52]/20 hover:border-[#A67C52] hover:bg-[#F3ECE3] transition-colors"
                    >
                      <span className="font-heading font-semibold text-[#1F1B18] text-sm">{option}</span>
                      <ArrowRight size={17} className="text-[#A67C52]" />
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                    className="mt-5 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#3E424B]/50 hover:text-[#1F1B18]"
                  >
                    Volver
                  </button>
                )}
              </div>
            ) : (
              <div className="p-5 sm:p-6">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.16em] text-[#A67C52]">
                  Recomendación
                </span>

                <h3 className="font-heading font-bold text-[#1F1B18] text-3xl mt-2">
                  {recommendation.title}
                </h3>
                <p className="text-[#3E424B] leading-relaxed mt-3 text-sm">
                  {recommendation.reason}
                </p>

                <div className="mt-6 bg-white border border-[#A67C52]/20 p-4">
                  <p className="font-mono-tech text-[9px] uppercase tracking-[0.15em] text-[#A67C52] mb-3">
                    Tu consulta
                  </p>
                  <div className="space-y-2 text-sm text-[#3E424B]">
                    <p><strong>Buscas:</strong> {answers.need}</p>
                    <p><strong>Prioridad:</strong> {answers.priority}</p>
                    <p><strong>Cantidad:</strong> {answers.quantity}</p>
                    <p><strong>Despacho:</strong> {answers.delivery}</p>
                  </div>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 bg-[#A67C52] text-[#F9F7F2] px-4 py-4 font-heading font-semibold hover:bg-[#8B693A] transition-colors"
                >
                  <MessageCircle size={18} />
                  CONTINUAR POR WHATSAPP
                </a>

                <button
                  onClick={reset}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#3E424B]/50 hover:text-[#1F1B18]"
                >
                  <RotateCcw size={13} />
                  Empezar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
