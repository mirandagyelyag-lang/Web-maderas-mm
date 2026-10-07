import React, { useState } from "react";
import { MessageCircle, Check, ArrowLeft, ArrowRight } from "lucide-react";

const ABOUT_RADIATA_IMG = "/assets/about-radiata.webp";
const ABOUT_OREGON_IMG = "/assets/about-oregon.webp";
const ABOUT_REALISTA_IMG = "/assets/about-realista.webp";

const materiales = [
  "Pino Bruto",
  "Pino Cepillado",
  "Pino Dimensionado",
  "Pilares y Vigas a Medida",
  "Cantonera",
  "Rejas Trillage",
];
const especies = ["Pino Radiata · stock permanente", "Pino Oregón · a pedido", "Álamo · a pedido", "Otra especie · consultar"];
const usos = ["Construcción", "Revestimiento", "Cierre perimetral", "Mueble / Carpintería", "Otro / No estoy segura"];
const acabados = ["Aserrado (Bruto)", "Cepillado C4C", "Cortes a medida", "No estoy segura"];
const cantidades = ["Poca cantidad", "Cantidad mediana", "Gran cantidad", "No estoy segura"];
const despachos = ["Sí, necesito despacho", "No, retiro / coordino aparte", "Quiero consultar"];

export default function QuoteEngine() {
  const [step, setStep] = useState(0);
  const [material, setMaterial] = useState("");
  const [especie, setEspecie] = useState("");
  const [uso, setUso] = useState("");
  const [acabado, setAcabado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [despacho, setDespacho] = useState("");
  const [detalle, setDetalle] = useState("");

  const isTrillage = material === "Rejas Trillage";

  const steps = [
    {
      key: "material",
      eyebrow: "Empecemos por lo principal",
      title: "¿Qué necesitas cotizar?",
      subtitle: "Elige el producto o formato que más se acerque a lo que buscas.",
      options: materiales,
    },
    ...(!isTrillage
      ? [{
          key: "especie",
          eyebrow: "Especie de madera",
          title: "¿Qué madera necesitas?",
          subtitle: "Pino Radiata se mantiene en stock. Pino Oregón, Álamo y otras especies se trabajan a pedido.",
          options: especies,
        }]
      : []),
    {
      key: "uso",
      eyebrow: "Cuéntanos un poco más",
      title: "¿Para qué lo necesitas?",
      subtitle: "Esto nos ayuda a orientarte mejor desde el primer mensaje.",
      options: usos,
    },
    ...(!isTrillage
      ? [{
          key: "acabado",
          eyebrow: "Terminación",
          title: "¿Qué acabado prefieres?",
          subtitle: "Si no sabes cuál te conviene, puedes dejar que te asesoremos.",
          options: acabados,
        }]
      : []),
    {
      key: "cantidad",
      eyebrow: "Cantidad aproximada",
      title: isTrillage ? "¿Cuántos paneles necesitas aprox.?" : "¿Cuánta madera necesitas aprox.?",
      subtitle: "No necesitas tener el cálculo exacto para avanzar.",
      options: cantidades,
    },
    {
      key: "despacho",
      eyebrow: "Último paso",
      title: "¿Necesitas despacho?",
      subtitle: "Envío gratis dentro de San Javier. Alrededores con costo adicional según distancia.",
      options: despachos,
    },
  ];

  const currentStep = steps[step];
  const answers = { material, especie, uso, acabado, cantidad, despacho };

  const chooseOption = (key, value) => {
    if (key === "material") {
      setMaterial(value);
      if (value === "Rejas Trillage") {
        setEspecie("Pino Radiata · stock permanente");
        setAcabado("");
      } else {
        setEspecie("");
      }
    }
    if (key === "especie") setEspecie(value);
    if (key === "uso") setUso(value);
    if (key === "acabado") setAcabado(value);
    if (key === "cantidad") setCantidad(value);
    if (key === "despacho") setDespacho(value);

    setStep((prev) => prev + 1);
  };

  const resetQuote = () => {
    setStep(0);
    setMaterial("");
    setEspecie("");
    setUso("");
    setAcabado("");
    setCantidad("");
    setDespacho("");
    setDetalle("");
  };

  const buildMessageText = () => {
    const lines = [
      "Hola Maderas MYM 👋",
      "",
      "Quiero solicitar una cotización.",
      `• Producto: ${material}`,
      especie ? `• Especie: ${especie}` : null,
      `• Uso: ${uso}`,
      !isTrillage && acabado ? `• Terminación: ${acabado}` : null,
      `• Cantidad aprox.: ${cantidad}`,
      `• Despacho: ${despacho}`,
      detalle ? `• Detalle adicional: ${detalle}` : null,
      "",
      "¿Me pueden orientar con disponibilidad y valor? Gracias.",
    ].filter(Boolean);

    return lines.join("\n");
  };

  const buildMessage = () =>
    `https://wa.me/56953488200?text=${encodeURIComponent(buildMessageText())}`;

  return (
    <>
      {/* About strip */}
      <section className="w-full bg-[#1F1B18] relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28 relative z-10">
          <div className="overflow-hidden border border-[#A67C52]/25 bg-[#171310]">
            <div className="relative">
              <img
                src={ABOUT_REALISTA_IMG}
                alt="Madera de pino trabajada por Maderas MYM"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.38] saturate-[0.78]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#120f0d]/55 via-[#120f0d]/72 to-[#120f0d]/94" />

              <div className="relative z-10 px-6 py-10 sm:px-9 sm:py-12 md:px-12 md:py-16">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono-tech text-[10px] sm:text-xs text-[#C99561] uppercase tracking-[0.16em] sm:tracking-[0.24em] whitespace-nowrap">
                    01 / Nuestra Esencia
                  </span>
                  <span className="h-px flex-1 max-w-16 bg-[#A67C52]/65" />
                </div>

                <h2 className="font-heading font-bold text-[#F9F7F2] text-[38px] min-[390px]:text-[42px] sm:text-5xl md:text-6xl leading-[0.96] tracking-tight mb-6">
                  HONESTIDAD<br />
                  <span className="text-[#B88655]">MATERIAL</span>
                </h2>

                <p className="w-full max-w-xl text-[#F9F7F2]/80 text-[15px] sm:text-lg leading-[1.7] mb-7">
                  Trabajamos la madera respetando su carácter natural, combinando oficio,
                  precisión y cortes a medida para cada proyecto.
                </p>

                <a
                  href="#especies"
                  className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#B88655] text-[#F9F7F2] px-5 sm:px-6 py-3.5 font-heading font-semibold text-[12px] sm:text-sm tracking-[0.04em] hover:bg-[#9C7048] transition-colors"
                >
                  CONOCE NUESTRAS MADERAS
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 bg-[#171310] border-t border-[#A67C52]/25">
              {[
                { num: "Stock", label: "Radiata permanente" },
                { num: "C4C", label: "Cepillado 4 caras" },
                { num: "A medida", label: "Cortes especiales" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`min-w-0 px-2.5 min-[390px]:px-3.5 sm:px-5 py-5 sm:py-6 text-center ${index > 0 ? "border-l border-[#A67C52]/30" : ""}`}
                >
                  <span className={`font-heading font-bold text-[#C99561] block leading-tight ${
                    stat.num === "A medida"
                      ? "text-[16px] min-[390px]:text-[18px] sm:text-2xl"
                      : "text-[20px] min-[390px]:text-[22px] sm:text-2xl"
                  }`}>
                    {stat.num}
                  </span>
                  <span className="font-mono-tech text-[7px] min-[390px]:text-[8px] sm:text-[10px] uppercase tracking-[0.04em] sm:tracking-[0.1em] text-[#F9F7F2]/60 block mt-2 leading-[1.35]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div id="especies" className="pt-12 sm:pt-14 md:pt-16">
            <div className="mb-6">
              <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                Especies trabajadas
              </span>
              <h3 className="font-heading text-[#F9F7F2] text-2xl sm:text-3xl font-bold mt-2">
                Radiata en stock. Otras especies a pedido.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="group bg-[#181412] border border-[#A67C52]/25 overflow-hidden">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={ABOUT_RADIATA_IMG}
                    alt="Pino Radiata"
                    className="w-full h-full object-cover brightness-[0.72] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/95 via-[#181412]/10 to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#D1A169]">
                      Pino
                    </span>
                    <h4 className="font-heading text-[#F9F7F2] text-3xl font-bold leading-none mt-1">
                      RADIATA
                    </h4>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-[#A67C52]/15">
                  <p className="text-[14px] text-[#F9F7F2]/60 leading-relaxed">
                    Nuestra especie de stock permanente. Versátil y funcional para construcción, carpintería y soluciones a medida.
                  </p>
                </div>
              </article>

              <article className="group bg-[#181412] border border-[#A67C52]/25 overflow-hidden">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={ABOUT_OREGON_IMG}
                    alt="Pino Oregón"
                    className="w-full h-full object-cover brightness-[0.72] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/95 via-[#181412]/10 to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#D1A169]">
                      Pino
                    </span>
                    <h4 className="font-heading text-[#F9F7F2] text-3xl font-bold leading-none mt-1">
                      OREGÓN
                    </h4>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-[#A67C52]/15">
                  <p className="text-[14px] text-[#F9F7F2]/60 leading-relaxed">
                    Se trabaja a pedido según el requerimiento del proyecto. Firme, resistente y de terminación cálida.
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-4 border border-[#A67C52]/25 bg-[#181412] px-5 py-4 sm:px-6">
              <p className="text-[14px] sm:text-[15px] text-[#F9F7F2]/70 leading-relaxed">
                <strong className="text-[#D1A169]">También trabajamos Álamo y otras especies a pedido.</strong>{" "}
                La disponibilidad, medidas y plazos se confirman según cada solicitud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Engine */}
      <section id="cotizar" className="w-full max-w-full bg-[#F9F7F2] py-16 md:py-24 overflow-x-clip">
        <div className="w-full max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-8 md:mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono-tech text-[10px] sm:text-xs text-[#A67C52] uppercase tracking-[0.22em]">
                03 / Cotización guiada
              </span>
              <span className="h-px w-14 bg-[#A67C52]/60" />
            </div>
            <h2 className="font-heading font-bold text-[#1F1B18] text-4xl md:text-5xl leading-[0.98] mb-4">
              CUÉNTANOS QUÉ<br />
              <span className="text-[#A67C52]">NECESITAS</span>
            </h2>
            <p className="text-[#3E424B] text-base sm:text-lg leading-relaxed">
              Responde unas preguntas rápidas. Al final armamos tu primer mensaje de WhatsApp automáticamente.
            </p>
          </div>

          <div className="bg-white border border-[#A67C52]/20 shadow-xl shadow-[#A67C52]/5 overflow-hidden">
            <div className="h-1.5 bg-[#EFE7DC]">
              <div
                className="h-full bg-[#A67C52] transition-all duration-300"
                style={{ width: `${Math.min(100, ((Math.min(step, steps.length - 1) + 1) / steps.length) * 100)}%` }}
              />
            </div>

            {currentStep ? (
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#A67C52]">
                    Paso {step + 1} de {steps.length}
                  </span>

                  {step > 0 && (
                    <button
                      onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                      className="inline-flex items-center gap-2 text-[#3E424B]/60 hover:text-[#1F1B18] transition-colors font-mono-tech text-[10px] uppercase tracking-[0.12em]"
                    >
                      <ArrowLeft size={14} />
                      Atrás
                    </button>
                  )}
                </div>

                <div className="max-w-2xl">
                  <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                    {currentStep.eyebrow}
                  </span>
                  <h3 className="font-heading text-[#1F1B18] text-[30px] sm:text-4xl font-bold leading-tight mt-2">
                    {currentStep.title}
                  </h3>
                  <p className="text-[#3E424B]/70 text-sm sm:text-base mt-3 leading-relaxed">
                    {currentStep.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  {currentStep.options.map((option) => {
                    const selected = answers[currentStep.key] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => chooseOption(currentStep.key, option)}
                        className={`group flex items-center justify-between gap-4 text-left px-5 py-4 sm:py-5 border transition-all ${
                          selected
                            ? "bg-[#1F1B18] border-[#1F1B18] text-[#F9F7F2]"
                            : "bg-[#F9F7F2] border-[#A67C52]/20 text-[#1F1B18] hover:border-[#A67C52] hover:bg-[#F3ECE3]"
                        }`}
                      >
                        <span className="font-heading font-semibold text-[15px] sm:text-base">
                          {option}
                        </span>
                        <ArrowRight
                          size={18}
                          className={selected ? "text-[#C99561]" : "text-[#A67C52] opacity-70 group-hover:translate-x-0.5 transition-transform"}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-between gap-4 mb-7">
                  <div>
                    <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                      Listo
                    </span>
                    <h3 className="font-heading text-[#1F1B18] text-[30px] sm:text-4xl font-bold leading-tight mt-2">
                      TU MENSAJE ESTÁ ARMADO
                    </h3>
                  </div>

                  <button
                    onClick={() => setStep(Math.max(0, steps.length - 1))}
                    className="hidden sm:inline-flex items-center gap-2 text-[#3E424B]/60 hover:text-[#1F1B18] transition-colors font-mono-tech text-[10px] uppercase tracking-[0.12em]"
                  >
                    <ArrowLeft size={14} />
                    Editar
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
                  <div className="space-y-3">
                    {[
                      ["Producto", material],
                      ...(especie ? [["Especie", especie]] : []),
                      ["Uso", uso],
                      ...(!isTrillage && acabado ? [["Terminación", acabado]] : []),
                      ["Cantidad", cantidad],
                      ["Despacho", despacho],
                    ].map(([label, value]) => (
                      <div key={label} className="border border-[#A67C52]/15 bg-[#F9F7F2] px-4 py-3.5">
                        <span className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#A67C52] block mb-1">
                          {label}
                        </span>
                        <span className="font-heading font-semibold text-[#1F1B18] text-sm sm:text-base">
                          {value}
                        </span>
                      </div>
                    ))}

                    <button
                      onClick={resetQuote}
                      className="text-[#3E424B]/55 hover:text-[#1F1B18] transition-colors font-mono-tech text-[10px] uppercase tracking-[0.12em] pt-2"
                    >
                      Empezar de nuevo
                    </button>
                  </div>

                  <div>
                    <div className="bg-[#1F1B18] p-5 sm:p-6">
                      <span className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#C99561] block mb-4">
                        Vista previa del WhatsApp
                      </span>
                      <pre className="font-sans whitespace-pre-wrap break-words text-[#F9F7F2] text-sm leading-relaxed m-0">
                        {buildMessageText()}
                      </pre>
                    </div>

                    <div className="mt-4">
                      <label className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#A67C52] block mb-2">
                        ¿Quieres agregar algo? (opcional)
                      </label>
                      <textarea
                        value={detalle}
                        onChange={(e) => setDetalle(e.target.value)}
                        rows={3}
                        placeholder="Ej: medidas específicas, largo, cantidad de unidades..."
                        className="w-full bg-[#F9F7F2] border border-[#A67C52]/20 px-4 py-3 text-[#1F1B18] placeholder:text-[#3E424B]/45 focus:outline-none focus:border-[#A67C52] transition-colors resize-none"
                      />
                    </div>

                    <a
                      href={buildMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2.5 bg-[#A67C52] px-4 py-4 text-[#F9F7F2] font-heading font-semibold text-[14px] sm:text-base leading-none tracking-[0.03em] hover:bg-[#8B693A] transition-colors"
                    >
                      <MessageCircle size={18} className="shrink-0" />
                      <span>ENVIAR COTIZACIÓN POR WHATSAPP</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
