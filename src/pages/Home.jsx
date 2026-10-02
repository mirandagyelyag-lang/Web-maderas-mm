import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuoteEngine from "@/components/QuoteEngine";
import Products from "@/components/Products";
import Footer from "@/components/Footer";
import WhatsAppPulse from "@/components/WhatsAppPulse";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <Navbar />
      <Hero />
      <QuoteEngine />
      <Products />
      <Footer />
      <WhatsAppPulse />
    </div>
  );
}