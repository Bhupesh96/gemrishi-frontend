"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Pari Joshi",
        rating: 5,
        text: "It was really an amazing experience. I am thankful for the genuine and original gemstone.",
        image: "./reviewgem1.jpeg",
        location: "Mumbai, India"
    },
    {
        name: "Amit Verma",
        rating: 4.5,
        text: "Overall, I have had a good experience with the Pukhraj stone and am satisfied with the results so far.",
        image: "./reviewgem2jpeg",
        location: "Delhi, India"
    },
    {
        name: "Rohit Malhotra",
        rating: 5,
        text: "From sourcing to delivery, everything was smooth. Genuine quality gemstones and great guidance.",
        image: "./reviewgem3.jpeg",
        location: "Bangalore, India"
    },
    {
        name: "Sneha Kulkarni",
        rating: 4.5,
        text: "Had rings made for panna and zircon. Using now and everything is good. Thanks to the team.",
        image: "./reviewgem4.jpeg",
        location: "Pune, India"
    },
];

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#E8C46F] text-[#E8C46F]" />
            ))}
            {halfStar && (
                <Star size={12} className="fill-[#E8C46F] text-[#E8C46F] opacity-60" />
            )}
        </div>
    );
};

export default function GemstoneReviews() {
    return (
        <section className="w-full bg-[#FDFCF8] py-5 lg:py-13 overflow-hidden font-sans border-t border-[#E8C46F]/20">
            
            {/* --- HEADER --- */}
            <div className="container mx-auto px-6 mb-12 lg:mb-16 text-center">
                
                {/* UPDATED: Added Gold Lines to match YouTube Section */}
                <span className="text-[#E8C46F] text-[10px] font-bold tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-3">
                    <span className="w-8 h-[1px] bg-[#E8C46F]"></span>
                    Client Stories
                    <span className="w-8 h-[1px] bg-[#E8C46F]"></span>
                </span>

                <h2 className="text-3xl md:text-5xl font-serif text-[#264A3F] leading-tight mb-4">
                    Voices of <span className="italic text-gray-400">Trust</span>
                </h2>
                
                {/* Removed bottom line divider since we have lines on top now, keeps it cleaner */}
                {/* <div className="w-12 h-[1px] bg-[#264A3F]/20 mx-auto"></div> */}
            </div>

            {/* --- SCROLLING GALLERY --- */}
            <div className="relative w-full">
                
                {/* Gradient Masks (Hidden on mobile) */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FDFCF8] to-transparent z-10 pointer-events-none"></div>
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FDFCF8] to-transparent z-10 pointer-events-none"></div>

                {/* SCROLL CONTAINER */}
                <div className="
                    flex gap-4 lg:gap-8 px-6 lg:px-0
                    overflow-x-auto lg:overflow-visible
                    snap-x snap-mandatory 
                    lg:animate-infinite-scroll 
                    no-scrollbar
                ">
                    {/* Render Reviews (Duplicated for Desktop Loop) */}
                    {[...reviews, ...reviews, ...reviews].map((review, index) => (
                        <div
                            key={index}
                            className="
                                min-w-[280px] sm:min-w-[320px] lg:min-w-[350px]
                                snap-center
                                bg-white p-6 lg:p-8 rounded-sm 
                                shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] 
                                border border-gray-100
                                hover:border-[#E8C46F]/30 hover:shadow-[0_15px_30px_-10px_rgba(38,74,63,0.1)]
                                transition-all duration-500 group
                            "
                        >
                            {/* Quote Icon */}
                            <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-[#E8C46F]/20 mb-4 lg:mb-6 group-hover:text-[#E8C46F] transition-colors duration-500" />

                            {/* Review Text */}
                            <p className="text-gray-600 font-serif text-base lg:text-lg italic leading-relaxed mb-6 lg:mb-8 min-h-[60px] lg:min-h-[80px]">
                                "{review.text}"
                            </p>

                            {/* User Profile */}
                            <div className="flex items-center gap-4 pt-4 lg:pt-6 border-t border-gray-50">
                                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border border-gray-100 group-hover:border-[#E8C46F] transition-colors flex-shrink-0">
                                    <img 
                                        src={review.image} 
                                        alt={review.name} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target.src = "/placeholder-avatar.png")} 
                                    />
                                </div>
                                
                                <div>
                                    <h4 className="text-[#264A3F] text-xs lg:text-sm font-bold uppercase tracking-wide">
                                        {review.name}
                                    </h4>
                                    <div className="flex items-center gap-2 lg:gap-3 mt-1">
                                        <StarRating rating={review.rating} />
                                        <span className="text-[9px] lg:text-[10px] text-gray-400 font-medium">
                                            {review.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS for Desktop Animation & Scrollbar Hiding */}
            <style>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                
                @media (min-width: 1024px) {
                    .lg\\:animate-infinite-scroll {
                        animation: infinite-scroll 60s linear infinite;
                    }
                    .lg\\:animate-infinite-scroll:hover {
                        animation-play-state: paused;
                    }
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

        </section>
    );
}