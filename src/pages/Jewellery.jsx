import React, { useState, useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";
import JewelleryFilter from "../components/filters/jewelleryFilter";
import ByMetalFilter from "../components/filters/ByMetal";
// import Filter from "../components/filters/Filter";
// import ProductCards from "../components/ProductCard";
import JewelleryGrid from "../components/jewelleryGrid";
import { useGemstoneCategories } from "../hooks/usegemstone";

const Jewellery = () => {
	const navigate = useNavigate();

	const [jewelryType, setJewelryType] = useState(null);
	const [metal, setMetal] = useState(null);
	const [gemstoneType, setGemstoneType] = useState(null);

	const { data: gemstones, loading, error } = useGemstoneCategories();
	////console.log("gemstones", gemstones);

	const handleJewelryTypeChange = (type) => setJewelryType(type);
	const handleMetalChange = (metal) => setMetal(metal);
	const handleGemstoneChange = (_id) => setGemstoneType(String(_id));

	const handleApplyFilters = () => {
		if (!jewelryType || !gemstoneType) {
			alert("Please select jewellery type and gemstone");
			return;
		}

		// gemstoneType now contains the ID, not the name
		const queryParams = new URLSearchParams({
			jewelryType,
			gemstoneType, // this is the gemstone ID
			...(metal && { metal }),
			page: 1,
		});

		navigate(`/jewellery-results?${queryParams.toString()}`, { replace: true });
	};

	useEffect(() => {
		const queryParams = new URLSearchParams();

		if (jewelryType) queryParams.set("jewelryType", jewelryType);
		if (gemstoneType) queryParams.set("gemstoneType", gemstoneType);
		if (metal) queryParams.set("metal", metal);

		// only set page if something else is selected
		if (jewelryType || gemstoneType || metal) {
			queryParams.set("page", 1);
		}

		navigate(`/jewellery?${queryParams.toString()}`, { replace: true });
	}, [jewelryType, metal, gemstoneType, navigate]);

	return (
		<div className="">
			{/* Breadcrumb */}
			<div className="text-gray-900 mt-2 text-sm flex items-center space-x-2 p-4 px-6 sm:px-10 md:px-20 lg:px-32">
				<span
					className="cursor-pointer hover:text-[#264A3F] transition-colors text-[16px] sm:text-[18px]"
					onClick={() => navigate("/")}>
					Home
				</span>
				<span>&gt;</span>
				<span
					className="cursor-pointer hover:text-[#264A3F] transition-colors text-[16px] sm:text-[18px]"
					onClick={() => navigate("/ring")}>
					Gemstone
				</span>
			</div>

			{/* Intro Section */}
			<div className=" px-6 sm:px-10 md:px-20 lg:px-32 mt-4 ">
				<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
					<div>
						<h1 className="text-[28px] sm:text-[32px] lg:text-[35px] font-bold text-gray-900 mb-2">
							Jewellery
						</h1>
						<p className="text-gray-700 text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed">
							Gemstones are far more than mere adornments — they are enduring
							symbols of elegance, sophistication, and personal expression. Each
							gem tells a story, carrying centuries of history, culture, and
							meaning within its radiant facets. Treasured by those who value
							beauty and significance, gemstones reflect the uniqueness of the
							wearer, capturing moments of love, achievement, and celebration.
							Their brilliance and vibrant colors illuminate every occasion,
							from quiet, intimate gatherings to grand celebrations, leaving an
							indelible impression that transcends time. With a gemstone, you
							don't just wear a piece of jewelry — you wear a symbol of your
							identity, your passions, and your unforgettable moments, making
							every gesture of giving or receiving truly extraordinary.
						</p>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-10 md:gap-24 mb-10 mt-24">
					<JewelleryFilter onChange={handleJewelryTypeChange} />
					<ByMetalFilter onChange={handleMetalChange} />
				</div>

				{/* Gemstone Grid */}
				<div className="mt-28 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
					{loading && <p>Loading gemstones...</p>}
					{error && <p className="text-gray-500">Failed to load gemstones.</p>}
					{!loading &&
						!error &&
						gemstones?.map((stone, index) => {
							const stoneId = stone._id || index;
							return (
								<div
									key={stoneId}
									onClick={() => handleGemstoneChange(stone._id)}
									className={`flex flex-col items-center p-4 sm:p-6 hover:scale-105 transition-transform duration-300 cursor-pointer ${
										gemstoneType === String(stone._id)
											? "border-2 border-[#264A3F] rounded-lg"
											: "border border-transparent"
									}`}>
									<img
										src={stone.image}
										alt={stone.name}
										className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-2"
									/>
									<p className="font-medium text-gray-800 text-sm sm:text-base">
										{stone.name}
										{stone.alternateName && (
											<span className="text-gray-500">
												{" "}
												({stone.alternateName})
											</span>
										)}
									</p>
								</div>
							);
						})}
				</div>

				<div className="flex flex-col items-center justify-center mb-12 mt-8">
					{/* <p className="mt-4 mb-10 cursor-pointer">
						<span
							className="relative inline-block 
      						after:content-[''] after:absolute after:bottom-0 after:left-0
      						after:w-0 after:h-[1px] after:bg-black
      						hover:after:w-full after:transition-all after:duration-500 after:ease-in-out text-xl">
							See All
						</span>
					</p> */}

					<button
						onClick={handleApplyFilters}
						className="w-52 text-xl bg-red-500 p-2 rounded-sm text-white cursor-pointer hover:scale-105 transition-all">
						Find Jewellery
					</button>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center  ">
				<p className="text-4xl mt-2">Best Sellers</p>
			</div>

			<JewelleryGrid />
		</div>
	);
};

export default Jewellery;
