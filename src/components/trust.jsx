import { Star } from "lucide-react";

export default function TrustBadges() {
	return (
		<div className="w-full px-4 py-0 flex flex-col items-center justify-center text-center">
			<h1 className="text-[#0B1D3A] text-2xl md:text-3xl font-semibold mb-2">
				Reviews and Ratings
			</h1>

			<div className="w-full max-w-3xl bg-[#FFF7E8] rounded-2xl p-5 md:p-8 flex flex-col items-center gap-3 shadow-xs">
				{/* Title */}
				<div className="bg-white px-6 py-2 rounded-full shadow-sm text-base md:text-xl font-semibold text-gray-800 flex items-center justify-center">
					Trusted by <span className="font-bold ml-2">1 Lakh+ </span> satisfied
					customers
				</div>

				{/* Reviews Section */}
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-0 place-items-center">
					{/* Google Review */}
					<div className="flex items-center gap-3">
						<img
							src="/go.png"
							alt="Google Icon"
							className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
						/>
						<div className="text-left">
							<div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800">
								4.7
								<div className="flex">
									{[1, 2, 3, 4].map((i) => (
										<Star
											key={i}
											size={18}
											className="text-yellow-500 fill-yellow-500"
										/>
									))}
									<Star
										size={18}
										className="text-yellow-400/40 fill-yellow-400/40"
									/>
								</div>
							</div>
							<p className="text-gray-600 text-sm sm:text-base font-medium">
								7K+ Google Reviews
							</p>
						</div>
					</div>

					{/* Trustpilot Review */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-14 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center">
							<img
								src="/trust.png"
								alt="Trustpilot Icon"
								className="w-14 h-4 sm:w-14 sm:h-14 object-contain"
							/>
						</div>

						<div className="text-left">
							<div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-800">
								4.4
								<div className="flex items-center">
									{[1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="w-4 h-4 sm:w-5 sm:h-5 bg-[#00B67A] rounded-sm ml-[2px]"
										></div>
									))}
									<div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#9DEDB8] rounded-sm ml-[2px]"></div>
								</div>
							</div>

							<p className="text-gray-600 text-sm sm:text-base font-medium">
								1K+ Trustpilot Reviews
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}