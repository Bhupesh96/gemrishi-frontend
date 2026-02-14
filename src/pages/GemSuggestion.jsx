import React from "react";
import GemRecommendationModal from "../components/models/GemRecommendation";
import FAQAccordion from "../components/faq";
import TestimonialReview from "../components/Testimonals";
import Banner from "../assets/banner.jpg";

const GemSuggestion = () => {
	return (
		<div className="">
			<div className="relative w-full ">
				{/* Banner Image */}
				<img
					src={Banner}
					alt="Gem Suggestion Banner"
					className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
				/>

				{/* Overlay Text */}
				<div className="absolute inset-0 flex items-center justify-center bg-black/40">
					<h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold">
						Gem Suggestion
					</h1>
				</div>
			</div>
			<p className="px-4 sm:px-6 md:px-16 py-4 text-lg sm:text-xl md:text-2xl text-gray-800 font-semibold">
				Gemstone
			</p>
			<p className="px-4 sm:px-6 md:px-20 text-base sm:text-[18px] md:text-lg text-gray-700 leading-relaxed">
				The history of gemstones is as archaic as the existence of human
				civilization. Only the usage and implications have changed and
				diversified as well with the evolution. The first classification of the
				gemstones was done by the Greeks into precious and semi-precious
				categories. With the passage of time and the emergence of umpteen
				precious and semi-precious gemstones, the classification became more
				broad and deep.
			</p>

			<div className="flex flex-col lg:flex-row items-center justify-center gap-2 p-12  min-h-screen">
				{" "}
				{/* Form Section */}
				<div className="w-full lg:w-1/2">
					<GemRecommendationModal />
				</div>
				{/* Video Section */}
				<div className="w-full lg:w-1/2 flex justify-center">
					{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/IRFFfvXkZGk?si=Wjf90u4YjH1htVlj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/IRFFfvXkZGk?si=Wjf90u4YjH1htVlj"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin"
						allowFullScreen
					></iframe>

				</div>
			</div>
			<FAQAccordion />
			<TestimonialReview />
		</div>
	);
};

export default GemSuggestion;
