import { useState, useEffect } from "react";
import { getJewelriesByGemstoneType } from "../api/metalfilter";

/**
 * Custom hook to fetch jewelries by gemstone type with filters
 * @param {Object} filters - Filter parameters
 * @param {number} filters.page - Page number
 * @param {string} filters.jewelryType - Type of jewelry (e.g., "Ring")
 * @param {string} filters.gemstoneType - Gemstone type ID
 * @param {string} [filters.metal] - Optional metal filter (e.g., "gold")
 */
export const useJewelriesByGemstoneType = (filters) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!filters?.jewelryType || !filters?.gemstoneType) return; // don’t fetch if essential filters are missing

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const result = await getJewelriesByGemstoneType(filters);
				setData(result);
				////console.log("Result:", result);
			} catch (err) {
				console.error(err.response?.data || err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [filters]);

	return { data, loading, error };
};
