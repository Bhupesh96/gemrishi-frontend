"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Form() {
	const countryData = {
		countries: [
			"Afghanistan",
			"Albania",
			"Algeria",
			"Andorra",
			"Angola",
			"Antigua and Barbuda",
			"Argentina",
			"Armenia",
			"Australia",
			"Austria",
			"Azerbaijan",
			"Bahamas",
			"Bahrain",
			"Bangladesh",
			"Barbados",
			"Belarus",
			"Belgium",
			"Belize",
			"Benin",
			"Bhutan",
			"Bolivia",
			"Bosnia and Herzegovina",
			"Botswana",
			"Brazil",
			"Brunei",
			"Bulgaria",
			"Burkina Faso",
			"Burundi",
			"Cambodia",
			"Cameroon",
			"Canada",
			"Cape Verde",
			"Central African Republic",
			"Chad",
			"Chile",
			"China",
			"Colombia",
			"Comoros",
			"Congo",
			"Costa Rica",
			"Croatia",
			"Cuba",
			"Cyprus",
			"Czech Republic",
			"Denmark",
			"Djibouti",
			"Dominica",
			"Dominican Republic",
			"Ecuador",
			"Egypt",
			"El Salvador",
			"Equatorial Guinea",
			"Eritrea",
			"Estonia",
			"Eswatini",
			"Ethiopia",
			"Fiji",
			"Finland",
			"France",
			"Gabon",
			"Gambia",
			"Georgia",
			"Germany",
			"Ghana",
			"Greece",
			"Grenada",
			"Guatemala",
			"Guinea",
			"Guinea-Bissau",
			"Guyana",
			"Haiti",
			"Honduras",
			"Hungary",
			"Iceland",
			"India",
			"Indonesia",
			"Iran",
			"Iraq",
			"Ireland",
			"Israel",
			"Italy",
			"Jamaica",
			"Japan",
			"Jordan",
			"Kazakhstan",
			"Kenya",
			"Kiribati",
			"Kuwait",
			"Kyrgyzstan",
			"Laos",
			"Latvia",
			"Lebanon",
			"Lesotho",
			"Liberia",
			"Libya",
			"Liechtenstein",
			"Lithuania",
			"Luxembourg",
			"Madagascar",
			"Malawi",
			"Malaysia",
			"Maldives",
			"Mali",
			"Malta",
			"Marshall Islands",
			"Mauritania",
			"Mauritius",
			"Mexico",
			"Micronesia",
			"Moldova",
			"Monaco",
			"Mongolia",
			"Montenegro",
			"Morocco",
			"Mozambique",
			"Myanmar",
			"Namibia",
			"Nauru",
			"Nepal",
			"Netherlands",
			"New Zealand",
			"Nicaragua",
			"Niger",
			"Nigeria",
			"North Korea",
			"North Macedonia",
			"Norway",
			"Oman",
			"Pakistan",
			"Palau",
			"Panama",
			"Papua New Guinea",
			"Paraguay",
			"Peru",
			"Philippines",
			"Poland",
			"Portugal",
			"Qatar",
			"Romania",
			"Russia",
			"Rwanda",
			"Saint Kitts and Nevis",
			"Saint Lucia",
			"Saint Vincent and the Grenadines",
			"Samoa",
			"San Marino",
			"Sao Tome and Principe",
			"Saudi Arabia",
			"Senegal",
			"Serbia",
			"Seychelles",
			"Sierra Leone",
			"Singapore",
			"Slovakia",
			"Slovenia",
			"Solomon Islands",
			"Somalia",
			"South Africa",
			"South Korea",
			"South Sudan",
			"Spain",
			"Sri Lanka",
			"Sudan",
			"Suriname",
			"Sweden",
			"Switzerland",
			"Syria",
			"Taiwan",
			"Tajikistan",
			"Tanzania",
			"Thailand",
			"Timor-Leste",
			"Togo",
			"Tonga",
			"Trinidad and Tobago",
			"Tunisia",
			"Turkey",
			"Turkmenistan",
			"Tuvalu",
			"Uganda",
			"Ukraine",
			"United Arab Emirates",
			"United Kingdom",
			"United States",
			"Uruguay",
			"Uzbekistan",
			"Vanuatu",
			"Vatican City",
			"Venezuela",
			"Vietnam",
			"Yemen",
			"Zambia",
			"Zimbabwe"
		]
		,
		state: [
			"Andhra Pradesh",
			"Arunachal Pradesh",
			"Assam",
			"Bihar",
			"Chhattisgarh",
			"Goa",
			"Gujarat",
			"Haryana",
			"Himachal Pradesh",
			"Jharkhand",
			"Karnataka",
			"Kerala",
			"Madhya Pradesh",
			"Maharashtra",
			"Manipur",
			"Meghalaya",
			"Mizoram",
			"Nagaland",
			"Odisha",
			"Punjab",
			"Rajasthan",
			"Sikkim",
			"Tamil Nadu",
			"Telangana",
			"Tripura",
			"Uttar Pradesh",
			"Uttarakhand",
			"West Bengal",
			"Jammu and Kashmir",
		],
	};

	const navigate = useNavigate();
	const location = useLocation();

	// ------------------ State Management ------------------
	const [data, setData] = useState(countryData);
	const [formData, setFormData] = useState({
		address: {
			fullName: "",
			email: "",
			mobileNo: "",
			addressLine1: "",
			addressLine2: "",
			landmark: "",
			city: "",
			pinCode: "",
			district: "",
			state: "",
			country: "",
			note: "",
		},
		terms: false,
		billingSame: false,
	});

	const [errors, setErrors] = useState({});
	const [isShaking, setIsShaking] = useState(false);

	// ------------------ Load Saved Data ------------------
	useEffect(() => {
		const saved = localStorage.getItem("shippingDetails");
		if (saved) {
			try {
				setFormData(JSON.parse(saved));
			} catch (err) {
				console.error("❌ Error parsing localStorage data:", err);
			}
		}
	}, []);

	// ------------------ Validators ------------------
	const validators = {
		fullName: (v) =>
			!v.trim()
				? "Full name is required."
				: v.length < 3
					? "Name must be at least 3 characters."
					: !/^[a-zA-Z\s]+$/.test(v)
						? "Name should only contain letters."
						: "",
		email: (v) =>
			!v.trim()
				? "Email is required."
				: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
					? "Enter a valid email address."
					: "",
		mobileNo: (v) =>
			!v.trim()
				? "Mobile number is required."
				: !/^[0-9]{10}$/.test(v)
					? "Enter a valid 10-digit mobile number."
					: "",
		pinCode: (v) =>
			!v.trim()
				? "Postal Code is required."
				: !/^[0-9]{6}$/.test(v)
					? "Enter a valid 6-digit postal code."
					: "",
		addressLine1: (v) =>
			!v.trim()
				? "Address Line 1 is required."
				: v.length < 10
					? "Address must be at least 10 characters."
					: "",
		city: (v) =>
			!v.trim()
				? "City is required."
				: v.length < 2
					? "City name must be at least 2 characters."
					: "",
		district: (v) => (!v.trim() ? "District is required." : ""),
		state: (v) => (!v ? "State selection is required." : ""),
		country: (v) => (!v ? "Country selection is required." : ""),
		terms: (v) =>
			!v ? "You must agree to the Terms & Conditions to proceed." : "",
		billingSame: (v) =>
			!v ? "You must select billing address." : "",
	};

	// ------------------ Handlers ------------------
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (name.startsWith("address.")) {
			const key = name.split(".")[1];
			setFormData((prev) => ({
				...prev,
				address: { ...prev.address, [key]: value },
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: type === "checkbox" ? checked : value,
			}));
		}
	};

	const handleSubmit = () => {
		const newErrors = {};
		for (const key in validators) {
			if (key === "terms") newErrors[key] = validators[key](formData.terms);
			else if (key in formData.address)
				newErrors[key] = validators[key](formData.address[key]);
		}

		setErrors(newErrors);
		const isValid = Object.values(newErrors).every((err) => !err);

		if (!isValid) {
			setIsShaking(true);
			setTimeout(() => setIsShaking(false), 500);
			return;
		}

		localStorage.setItem("shippingDetails", JSON.stringify(formData));
		navigate("/review_And/confirm/details", { state: { productId: location?.state?.productId } });
	};

	const shakeVariants = {
		shake: {
			x: [0, -10, 10, -10, 10, 0],
			transition: { duration: 0.5 },
		},
	};

	// ------------------ UI ------------------
	return (
		<div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-0">
			<p className="text-xl sm:text-2xl font-medium mb-4">Shipping Details</p>

			{/* Full Name & Mobile */}
			<div className="flex flex-col sm:flex-row gap-6">
				<InputField
					label="Full Name"
					name="address.fullName"
					value={formData.address.fullName}
					onChange={handleChange}
					error={errors.fullName}
				/>
				<InputField
					label="Mobile Number"
					type="tel"
					name="address.mobileNo"
					value={formData.address.mobileNo}
					onChange={handleChange}
					error={errors.mobileNo}
				/>
			</div>

			{/* Email */}
			<div className="mt-4">
				<InputField
					label="Email"
					type="email"
					name="address.email"
					value={formData.address.email}
					onChange={handleChange}
					error={errors.email}
				/>
			</div>

			{/* Postal Code & Address */}
			<div className="flex flex-col sm:flex-row gap-6 mt-4">
				<InputField
					label="Postal Code"
					name="address.pinCode"
					value={formData.address.pinCode}
					onChange={handleChange}
					error={errors.pinCode}
				/>
				<InputField
					label="Address"
					name="address.addressLine1"
					value={formData.address.addressLine1}
					onChange={handleChange}
					error={errors.addressLine1}
				/>
			</div>

			{/* District, City, Country */}
			<div className="flex flex-col sm:flex-row gap-6 mt-4">
				<InputField
					label="District"
					name="address.district"
					value={formData.address.district}
					onChange={handleChange}
					error={errors.district}
				/>
				<InputField
					label="City"
					name="address.city"
					value={formData.address.city}
					onChange={handleChange}
					error={errors.city}
				/>
				<SelectField
					label="Country"
					name="address.country"
					value={formData.address.country}
					options={data.countries}
					onChange={handleChange}
					error={errors.country}
				/>
			</div>

			{/* State */}
			<div className="mt-4">
				<SelectField
					label="State"
					name="address.state"
					value={formData.address.state}
					options={data.state}
					onChange={handleChange}
					error={errors.state}
				/>
			</div>

			{/* <div className="mt-6">
				<div className="flex items-start gap-3 pt-4">
					<input
						type="checkbox"
						name="billingSame"
						checked={formData.billingSame}
						onChange={handleChange}
						className="w-[25px] h-[25px] accent-[#264A3F] cursor-pointer mt-1"
					/>
					<p className="text-[#666464] text-base sm:text-lg">
						My Billing address same as Shipping address

					</p>
				</div>

			</div> */}

			{/* Terms */}
			<div className="mt-6">
				<div className="flex items-start gap-3 pt-4">
					<input
						type="checkbox"
						name="terms"
						checked={formData.terms}
						onChange={handleChange}
						className="w-[25px] h-[25px] accent-[#264A3F] cursor-pointer mt-1"
					/>
					<p className="text-[#666464] text-base sm:text-lg">
						I have read and agree to the{" "}
						<a
							href="/terms"
							className="text-blue-600 hover:underline font-medium"
							target="_blank"
							rel="noopener noreferrer">
							terms & conditions
						</a>
						.
					</p>
				</div>
				{errors.terms && (
					<p className="text-red-500 text-sm mt-1 ml-9">{errors.terms}</p>
				)}
			</div>

			{/* Submit */}
			<div className="w-full flex justify-center mt-8 pb-4">
				<motion.button
					onClick={handleSubmit}
					className="w-full max-w-[458px] h-[60px] bg-[#264A3F] rounded-[10px] text-lg sm:text-xl font-bold text-white cursor-pointer"
					variants={shakeVariants}
					animate={isShaking ? "shake" : ""}>
					Next
				</motion.button>
			</div>
		</div>
	);
}

// ------------------ Reusable Components ------------------
const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
	<div className="w-full flex flex-col">
		<label className="text-lg text-[#666464]">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			className={`h-[53px] border rounded-[10px] pl-2 text-lg outline-none focus:ring-2 focus:ring-[#264A3F] ${error ? "border-red-500" : "border-[#AEABAB]"
				}`}
		/>
		{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
	</div>
);

const SelectField = ({ label, name, value, options, onChange, error }) => (
	<div className="w-full flex flex-col">
		<label className="text-lg text-[#666464]">{label}</label>
		<select
			name={name}
			value={value}
			onChange={onChange}
			className={`h-[53px] border rounded-[10px] pl-2 text-lg outline-none focus:ring-2 focus:ring-[#264A3F] ${error ? "border-red-500" : "border-[#AEABAB]"
				}`}>
			<option value="">Select {label}</option>
			{options.map((opt, i) => (
				<option key={i} value={opt}>
					{opt}
				</option>
			))}
		</select>
		{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
	</div>
);

export default Form;
