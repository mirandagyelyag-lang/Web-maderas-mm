import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO = "/assets/logo-maderas-mm.png";

const navLinks = [
{ label: "Inicio", href: "#inicio" },
{ label: "Productos", href: "#productos" },
{ label: "Cotizar", href: "#cotizar" },
{ label: "Contacto", href: "#contacto" }];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      "bg-[#1F1B18]/95 backdrop-blur-md py-3 shadow-lg shadow-black/20" :
      "bg-transparent py-5"}`
      }>
      
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src={LOGO}
            alt="Maderas MYM"
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border border-[#A67C52]/40 shadow-lg shadow-black/20 transition-transform group-hover:scale-105" />
          
          <div className="hidden sm:block">
            <span className="block font-heading font-bold text-[#F9F7F2] text-lg leading-none tracking-wide">
              MADERAS MYM
            </span>
            <span className="block font-mono-tech text-[10px] uppercase tracking-[0.2em] mt-1 text-[hsl(var(--primary))]">ASERRADERO CHILENO

            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="font-heading text-sm font-medium text-[#F9F7F2]/80 hover:text-[#A67C52] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[2px] after:bg-[#A67C52] hover:after:w-full after:transition-all">
            
              {link.label}
            </a>
          )}
          <a
            href="https://wa.me/56953488200?text=Hola%20Maderas%20M%26M%2C%20me%20gustar%C3%ADa%20cotizar."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A67C52] text-[#F9F7F2] px-5 py-2.5 font-heading text-sm font-semibold tracking-wide hover:bg-[#8B693A] transition-colors">
            
            COTIZAR AHORA
          </a>
        </div>

        <button
          className="md:hidden text-[#F9F7F2]"
          onClick={() => setOpen(!open)}
          aria-label="Menú">
          
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open &&
      <div className="md:hidden bg-[#1F1B18] border-t border-[#A67C52]/20">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-heading text-base font-medium text-[#F9F7F2]/90 hover:text-[#A67C52] transition-colors">
            
                {link.label}
              </a>
          )}
            <a
            href="https://wa.me/56953488200"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#A67C52] text-[#F9F7F2] px-5 py-3 font-heading text-sm font-semibold text-center">
            
              COTIZAR AHORA
            </a>
          </div>
        </div>
      }
    </header>);

}