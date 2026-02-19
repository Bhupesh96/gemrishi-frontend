"use client";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";

function Form() {
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------ State Management ------------------
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
  const [isFetchingPin, setIsFetchingPin] = useState(false);

  // ------------------ Dynamic Country/State/City Data ------------------
  const allCountriesData = Country.getAllCountries();
  const allCountries = allCountriesData.map((c) => c.name);

  const selectedCountryObj = allCountriesData.find(
    (c) => c.name === formData.address.country,
  );
  const countryIso = selectedCountryObj?.isoCode;

  const allStatesData = countryIso ? State.getStatesOfCountry(countryIso) : [];
  const availableStates = allStatesData.map((s) => s.name);

  const selectedStateObj = allStatesData.find(
    (s) => s.name === formData.address.state,
  );
  const stateIso = selectedStateObj?.isoCode;

  const availableCities =
    countryIso && stateIso
      ? City.getCitiesOfState(countryIso, stateIso).map((c) => c.name)
      : [];

  // ✅ Fallback: If API returns a state/city not perfectly matched in the library, add it to the list
  if (
    formData.address.state &&
    !availableStates.includes(formData.address.state)
  ) {
    availableStates.unshift(formData.address.state);
  }
  if (
    formData.address.city &&
    !availableCities.includes(formData.address.city)
  ) {
    availableCities.unshift(formData.address.city);
  }

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

  // ------------------ Auto-fill via PIN Code ------------------
  useEffect(() => {
    const fetchPinCodeData = async () => {
      const pin = formData.address.pinCode;

      if (pin.length === 6) {
        setIsFetchingPin(true);
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${pin}`,
          );
          const data = await response.json();

          if (data && data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];

            // Try to find an exact match in the library to avoid case-sensitivity issues
            const fetchedState = postOffice.State;
            const libraryStateMatch =
              State.getStatesOfCountry("IN").find(
                (s) => s.name.toLowerCase() === fetchedState.toLowerCase(),
              )?.name || fetchedState;

            setFormData((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                country:
                  postOffice.Country === "India"
                    ? "India"
                    : prev.address.country,
                state: libraryStateMatch,
                district: postOffice.District,
                city:
                  postOffice.Block || postOffice.Region || prev.address.city,
              },
            }));

            setErrors((prev) => ({
              ...prev,
              country: "",
              state: "",
              city: "",
              district: "",
            }));
          }
        } catch (error) {
          console.error("Error fetching PIN code data:", error);
        } finally {
          setIsFetchingPin(false);
        }
      }
    };

    fetchPinCodeData();
  }, [formData.address.pinCode]);

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
    addressLine1: (v) =>
      !v.trim()
        ? "Address Line 1 is required."
        : v.length < 10
          ? "Address must be at least 10 characters."
          : "",
    pinCode: (v) =>
      !v.trim()
        ? "Postal Code is required."
        : !/^[0-9]{6}$/.test(v)
          ? "Enter a valid 6-digit postal code."
          : "",
    country: (v) => (!v ? "Country selection is required." : ""),
    state: (v) => (!v ? "State selection is required." : ""),
    city: (v) => (!v ? "City selection is required." : ""),
    district: (v) => (!v.trim() ? "District is required." : ""),
    terms: (v) =>
      !v ? "You must agree to the Terms & Conditions to proceed." : "",
  };

  // ------------------ Handlers ------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];

      setFormData((prev) => {
        const newAddress = { ...prev.address, [key]: value };

        if (key === "country" && prev.address.country !== value) {
          newAddress.state = "";
          newAddress.city = "";
        } else if (key === "state" && prev.address.state !== value) {
          newAddress.city = "";
        }

        return { ...prev, address: newAddress };
      });
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
    navigate("/review_And/confirm/details", {
      state: { productId: location?.state?.productId },
    });
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

      {/* Row 1: Full Name & Mobile */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
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

      {/* Row 2: Email */}
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

      {/* ✅ Row 3: Address & Postal Code combined in one row */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4 relative">
        {/* Address takes up more space (2/3 width on large screens) */}
        <div className="w-full sm:w-2/3">
          <InputField
            label="Address Line 1"
            name="address.addressLine1"
            value={formData.address.addressLine1}
            onChange={handleChange}
            error={errors.addressLine1}
          />
        </div>

        {/* Postal Code takes up remaining space (1/3 width on large screens) */}
        <div className="w-full sm:w-1/3 relative">
          <InputField
            label="Postal Code (PIN)"
            name="address.pinCode"
            value={formData.address.pinCode}
            onChange={handleChange}
            error={errors.pinCode}
          />
          {isFetchingPin && (
            <span className="absolute right-3 top-[45px] text-sm text-[#264A3F] animate-pulse font-semibold">
              Locating...
            </span>
          )}
        </div>
      </div>

      {/* Row 4: Country & State */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <SelectField
          label="Country"
          name="address.country"
          value={formData.address.country}
          options={allCountries}
          onChange={handleChange}
          error={errors.country}
        />
        <SelectField
          label="State"
          name="address.state"
          value={formData.address.state}
          options={availableStates}
          onChange={handleChange}
          error={errors.state}
        />
      </div>

      {/* Row 5: City & District */}
      <div className="flex flex-col sm:flex-row gap-6 mt-4">
        <SelectField
          label="City"
          name="address.city"
          value={formData.address.city}
          options={availableCities}
          onChange={handleChange}
          error={errors.city}
        />
        <InputField
          label="District"
          name="address.district"
          value={formData.address.district}
          onChange={handleChange}
          error={errors.district}
        />
      </div>

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
              rel="noopener noreferrer"
            >
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
          className="w-full max-w-[458px] h-[60px] bg-[#264A3F] rounded-[10px] text-lg sm:text-xl font-bold text-white cursor-pointer hover:bg-[#1f3d34] transition-colors"
          variants={shakeVariants}
          animate={isShaking ? "shake" : ""}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}

// ------------------ Reusable Components ------------------
const InputField = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className="w-full flex flex-col">
    <label className="text-lg text-[#666464] mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`h-[53px] border rounded-[10px] pl-3 text-lg outline-none transition-shadow focus:ring-2 focus:ring-[#264A3F] ${
        error ? "border-red-500" : "border-[#AEABAB]"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, options, onChange, error }) => (
  <div className="w-full flex flex-col">
    <label className="text-lg text-[#666464] mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`h-[53px] border rounded-[10px] pl-3 text-lg outline-none transition-shadow focus:ring-2 focus:ring-[#264A3F] bg-white ${
        error ? "border-red-500" : "border-[#AEABAB]"
      }`}
    >
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
