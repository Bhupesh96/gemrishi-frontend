import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import Gemvideo from "../assets/gem.mp4";
import ProductCards from "../components/ProductCard";
import TestimonialReview from "../components/Testimonals";
import { useJewelry } from "../hooks/useJewelry";

const ProductPage = () => {
	const navigate = useNavigate();
	const { slug } = useParams();

	// Fetch jewelry subcategory + products by slug
	const { data, loading, error } = useJewelry(slug, 1);

	const subcategory = data?.subcategory;
	const products = data?.jewelleries || [];

	// 🔹 Skeleton loader for hero section
	const HeroSkeleton = () => (
		<div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20 mb-16 animate-pulse">
			<div className="flex-1">
				<div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
				<div className="h-4 w-72 bg-gray-200 rounded"></div>
			</div>
			<div className="w-40 h-40 bg-gray-200 rounded-lg"></div>
		</div>
	);

	// 🔹 Skeleton loader for product cards
	const ProductSkeleton = () => (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="flex flex-col">
					<div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
					<div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
					<div className="h-4 w-20 bg-gray-200 rounded"></div>
				</div>
			))}
		</div>
	);

	return (
		<div>
			{/* Breadcrumb */}
			<div className="text-gray-900 text-sm px-4 sm:px-6 md:px-12 flex items-center space-x-2 py-4">
				<span
					className="cursor-pointer hover:text-[#264A3F] transition-colors text-[16px]"
					onClick={() => navigate("/")}>
					Home
				</span>
				<span>&gt;</span>
				<span className="text-[16px] text-[#264A3F] capitalize">{slug}</span>
			</div>

			{/* Hero Section */}
			<div className="mt-2 w-full px-4 sm:px-6 lg:px-12">
				{loading ? (
					<HeroSkeleton />
				) : subcategory ? (
					<div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20 mb-16">
						<div className="flex-1">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
								{subcategory.name}
							</h1>
							<p className="text-gray-700 text-base sm:text-lg md:text-xl">
								{subcategory.description || "No description available."}
							</p>
						</div>
						<div>
							<img
								src={subcategory.image?.url}
								alt={subcategory.name}
								className="w-32 sm:w-40 md:w-48 h-auto object-contain mix-blend-multiply rounded-lg"
							/>
						</div>
					</div>
				) : (
					<p className="text-gray-500 text-lg">
						No data found for this category.
					</p>
				)}
			</div>

			{/* Tabs Section */}
			{subcategory && <Tabs categoryData={subcategory} />}

			{/* Product Listing */}
			<div className="bg-white px-4 sm:px-6 md:px-12 mt-8 mb-8">
				{loading ? (
					<ProductSkeleton />
				) : error ? (
					<div className="flex py-12 justify-center">
						<div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 rounded-2xl shadow-md max-w-md w-full text-center p-8">
							<h3 className="text-lg font-semibold text-red-500 mb-2">
								Oops! Something went wrong.
							</h3>
							<p className="text-gray-600 text-sm">{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition">
								Retry
							</button>
						</div>
					</div>
				) : !products.length ? (
					<div className="flex py-16 justify-center">
						<div className="max-w-sm w-full sm:w-80 p-8 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-12 h-12 mx-auto text-gray-400 mb-4"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<h2 className="text-lg font-semibold text-gray-700">
								No Products Found
							</h2>
							<p className="text-gray-500 text-sm mt-1">
								We couldn’t find any items in this category.
							</p>
						</div>
					</div>
				) : (
					<ProductCards category={subcategory?.name} products={products} />
				)}
			</div>

			{/* Video Section */}
			<div className="bg-[#FAFAFA] py-16 px-4 sm:px-6 md:px-12 lg:px-24">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
					<div className="text-center md:text-left">
						<h2 className="text-2xl sm:text-3xl font-bold text-[#0C2340] mb-4">
							True gemstones are not created. They are discovered.
						</h2>
						<p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
							In this guide, we’ll help you find the gemstone that truly
							resonates with your zodiac sign, personality, or planetary
							alignment.
						</p>
					</div>
					<div className="relative flex justify-center md:justify-end">
						<video
							src={Gemvideo}
							type="video/mp4"
							alt="Our Process"
							paused
							className="rounded-lg shadow-md w-full max-w-md"
							controls
							muted
						/>
					</div>
				</div>
			</div>

			{/* <TestimonialReview /> */}
		</div>
	);
};

export default ProductPage;
