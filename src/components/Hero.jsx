import React from "react";
import { ArrowDown } from "lucide-react";

const HERO_IMG = "/assets/hero.svg";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#1F1B18]"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Stack de madera de pino"
          className="w-full h-full object-cover brightness-[0.58] contrast-[0.95] saturate-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/95 via-[#1a1512]/72 to-[#1f1b18]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120f0d]/80 via-[#120f0d]/18 to-[#1f1b18]/12" />
        <div className="absolute inset-0 bg-black/18" />
        <div className="absolute inset-0 grain-overlay opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-[0.3em]">
                Est. Chile · Maderas a medida
              </span>
              <span className="h-px w-16 bg-[#A67C52]/60" />
            </div>
            <h1 className="font-heading font-bold text-[#F9F7F2] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance">
              FORJAMOS EL<br />
              FUTURO EN<br />
              <span className="text-[#A67C52]">MADERA</span>
            </h1>
            <p className="mt-8 text-[#F9F7F2]/70 text-lg md:text-xl max-w-xl leading-relaxed">
              Pino Radiata con stock permanente y otras especies, como Pino Oregón y Álamo,
              trabajadas a pedido. Madera bruta y elaborada, con cepillado, dimensionado y cortes a medida.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#cotizar"
                className="bg-[#A67C52] text-[#F9F7F2] px-8 py-4 font-heading font-semibold tracking-wide hover:bg-[#8B693A] transition-colors text-center"
              >
                SOLICITAR COTIZACIÓN
              </a>
              <a
                href="#productos"
                className="border border-[#F9F7F2]/30 text-[#F9F7F2] px-8 py-4 font-heading font-semibold tracking-wide hover:border-[#A67C52] hover:text-[#A67C52] transition-colors text-center"
              >
                VER PRODUCTOS
              </a>
            </div>
          </div>

          <div className="hidden lg:flex col-span-4 flex-col items-end gap-4 pb-2">
            <div className="border-l-2 border-[#A67C52] pl-5 text-right">
              <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-widest block">
                Especies
              </span>
              <span className="font-heading text-[#F9F7F2] text-2xl font-semibold block mt-1">
                Radiata · Oregón · Álamo
              </span>
            </div>
            <div className="border-l-2 border-[#A67C52]/50 pl-5 text-right">
              <span className="font-mono-tech text-xs text-[#A67C52] uppercase tracking-widest block">
                Acabados
              </span>
              <span className="font-heading text-[#F9F7F2] text-2xl font-semibold block mt-1">
                Bruto · Cepillado
              </span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#productos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#F9F7F2]/50 hover:text-[#A67C52] transition-colors"
      >
        <span className="font-mono-tech text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
