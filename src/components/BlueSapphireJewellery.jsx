import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SimilarCard from "../components/similarProducts";
import {
  useSimilarJewelry,
  useSimilarProducts,
} from "../hooks/usesimilarJewelry";
import { useNavigate } from "react-router-dom";

export default function BlueSapphireJewellery({ gemstone, gemstoneId }) {
  const scrollRef = useRef(null);
  // 🔵 Fetch same API as SimilarProducts (just pass gemstone type)
  const { data, loading, error } = useSimilarProducts(gemstoneId);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Loading
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Error
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  // No products
  if (!data?.products || data.products.length === 0)
    return (
      <div className="w-full bg-gray-50 py-12 text-center px-4">
        <h2 className="text-xl sm:text-2xl mb-4 font-semibold">Collection</h2>
        <p className="text-gray-600">No found at the moment.</p>
      </div>
    );

  return (
    <div className="w-full bg-gray-50 py-10 px-4 sm:px-8 relative">
      <h2 className="text-center text-[22px] sm:text-[24px] font-semibold mb-10">
        Similar Products
      </h2>

      <div className="relative flex items-center">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute left-2 sm:left-8 md:left-16 top-1/2 -translate-y-1/2 z-10 p-2 bg-green-900 text-white rounded-full shadow hover:bg-green-800 transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide px-2 sm:px-10 md:px-20 lg:px-28 w-full"
        >
          {data?.products?.map((p) => (
            <div
              key={p._id}
              className="min-w-[220px] bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
			  onClick={() => navigate(`/gemstones/${p.slug}`)}
            >
              <img
                src={p?.images?.[0]?.url}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h3 className="font-semibold mt-2">{p.name}</h3>

              <p className="text-green-700 font-medium text-sm">₹{p.price}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:flex absolute right-2 sm:right-8 md:right-16 top-1/2 -translate-y-1/2 z-10 p-2 bg-green-900 text-white rounded-full shadow hover:bg-green-800 transition"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
