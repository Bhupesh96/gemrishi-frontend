"use client";

import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../features/api/authSlice";
import {
	useLogoutMutation,
	useProfileQuery,
	useUpdateUserMutation,
} from "../../features/api/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import edit from "../../assets/Profile/edit.svg";
import stone1 from "../../assets/react.svg";

const ProfileSkeleton = () => (
	<div className="w-full min-h-[1150px] lg:h-[1150px] flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-30 animate-pulse">
		{/* Left Sidebar Skeleton */}   {" "}
		<div className="w-full lg:w-[350px] h-auto lg:h-full flex flex-col">
			{" "}
			<div className="h-8 w-2/3 bg-gray-200 rounded pt-8 sm:pt-10 lg:pt-10 mb-6 sm:mb-8 lg:mb-5"></div>
			{" "}
			<nav>
				{" "}
				<ul className="flex flex-col sm:flex-row lg:flex-col justify-center gap-3 sm:gap-4 lg:gap-0">
					{" "}
					{[1, 2, 3, 4].map((i) => (
						<li
							key={i}
							className="w-full h-[50px] bg-gray-200 rounded-[10px] my-1"
						></li>
					))}
					{" "}
				</ul>
				{" "}
			</nav>
			{" "}
		</div>
		{/* Right Content Skeleton */}   {" "}
		<div className="w-full h-full flex flex-col items-center mt-8 sm:mt-10 md:mt-12 lg:mt-26 lg:ml-8">
			{/* Header/Banner Skeleton */}     {" "}
			<div className="w-full max-w-[855px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[201px] rounded-tl-[50px] rounded-br-[50px] bg-gray-300 flex flex-row items-center justify-end p-8">
				{" "}
				<div className="flex items-center space-x-4">
					{" "}
					<div className="w-[150px] h-[150px] border-4 border-gray-400 rounded-full bg-gray-400 flex-shrink-0"></div>
					<div className="h-10 w-48 bg-gray-400 rounded"></div>       {" "}
				</div>
				{" "}
			</div>
			{" "}
			<div className="w-full max-w-[855px] min-h-[700px] border-l border-r border-b rounded-bl-[20px] rounded-br-[20px] border-[#DBC9C9] pb-8 sm:pb-12 mb-26">
				{/* Edit Button Placeholder */}       {" "}
				<div className="w-full h-[80px] flex items-center justify-end pr-6 sm:pr-8 lg:pr-6">
					{" "}
					<div className="w-[125px] h-[32px] bg-gray-200 rounded-[10px]"></div>
					{" "}
				</div>
				{/* Form Fields Placeholders */}       {" "}
				{[1, 2, 3, 4, 5, 6].map((i) => (
					<div key={i} className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
						{" "}
						<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
							<div className="h-5 w-24 bg-gray-200 rounded"></div>
							{" "}
							<div
								className={`w-full lg:w-[434px] h-[50px] bg-gray-200 rounded-[10px] ${i === 3 ? "lg:h-[100px] w-full lg:w-[478px]" : ""
									}`}
							></div>
							{" "}
						</div>
						{" "}
					</div>
				))}
				{" "}
			</div>
			{" "}
		</div>
		{" "}
	</div>
);

// ====================================================================
// Main Profile Component
// ====================================================================
function Profile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data: profileData, isLoading, isError, refetch } = useProfileQuery();
	const [logoutApi] = useLogoutMutation();
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

	const [select, setSelect] = useState("mydetails");
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		mobileNo: "",
		address: "",
		landmark: "",
		city: "",
		pinCode: "",
	});
	const [profilePicFile, setProfilePicFile] = useState(null);
	const [validationErrors, setValidationErrors] = useState({
		mobileNo: "",
		pinCode: "",
	});
	const { pathname } = useLocation();

	useEffect(() => {
		if (profileData?.user) {
			setFormData({
				fullName: profileData.user.fullName || "",
				email: profileData.user.email || "",
				mobileNo: profileData.user.mobileNo || "",
				address: profileData.user.address || "",
				landmark: profileData.user.landmark || "",
				city: profileData.user.city || "",
				pinCode: profileData.user.pinCode || "",
			});
		}
	}, [profileData]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		if (id === "mobileNo") {
			if (value === "" || /^\d{0,10}$/.test(value)) {
				setFormData((prevData) => ({
					...prevData,
					[id]: value,
				}));

				if (value === "") {
					setValidationErrors((prev) => ({ ...prev, mobileNo: "" }));
				} else if (value.length < 10) {
					setValidationErrors((prev) => ({
						...prev,
						mobileNo: "Mobile number must be exactly 10 digits",
					}));
				} else if (value.length === 10) {
					setValidationErrors((prev) => ({ ...prev, mobileNo: "" }));
				}
			}
			return;
		}

		if (id === "city") {
			// Allow only alphabets and spaces
			if (/^[A-Za-z\s]*$/.test(value)) {
				setFormData((prevData) => ({
					...prevData,
					[id]: value,
				}));

				if (value === "") {
					setValidationErrors((prev) => ({ ...prev, city: "" }));
				} else if (value.length < 3) {
					setValidationErrors((prev) => ({
						...prev,
						city: "City name must be at least 3 letters",
					}));
				} else {
					setValidationErrors((prev) => ({ ...prev, city: "" }));
				}
			}
			return;
		}


		if (id === "pinCode") {
			if (value === "" || /^\d{0,6}$/.test(value)) {
				setFormData((prevData) => ({
					...prevData,
					[id]: value,
				}));

				if (value === "") {
					setValidationErrors((prev) => ({ ...prev, pinCode: "" }));
				} else if (value.length < 6) {
					setValidationErrors((prev) => ({
						...prev,
						pinCode: "PIN code must be exactly 6 digits",
					}));
				} else if (value.length === 6) {
					setValidationErrors((prev) => ({ ...prev, pinCode: "" }));
				}
			}
			return;
		}

		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleLogout = useCallback(async () => {
		try {
			await logoutApi().unwrap();
			dispatch(logoutAction());
			navigate("/", { replace: true });
		} catch (error) {
			console.error("Logout failed:", error);
			dispatch(logoutAction());
			navigate("/", { replace: true });
		}
	}, [dispatch, logoutApi, navigate]);

	const validateForm = () => {
		const { mobileNo, pinCode } = formData;
		let isValid = true;

		if (mobileNo && mobileNo.length !== 10) {
			setValidationErrors((prev) => ({
				...prev,
				mobileNo: "Mobile number must be exactly 10 digits",
			}));
			isValid = false;
		}

		if (pinCode && pinCode.length !== 6) {
			setValidationErrors((prev) => ({
				...prev,
				pinCode: "PIN code must be exactly 6 digits",
			}));
			isValid = false;
		}

		return isValid;
	};

	const handleUpdateProfile = async () => {
		if (!isEditing) {
			setIsEditing(true);
			return;
		}

		if (!validateForm()) {
			return;
		}

		try {
			const { _id: userId } = profileData.user;
			const dataToUpdate = new FormData();
			let isChanged = false;

			for (const key in formData) {
				if (key === "email") continue;

				if (formData[key] !== profileData.user[key]) {
					dataToUpdate.append(key, formData[key]);
					isChanged = true;
				}
			}

			if (profilePicFile) {
				dataToUpdate.append("profilePic", profilePicFile);
				isChanged = true;
			}

			if (!isChanged) {
				setIsEditing(false);
				toast.info("No changes were made to save.", { position: "top-center" });
				return;
			}

			await updateUser({ userId, formData: dataToUpdate }).unwrap();
			refetch();

			setIsEditing(false);
			setProfilePicFile(null);

			toast.success("Profile updated successfully! 🎉", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "light",
			});
		} catch (error) {
			console.error("Failed to update profile:", error);
			toast.error(
				error?.data?.message || "Failed to update profile. Please try again.",
				{
					position: "top-center",
				}
			);
		}
	};

	if (isLoading) {
		return <ProfileSkeleton />;
	}

	// 🚨 REVISED PROFESSIONAL ERROR HANDLING BLOCK 🚨
	if (isError) {
		return (
			<div className="w-full min-h-[500px] flex items-center justify-center p-8 bg-gray-50">
				<div className="p-12 flex flex-col items-center justify-center text-center max-w-lg bg-white shadow-xl rounded-xl border border-red-200">
					{/* Professional Warning Icon (Warning Triangle) */}
					<svg
						className="w-16 h-16 text-[#8b0000] mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"
						></path>
					</svg>

					<h3 className="text-2xl font-extrabold text-[#00001c] mb-2">
						Profile Data Unavailable
					</h3>

					<p className="text-lg text-gray-700 mb-4">
						We couldn't load your profile information right now.
					</p>

					<p className="text-base text-gray-600">
						Please ensure you are **logged in** and **try refreshing the page**.
						If the problem persists, the server may be temporarily down.
					</p>
				</div>
			</div>
		);
	}

	const user = profileData?.user || {};

	return (
		<>
			<div className="w-full  flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-30 overflow-x-hidden">
				{" "}
				<div className="w-full lg:w-[350px] h-auto lg:h-full flex flex-col">
					{" "}
					<h1 className="text-[28px] sm:text-[30px] md:text-[32px] lg:text-[32px] font-serif text-[#0B1D3A] pt-8 sm:pt-10 lg:pt-10 pb-6 sm:pb-8 lg:pb-5">
						Profile          {" "}
					</h1>
					{" "}
					<nav>
						{" "}
						<ul className="flex flex-col sm:flex-row lg:flex-col justify-center gap-3 sm:gap-4 lg:gap-0">
							{" "}
							<li
								className={`w-full sm:w-[200px] md:w-[220px] lg:w-[219px]
  h-[55px] sm:h-[50px] md:h-[52px] lg:h-[50px]
  rounded-[12px] sm:rounded-[10px] lg:rounded-[10px]
  text-[18px] sm:text-[16px] md:text-[17px] lg:text-[18px]
  font-serif flex items-center pl-6 sm:pl-4 lg:pl-5 cursor-pointer
  transition-all duration-200
  ${select === "mydetails" || pathname === "/profile"
										? "bg-[#1a3329] text-white shadow-md"
										: "text-[#264A3F] hover:bg-gray-100"
									}`}
								onClick={() => {
									setSelect("mydetails");
									navigate("/profile");
								}}>
								My Details
							</li>
							{" "}
							<li
								className={`w-full sm:w-[200px] md:w-[220px] lg:w-[219px]
  h-[55px] sm:h-[50px] md:h-[52px] lg:h-[50px]
  rounded-[12px] sm:rounded-[10px] lg:rounded-[10px]
  text-[18px] sm:text-[16px] md:text-[17px] lg:text-[18px]
  font-serif flex items-center pl-6 sm:pl-4 lg:pl-5 cursor-pointer
  transition-all duration-200
  ${select === "OrdersAndPurchases" || pathname === "/orders/and/purchases"
										? "bg-[#1a3329] text-white shadow-md"
										: "text-[#264A3F] hover:bg-gray-100"
									}`}
								onClick={() => {
									setSelect("OrdersAndPurchases");
									navigate("/orders/and/purchases");
								}}>
								Orders & Purchases
							</li>
							{" "}
							<li
								className={`w-full h-auto
  text-[18px] sm:text-[16px] md:text-[17px] lg:text-[18px]
  font-serif flex items-center pl-6 sm:pl-4 lg:pl-5 cursor-pointer
  transition-all duration-200
  ${select === "logout"
										? "bg-[#1a3329] text-white shadow-md"
										: "text-[#264A3F] hover:bg-gray-100"
									}`}
								onClick={() => {
									setSelect("logout");
									handleLogout();
								}}>
								Logout
							</li>
							{" "}
						</ul>
						{" "}
					</nav>
					{" "}
				</div>
				{" "}
				<div className="w-full h-full flex flex-col items-center mt-8 sm:mt-10 md:mt-12 lg:mt-26 lg:ml-8">
					{" "}
					<div
						className="w-full h-auto  flex flex-row"
						style={{
							background:
								"linear-gradient(to top right, #5AB096 , #4D9780, #264A3F ,#37997B, #37997B)",
						}}>
						{" "}
						<div className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-4 sm:px-8 lg:px-0">
							{/* Profile Image + Edit Button */}
							<div className="relative flex-shrink-0 mt-2 sm:mt-3 md:mt-4">
								<img
									src={
										profilePicFile
											? URL.createObjectURL(profilePicFile)
											: profileData?.user?.profilePic?.url || "/placeholder.svg"
									}
									alt="Profile"
									className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover"
								/>

								{isEditing && (
									<label
										htmlFor="profilePicUpload"
										className="absolute bottom-1 right-1 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition">
										<img
											src={edit || "/placeholder.svg"}
											alt="Edit"
											className="w-4 h-4"
										/>
									</label>
								)}

								<input
									id="profilePicUpload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) => setProfilePicFile(e.target.files[0])}
									disabled={!isEditing}
								/>
							</div>

							{/* Name Input */}
							<input
								type="text"
								id="fullName"
								value={formData.fullName}
								onChange={handleInputChange}
								disabled={!isEditing}
								className={`w-full text-center sm:text-left
      text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px]
      font-serif text-white bg-transparent
      border-none focus:outline-none
      ${isEditing ? "border-b border-white pb-1" : ""}
    `}
							/>
						</div>
						{" "}
					</div>
					{" "}
					<div className="w-full h-auto border-l border-r border-b rounded-bl-[20px] rounded-br-[20px] border-[#DBC9C9] pb-8 sm:pb-12 mb-26">
						{" "}
						<div className="w-full h-[80px] sm:h-[85px] md:h-[90px] lg:h-[80px] flex items-center justify-end pr-6 sm:pr-8 lg:pr-6">
							{" "}
							<button
								className={`w-[120px] sm:w-[130px] md:w-[135px] lg:w-[125px] h-[40px] sm:h-[42px] md:h-[44px] lg:h-[32px] rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] font-serif cursor-pointer text-[16px] sm:text-[17px] lg:text-[16px] font-medium transition-colors ${isEditing
										? "bg-[#264A3F] text-white hover:bg-[#1a3329]"
										: "bg-[#D9D9D9] text-[#264A3F] hover:bg-[#c9c9c9]"
									} ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
								onClick={handleUpdateProfile}
								disabled={isUpdating}>
								{isUpdating ? "Saving..." : isEditing ? "Save" : "Edit"}
							</button>
						</div>
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="email"
									className="text-[18px] sm:text-[19px] lg:text-[18px] text-[#264A3F] font-serif font-medium">
									Email                {" "}
								</label>
								{" "}
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={handleInputChange}
									className={`w-full lg:w-[434px] h-[55px] sm:h-[52px] lg:h-[50px] border-2 sm:border-2 lg:border border-[#949494] rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors bg-gray-100 cursor-not-allowed`}
									disabled={true}
								/>
								{" "}
							</div>
							{/* Validation Error space here */}           {" "}
						</div>
						{" "}
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="mobileNo"
									className="text-[18px] sm:text-[19px] lg:text-[18px] font-serif font-medium">
									Mobile Number                {" "}
								</label>
								{" "}
								<div className="w-full lg:w-[434px]">
									{" "}
									<input
										type="text"
										id="mobileNo"
										value={formData.mobileNo}
										onChange={handleInputChange}
										className={`w-full h-[55px] sm:h-[52px] lg:h-[50px] border-2 sm:border-2 lg:border rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors ${validationErrors.mobileNo && isEditing
												? "border-red-500 focus:border-red-500"
												: isEditing
													? ""
													: "border-[#949494]"
											}`}
										disabled={!isEditing}
									/>
									{" "}
									{validationErrors.mobileNo && isEditing && (
										<p className="text-red-500 text-sm mt-1 ml-1">
											{validationErrors.mobileNo}
										</p>
									)}
									{" "}
								</div>
								{" "}
							</div>
							{" "}
						</div>
						{" "}
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[750px] lg:ml-6 flex flex-col lg:flex-row justify-between lg:items-center gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="address"
									className="text-[18px] sm:text-[19px] lg:text-[18px] font-serif font-medium">
									Address                {" "}
								</label>
								{" "}
								<input
									type="text"
									id="address"
									value={formData.address}
									onChange={handleInputChange}
									className={`w-full lg:w-[478px] h-[90px] sm:h-[90px] lg:h-[100px] border-2 sm:border-2 lg:border rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors ${isEditing ? "" : ""
										}`}
									disabled={!isEditing}
								/>
								{" "}
							</div>
							{" "}
						</div>
						{" "}
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="landmark"
									className="text-[18px] sm:text-[19px] lg:text-[18px] font-serif font-medium">
									Landmark                {" "}
								</label>
								{" "}
								<input
									type="text"
									id="landmark"
									value={formData.landmark}
									onChange={handleInputChange}
									className={`w-full lg:w-[434px] h-[55px] sm:h-[52px] lg:h-[50px] border-2 sm:border-2 lg:border rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors ${isEditing ? "" : ""
										}`}
									disabled={!isEditing}
								/>
								{" "}
							</div>
							{" "}
						</div>
						{" "}
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="city"
									className="text-[18px] sm:text-[19px] lg:text-[18px] font-serif font-medium">
									City                {" "}
								</label>
								{" "}
								<input
									type="text"
									id="city"
									value={formData.city}
									onChange={handleInputChange}
									className={`w-full lg:w-[434px] h-[55px] sm:h-[52px] md:h-[54px] lg:h-[50px] border-2 sm:border-2 lg:border rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors ${isEditing ? "" : ""
										}`}
									disabled={!isEditing}
								/>
								{" "}
							</div>
							{" "}
						</div>
						{" "}
						<div className="w-full px-6 sm:px-8 lg:px-0 mb-4 lg:mb-6">
							{" "}
							<div className="w-full lg:w-[706px] lg:ml-6 flex flex-col lg:flex-row justify-between gap-3 sm:gap-4 lg:gap-0">
								{" "}
								<label
									htmlFor="pinCode"
									className="text-[18px] sm:text-[19px] lg:text-[18px] font-serif font-medium">
									PIN Code                {" "}
								</label>
								{" "}
								<div className="w-full lg:w-[434px]">
									{" "}
									<input
										type="text"
										id="pinCode"
										value={formData.pinCode}
										onChange={handleInputChange}
										className={`w-full h-[55px] sm:h-[52px] md:h-[54px] lg:h-[50px] border-2 sm:border-2 lg:border rounded-[12px] sm:rounded-[11px] lg:rounded-[10px] pl-5 sm:pl-6 lg:pl-7 text-[17px] sm:text-[18px] lg:text-[18px] font-serif text-[#264A3F] focus:outline-none transition-colors ${validationErrors.pinCode && isEditing
												? "border-red-500 focus:border-red-500"
												: isEditing
													? ""
													: "border-[#949494]"
											}`}
										disabled={!isEditing}
									/>
									{" "}
									{validationErrors.pinCode && isEditing && (
										<p className="text-red-500 text-sm mt-1 ml-1">
											{validationErrors.pinCode}
										</p>
									)}
									{" "}
								</div>
								{" "}
							</div>
							{" "}
						</div>
						{" "}
					</div>
					{" "}
				</div>
				{" "}
			</div>
			{" "}
		</>
	);
}

export default Profile;
