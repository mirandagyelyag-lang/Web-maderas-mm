import React from "react";
import { ArrowDown } from "lucide-react";

const HERO_IMG = "/assets/inicio.png";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full flex items-end overflow-hidden bg-[#1F1B18]"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Instalaciones de Maderas M&M"
          className="h-full w-full object-cover object-[63%_center] sm:object-center brightness-[0.72] sm:brightness-[0.64] contrast-[0.98] saturate-[0.9]"
          draggable="false"
        />

        {/* Mobile: oscuridad más fuerte detrás del contenido para que la foto no compita con el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c0a]/98 via-[#0f0c0a]/84 to-[#0f0c0a]/32 sm:from-[#120f0d]/92 sm:via-[#120f0d]/48 sm:to-[#120f0d]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c0a]/92 via-[#120f0d]/50 to-[#120f0d]/18 sm:from-[#120f0d]/86 sm:via-[#120f0d]/24 sm:to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-[0.05]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 pb-14 sm:pb-20 pt-28 sm:pt-32">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="font-mono-tech text-[10px] sm:text-xs text-[#C99561] uppercase tracking-[0.22em] sm:tracking-[0.3em] whitespace-nowrap">
                Est. Chile · Maderas a medida
              </span>
              <span className="h-px flex-1 max-w-14 sm:w-16 bg-[#A67C52]/60" />
            </div>

            <h1 className="font-heading font-bold text-[#F9F7F2] drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)] text-[46px] min-[390px]:text-[52px] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.035em] sm:tracking-tight text-balance max-w-[11ch] sm:max-w-none">
              FORJAMOS EL<br />
              FUTURO EN<br />
              <span className="text-[#B98552]">MADERA</span>
            </h1>

            <p className="mt-6 sm:mt-8 text-[#F9F7F2]/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] text-[15px] min-[390px]:text-base sm:text-lg md:text-xl max-w-[36rem] leading-[1.7] sm:leading-relaxed">
              Pino Radiata con stock permanente y otras especies, como Pino Oregón y Álamo,
              trabajadas a pedido. Madera bruta y elaborada, con cepillado, dimensionado y cortes a medida.
            </p>

            <div className="mt-7 sm:mt-10 grid grid-cols-1 min-[430px]:grid-cols-2 sm:flex gap-3 sm:gap-4 max-w-xl">
              <a
                href="#cotizar"
                className="bg-[#A67C52] text-[#F9F7F2] px-5 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-sm sm:text-base tracking-wide hover:bg-[#8B693A] transition-colors text-center"
              >
                SOLICITAR COTIZACIÓN
              </a>

              <a
                href="#productos"
                className="border border-[#F9F7F2]/35 bg-[#120f0d]/18 backdrop-blur-[2px] text-[#F9F7F2] px-5 sm:px-8 py-3.5 sm:py-4 font-heading font-semibold text-sm sm:text-base tracking-wide hover:border-[#A67C52] hover:text-[#A67C52] transition-colors text-center"
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
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-[#F9F7F2]/45 hover:text-[#A67C52] transition-colors"
      >
        <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce sm:w-[18px] sm:h-[18px]" />
      </a>
    </section>
  );
}
