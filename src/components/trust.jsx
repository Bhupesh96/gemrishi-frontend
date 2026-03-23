import { Star } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="w-full px-4 py-4 md:py-6 flex flex-col items-center justify-center text-center">
      <h2 className="text-[#0B1D3A] text-2xl md:text-3xl font-semibold mb-4 md:mb-5">
        Reviews and Ratings
      </h2>

      <div className="w-full max-w-3xl bg-[#FFF7E8] rounded-[20px] p-5 sm:p-6 md:p-8 flex flex-col items-center gap-6 sm:gap-8 shadow-sm">
        {/* Title Pill */}
        <div className="bg-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-sm text-sm sm:text-base md:text-lg text-gray-800 flex items-center justify-center text-center border border-gray-100 w-fit">
          <span>
            Trusted by{" "}
            <strong className="font-bold mx-1 text-black">1 Lakh+</strong>{" "}
            satisfied customers
          </span>
        </div>

        {/* Reviews Section - Stacks centered on mobile, side-by-side on desktop */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-20">
          {/* Google Review */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <img
              src="/go.png"
              alt="Google Icon"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm bg-white"
            />
            <div className="text-left flex flex-col">
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 leading-none">
                4.7
                <div className="flex gap-[2px]">
                  {[1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#FABB05] fill-[#FABB05] w-4 h-4 sm:w-5 sm:h-5"
                    />
                  ))}
                  <Star
                    size={16}
                    className="text-[#FABB05]/40 fill-[#FABB05]/40 w-4 h-4 sm:w-5 sm:h-5"
                  />
                </div>
              </div>
              <p className="text-gray-600 text-[13px] sm:text-sm font-medium mt-1">
                7K+ Google Reviews
              </p>
            </div>
          </div>

          {/* Trustpilot Review */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
            {/* FIXED: w-12 h-12 ensures it is a perfect circle on mobile instead of an oval */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-sm">
              <img
                src="/trust.png"
                alt="Trustpilot Icon"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
            </div>

            <div className="text-left flex flex-col">
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-gray-900 leading-none">
                4.4
                <div className="flex items-center gap-[2px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] bg-[#00B67A] rounded-sm"
                    ></div>
                  ))}
                  <div className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] bg-[#9DEDB8] rounded-sm"></div>
                </div>
              </div>

              <p className="text-gray-600 text-[13px] sm:text-sm font-medium mt-1">
                1K+ Trustpilot Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
