"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Images
import Ring from "/A.png";
import Pendants from "/B.png";
import Bracelets from "/C.png";
import Earrings from "/D.png";

const Jewellery = [
  { name: "Rings", slug: "rings", image: Ring, desc: "Statement pieces" },
  {
    name: "Pendants",
    slug: "pendants",
    image: Pendants,
    desc: "Close to heart",
  },
  {
    name: "Bracelets",
    slug: "bracelet",
    image: Bracelets,
    desc: "Wrist grandeur",
  },
  {
    name: "Earrings",
    slug: "earrings",
    image: Earrings,
    desc: "Framing beauty",
  },
];

function JwelleryCollection() {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    const url = `/jewelry/${item.slug}`;
    navigate(url);
  };

  return (
    <section className="w-full bg-[#FDFCF8] py-5 lg:py-13 font-sans">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl">
        {/* --- HEADER --- */}
        <div className="text-center mb-8 lg:mb-12 space-y-2 lg:space-y-3">
          <span className="text-[#264A3F] text-[9px] lg:text-[10px] font-bold tracking-[0.25em] uppercase">
            The Fine Collection
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-gray-900 leading-tight">
            Adorn Yourself in <br />
            <span className="italic text-[#264A3F]">Exquisite Beauty</span>
          </h2>
          <div className="w-12 lg:w-16 h-[1px] bg-[#264A3F]/20 mx-auto mt-3 lg:mt-4"></div>
        </div>

        {/* --- PRODUCT GRID (2x2 on Mobile, 4x1 on Desktop) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {Jewellery.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item)}
              className="
                                group cursor-pointer flex flex-col bg-white 
                                shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out
                            "
            >
              {/* 1. IMAGE CONTAINER */}
              {/* Mobile Height: h-[220px], Desktop Height: h-[350px] */}
              <div className="relative w-full h-[220px] md:h-[350px] overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Hover Flash */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* 2. LABEL AREA */}
              <div className="py-3 lg:py-4 px-2 lg:px-3 text-center bg-white border-t border-gray-50 relative overflow-hidden">
                <div className="flex items-center justify-center gap-2 text-[#264A3F] transition-all duration-300">
                  <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] truncate">
                    {item.desc}
                  </span>
                  {/* Arrow hidden on very small screens to save space, visible on desktop hover */}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden md:block" />
                </div>

                {/* Bottom Line Animation */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#264A3F] transition-all duration-500 group-hover:w-12"></div>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM BUTTON --- */}
        <div className="mt-10 lg:mt-12 flex justify-center">
          <button
            onClick={() => navigate("/jewelry")}
            className="px-8 py-3 border border-[#264A3F] text-[#264A3F] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#264A3F] hover:text-white transition-all duration-300"
          >
            View Full Catalogue
          </button>
        </div>
      </div>
    </section>
  );
}

export default JwelleryCollection;
