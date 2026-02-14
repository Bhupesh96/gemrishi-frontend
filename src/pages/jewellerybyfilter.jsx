import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useJewelriesByGemstoneType } from "../hooks/useFilter";
import JewelleryCard from "../components/jewelleryCard";

const Jewellerybyfilter = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	const filters = useMemo(
		() => ({
			page: Number(queryParams.get("page")) || 1,
			jewelryType: queryParams.get("jewelryType") || "",
			gemstoneType: queryParams.get("gemstoneType") || "",
			metal: queryParams.get("metal") || "",
		}),
		[location.search]
	);

	const { data, loading, error } = useJewelriesByGemstoneType(filters);

	const products = data?.jeweleries || data?.items || [];

	return (
		<div className="p-6">
			<h2 className="text-xl font-bold mb-4">
				Filtered {filters.jewelryType}s
			</h2>

			{loading && (
				<p className="text-gray-500 text-center">Loading products...</p>
			)}
			{!loading && products.length === 0 && (
				<p className="text-gray-500 text-center">
					No {filters.jewelryType} found of selected selection something went
					wrong. Please try again later.
				</p>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
				{products.map((product, index) => (
					<JewelleryCard
						key={product._id || index}
						image={product.image?.url}
						title={product.name}
						sku={product.sku}
						origin={product.origin}
						price={product.price}
					/>
				))}
			</div>
		</div>
	);
};

export default Jewellerybyfilter;
