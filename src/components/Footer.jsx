import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Facebook from "../assets/SocialMedia/facebook.svg";
import Insta from "../assets/SocialMedia/Insta.svg";
import Youtube from "../assets/SocialMedia/youtube.svg";
import Whatsapp from "../assets/SocialMedia/whatsapp.svg";
import { addEmailSubscription } from "../api/emailapi";

function Footer() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email.trim()) {
			toast.error("Please enter a valid email address.");
			return;
		}

		try {
			setLoading(true);
			const response = await addEmailSubscription(email);
			toast.success(response?.message || "Subscribed successfully!");
			setEmail("");
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Subscription failed. Please try again later."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<footer className="w-full bg-[#264A3F] text-white">
			{/* Toastify container */}

			{/* Content Section */}
			<div className="max-w-[1300px] mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
				{/* Our Company */}
				<div>
					<h3 className="text-[22px] font-bold mb-3">Our Company</h3>
					<ul className="space-y-2">
						<li>
							<Link to="/aboutUs">About Us</Link>
						</li>
						<li>
							<Link to="/career">Careers</Link>
						</li>

						<li>
							<Link to="/testimonals">Testimonials</Link>
						</li>
					</ul>
				</div>

				{/* About Gemstone */}
				<div>
					<h3 className="text-[22px] font-bold mb-3">About Gemstone</h3>
					<ul className="space-y-2">
						<li>
							<Link to="/privacy">Privacy Policy</Link>
						</li>
						<li>
							<Link to="/shipping">Shipping & Returns</Link>
						</li>
						<li>
							<Link to="/custom-duties">Custom Duties</Link>
						</li>
						<li>
							<Link to="/refund-policy">Refund Policy</Link>
						</li>
					</ul>
				</div>

				{/* Customer Support */}
				<div>
					<h3 className="text-[22px] font-bold mb-3">Customer Support</h3>
					<ul className="space-y-2">
						<li>
							<Link to="/gemstone-buy-guide">Gemstone Guide</Link>
						</li>
						<li>
							<Link to="/ring-size">Ring Size Guide</Link>
						</li>
						<li>
							<Link to="/carat-to-ratti-converter">Carat to Ratti Converter</Link>
						</li>

					</ul>
				</div>

				{/* Ambala Showroom */}
				<div>
					<h3 className="text-[22px] font-bold mb-3">Ambala Showroom</h3>
					<ul className="space-y-2 text-[15px]">
						<li>Nicholson Road, Ambala Haryana 133001</li>
						<li>
							<a href="tel:+919817975978">+91 98179 75978</a>
						</li>
						<li>
							<a href="mailto:wecare@gemrishi.com">wecare@gemrishi.com</a>
						</li>
					</ul>
				</div>

				{/* Shimla Showroom */}
				<div>
					<h3 className="text-[22px] font-bold mb-3">Shimla Showroom</h3>
					<ul className="space-y-2 text-[15px]">
						<li>Mall Road, Shimla</li>
						<li>
							<a href="tel:+919817975972">+91 98179 75972</a>
						</li>
						<li>
							<a href="mailto:wecare@gemrishi.com">wecare@gemrishi.com</a>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="text-[22px] font-bold mb-3">Solan Showroom</h3>
					<ul className="space-y-2 text-[15px]">
						<li>Ward 7, G Square Mall, Solan, Himachal Pradesh 173212</li>
						<li>
							<a href="tel:+919817975972">+91 74969 97220</a>
						</li>
						<li>
							<a href="mailto:wecare@gemrishi.com">wecare@gemrishi.com</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Subscribe and Social Section */}
			<div className="max-w-[1300px] mx-auto px-5 py-8 flex flex-col lg:flex-row justify-between items-center gap-8 border-t border-white/25">
				<div className="w-full lg:w-auto text-center lg:text-left">
					<p className="text-[18px] font-medium mb-4">
						Subscribe to get exclusive offers and new arrivals
					</p>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[500px] mx-auto lg:mx-0">
						<input
							type="email"
							placeholder="Enter Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full sm:w-[350px] h-[48px] rounded-lg px-4 text-[#264A3F] bg-white focus:outline-none"
						/>
						<button
							type="submit"
							disabled={loading}
							className="bg-white text-[#264A3F] font-bold px-6 h-[48px] rounded-lg hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed">
							{loading ? "Subscribing..." : "Subscribe"}
						</button>
					</form>
				</div>

				{/* Social Media */}
				<div className="flex gap-6 justify-center lg:justify-end w-full lg:w-auto mt-6 lg:mt-0">
					<a
						href="https://api.whatsapp.com/send/?phone=919817975978&text&type=phone_number&app_absent=0"
						target="_blank"
						rel="noopener noreferrer">
						<img src={Whatsapp} alt="Whatsapp" className="w-[28px] h-[28px]" />
					</a>
					<a
						href="https://www.facebook.com/gemrishi"
						target="_blank"
						rel="noopener noreferrer">
						<img src={Facebook} alt="Facebook" className="w-[28px] h-[28px]" />
					</a>
					<a
						href="https://instagram.com/gemrishi/"
						target="_blank"
						rel="noopener noreferrer">
						<img src={Insta} alt="Instagram" className="w-[28px] h-[28px]" />
					</a>
					<a
						href="https://www.youtube.com/@GemRishi"
						target="_blank"
						rel="noopener noreferrer">
						<img src={Youtube} alt="YouTube" className="w-[28px] h-[28px]" />
					</a>
				</div>
			</div>

			{/* Copyright Section */}
			<div className="border-t border-white/25 py-5 text-center">
				<p className="text-[13px] lg:text-[15px] mb-3">
					Copyright &copy;2025 <span className="font-semibold">(GemRishi)</span>{" "}
					| Venture by Fateh Chand Bansi Lal Jewellers Private Limited
				</p>
				<div className="flex flex-col lg:flex-row gap-4 items-center justify-center text-[16px]">
					<Link to="/terms" className="hover:underline">
						Terms and Services
					</Link>
					<Link to="/privacy" className="hover:underline">
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
