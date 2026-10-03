import React, { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Copy, Check } from "lucide-react";

const LOGO = "/assets/logo-maderas-mm.png";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "maderasmm@gmail.com";
  const phone = "+569 53488200";
  const phoneRaw = "56953488200";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contacto" className="bg-[#1F1B18] text-[#F9F7F2] relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-start">
          {/* Intro */}
          <div>
            <img
              src={LOGO}
              alt="Maderas M&M"
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border border-[#A67C52]/40 shadow-lg shadow-black/20 mb-6"
            />

            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                Contacto directo
              </span>
              <span className="h-px flex-1 max-w-16 bg-[#A67C52]/50" />
            </div>

            <h2 className="font-heading font-bold text-[38px] sm:text-5xl md:text-6xl leading-[0.96] tracking-tight">
              HABLEMOS DE
              <br />
              <span className="text-[#B88655]">TU PROYECTO</span>
            </h2>

            <p className="text-[#F9F7F2]/68 text-[16px] sm:text-lg leading-relaxed mt-5 max-w-lg">
              Cuéntanos qué necesitas y te orientamos con medidas, terminaciones y opciones de despacho.
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Email */}
            <div className="min-h-[290px] border border-[#A67C52]/28 bg-[#2A2929]/78 backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-start">
              <div className="flex items-center gap-4 mb-8">
                <Mail size={34} strokeWidth={1.7} className="text-[#B88655] shrink-0" />
                <span className="font-mono-tech text-[18px] sm:text-[20px] uppercase tracking-[0.14em] text-[#B88655]">
                  Email
                </span>
              </div>

              <a
                href={`mailto:${email}`}
                className="font-heading font-semibold text-[28px] sm:text-[30px] lg:text-[32px] leading-tight text-[#F9F7F2] hover:text-[#C99561] transition-colors break-all"
              >
                {email}
              </a>

              <button
                onClick={copyEmail}
                className="mt-8 inline-flex items-center gap-3 self-start font-mono-tech text-[16px] uppercase tracking-[0.12em] text-[#F9F7F2]/55 hover:text-[#C99561] transition-colors"
              >
                {copied ? <Check size={22} /> : <Copy size={22} />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            {/* Phone */}
            <div className="min-h-[290px] border border-[#A67C52]/28 bg-[#2A2929]/78 backdrop-blur-sm p-8 sm:p-10 flex flex-col justify-start">
              <div className="flex items-center gap-4 mb-8">
                <Phone size={34} strokeWidth={1.7} className="text-[#B88655] shrink-0" />
                <span className="font-mono-tech text-[18px] sm:text-[20px] uppercase tracking-[0.14em] text-[#B88655]">
                  Teléfono
                </span>
              </div>

              <a
                href={`tel:+${phoneRaw}`}
                className="font-heading font-semibold text-[31px] sm:text-[34px] lg:text-[36px] leading-tight text-[#F9F7F2] hover:text-[#C99561] transition-colors"
              >
                {phone}
              </a>

              <a
                href={`https://wa.me/${phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 self-start font-mono-tech text-[16px] uppercase tracking-[0.12em] text-[#F9F7F2]/55 hover:text-[#C99561] transition-colors"
              >
                <MessageCircle size={22} />
                WhatsApp
              </a>
            </div>

            {/* Service */}
            <div className="md:col-span-2 border border-[#A67C52]/28 bg-[#2A2929]/78 backdrop-blur-sm p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-7">
                <MapPin size={34} strokeWidth={1.7} className="text-[#B88655] shrink-0" />
                <span className="font-mono-tech text-[18px] sm:text-[20px] uppercase tracking-[0.14em] text-[#B88655]">
                  Zona de servicio
                </span>
              </div>

              <p className="font-heading font-semibold text-[28px] sm:text-[32px] lg:text-[34px] leading-tight text-[#F9F7F2]">
                Región de Chile · Entrega a obra
              </p>
              <p className="text-[#F9F7F2]/55 text-[18px] sm:text-[20px] leading-relaxed mt-4 max-w-4xl">
                Despacho directo desde aserradero. Consulta por cobertura en tu zona.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 pt-6 border-t border-[#A67C52]/18">
          <p className="font-heading text-[#F9F7F2]/35 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Maderas M&M · Forjamos el futuro en madera
          </p>
        </div>
      </div>
    </footer>
  );
}
