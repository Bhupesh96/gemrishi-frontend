"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from "../../assets/DetailPage/Delete.svg";
import BlueSapphire from "../../assets/Stone/BlueSapphire.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItems, removeItemFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CartItemSkeleton = () => (
  <div className="w-full h-auto min-h-[150px] rounded-[20px] lg:rounded-[30px] border border-[#D3C7C7] p-4 flex flex-col lg:flex-row lg:items-center animate-pulse mb-8">
    <div className="flex items-start lg:items-center w-full lg:w-3/4">
      <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-lg bg-gray-200 flex-shrink-0"></div>
      <div className="flex-1 ml-4 space-y-3">
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="flex items-center justify-between w-full lg:w-1/4 mt-4 lg:mt-0 lg:pl-4">
      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
      <div className="w-[20px] h-[22px] sm:w-[24.67px] sm:h-[27.75px] bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

function UpSellingProducts({ products = [], loading = false }) {
  const navigate = useNavigate();

  if (loading) return <div className="mt-6">Loading suggestions...</div>;

  if (!products.length) {
    return <div className="mt-6 text-gray-600">No suggestions right now.</div>;
  }

  return (
    <div className="mt-10 px-4 sm:px-30">
      <h3 className="text-lg font-semibold mb-4">You may also like</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
        {products.slice(0, 4).map((p) => {
          const isJewelry = !p.jewelryName;
          const name = isJewelry ? p.slug : p.name;
          const slug = p.slug;
          const route = !isJewelry
            ? `/details/product/${slug}`
            : `/gemstones/${slug}`;

          return (
            <div
              key={p._id}
              className="border rounded-lg p-3 cursor-pointer hover:shadow-md"
              onClick={() => navigate(route)}
            >
              <img
                src={p.images?.[0]?.url || BlueSapphire}
                className="w-full h-32 object-cover rounded mb-2"
                alt={name}
              />
              <p className="text-sm font-medium">{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShoppingCart() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;
  const dispatch = useDispatch();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [upsellLoading, setUpsellLoading] = useState(true);

  // --- UPSELL LOGIC ---
  useEffect(() => {
    let mounted = true;
    const buildSkusFromCart = (cart) => {
      if (!Array.isArray(cart) || cart.length === 0) return [];
      return { id: cart[0].item?._id };
    };

    const fetchUpsellForSkus = async (skus) => {
      if (!mounted) return;
      if (!skus || skus.length === 0) {
        if (mounted) {
          setProducts([]);
          setUpsellLoading(false);
        }
        return;
      }

      try {
        if (mounted) setUpsellLoading(true);
        const res = await axios.get(
          `${URL}/product/upselling-product-list/${skus.id}`,
          { withCredentials: true },
        );
        let data = [];
        if (Array.isArray(res.data)) data = res.data;
        else if (Array.isArray(res.data?.products)) data = res.data.products;
        else if (Array.isArray(res.data?.data)) data = res.data.data;
        else if (res.data && typeof res.data === "object" && res.data._id)
          data = [res.data];

        if (mounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Upsell fetch error:", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setUpsellLoading(false);
      }
    };

    (async () => {
      const skus = buildSkusFromCart(cartData);
      if (!skus || !skus.id) {
        if (mounted) setUpsellLoading(false);
        return;
      }
      await fetchUpsellForSkus(skus);
    })();

    return () => {
      mounted = false;
    };
  }, [URL, cartData]);

  const initialCartCount = cartData?.length || 1;

  // --- FETCH CART ITEMS (USER OR GUEST) ---
  const fetchCartItems = async () => {
    const userInfoString = localStorage.getItem("userInfo");
    let userToken = null;

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        userToken = userInfo.token;
      } catch (e) {
        console.error("Failed to parse userInfo", e);
      }
    }

    // REMOVED THE BLOCK THAT RETURNS ERROR IF NO TOKEN
    // We allow guests to proceed.

    try {
      setLoading(true);
      setError(null);

      // Build Headers
      const headers = { "Content-Type": "application/json" };
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const response = await axios.get(
        `${URL}/cart/get_all_cart_list?page=1&limit=10`,
        {
          headers: headers,
          withCredentials: true, // ✅ IMPORTANT: Sends Guest Cookies
        },
      );

      console.log("Cart Items Response:", response.data);

      if (response.data?.success && response.data?.cart) {
        setCartData(response.data.cart);
        dispatch(setCartItems(response.data.cart));
      } else {
        setCartData([]);
        dispatch(setCartItems([]));
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);

      if (err.response?.status === 401) {
        setError("Please log in to view your cart items.");
      } else if (err.response?.data?.message) {
        setError(`Failed to retrieve cart: ${err.response.data.message}`);
      } else {
        setError("We are facing a temporary connection issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- REMOVE ITEM (USER OR GUEST) ---
  const handleRemoveItem = async (cartItemId) => {
    const userInfoString = localStorage.getItem("userInfo");
    let userToken = null;

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        userToken = userInfo.token;
      } catch (e) {}
    }

    // REMOVED THE BLOCK THAT ALERTS IF NO TOKEN

    setLoading(true);

    try {
      const headers = {};
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      await axios.delete(
        `${URL}/cart/remove_item_from_cart?cartItemId=${cartItemId}`,
        {
          headers: headers,
          withCredentials: true, // ✅ Allow Guest Cookies
        },
      );

      dispatch(removeItemFromCart(cartItemId));
      await fetchCartItems();
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      alert("An error occurred while removing the item. Please try again.");
      await fetchCartItems();
    }
  };

  // --- PROCEED TO CHECKOUT (GATEKEEPER) ---
  const handleProceedToCheckout = () => {
    const userInfoString = localStorage.getItem("userInfo");
    let userToken = null;

    if (userInfoString) {
      try {
        userToken = JSON.parse(userInfoString).token;
      } catch (e) {}
    }

    if (userToken) {
      // User is Logged In -> Proceed
      navigate("/shipping/address", {
        state: { productId: location?.state?.productId },
      });
    } else {
      // User is Guest -> Prompt Login
      toast.info("Please Login to Checkout", {
        position: "top-center",
        autoClose: 3000,
      });
      // Optional: Redirect to login page if you have one, or open modal
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalAmount = cartData.reduce((total, cartItem) => {
    const itemTotalPrice = Number(cartItem.totalPrice) || 0;
    return total + itemTotalPrice;
  }, 0);

  // --- ERROR DISPLAY ---
  if (error && !loading) {
    const isAuthError =
      error.includes("log in") || error.includes("Authentication");
    return (
      <div className="w-full h-[500px] flex flex-col justify-center items-center py-20 text-center px-4">
        <svg
          className="w-12 h-12 text-red-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="text-gray-900 mb-4 text-xl font-bold">
          {isAuthError ? "Access Denied" : "Something Went Wrong"}
        </p>
        <p className="text-gray-700 mb-6 text-lg max-w-md">{error}</p>
        <button
          onClick={() => fetchCartItems()}
          className="px-8 py-3 bg-[#264A3F] text-white rounded-lg font-medium hover:bg-[#1a3329] transition-colors shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  // --- EMPTY CART ---
  if (!loading && (!cartData || cartData.length === 0)) {
    return (
      <div className="w-full h-[500px] flex flex-col justify-center items-center py-20">
        <p className="text-gray-600 text-xl mb-4">
          Your cart is empty. Let's find some treasures!
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#264A3F] text-white rounded-lg hover:bg-[#1a3329] transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-auto">
        <div className="w-full h-[50px] sm:h-[70px] px-4 sm:px-30 flex items-center">
          <p
            className="text-[18px] sm:text-[22px] text-[#444445] cursor-pointer"
            onClick={() => navigate(-1)}
          >
            &lt; Continue Shopping
          </p>
        </div>

        <div className="w-full px-4 sm:px-30">
          <div className="w-full h-auto">
            <div className="w-full h-[50px] sm:h-[65px] mb-4">
              <h1 className="text-[20px] sm:text-[24px] ">
                Shopping Cart ({loading ? "..." : cartData.length}{" "}
                {cartData.length === 1 ? "Item" : "Items"})
              </h1>
            </div>

            <div className="space-y-10 mb-8">
              {loading
                ? Array.from({ length: initialCartCount }).map((_, index) => (
                    <CartItemSkeleton key={index} />
                  ))
                : cartData?.map((cartItem) => {
                    const certificateType =
                      cartItem.customization?.certificate?.certificateType;
                    const isJewelry = cartItem.itemType === "Jewelry";
                    const isProduct = cartItem.itemType === "Product";
                    const hasJewelryCustomization =
                      !!cartItem.customization?.jewelryId;

                    let itemName = "Unnamed Item";
                    if (isJewelry) itemName = cartItem.item?.jewelryName;
                    else if (isProduct) {
                      itemName = hasJewelryCustomization
                        ? cartItem.customization.jewelryId.jewelryName
                        : cartItem.item?.name;
                    }

                    return (
                      <div
                        key={cartItem._id}
                        className="w-full h-auto min-h-[150px] rounded-[20px] lg:rounded-[30px] border border-[#D3C7C7] p-4 flex flex-col lg:flex-row lg:items-center"
                      >
                        <div className="flex items-start lg:items-center w-full lg:w-3/4">
                          <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={
                                cartItem.item?.images?.[0]?.url || BlueSapphire
                              }
                              alt={itemName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 ml-4">
                            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-semibold">
                              {itemName}
                            </p>
                            <p className="text-[14px] sm:text-[16px] text-gray-600 mt-1">
                              Item ID: {cartItem.item?._id?.slice(-6)}
                            </p>
                            <p className="text-[14px] sm:text-[16px] text-gray-600">
                              Quantity: {cartItem.quantity}
                            </p>

                            {isJewelry && (
                              <p className="text-sm text-gray-600">
                                Jewelry: {cartItem.item?.jewelryName}
                              </p>
                            )}

                            {isProduct && hasJewelryCustomization && (
                              <>
                                <p className="text-sm text-gray-600">
                                  Jewelry:{" "}
                                  {
                                    cartItem.customization.jewelryId
                                      ?.jewelryName
                                  }
                                </p>
                                <p className="text-sm text-gray-600">
                                  Gemstone: {cartItem.item?.name}
                                </p>
                              </>
                            )}

                            {isProduct && !hasJewelryCustomization && (
                              <p className="text-sm text-gray-600">
                                Gemstone: {cartItem.item?.name}
                              </p>
                            )}

                            {certificateType && (
                              <p className="text-[14px] sm:text-[16px] text-[#264A3F] font-medium mt-1">
                                Certificate: {certificateType}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full lg:w-1/4 mt-4 lg:mt-0 lg:pl-4">
                          <p className="text-[18px] sm:text-[20px] font-bold">
                            Rs. {Number(cartItem.totalPrice || 0).toFixed(2)}
                          </p>
                          <img
                            src={Delete}
                            alt="Delete item"
                            className="w-[20px] h-[22px] sm:w-[24.67px] sm:h-[27.75px] cursor-pointer"
                            onClick={() => handleRemoveItem(cartItem._id)}
                          />
                        </div>
                      </div>
                    );
                  })}
            </div>

            {!loading && cartData.length > 0 && (
              <div className="w-full h-auto bg-[#F4F4F4] rounded-[20px] p-6 mb-10 shadow-md flex flex-col items-end">
                <div className="w-full flex justify-between items-center mb-4">
                  <h2 className="text-[20px] sm:text-[24px] font-bold">
                    Subtotal
                  </h2>
                  <p className="text-[20px] sm:text-[24px] font-bold">
                    Rs. {totalAmount.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full max-w-[400px] h-[50px] sm:h-[60px] bg-[#264A3F] rounded-[10px] text-[18px] lg:text-[20px] text-[#FFFFFF] font-bold hover:bg-[#1a3329] transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
        <UpSellingProducts products={products} loading={upsellLoading} />
      </div>
    </>
  );
}

export default ShoppingCart;
