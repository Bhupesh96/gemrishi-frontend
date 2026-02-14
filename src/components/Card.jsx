import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";
import WishlistButton from "../components/wishlistButton";
import VideoModal from "./models/VideoModal";
import { useState } from "react";

const Card = ({
	image,
	title,
	origin,
	Type,
	jewelryPrice,
	slug,
	videos,
	id,
	itemType,
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<Link to={`/details/product/${slug}`} className="block group">
				<div className="w-72 bg-white mb-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative">
					{/* Icons (top right) */}
					<div className="absolute top-3 right-3 flex gap-2">
						{/* Heart Button */}
						<WishlistButton itemId={id} itemType={itemType} />

						{/* Play video button */}
						{videos?.length > 0 && (
							<button
								type="button"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setShowModal(true);
								}}
								className="p-2 rounded-full border border-black hover:bg-gray-100 transition flex items-center justify-center cursor-pointer">
								<Play className="w-4 h-4 text-gray-700" />
							</button>
						)}
					</div>

					{/* Product Image */}
					<img
						src={image}
						alt={title}
						className="w-full h-64 object-contain mb-4"
					/>

					{/* Product Title */}
					<h2 className="text-lg font-semibold text-center">{title}</h2>

					{/* Origin */}
					{Type && <p className="text-sm text-gray-500">Origin: {Type}</p>}

					{/* Price */}
					<p className="text-center text-md  text-gray-900 ">
						₹ {jewelryPrice}
					</p>
				</div>
			</Link>
			<VideoModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				videoUrl={videos?.[0]?.url}
			/>
		</div>
	);
};

export default Card;

//text-center text-lg font-bold text-gray-900 mt-2
