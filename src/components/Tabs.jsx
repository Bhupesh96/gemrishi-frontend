import React, { useState } from "react";

const Tabs = ({ categoryData }) => {
	const [activeTab, setActiveTab] = useState("About");

	const tabs = [
		{ key: "about", label: "About" },
		{ key: "meaning", label: "Meaning" },
		{ key: "buyerGuide", label: "Buyer Guide" },
		{ key: "qualityAndPrice", label: "Quality & Price" },
		{ key: "faqs", label: "FAQ" },
	];


	const renderContent = () => {
		switch (activeTab) {
			case "About":
				return (
					<p>lorem</p>
				);
			case "Meaning":
				return (
					<p>lorem</p>
				);
			case "Buyer Guide":
				return (
					<p>lorem</p>
				);
			case "Quality & Price":
				return (
					<p>lorem</p>
				);
			case "FAQ":
				return (
					<p>lorem</p>
				);
			default:
				return (
					<p>lorem</p>
				);
		}
	};

	return (
		<div className="mt-24 w-full mb-24 px-6 md:px-12">
			{/* Tab Buttons */}
			<div className="border-b border-gray-300">
				<ul className="flex flex-wrap gap-4 text-[14px] font-semibold text-gray-700 overflow-x-auto whitespace-nowrap scrollbar-hide">
					{tabs.map((tab) => (
						<li
							key={tab.key}
							className={`cursor-pointer inline-block pb-4 transition-colors ${
								activeTab === tab.label
									? "text-[#02498F] border-b-2 border-[#02498F]"
									: "hover:text-[#02498F]"
							}`}
							onClick={() => setActiveTab(tab.label)}>
							{tab.label}
						</li>
					))}
				</ul>
			</div>

			{/* ✅ Responsive Tab Content */}
			<div
				className={`mt-6 text-gray-800 text-[16px] leading-relaxed ${
					activeTab ? "block" : "hidden"
				} md:block`}>
				{/* Only show content on mobile if a tab is clicked, always show on md+ */}
				{activeTab && renderContent()}
			</div>
		</div>
	);
};

export default Tabs;
