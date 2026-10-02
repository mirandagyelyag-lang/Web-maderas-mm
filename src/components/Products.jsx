import React, { useState } from "react";
import { MoveHorizontal } from "lucide-react";

const BRUTO_IMG = "/assets/producto-bruto.svg";
const CEPILLADO_IMG = "/assets/producto-cepillado.svg";
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
              Trabajamos madera de pino radiata chilena en dos presentaciones:
              <strong className="text-[#1F1B18]"> bruto</strong> para estructura y
              <strong className="text-[#1F1B18]"> cepillado</strong> para acabado fino.
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
            className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-ew-resize select-none"
            onMouseMove={(e) => {
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
            <img src={CEPILLADO_IMG} alt="Pino Cepillado" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
              <img
                src={BRUTO_IMG}
                alt="Pino Bruto"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }}
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#A67C52] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#A67C52] flex items-center justify-center">
                <MoveHorizontal size={20} className="text-[#F9F7F2]" />
              </div>
            </div>
            <span className="absolute top-4 left-4 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#1F1B18]/60 px-3 py-1">
              Bruto
            </span>
            <span className="absolute top-4 right-4 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2] bg-[#1F1B18]/60 px-3 py-1">
              Cepillado
            </span>
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