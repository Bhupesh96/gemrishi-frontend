"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Delete from "../../assets/DetailPage/Delete.svg";
import BlueSapphire from "../../assets/Stone/BlueSapphire.svg";
// import BlueSapphireJewellery from "../../components/BlueSapphireJewellery"; it was showing loading...
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItems, removeItemFromCart } from "../../redux/cartSlice";

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

// new function for UpSellingProducts
// function UpSellingProducts() {
//   const [products, setProducts] = useState([]); // it is an empty array initially

//   const getUpSelling = async () => {
//     const URL = import.meta.env.VITE_URL;
//     try {
//       const res = await axios.get(`${URL}/product/upselling-product-list/123`, {
//         withCredentials: true
//       });

//       setProducts(res.data);
//     } catch (error) {
//       toast.error("Something went wrong " + error);
//     }
//   }

//   useEffect(() => {
//     getUpSelling();
//   }, []);

//   return (
//     <div>
//       {/* <BlueSapphireJewellery /> */}
//       {Array.isArray(products) && products.slice(0, 4).map((p) => {
//         <div key={p._id}>
//           {p.name}
//         </div>
//       })}
//     </div>
//   );
// }

// function UpSellingProducts({ products = [], loading = false }) {
//   // const [products, setProducts] = useState([]); // it is an empty array initially

//   const getUpSelling = async () => {
//     const URL = import.meta.env.VITE_URL;
//     try {
//       const res = await axios.get(`${URL}/product/upselling-product-list/123545`, {
//         withCredentials: true
//       });

//       setProducts(res.data);
//     } catch (error) {
//       toast.error("Something went wrong " + error);
//     }
//   }

//   useEffect(() => {
//     getUpSelling();
//   }, []);

//   if (loading) return <div className="mt-6">Loading suggestions...</div>;

//   if (!Array.isArray(products) || products.length === 0) {
//     return <div className="mt-6 text-gray-600">No suggestions right now.</div>;
//   }

//   return (
//     <div className="mt-8 ml-25">
//       <h3 className="text-lg font-semibold mb-4 ml-5">You may also like</h3>
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
//         {products.slice(0, 4).map((p) => (
//           <div
//             key={p._id}
//             className="border rounded p-3 cursor-pointer hover:shadow-sm" // CHANGED: fixed typo "curosr-pointer" -> "cursor-pointer"
//             onClick={() => {
//               if (p && p._id)
//                 navigate(`/product/${p._id}`, { state: { product: p } }); // CHANGED: navigate on click
//             }}
//           >
//             <img
//               src={p.images?.[0]?.url || BlueSapphire}
//               alt={p.name || "suggested product"}
//               className="w-full h-32 object-cover mb-2"
//             />
//             <p className="text-sm font-medium">{p.name}</p>
//             <p className="text-sm">
//               Rs. {typeof p.price === "number" || typeof p.finalPrice === "number" ? (Number(p.price ?? p.finalPrice ?? 0)).toFixed(2) : (p.price ?? p.finalPrice ?? "-")}
//             </p> {/* CHANGED: safer price formatting */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function UpSellingProducts({ products = [], loading = false }) {
//   const navigate = useNavigate();

//   if (loading) {
//     return <div className="mt-6 text-gray-600">Loading suggestions...</div>;
//   }

//   if (!Array.isArray(products) || products.length === 0) {
//     return <div className="mt-6 text-gray-600">No suggestions right now.</div>;
//   }

//   return (
//     <div className="mt-10 px-4 sm:px-30">
//       <h3 className="text-lg font-semibold mb-4">
//         You may also like
//       </h3>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {products.slice(0, 4).map((p) => {
//           //navigating using names cause in model i dont have any choice
//           const displayName = p.type === "jewelryName" ? p.jewelryName : p.name;
//           const route = p.type === "jewelryName" ? `/details/product/${displayName.replace(/\s+/g, "-").toLowerCase()}` : `/gemstone/${displayName.replace(/\s+/g, "-").toLowerCase()}`;
//           <div
//             key={p._id}
//             className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition"
//             onClick={() => navigate(route)}
//           >
//             <img
//               src={p.images?.[0]?.url || BlueSapphire}
//               alt={p.name}
//               className="w-full h-32 object-cover rounded mb-2"
//             />

//             <p className="text-sm font-medium">{p.name}</p>
//             <p className="text-sm font-semibold text-gray-700">
//               Rs. {(p.finalPrice ?? p.price ?? 0).toFixed(2)}
//             </p>
//           </div>
//         })}
//       </div>
//     </div>
//   );
// }
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

          // const route = isJewelry
          //   ? `/details/product/${name.replace(/\s+/g, "-").toLowerCase()}`
          //   : `/gemstone/${name.replace(/\s+/g, "-").toLowerCase()}`;

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
              />
              <p className="text-sm font-medium">{name}</p>
              {/* <p className="text-sm font-semibold">
                Rs. {(p.finalPrice ?? p.price ?? 0).toFixed(2)}
              </p> */}
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
  // console.log("location", location?.state?.productId);
  const [products, setProducts] = useState([]);
  // add new by tejas
  const [upsellLoading, setUpsellLoading] = useState(true);

  // CHANGED: new effect - fetch upsell based on cart SKUs after cartData loads
  useEffect(() => {
    let mounted = true;

    const buildSkusFromCart = (cart) => {
      if (!Array.isArray(cart) || cart.length === 0) return [];
      console.log("cart", cart)
      return { id: cart[0].item?._id };
    };

    const fetchUpsellForSkus = async (skus, token) => {
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
          `${URL}/product/upselling-product-list/${skus.id}`, // CHANGED: POST route as per server
          {
            withCredentials: true // optional — enable if your server uses cookie auth
          }
        );

        // normalize common response shapes
        let data = [];
        if (Array.isArray(res.data)) data = res.data;
        else if (Array.isArray(res.data?.products)) data = res.data.products;
        else if (Array.isArray(res.data?.data)) data = res.data.data;
        else if (res.data && typeof res.data === "object" && res.data._id) data = [res.data];

        if (mounted) {
          setProducts(data);
          if (!Array.isArray(data) || data.length === 0) {
            console.warn("Upsell returned empty for SKUs:", skus);
          }
        }
      } catch (err) {
        console.error("Upsell fetch error:", err, err.response?.data || "");
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setUpsellLoading(false);
      }
    };

    (async () => {
      const skus = buildSkusFromCart(cartData);
      console.log("skus", skus)
      const userInfoString = localStorage.getItem("userInfo");
      let token = null;
      if (userInfoString) {
        try {
          token = JSON.parse(userInfoString).token;
        } catch (e) {
          // ignore parse error
        }
      }

      // If endpoint is protected, token is required — if missing, skip call
      if (!token) {
        // CHANGED: if no token, clear upsell and stop loading
        if (mounted) {
          setProducts([]);
          setUpsellLoading(false);
        }
        return;
      }

      await fetchUpsellForSkus(skus, token);
    })();

    return () => {
      mounted = false;
    };
  }, [URL, cartData]); // CHANGED: depends on cartData so upsell fetch runs after cart is loaded

  // यह सुनिश्चित करता है कि लोडिंग के दौरान कम से कम एक स्केलेटन दिखाई दे
  const initialCartCount = cartData?.length || 1;

  const fetchCartItems = async () => {
    const userInfoString = localStorage.getItem("userInfo");
    let userToken = null;

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        userToken = userInfo.token;
      } catch (e) {
        console.error("Failed to parse userInfo from localStorage", e);
      }
    }

    if (!userToken) {
      setLoading(false);
      // Login error is handled below, allowing for custom error message
      setError("Authentication Failed: Please log in to view your cart items.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${URL}/cart/get_all_cart_list?page=1&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
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
        // Specific message for login/session issues
        setError(
          "Session expired. Please log in again to securely access your cart."
        );
      } else if (err.response?.data?.message) {
        // Backend-specific error message
        setError(`Failed to retrieve cart: ${err.response.data.message}`);
      } else {
        // PROFESSIONAL MESSAGE FOR BACKEND/NETWORK FAILURE
        setError(
          "We are facing a temporary connection issue. Your cart items couldn't be loaded. Please try again in a moment."
        );
      }
    } finally {
      setLoading(false); // :check_mark: Loading set to false after fetch completes
    }
  };

  // :check_mark: FIXED handleRemoveItem function
  const handleRemoveItem = async (cartItemId) => {
    const userInfoString = localStorage.getItem("userInfo");
    let userToken = null;

    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        userToken = userInfo.token;
      } catch (e) {
        console.error("Failed to parse userInfo from localStorage", e);
      }
    }

    if (!userToken) {
      alert("You must be logged in to remove items.");
      navigate("/login");
      return;
    }

    // Set loading to true before removal to show loading state/skeleton
    setLoading(true);

    try {
      // :check_mark: Correct API endpoint for item removal
      await axios.delete(
        `${URL}/cart/remove_item_from_cart?cartItemId=${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log("Item removed successfully. Refreshing cart data.");
      // :check_mark: Dispatch Redux action to remove item by cartItemId for quick UI update
      dispatch(removeItemFromCart(cartItemId));

      // Fetch updated cart data from the server
      await fetchCartItems();
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      alert("An error occurred while removing the item. Please try again.");

      // In case of error, re-fetch the cart just to be safe and stop the loader
      await fetchCartItems();
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate totalAmount based on cartItem.totalPrice
  const totalAmount = cartData.reduce((total, cartItem) => {
    const itemTotalPrice = Number(cartItem.totalPrice) || 0; // CHANGED: safely coerce to number
    return total + itemTotalPrice;
  }, 0);

  // ---
  // 1. PROFESSIONAL ERROR HANDLING BLOCK
  // ---
  if (error && !loading) {
    // If it's a login issue, prompt login, otherwise prompt retry/refresh.
    const isAuthError =
      error.includes("log in") || error.includes("Authentication");

    return (
      <div className="w-full h-[500px] flex flex-col justify-center items-center py-20 text-center px-4">
        {/* Custom Icon based on error type */}
        {isAuthError ? (
          <svg
            className="w-12 h-12 text-blue-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-12 h-12 text-red-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )}

        <p className="text-gray-900 mb-4 text-xl font-bold">
          {isAuthError ? "Action Required" : "Something Went Wrong"}
        </p>
        <p className="text-gray-700 mb-6 text-lg max-w-md">{error}</p>
        <button
          onClick={() => (isAuthError ? navigate("/login") : fetchCartItems())}
          className="px-8 py-3 bg-[#264A3F] text-white rounded-lg font-medium hover:bg-[#1a3329] transition-colors shadow-lg"
        >
          {isAuthError ? "Go to Login Page" : "Try Again"}
        </button>
      </div>
    );
  }

  // ---
  // 2. EMPTY CART HANDLER
  // ---
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

  // ---
  // 3. MAIN CONTENT AND SKELETON DISPLAY
  // ---
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
              {/* ssdgsgsgs */}
              <h1 className="text-[20px] sm:text-[24px] ">
                Shopping Cart ({loading ? "..." : cartData.length}{" "}
                {cartData.length === 1 ? "Item" : "Items"})
              </h1>
            </div>

            <div className="space-y-10 mb-8">
              {/* Loading state: Now shows skeletons both on initial load and after delete while refreshing */}
              {loading
                ? Array.from({ length: initialCartCount }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))
                : cartData?.map((cartItem) => {
                  // Get Certificate Type
                  const certificateType =
                    cartItem.customization?.certificate?.certificateType;

                  const isJewelry = cartItem.itemType === "Jewelry";
                  const isProduct = cartItem.itemType === "Product";

                  const hasJewelryCustomization =
                    !!cartItem.customization?.jewelryId;

                  // MAIN NAME
                  let itemName = "Unnamed Item";

                  if (isJewelry) {
                    itemName = cartItem.item?.jewelryName;
                  } else if (isProduct) {
                    // gemstone only or gemstone + jewelry
                    if (hasJewelryCustomization) {
                      // combo → jewelry name as main
                      itemName = cartItem.customization.jewelryId.jewelryName;
                    } else {
                      // pure gemstone
                      itemName = cartItem.item?.name;
                    }
                  }

                  return (
                    <div
                      key={cartItem._id} // :check_mark: Use cartItem._id as the key for the container
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
                            {itemName}{" "}
                            {/* :check_mark: Display the correctly resolved name */}
                          </p>
                          <p className="text-[14px] sm:text-[16px] text-gray-600 mt-1">
                            Item ID: {cartItem.item?._id?.slice(-6)}
                          </p>
                          <p className="text-[14px] sm:text-[16px] text-gray-600">
                            Quantity: {cartItem.quantity}
                          </p>
                          {/* PURE JEWELRY */}
                          {isJewelry && (
                            <p className="text-sm text-gray-600">
                              Jewelry: {cartItem.item?.jewelryName}
                            </p>
                          )}

                          {/* PRODUCT → COMBO */}
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

                          {/* PRODUCT → PURE GEMSTONE */}
                          {isProduct && !hasJewelryCustomization && (
                            <p className="text-sm text-gray-600">
                              Gemstone: {cartItem.item?.name}
                            </p>
                          )}



                          {/* Display Certificate Type if available */}
                          {certificateType && (
                            <p className="text-[14px] sm:text-[16px] text-[#264A3F] font-medium mt-1">
                              Certificate: {certificateType}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full lg:w-1/4 mt-4 lg:mt-0 lg:pl-4">
                        {/* Display cartItem.totalPrice */}
                        <p className="text-[18px] sm:text-[20px] font-bold">
                          Rs. {Number(cartItem.totalPrice || 0).toFixed(2)} {/* CHANGED: safe formatting */}
                        </p>
                        <img
                          src={Delete}
                          alt="Delete item"
                          className="w-[20px] h-[22px] sm:w-[24.67px] sm:h-[27.75px] cursor-pointer"
                          // :check_mark: Passing the correct IDs for API call
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
                    Rs. {totalAmount.toFixed(2)} {/* CHANGED: safe formatting */}
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigate("/shipping/address", {
                      state: { productId: location?.state?.productId },
                    })
                  }
                  className="w-full max-w-[400px] h-[50px] sm:h-[60px] bg-[#264A3F] rounded-[10px] text-[18px] lg:text-[20px] text-[#FFFFFF] font-bold hover:bg-[#1a3329] transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>

        </div>
        {/* // here i want list of first 4 products */}
        <UpSellingProducts
          products={products}
          loading={upsellLoading} />
      </div>
    </>
  );
}

export default ShoppingCart;
