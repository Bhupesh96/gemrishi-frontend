import React from "react";
import { useLocation } from "react-router-dom";
import { useGemstones } from "../hooks/usegemstonebycolor";
import GemstoneCard from "../components/gemstoneCard";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const GemstoneListPage = () => {
	const query = useQuery();
	const color = query.get("color"); // from ?color=green

	const { data, loading, error } = useGemstones({
		limit: 20,
		page: 1,
		color,
	});

	////console.log("Fetched gemstones:", data?.products);

	// Take first gemstone for description and image
	const firstGemstone = data?.products?.[0];

	return (
		<div className="p-6">
			{firstGemstone && (
				<div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-8">
					<div className="flex-1 text-left">
						<h1 className="text-[35px] font-bold text-gray-900 mb-1">
							{color
								? `${color.charAt(0).toUpperCase() + color.slice(1)} Gemstones`
								: "All Gemstones"}{" "}
						</h1>
						<p className="text-gray-700 text-lg w-[70%] text-justify">
							{`${
								color.charAt(0).toUpperCase() + color.slice(1)
							} Gemstones are more than just beautiful adornments; they are
							timeless symbols of elegance, strength, and individuality. Each
							stone carries its own unique charm and energy, treasured for its
							vibrant colors, captivating brilliance, and meaningful symbolism.
							Perfect for marking special occasions or enhancing everyday style,
							gemstones celebrate personal expression, cherished moments, and
							enduring beauty. Explore our collection to find the gem that
							resonates with you, making every piece a reflection of your taste
							and story.`}
						</p>
					</div>

					<div className="flex-shrink-0">
						<img
							src={firstGemstone?.images?.[0]?.url}
							alt={firstGemstone?.name}
							className="w-60 h-auto mix-blend-multiply "
						/>
					</div>
				</div>
			)}

			{/* Gemstone Cards */}
			{loading && (
				<p className="text-center text-gray-500">Loading gemstones...</p>
			)}
			{error && <p className="text-center text-gray-500">Error</p>}

			<p className="flex justify-center text-4xl mt-20">
				{`${
					color.charAt(0).toUpperCase() + color.slice(1)
				} Gemstones Online Collection`}
			</p>

			{!loading && !error && data?.products?.length > 0 && (
				<div className="flex flex-wrap gap-6 justify-center mt-28">
					<GemstoneCard color={color || ""} products={data.products} />
				</div>
			)}

			{!loading && !error && data?.products?.length === 0 && (
				<p className="text-center text-gray-500">
					No gemstones found for {color}
				</p>
			)}
		</div>
	);
};

export default GemstoneListPage;
