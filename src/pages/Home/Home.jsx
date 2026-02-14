import React from "react";
import Header from "./Header";
import StoneCollection from "./StoneCollection";
import JewelleryCollection from "./JewelleryCollection";
import LegacyTrust from "./LegacyTrust";
// import ExclusiveJewellery from "./ExclusiveJewellery";
// import TestimonialReview from "./TestimonialReview";
import TrustBadges from "../../components/trust";
import VideoSection from "./VideoSection";
import GemstoneReviews from "./GemstoneReviews";
import Legacy from "./Legacy";
import GemstoneEducationYoutubeSection from "./GemstoneEducationYoutubeSection"

function Home() {
	return (
		<>
			<div className="flex flex-col">
				{/* Hero Section */}
				<section className="bg-green-25">
					<Header />
				</section>

				{/* Stones */}
				<section className="bg-white-50">
					<StoneCollection />
				</section>

				{/* Video section */}
				<section className="">
					<VideoSection />
				</section>



				{/* Jewellery */}
				<section className="bg-white">
					<JewelleryCollection />
				</section>

				{/* Legecy section */}
				<section className="bg-green-220 ">
					<Legacy />
				</section>

				{/* Legacy Trust */}
				<section className="bg-green-50">
					<LegacyTrust />
				</section>

				{/* GemstoneEducationYoutubeSection section */}
				<section className="bg-green-220 ">
					<GemstoneEducationYoutubeSection />
				</section>

				<section >
					<GemstoneReviews />
				</section>

				{/* Trust Badges */}
				<section className="bg-green-100">
					<TrustBadges />
				</section>






				{/*
				Exclusive Jewellery
				<section className="bg-white border-b border-gray-200 ">
					<ExclusiveJewellery />
				</section> */}


			</div>
		</>
	);
}

export default Home;