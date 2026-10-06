import React from "react";
import { ArrowDown } from "lucide-react";

const HERO_IMG = "/assets/inicio-optimizado.webp";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[82svh] sm:min-h-[100svh] w-full flex items-center sm:items-end overflow-hidden bg-[#1F1B18]"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Instalaciones de Maderas MYM"
          className="h-full w-full object-cover object-[63%_center] sm:object-center brightness-[0.46] sm:brightness-[0.64] contrast-[1.02] saturate-[0.82]"
          draggable="false"
        />

        {/* Mobile: oscuridad más fuerte detrás del contenido para que la foto no compita con el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c0a]/96 via-[#0f0c0a]/86 to-[#0f0c0a]/42 sm:from-[#120f0d]/92 sm:via-[#120f0d]/48 sm:to-[#120f0d]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c0a]/92 via-[#120f0d]/54 to-[#120f0d]/22 sm:from-[#120f0d]/86 sm:via-[#120f0d]/24 sm:to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-[0.05]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 pt-20 pb-10 sm:pb-20 sm:pt-32">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6">
              <span className="font-mono-tech text-[10px] sm:text-xs text-[#C99561] uppercase tracking-[0.22em] sm:tracking-[0.3em] whitespace-nowrap">
                Est. Chile · Maderas a medida
              </span>
              <span className="h-px flex-1 max-w-14 sm:w-16 bg-[#A67C52]/60" />
            </div>

            <h1 className="font-heading font-bold text-[#F9F7F2] drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)] text-[39px] min-[390px]:text-[43px] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.94] tracking-[-0.03em] sm:tracking-tight text-balance max-w-[10.8ch] sm:max-w-none">
              FORJAMOS EL<br />
              FUTURO EN<br />
              <span className="text-[#B98552]">MADERA</span>
            </h1>

            <p className="mt-4 sm:mt-8 text-[#F9F7F2]/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] text-[14px] min-[390px]:text-[15px] sm:text-lg md:text-xl max-w-[34rem] leading-[1.55] sm:leading-relaxed">
              <span className="sm:hidden">Pino Radiata con stock permanente. Madera bruta y elaborada, con medidas y terminaciones a pedido.</span>
              <span className="hidden sm:inline">Pino Radiata con stock permanente y otras especies, como Pino Oregón y Álamo, trabajadas a pedido. Madera bruta y elaborada, con cepillado, dimensionado y cortes a medida.</span>
            </p>

            <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:flex gap-2.5 sm:gap-4 max-w-xl">
              <a
                href="#cotizar"
                className="bg-[#A67C52] text-[#F9F7F2] px-3 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-[11px] min-[390px]:text-xs sm:text-base tracking-wide hover:bg-[#8B693A] transition-colors text-center"
              >
                SOLICITAR COTIZACIÓN
              </a>

              <a
                href="#nuestros-productos"
                className="border border-[#F9F7F2]/35 bg-[#120f0d]/18 backdrop-blur-[2px] text-[#F9F7F2] px-3 sm:px-8 py-3 sm:py-4 font-heading font-semibold text-[11px] min-[390px]:text-xs sm:text-base tracking-wide hover:border-[#A67C52] hover:text-[#A67C52] transition-colors text-center"
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
        className="hidden sm:flex absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-[#F9F7F2]/45 hover:text-[#A67C52] transition-colors"
      >
        <span className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-widest">Scroll</span>
        <ArrowDown size={16} className="animate-bounce sm:w-[18px] sm:h-[18px]" />
      </a>
    </section>
  );
}
