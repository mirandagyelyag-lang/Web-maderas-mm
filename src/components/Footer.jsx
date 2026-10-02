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
      <div className="absolute inset-0 grain-overlay opacity-10" />
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <img src={LOGO} alt="Maderas M&M" className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover border-2 border-[#A67C52]/50 shadow-xl shadow-black/25 mb-6" />
            <h2 className="font-heading font-bold text-4xl md:text-5xl leading-tight text-balance">
              HABLEMOS DE<br />
              <span className="text-[#A67C52]">TU PROYECTO</span>
            </h2>
            <p className="text-[#F9F7F2]/60 text-lg mt-4 max-w-md">
              Estamos listos para asesorarte. Escríbenos y recibe tu cotización a la brevedad.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Email */}
            <div className="bg-[#3E424B]/30 border border-[#A67C52]/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail size={20} className="text-[#A67C52]" />
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52]">Email</span>
              </div>
              <a href={`mailto:${email}`} className="font-heading font-semibold text-lg text-[#F9F7F2] hover:text-[#A67C52] transition-colors block break-all">
                {email}
              </a>
              <button
                onClick={copyEmail}
                className="mt-3 flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2]/50 hover:text-[#A67C52] transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>

            {/* Phone */}
            <div className="bg-[#3E424B]/30 border border-[#A67C52]/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <Phone size={20} className="text-[#A67C52]" />
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52]">Teléfono</span>
              </div>
              <a href={`tel:+${phoneRaw}`} className="font-heading font-semibold text-lg text-[#F9F7F2] hover:text-[#A67C52] transition-colors block">
                {phone}
              </a>
              <a
                href={`https://wa.me/${phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[#F9F7F2]/50 hover:text-[#A67C52] transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>

            {/* Location */}
            <div className="sm:col-span-2 bg-[#3E424B]/30 border border-[#A67C52]/20 p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-[#A67C52]" />
                <span className="font-mono-tech text-xs uppercase tracking-widest text-[#A67C52]">Zona de Servicio</span>
              </div>
              <p className="font-heading font-semibold text-lg text-[#F9F7F2]">
                Región de Chile · Entrega a obra
              </p>
              <p className="text-[#F9F7F2]/50 text-sm mt-1">
                Despacho directo desde aserradero. Consulta por cobertura en tu zona.
              </p>
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="border-t border-[#A67C52]/20 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-heading text-[#F9F7F2]/40 text-sm">
            © {new Date().getFullYear()} Maderas M&M · Forjamos el futuro en madera
          </p>
          <a
            href={`https://wa.me/${phoneRaw}?text=Hola%20Maderas%20M%26M%2C%20me%20gustar%C3%ADa%20cotizar.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#A67C52] text-[#F9F7F2] px-8 py-3.5 font-heading font-semibold tracking-wide hover:bg-[#8B693A] transition-colors"
          >
            <MessageCircle size={18} />
            ESCRÍBENOS AHORA
          </a>
        </div>
      </div>
    </footer>
  );
}