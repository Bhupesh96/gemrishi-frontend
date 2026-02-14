import { useState, useEffect } from "react";
import { getJewelryByFilter } from "../api/jewelryfilter";

/**
 * Custom hook to fetch jewelry by filter options.
 * @param {Object} filters - Filter options for API.
 * @param {string} [filters.jewelryType] - Type of jewelry (e.g., "Ring").
 * @param {string} [filters.productSubCategory] - Product subcategory ID (Mongo ID).
 * @param {string} [filters.metal] - Metal type (e.g., "Gold").
 * @param {number} [filters.page=1] - Page number.
 * @param {number} [filters.limit=10] - Items per page.
 */
export const useJewelryByFilter = (filters = {}) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// ✅ Destructure filters to prevent infinite loop
	const {
		page = 1,
		limit = 10,
		jewelryType,
		productSubCategory,
		metal,
	} = filters;

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await getJewelryByFilter({
					page,
					limit,
					jewelryType,
					productSubCategory,
					metal,
				});
				// console.log("Filtered jewelry:", res);
				if (isMounted) setData(res);
			} catch (err) {
				if (isMounted)
					setError(err.response?.data?.msg || "Failed to fetch jewelry data.");
			} finally {
				if (isMounted) setLoading(false);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [page, limit, jewelryType, productSubCategory, metal]); 

	return { data, loading, error };
};
