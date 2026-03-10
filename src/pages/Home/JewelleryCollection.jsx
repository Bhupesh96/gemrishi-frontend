"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Images
import Ring from "/4.png";
import Pendants from "/3.png";
import Bracelets from "/1.png";
import Earrings from "/2.png";

function JwelleryCollection() {
  const navigate = useNavigate();

  return (
      <section className="w-full bg-[#FCFCFA] py-5 lg:py-13 font-sans overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* --- LEFT COLUMN: Editorial Typography & Actions --- */}
            <div className="w-full lg:w-5/12 space-y-8 z-10 text-center lg:text-left">
              <div>
                {/* Premium Kicker */}
                <span className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#264A3F] mb-4">
                The Heritage Collection
              </span>

                <h2 className="text-4xl md:text-6xl lg:text-[60px] font-serif text-stone-900 leading-[1.1] mb-6">
                  Unveil Your <br />
                  <span className="italic font-light text-stone-700">Inner Radiance</span>
                </h2>

                {/* Elegant thin divider */}
                <div className="w-12 h-[1px] bg-stone-300 mx-auto lg:mx-0 mb-8"></div>
              </div>

              <p className="text-stone-500 text-base lg:text-lg leading-relaxed font-light max-w-md mx-auto lg:mx-0">
                Discover an exclusive curation of natural gemstones set in
                timeless, architectural designs. From vibrant sapphires to classic
                diamonds, find the piece that resonates with your legacy.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start w-full">
                {/* Premium Primary Button */}
                <button
                    onClick={() => navigate("/jewelry")}
                    className="w-full sm:w-auto px-10 py-4 bg-[#1A362D] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-stone-900 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(26,54,45,0.4)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                >
                  Shop Collection
                </button>

                {/* Refined Secondary Link */}
                <button
                    className="flex items-center justify-center gap-3 text-stone-500 hover:text-[#1A362D] transition-colors group text-xs font-bold uppercase tracking-widest w-full sm:w-auto py-2 sm:py-0"
                    onClick={() => navigate("/suggest")}
                >
                <span className="relative overflow-hidden pb-1">
                  Get a Suggestion
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1A362D] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>

            {/* --- RIGHT COLUMN: VISUALS --- */}
            <div className="w-full lg:w-7/12 relative">

              {/* Decorative Background Elements (Shared) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-stone-200/60 rounded-full z-0 pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-stone-100 rounded-full z-0 pointer-events-none"></div>

              {/* 📱 MOBILE LAYOUT: Refined Staggered Grid */}
              <div className="grid grid-cols-2 gap-4 md:hidden mt-10 w-full relative z-10">
                <div className="flex flex-col gap-4 mt-6">
                  <MobileCard img={Ring} title="Rings" route="/jewelry/rings" height="h-[220px]" navigate={navigate} />
                  <MobileCard img={Pendants} title="Pendants" route="/jewelry/pendants" height="h-[180px]" navigate={navigate} />
                </div>
                <div className="flex flex-col gap-4">
                  <MobileCard img={Earrings} title="Earrings" route="/jewelry/earrings" height="h-[180px]" navigate={navigate} />
                  <MobileCard img={Bracelets} title="Bracelets" route="/jewelry/bracelet" height="h-[220px]" navigate={navigate} />
                </div>
              </div>

              {/* 💻 DESKTOP LAYOUT: Editorial Lookbook Collage */}
              <div className="hidden md:block relative h-[600px] lg:h-[700px] w-full z-10">

                {/* 1. Main Centerpiece (Rings) */}
                <div
                    onClick={() => navigate("/jewelry/rings")}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[460px] bg-[#FDFDFB] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] z-20 cursor-pointer group border border-stone-100 p-6 flex flex-col justify-between transition-transform duration-700 hover:-translate-y-[calc(50%+10px)]"
                >
                  <div className="w-full h-[85%] flex items-center justify-center overflow-hidden mix-blend-darken">
                    <img
                        src={Ring}
                        alt="Diamond Ring"
                        className="w-[90%] h-auto object-contain transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full text-center border-t border-stone-200 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-stone-500 group-hover:text-[#1A362D] transition-colors">
                    The Ring Edit
                  </span>
                  </div>
                </div>

                {/* 2. Top Right Floating (Earrings) */}
                <div
                    onClick={() => navigate("/jewelry/earrings")}
                    className="absolute top-4 right-8 w-[200px] h-[260px] bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] z-30 cursor-pointer group transition-all duration-700 hover:-translate-y-3 p-4 flex flex-col justify-between border border-stone-50"
                >
                  <div className="h-[80%] flex items-center justify-center overflow-hidden mix-blend-darken">
                    <img src={Earrings} alt="Earrings" className="w-[80%] object-contain transition-transform duration-1000 ease-out group-hover:scale-110" />
                  </div>

                </div>

                {/* 3. Bottom Left Floating (Bracelets) */}
                <div
                    onClick={() => navigate("/jewelry/bracelet")}
                    className="absolute bottom-8 left-8 w-[220px] h-[240px] bg-[#F9F9F8] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] z-30 cursor-pointer group transition-all duration-700 hover:-translate-y-3 p-4 flex flex-col justify-between border border-stone-100"
                >

                  <div className="h-[80%] flex items-center justify-center overflow-hidden mix-blend-darken">
                    <img src={Bracelets} alt="Bracelets" className="w-[85%] object-contain transition-transform duration-1000 ease-out group-hover:scale-110" />
                  </div>
                </div>

                {/* 4. Top Left Floating Accent (Pendants) */}
                <div
                    onClick={() => navigate("/jewelry/pendants")}
                    className="absolute top-16 left-12 w-[160px] h-[160px] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-10 cursor-pointer group transition-all duration-700 hover:-translate-y-2 rounded-full flex items-center justify-center border border-stone-100 overflow-hidden"
                >
                  <img
                      src={Pendants}
                      alt="Pendants"
                      className="w-[65%] h-[65%] object-contain mix-blend-darken opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
  );
}

// Sub-component for cleaner mobile code
const MobileCard = ({ img, title, route, height, navigate }) => (
    <div
        onClick={() => navigate(route)}
        className={`bg-[#FDFDFB] rounded-sm p-5 ${height} shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col items-center justify-between cursor-pointer group overflow-hidden`}
    >
      <div className="flex-1 flex items-center justify-center w-full mix-blend-darken">
        <img
            src={img}
            alt={title}
            className="max-h-[90%] w-auto object-contain transition-transform duration-1000 ease-out group-hover:scale-110"
        />
      </div>

    </div>
);

export default JwelleryCollection;