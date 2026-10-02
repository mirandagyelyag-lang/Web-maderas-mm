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

          {/* Contact panel */}
          <div className="border border-[#A67C52]/22 bg-[#29241F]/70 backdrop-blur-sm">
            <div className="divide-y divide-[#A67C52]/18">
              {/* Email */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail size={18} className="text-[#B88655] shrink-0" />
                  <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                    Email
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="font-heading font-semibold text-[19px] sm:text-xl text-[#F9F7F2] hover:text-[#C99561] transition-colors break-all"
                  >
                    {email}
                  </a>

                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 self-start sm:self-auto font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#F9F7F2]/45 hover:text-[#C99561] transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={18} className="text-[#B88655] shrink-0" />
                  <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                    Teléfono
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <a
                    href={`tel:+${phoneRaw}`}
                    className="font-heading font-semibold text-[24px] sm:text-2xl text-[#F9F7F2] hover:text-[#C99561] transition-colors"
                  >
                    {phone}
                  </a>

                  <a
                    href={`https://wa.me/${phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 self-start sm:self-auto font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#F9F7F2]/45 hover:text-[#C99561] transition-colors"
                  >
                    <MessageCircle size={14} />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Service */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-[#B88655] shrink-0" />
                  <span className="font-mono-tech text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#A67C52]">
                    Despacho
                  </span>
                </div>

                <p className="font-heading font-semibold text-lg text-[#F9F7F2]">
                  Entrega directa a obra
                </p>
                <p className="text-[#F9F7F2]/52 text-sm leading-relaxed mt-1 max-w-xl">
                  Consulta disponibilidad y cobertura según tu ubicación y volumen de compra.
                </p>
              </div>
            </div>

            {/* Main CTA */}
            <div className="p-5 sm:p-6 border-t border-[#A67C52]/18 bg-[#211C18]">
              <a
                href={`https://wa.me/${phoneRaw}?text=Hola%20Maderas%20M%26M%2C%20me%20gustar%C3%ADa%20cotizar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 bg-[#B88655] text-[#F9F7F2] px-5 py-4 font-heading font-semibold text-sm sm:text-base tracking-[0.04em] hover:bg-[#9C7048] transition-colors"
              >
                <MessageCircle size={18} />
                COTIZAR POR WHATSAPP
              </a>
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
