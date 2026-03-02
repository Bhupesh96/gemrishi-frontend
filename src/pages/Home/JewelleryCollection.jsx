"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Images (Ensure these paths are correct in your project)
import Ring from "/A-removebg-preview.png";
import Pendants from "/B-removebg-preview.png";
import Bracelets from "/C-removebg-preview.png";
import Earrings from "/D-removebg-preview.png";

function JwelleryCollection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#F5F9FA] py-5 lg:py-13 font-sans overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* --- LEFT COLUMN: Typography & Actions --- */}
          <div className="w-full lg:w-5/12 space-y-6 lg:space-y-8 z-10 text-center lg:text-left">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.15] mb-3 lg:mb-4">
                Unveil Your <br />
                <span className="italic">Inner Radiance</span>
              </h2>
              <div className="w-16 lg:w-20 h-1 bg-[#264A3F] mb-4 lg:mb-6 mx-auto lg:mx-0"></div>
            </div>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-light max-w-md mx-auto lg:mx-0">
              Discover our exclusive collection of natural gemstones set in
              timeless designs. From vibrant sapphires to classic diamonds, find
              the perfect piece that speaks to you.
            </p>

            {/* ✅ FIXED: Added items-center to stop stretching, and set specific widths for mobile */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pt-2 justify-center lg:justify-start w-full">
              <button
                onClick={() => navigate("/jewelry")}
                className="w-[85%] sm:w-auto px-8 py-3.5 border border-gray-900 text-gray-900 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Shop Collection
              </button>

              <button
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-[#264A3F] transition-colors group text-sm font-medium w-[85%] sm:w-auto py-2 sm:py-0"
                onClick={() => navigate("/suggest")}
              >
                <span className="underline underline-offset-4 decoration-gray-300 group-hover:decoration-[#264A3F]">
                  Get a Suggestion
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* --- RIGHT COLUMN: VISUALS --- */}
          <div className="w-full lg:w-7/12">
            {/* 📱 MOBILE LAYOUT: Premium Staggered Grid (Visible only on Mobile) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden mt-6 w-full">
              {/* Left Column */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Rings - Tall Card */}
                <div
                  onClick={() => navigate("/jewelry/rings")}
                  className="bg-white rounded-2xl p-4 h-[200px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-between cursor-pointer group"
                >
                  <img
                    src={Ring}
                    alt="Rings"
                    className="h-[75%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#264A3F]">
                    Rings
                  </span>
                </div>
                {/* Pendants - Short Card */}
                <div
                  onClick={() => navigate("/jewelry/pendants")}
                  className="bg-white rounded-2xl p-4 h-[150px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-between cursor-pointer group"
                >
                  <img
                    src={Pendants}
                    alt="Pendants"
                    className="h-[65%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#264A3F]">
                    Pendants
                  </span>
                </div>
              </div>

              {/* Right Column (Pushed down slightly for the masonry effect) */}
              <div className="flex flex-col gap-3 sm:gap-4 pt-8">
                {/* Earrings - Short Card */}
                <div
                  onClick={() => navigate("/jewelry/earrings")}
                  className="bg-white rounded-2xl p-4 h-[150px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-between cursor-pointer group"
                >
                  <img
                    src={Earrings}
                    alt="Earrings"
                    className="h-[65%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#264A3F]">
                    Earrings
                  </span>
                </div>
                {/* Bracelets - Tall Card */}
                <div
                  onClick={() => navigate("/jewelry/bracelet")}
                  className="bg-white rounded-2xl p-4 h-[200px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center justify-between cursor-pointer group"
                >
                  <img
                    src={Bracelets}
                    alt="Bracelets"
                    className="h-[75%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#264A3F]">
                    Bracelets
                  </span>
                </div>
              </div>
            </div>

            {/* 💻 DESKTOP LAYOUT: Floating Collage (Visible only on md and larger screens) */}
            <div className="hidden md:block relative h-[500px] lg:h-[600px]">
              {/* 1. Main Background Visual (Hero - Centered) */}
              <div
                onClick={() => navigate("/jewelry/rings")}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[380px] lg:w-[350px] lg:h-[420px] bg-white shadow-2xl z-20 cursor-pointer group overflow-hidden border border-white"
              >
                <div className="w-full h-full bg-gray-50 relative">
                  <img
                    src={Ring}
                    alt="Diamond Ring"
                    className="w-full h-full object-cover p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#264A3F]">
                      Rings
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Top Right Floating Card (Earrings) */}
              <div
                onClick={() => navigate("/jewelry/earrings")}
                className="absolute top-8 lg:top-0 right-12 lg:right-0 w-[160px] h-[200px] lg:w-[200px] lg:h-[240px] bg-white shadow-xl z-30 cursor-pointer group hover:-translate-y-2 transition-transform duration-500 border border-white"
              >
                <img
                  src={Earrings}
                  alt="Earrings"
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#264A3F] transition-colors">
                    Earrings
                  </span>
                </div>
              </div>

              {/* 3. Bottom Left Floating Card (Bracelets) */}
              <div
                onClick={() => navigate("/jewelry/bracelet")}
                className="absolute bottom-8 lg:bottom-0 left-12 lg:left-0 w-[160px] h-[190px] lg:w-[190px] lg:h-[230px] bg-white shadow-xl z-30 cursor-pointer group hover:-translate-y-2 transition-transform duration-500 border border-white"
              >
                <img
                  src={Bracelets}
                  alt="Bracelets"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#264A3F] transition-colors">
                    Bracelets
                  </span>
                </div>
              </div>

              {/* 4. Top Left Background Element (Pendants) */}
              <div
                onClick={() => navigate("/jewelry/pendants")}
                className="absolute top-12 left-12 lg:top-8 lg:-left-8 w-[140px] h-[140px] lg:w-[180px] lg:h-[180px] bg-white/80 backdrop-blur-sm shadow-lg z-10 cursor-pointer group hover:bg-white transition-colors duration-300 rounded-full flex items-center justify-center border border-gray-100"
              >
                <img
                  src={Pendants}
                  alt="Pendants"
                  className="w-3/4 h-3/4 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Decorative Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#264A3F]/10 rounded-full z-0 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-[#264A3F]/5 rounded-full z-0 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JwelleryCollection;
