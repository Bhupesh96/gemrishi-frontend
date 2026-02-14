"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Keeps your exact imports
import ContainerImg from "../../../public/gemRishioldshop.jpeg";
import FrameImg from "../../../public/gemrishi histroy.jpeg";
import CompassImg from "../../../src/assets/legacyphotos/kk.jpg";

const Legacy = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-5 lg:py-13 bg-[#FDFCF8] overflow-hidden font-sans">
      {/* --- BACKGROUND WATERMARK --- */}
      <div className="absolute top-20 left-0 w-full flex justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[150px] lg:text-[250px] font-serif font-bold text-[#264A3F]">
          1904
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        {/* --- LEFT: IMAGE COMPOSITION (All 3 Images) --- */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
          {/* 1. Compass Image (Top Left Floater) */}
          <div className="absolute top-0 left-0 z-20 w-[35%] rounded-sm shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              src={CompassImg}
              alt="Heritage Detail"
              className="w-full h-auto object-cover sepia-[0.2]"
            />
          </div>

          {/* 2. Main Large Image (Container/Shop) */}
          <div className="relative z-10 w-[75%] rounded-sm shadow-2xl border-4 border-white overflow-hidden group">
            <img
              src={ContainerImg}
              alt="GemRishi Old Shop"
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
            />
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-[10px] uppercase tracking-widest font-medium">
                Established 1904
              </span>
            </div>
          </div>

          {/* 3. Frame Image (Bottom Right Floater) */}
          <div className="absolute bottom-0 right-4 z-20 w-[40%] rounded-sm shadow-xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              src={FrameImg}
              alt="Gemstone History"
              className="w-full h-auto object-cover sepia-[0.2]"
            />
          </div>

          {/* Decorative Blob Behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#264A3F]/5 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* --- RIGHT: CONTENT (Your Exact Text) --- */}
        <div className="flex flex-col space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-[#264A3F]/10 text-[#264A3F] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
              Our History & Heritage
            </span>

            <h2 className="text-3xl lg:text-5xl font-serif text-gray-900 leading-[1.2]">
              Over a Century and Five Generations of Experience
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 font-light text-base lg:text-lg leading-relaxed lg:border-l-2 lg:border-[#264A3F]/20 lg:pl-6">
            <p>
              GemRishi, with over 120 years of legacy, stands for authenticity,
              craftsmanship, and trust. Rooted in a deep reverence for natural
              gemstones, our journey reflects a commitment to purity and
              astrological integrity.
            </p>
            <p>
              Since 1904, our fifth-generation experts and artisans have carried
              forward timeless traditions — carefully sourcing, evaluating, and
              hand-selecting gemstones that hold both natural beauty and
              spiritual significance.
            </p>
          </div>

          {/* Link Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate("/aboutUs")}
              className="group inline-flex items-center gap-2 text-[#264A3F] font-bold text-xs uppercase tracking-[0.15em] border-b border-[#264A3F]/30 pb-1 hover:border-[#264A3F] transition-all duration-300"
            >
              Read more about our rich history
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legacy;
