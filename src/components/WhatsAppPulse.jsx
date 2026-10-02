import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppPulse() {
  return (
    <a
      href="https://wa.me/56953488200?text=Hola%20Maderas%20M%26M%2C%20me%20gustar%C3%ADa%20cotizar."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#A67C52] animate-ping opacity-30" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#A67C52] text-[#F9F7F2] shadow-lg shadow-[#A67C52]/40 hover:bg-[#8B693A] transition-colors">
        <MessageCircle size={26} />
      </span>
    </a>
  );
}