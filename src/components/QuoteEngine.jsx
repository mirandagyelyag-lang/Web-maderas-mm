import React, { useState } from "react";
import { MessageCircle, Check } from "lucide-react";

const ABOUT_RADIATA_IMG = "/assets/about-radiata.png";
const ABOUT_OREGON_IMG = "/assets/about-oregon.png";
const ABOUT_REALISTA_IMG = "/assets/about-realista.png";

const materiales = ["Pino Bruto", "Pino Cepillado", "Rejas Trillage"];
const acabados = ["Aserrado (Bruto)", "Cepillado C4C", "Cortes a medida"];
const cantidades = ["1–5 m³", "5–10 m³", "10–20 m³", "20+ m³"];

export default function QuoteEngine() {
  const [material, setMaterial] = useState("Pino Cepillado");
  const [acabado, setAcabado] = useState("Cepillado C4C");
  const [cantidad, setCantidad] = useState("5–10 m³");
  const [detalle, setDetalle] = useState("");

  const buildMessage = () => {
    const msg =
      `Hola Maderas M&M, me gustaría cotizar lo siguiente:%0A%0A` +
      `• Material: ${material}%0A` +
      `• Acabado: ${acabado}%0A` +
      `• Cantidad: ${cantidad}%0A` +
      (detalle ? `• Detalle: ${encodeURIComponent(detalle)}%0A` : "") +
      `%0AQuedo atento a su respuesta. Gracias.`;
    return `https://wa.me/56953488200?text=${msg}`;
  };

  return (
    <>
      {/* About strip */}
      <section className="w-full bg-[#1F1B18] relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 py-20 md:py-28 relative z-10">
          <div className="relative overflow-hidden border border-[#A67C52]/20 min-h-[660px] sm:min-h-[620px] md:min-h-[680px]">
            <img
              src={ABOUT_REALISTA_IMG}
              alt="Madera de pino trabajada por Maderas M&M"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.46] saturate-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15110f]/32 via-[#15110f]/58 to-[#15110f]/96" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#15110f]/76 via-[#15110f]/30 to-transparent" />

            <div className="relative z-10 min-h-[660px] sm:min-h-[620px] md:min-h-[680px] flex flex-col justify-between p-6 sm:p-8 md:p-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono-tech text-[11px] sm:text-xs text-[#C99561] uppercase tracking-[0.18em] sm:tracking-[0.28em] whitespace-nowrap">
                    01 / Nuestra Esencia
                  </span>
                  <span className="h-px w-12 sm:w-16 bg-[#A67C52]/70" />
                </div>

                <h2 className="font-heading font-bold text-[#F9F7F2] text-[44px] sm:text-5xl md:text-6xl leading-[0.96] tracking-tight mb-6">
                  HONESTIDAD<br />
                  <span className="text-[#B88655]">MATERIAL</span>
                </h2>

                <p className="max-w-xl text-[#F9F7F2]/78 text-[16px] sm:text-lg leading-relaxed mb-7">
                  Trabajamos la madera respetando su carácter natural, combinando oficio,
                  precisión y cortes a medida para cada proyecto.
                </p>

                <a
                  href="#especies"
                  className="inline-flex items-center gap-3 bg-[#B88655] text-[#F9F7F2] px-5 sm:px-6 py-3.5 font-heading font-semibold text-sm tracking-wide hover:bg-[#9C7048] transition-colors"
                >
                  CONOCE NUESTRAS MADERAS
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-0 border-t border-[#F9F7F2]/15 pt-6 mt-10">
                {[
                  { num: "100%", label: "Pino chileno" },
                  { num: "C4C", label: "Cepillado 4 caras" },
                  { num: "A medida", label: "Cortes especiales" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`min-w-0 px-3 sm:px-5 ${index > 0 ? "border-l border-[#A67C52]/35" : ""}`}
                  >
                    <span className="font-heading font-bold text-[#C99561] text-xl sm:text-2xl block leading-none">
                      {stat.num}
                    </span>
                    <span className="font-mono-tech text-[8px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#F9F7F2]/58 block mt-2 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="especies" className="pt-14 md:pt-18">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52]">
                  Especies trabajadas
                </span>
                <h3 className="font-heading text-[#F9F7F2] text-2xl sm:text-3xl font-bold mt-2">
                  Dos pinos, dos caracteres
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="group bg-[#181412] border border-[#A67C52]/25 overflow-hidden">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={ABOUT_RADIATA_IMG}
                    alt="Pino Radiata"
                    className="w-full h-full object-cover brightness-[0.74] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/92 via-transparent to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#D1A169]">Pino</span>
                    <h4 className="font-heading text-[#F9F7F2] text-3xl font-bold leading-none mt-1">RADIATA</h4>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-[#A67C52]/15">
                  <p className="text-sm text-[#F9F7F2]/62 leading-relaxed">
                    Versátil y funcional para construcción, carpintería y soluciones a medida.
                  </p>
                </div>
              </article>

              <article className="group bg-[#181412] border border-[#A67C52]/25 overflow-hidden">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
                  <img
                    src={ABOUT_OREGON_IMG}
                    alt="Pino Oregón"
                    className="w-full h-full object-cover brightness-[0.74] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/92 via-transparent to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#D1A169]">Pino</span>
                    <h4 className="font-heading text-[#F9F7F2] text-3xl font-bold leading-none mt-1">OREGÓN</h4>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-[#A67C52]/15">
                  <p className="text-sm text-[#F9F7F2]/62 leading-relaxed">
                    Firme, resistente y con una terminación cálida para proyectos de mayor presencia.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Engine */}
      <section id="cotizar" className="w-full max-w-full bg-[#F9F7F2] py-20 md:py-32 overflow-x-clip">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-[0.3em]">
                  03 / Motor de Cotización
                </span>
                <span className="h-px w-16 bg-[#A67C52]/60" />
              </div>
              <h2 className="font-heading font-bold text-[#1F1B18] text-4xl md:text-5xl leading-tight text-balance mb-6">
                ARMA TU<br />
                <span className="text-[#A67C52]">PEDIDO</span>
              </h2>
              <p className="text-[#3E424B] text-lg leading-relaxed mb-8">
                Selecciona el material, el acabado y la cantidad. Tu cotización se envía
                directamente por WhatsApp, prellenada con tus especificaciones.
              </p>
              <div className="space-y-3">
                {[
                  "Respuesta directa del aserradero",
                  "Cortes a medida sin costo extra",
                  "Cotización sin compromiso",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A67C52] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#F9F7F2]" />
                    </div>
                    <span className="text-[#1F1B18]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="bg-white border border-[#A67C52]/20 p-8 md:p-10 shadow-xl shadow-[#A67C52]/5">
                <div className="mb-6">
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52] block mb-3">
                    01 — Material
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {materiales.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMaterial(m)}
                        className={`py-3 font-heading font-semibold text-sm tracking-wide transition-all border ${
                          material === m
                            ? "bg-[#1F1B18] text-[#F9F7F2] border-[#1F1B18]"
                            : "bg-[#F9F7F2] text-[#1F1B18] border-[#A67C52]/20 hover:border-[#A67C52]"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52] block mb-3">
                    02 — Acabado
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {acabados.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAcabado(a)}
                        className={`py-3 px-2 font-heading font-semibold text-xs tracking-wide transition-all border text-center ${
                          acabado === a
                            ? "bg-[#1F1B18] text-[#F9F7F2] border-[#1F1B18]"
                            : "bg-[#F9F7F2] text-[#1F1B18] border-[#A67C52]/20 hover:border-[#A67C52]"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52] block mb-3">
                    03 — Cantidad
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cantidades.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCantidad(c)}
                        className={`py-3 font-heading font-semibold text-xs tracking-wide transition-all border ${
                          cantidad === c
                            ? "bg-[#1F1B18] text-[#F9F7F2] border-[#1F1B18]"
                            : "bg-[#F9F7F2] text-[#1F1B18] border-[#A67C52]/20 hover:border-[#A67C52]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52] block mb-3">
                    04 — Detalle (opcional)
                  </label>
                  <textarea
                    value={detalle}
                    onChange={(e) => setDetalle(e.target.value)}
                    rows={3}
                    placeholder="Ej: Necesito tablas de 2x4 cepilladas, 3 metros de largo, para revestimiento..."
                    className="w-full bg-[#F9F7F2] border border-[#A67C52]/20 px-4 py-3 text-[#1F1B18] placeholder:text-[#3E424B]/50 focus:outline-none focus:border-[#A67C52] transition-colors resize-none"
                  />
                </div>

                <a
                  href={buildMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#A67C52] text-[#F9F7F2] py-4 font-heading font-semibold tracking-wide hover:bg-[#8B693A] transition-colors"
                >
                  <MessageCircle size={20} />
                  SOLICITAR COTIZACIÓN POR WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
