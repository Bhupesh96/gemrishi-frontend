import axios from "axios";

const API_URL = import.meta.env.VITE_URL;

/**
 * Fetch jewelries filtered by type, subcategory, or metal.
 * @param {Object} params - Filter parameters
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.limit=10] - Limit per page
 * @param {string} [params.jewelryType] - Jewelry type (e.g., "Ring")
 * @param {string} [params.productSubCategory] - Product subcategory ID (Mongo ID)
 * @param {string} [params.metal] - Metal type (e.g., "Gold")
 * @returns {Promise<Object>} - Response data from API
 */
export const getJewelryByFilter = async ({
	page = 1,
	limit = 10,
	jewelryType,
	productSubCategory,
	metal,
}) => {
	try {
		const response = await axios.get(`${API_URL}/jewelry/jewelry-by-filter`, {
			params: {
				page,
				limit,
				jewelryType,
				productSubCategory,
				metal,
			},
		});

		return response.data;
	} catch (error) {
		console.error(
			"Error fetching jewelry by filter:",
			error.response?.data || error.message
		);
		throw error;
	}
};
