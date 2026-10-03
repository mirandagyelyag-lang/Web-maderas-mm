import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

const BRUTO_IMG = "/assets/textura_de_madera_astillada_con_nudo.png";
const CEPILLADO_IMG = "/assets/pino-cepillado.png";
const CEPILLADO_COMPARADOR_IMG = "/assets/comparador-cepillado-final.webp";
const TRILLAGE_IMG = "/assets/trillage-profesional-fixed.webp";
const DIMENSIONADO_IMG = "/assets/viga.png";
const LARGOS_IMG = "/assets/viga-2.png";
const CANTO_NATURAL_IMG = "/assets/canto-natural.png";

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
    tipo: "Dimensionado",
    nombre: "Pino Dimensionado",
    descripcion: "Piezas de pino preparadas para distintos proyectos y trabajos a medida. Consulta las medidas disponibles directamente con nosotros.",
    img: DIMENSIONADO_IMG,
    specs: [
      { label: "Material", value: "Pino" },
      { label: "Formato", value: "Pieza" },
      { label: "Medidas", value: "Consultar" },
    ],
    dimensiones: ["Distintos largos", "Distintas secciones", "Cortes a medida"],
  },
  {
    tipo: "Largos",
    nombre: "Piezas Largas de Pino",
    descripcion: "Piezas largas de pino para proyectos que requieren continuidad y buena terminación. Disponibilidad según medida y pedido.",
    img: LARGOS_IMG,
    specs: [
      { label: "Material", value: "Pino" },
      { label: "Formato", value: "Largo" },
      { label: "Pedido", value: "A medida" },
    ],
    dimensiones: ["Largos especiales", "Consultar sección", "Cortes a medida"],
  },
  {
    tipo: "Rústico",
    nombre: "Pino con Canto Natural",
    descripcion: "Madera con una apariencia más natural y rústica, conservando parte de su borde original. Consulta piezas disponibles.",
    img: CANTO_NATURAL_IMG,
    specs: [
      { label: "Material", value: "Pino" },
      { label: "Acabado", value: "Natural" },
      { label: "Stock", value: "Consultar" },
    ],
    dimensiones: ["Según pieza", "Distintos largos", "Consultar disponibilidad"],
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
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-ew-resize select-none touch-none"
            onMouseMove={(e) => {
              if (e.buttons !== 1) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(0, Math.min(100, pos)));
            }}
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(0, Math.min(100, pos)));
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
              setSliderPos(Math.max(0, Math.min(100, pos)));
            }}
          >
            {/* Imagen completa de cepillado debajo */}
            <img
              src={CEPILLADO_COMPARADOR_IMG}
              alt="Textura de pino cepillado"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />

            {/* Imagen completa de bruto encima, revelada por la barra */}
            <img
              src={BRUTO_IMG}
              alt="Textura de pino bruto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              draggable="false"
            />

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
              <div className={`relative overflow-hidden ${p.tipo === "Tralix" ? "h-80 sm:h-96 bg-[#1F1B18]" : "h-72"}`}>
                <img
                  src={p.img}
                  alt={p.nombre}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                    p.tipo === "Tralix"
                      ? "object-cover object-[50%_52%]"
                      : "object-cover"
                  }`}
                />

                {/* Misma zona de contraste para TODAS las tarjetas */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/90 via-[#1F1B18]/30 to-transparent pointer-events-none" />

                <span className="absolute top-4 left-4 z-20 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#A67C52] px-3 py-1.5">
                  {p.tipo}
                </span>

                <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-5 pt-12">
                  <h3 className="font-heading font-bold text-[#F9F7F2] text-[28px] sm:text-3xl leading-[1.02] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                    {p.nombre}
                  </h3>
                </div>
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