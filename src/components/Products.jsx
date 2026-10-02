import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

const BRUTO_IMG = "data:image/webp;base64,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";
const CEPILLADO_IMG = "/assets/comparador-cepillado-final.webp";
const TRILLAGE_IMG = "/assets/producto-trillage.svg";

const products = [
  {
    tipo: "Bruto",
    nombre: "Pino Bruto",
    descripcion: "Madera aserrada sin procesar. Textura natural, ideal para estructuras, construcción y aplicaciones donde el acabado superficial no es crítico.",
    img: BRUTO_IMG,
    specs: [
      { label: "Humedad", value: "≥ 30%" },
      { label: "Acabado", value: "Aserrado" },
      { label: "Uso", value: "Estructural" },
    ],
    dimensiones: ["2x4\", 2x6\", 2x8\"", "4x4\", 6x6\"", "Cortes a medida"],
  },
  {
    tipo: "Cepillado",
    nombre: "Pino Cepillado",
    descripcion: "Madera cepillada en sus cuatro caras. Superficie lisa y uniforme, lista para acabados finos, mueblería y elementos visibles.",
    img: CEPILLADO_IMG,
    specs: [
      { label: "Humedad", value: "12–15%" },
      { label: "Acabado", value: "C4C" },
      { label: "Uso", value: "Decorativo" },
    ],
    dimensiones: ["1x4\", 1x6\", 1x8\"", "2x4\", 2x6\"", "Perfiles especiales"],
  },
  {
    tipo: "Tralix",
    nombre: "Rejas Trillage",
    descripcion: "Rejas tralix de pino con armazón estructural y travesaños diagonales. Ideales para cierres perimetrales, jardines y divisiones con acabado decorativo y resistente.",
    img: TRILLAGE_IMG,
    specs: [
      { label: "Material", value: "Pino Cepillado" },
      { label: "Formato", value: "Panel" },
      { label: "Uso", value: "Perimetral" },
    ],
    dimensiones: ["1.20 × 2.40 m", "1.50 × 2.40 m", "A medida"],
  },
];

export default function Products() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="productos" className="bg-[#F9F7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-[0.3em]">
                02 / Archivo de Materiales
              </span>
              <span className="h-px w-16 bg-[#A67C52]/60" />
            </div>
            <h2 className="font-heading font-bold text-[#1F1B18] text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
              DOS ACABADOS.<br />
              <span className="text-[#A67C52]">UNA SOLA MADERA.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 flex items-end">
            <p className="text-[#3E424B] text-lg leading-relaxed">
              La diferencia está en la terminación: el
              <strong className="text-[#1F1B18]"> bruto</strong> conserva la textura del aserrado,
              mientras el <strong className="text-[#1F1B18]">cepillado</strong> queda liso,
              uniforme y listo para quedar a la vista.
            </p>
          </div>
        </div>

        {/* Satin-to-Rough Toggle */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-tech text-xs uppercase tracking-widest text-[#3E424B]">
              Comparador · Cepillado vs Bruto
            </span>
            <div className="flex items-center gap-2 text-[#3E424B]">
              <MoveHorizontal size={16} />
              <span className="font-mono-tech text-xs">Arrastra</span>
            </div>
          </div>
          <div
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-ew-resize select-none touch-none bg-[#E8D8C5]"
            onMouseMove={(e) => {
              if (e.buttons !== 1) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(5, Math.min(95, pos)));
            }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(5, Math.min(95, pos)));
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(5, Math.min(95, pos)));
            }}
          >
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={BRUTO_IMG}
                alt="Textura de pino bruto"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="absolute inset-y-0 right-0 overflow-hidden"
              style={{ width: `${100 - sliderPos}%` }}
            >
              <img
                src={CEPILLADO_IMG}
                alt="Textura de pino cepillado"
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="absolute top-0 bottom-0 w-[3px] bg-[#A67C52] pointer-events-none z-20"
              style={{ left: `calc(${sliderPos}% - 1.5px)` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#A67C52] flex items-center justify-center shadow-lg">
                <MoveHorizontal size={21} className="text-[#F9F7F2]" />
              </div>
            </div>

            <span className="absolute top-4 left-4 z-30 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#1F1B18]/70 px-3 py-1.5">
              Bruto
            </span>
            <span className="absolute top-4 right-4 z-30 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#1F1B18]/70 px-3 py-1.5">
              Cepillado
            </span>
          </div>
        </div>

        {/* Bruto vs Cepillado */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-[0.22em]">
              Diferencia principal
            </span>
            <span className="h-px flex-1 max-w-20 bg-[#A67C52]/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article className="border border-[#A67C52]/20 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A67C52]">
                    Terminación natural
                  </span>
                  <h3 className="font-heading text-3xl font-bold text-[#1F1B18] mt-1">
                    Pino Bruto
                  </h3>
                </div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#3E424B]/60">
                  Aserrado
                </span>
              </div>

              <p className="text-[#3E424B] leading-relaxed mb-6">
                Conserva la huella del corte de aserradero. Su superficie es más rústica
                y se usa cuando la madera no necesita una terminación visual fina.
              </p>

              <div className="space-y-3 border-t border-[#A67C52]/15 pt-5">
                {[
                  "Textura más áspera y natural",
                  "Ideal para estructuras y obra",
                  "Puede requerir lijado si quedará visible",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A67C52]" />
                    <span className="text-sm text-[#3E424B]">{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="border border-[#A67C52]/30 bg-[#1F1B18] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#C99561]">
                    Terminación fina
                  </span>
                  <h3 className="font-heading text-3xl font-bold text-[#F9F7F2] mt-1">
                    Pino Cepillado
                  </h3>
                </div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2]/50">
                  C4C
                </span>
              </div>

              <p className="text-[#F9F7F2]/70 leading-relaxed mb-6">
                Pasa por cepillado para obtener caras lisas y parejas. Queda listo para
                proyectos donde la madera será visible o necesita mejor terminación.
              </p>

              <div className="space-y-3 border-t border-[#A67C52]/25 pt-5">
                {[
                  "Superficie lisa y uniforme",
                  "Ideal para terminaciones visibles",
                  "Más cómodo para pintar, sellar o barnizar",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C99561]" />
                    <span className="text-sm text-[#F9F7F2]/70">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-4 border border-[#A67C52]/20 bg-[#EFE7DC] px-5 py-4">
            <p className="text-sm sm:text-base text-[#3E424B] leading-relaxed">
              <strong className="text-[#1F1B18]">En simple:</strong> bruto = textura de aserradero;
              cepillado = superficie lisa y pareja.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.tipo}
              className="group relative bg-white border border-[#A67C52]/20 overflow-hidden transition-all hover:border-[#A67C52] hover:shadow-2xl hover:shadow-[#A67C52]/10"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#A67C52] px-3 py-1.5">
                  {p.tipo}
                </span>
                <h3 className="absolute bottom-4 left-5 font-heading font-bold text-[#F9F7F2] text-3xl">
                  {p.nombre}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-[#3E424B] text-base leading-relaxed mb-6">{p.descripcion}</p>

                <div className="grid grid-cols-3 gap-2 mb-6 border-y border-[#A67C52]/15 py-4">
                  {p.specs.map((s) => (
                    <div key={s.label}>
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#A67C52] block">
                        {s.label}
                      </span>
                      <span className="font-heading font-semibold text-[#1F1B18] text-sm block mt-1">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#3E424B] block mb-2">
                    Dimensiones estándar
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {p.dimensiones.map((d) => (
                      <span
                        key={d}
                        className="font-mono-tech text-xs text-[#3E424B] bg-[#F9F7F2] border border-[#A67C52]/20 px-3 py-1"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#cotizar"
                  className="block w-full text-center bg-[#1F1B18] text-[#F9F7F2] py-3.5 font-heading font-semibold text-sm tracking-wide hover:bg-[#A67C52] transition-colors"
                >
                  COTIZAR {p.nombre.toUpperCase()}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}