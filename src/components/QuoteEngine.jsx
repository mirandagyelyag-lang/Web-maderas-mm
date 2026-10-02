import React, { useState } from "react";
import { MessageCircle, Check } from "lucide-react";

const ABOUT_RADIATA_IMG = "/assets/about-radiata.png";
const ABOUT_OREGON_IMG = "/assets/about-oregon.png";

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
      <section className="w-full max-w-full bg-[#1F1B18] py-20 md:py-32 relative overflow-x-clip overflow-y-hidden">
        <div className="absolute inset-0 grain-overlay opacity-20" />
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          <div className="grid grid-cols-12 gap-10 lg:gap-14 items-center min-w-0">
            <div className="col-span-12 lg:col-span-6 min-w-0">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-[0.3em]">
                  01 / Nuestra Esencia
                </span>
                <span className="h-px w-16 bg-[#A67C52]/60" />
              </div>

              <h2 className="font-heading font-bold text-[#F9F7F2] text-4xl md:text-5xl leading-tight text-balance mb-6">
                HONESTIDAD<br />
                <span className="text-[#A67C52]">MATERIAL</span>
              </h2>

              <p className="text-[#F9F7F2]/70 text-lg leading-relaxed mb-8">
                En Maderas M&M celebramos el alma rústica del bosque chileno con la precisión
                de la construcción moderna. Cada pieza de pino que sale de nuestro aserradero
                lleva el sello de la calidad, el grano y el legado de la madera nacional.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-5 sm:gap-4">
                {[
                  { num: "100%", label: "Pino Chileno" },
                  { num: "C4C", label: "Cepillado 4 caras" },
                  { num: "A medida", label: "Cortes especiales" },
                ].map((stat) => (
                  <div key={stat.label} className="min-w-0 border-l-2 border-[#A67C52] pl-3">
                    <span className="font-heading font-bold text-[#A67C52] text-2xl block">
                      {stat.num}
                    </span>
                    <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-widest text-[#F9F7F2]/60 break-words">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                <article className="group min-w-0 w-full bg-[#181412] border border-[#A67C52]/30 overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={ABOUT_RADIATA_IMG}
                      alt="Pino Radiata"
                      className="w-full h-full object-cover brightness-[0.78] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/85 via-transparent to-transparent" />
                    <div className="absolute left-4 sm:left-5 bottom-4 sm:bottom-5 max-w-[calc(100%-2rem)]">
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#D1A169]">
                        Pino
                      </span>
                      <h3 className="font-heading text-[#F9F7F2] text-2xl md:text-3xl font-bold leading-none mt-1 break-words">
                        RADIATA
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 py-4 border-t border-[#A67C52]/20 min-w-0">
                    <p className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#F9F7F2]/58 leading-relaxed break-words">
                      Versátil y funcional para construcción y carpintería.
                    </p>
                  </div>
                </article>

                <article className="group min-w-0 w-full bg-[#181412] border border-[#A67C52]/30 overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={ABOUT_OREGON_IMG}
                      alt="Pino Oregón"
                      className="w-full h-full object-cover brightness-[0.78] contrast-[1.04] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181412]/85 via-transparent to-transparent" />
                    <div className="absolute left-4 sm:left-5 bottom-4 sm:bottom-5 max-w-[calc(100%-2rem)]">
                      <span className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#D1A169]">
                        Pino
                      </span>
                      <h3 className="font-heading text-[#F9F7F2] text-2xl md:text-3xl font-bold leading-none mt-1 break-words">
                        OREGÓN
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 sm:px-5 py-4 border-t border-[#A67C52]/20 min-w-0">
                    <p className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#F9F7F2]/58 leading-relaxed break-words">
                      Firme, resistente y de excelente terminación.
                    </p>
                  </div>
                </article>
              </div>
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
