"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setWishlist } from "../redux/wishlistSlice";

// MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Components & Hooks
import ProfileDropdown from "./profiledropdown";
import CategoryModal from "../pages/HomeModal/CategoryModal";
import JewelleryModal from "../pages/HomeModal/JewelleryModal";
import { useGetWish } from "../hooks/usegetwish";

// ==============================================================================
// 1. Skeleton Loader
// ==============================================================================
const NavbarSkeleton = () => (
  <div className="w-full flex flex-col bg-white animate-pulse">
    <div className="h-[40px] w-full bg-gray-50 border-b border-gray-200"></div>
    <div className="h-[70px] w-full bg-white border-b border-gray-200 flex justify-between items-center px-4 md:px-8">
      <div className="w-[100px] h-[40px] bg-gray-200 rounded"></div>
      <div className="hidden lg:flex gap-8">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
);

// ==============================================================================
// 2. Typewriter Component
// ==============================================================================
const TypewriterText = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["Natural", "Astrologically Matched", "Hand Selected"];

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    if (!isDeleting) {
      if (currentIndex < currentWord.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsDeleting(true), 2000);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [currentIndex, currentWordIndex, isDeleting, words]);

  return (
    <div className="text-sm font-medium text-[#264A3F] flex items-center min-w-[220px]">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {displayText}
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 text-[#264A3F]"
      >
        |
      </motion.span>
    </div>
  );
};

// ==============================================================================
// 3. Premium Dropdown Wrapper (Desktop)
// ==============================================================================
const PremiumDropdown = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 z-[100] cursor-default"
    >
      <div className="relative">
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100 z-20"></div>
        <div className="relative bg-white rounded-sm shadow-[0_20px_40px_-10px_rgba(38,74,63,0.1)] border border-gray-100 min-w-[260px] w-max overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#264A3F]/10"></div>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// ==============================================================================
// 4. Main Navbar Component
// ==============================================================================
export default function Navbar({ handleLoginClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;

  // -- State --
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Search States
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchBarRef = useRef(null);

  // Mobile States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);

  // -- Redux Data --
  const { wishlist, loading: isWishlistLoading } = useGetWish();
  const user = useSelector((state) => state.auth.userInfo);
  const insufficientStock = useSelector(
    (state) => state.cart.insufficientStock,
  );
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const isLoggedIn = Boolean(user);

  const [isDataLoading, setIsDataLoading] = useState(true);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNavOpen]);

  useEffect(() => {
    if (!isWishlistLoading) setIsDataLoading(false);
  }, [isWishlistLoading]);

  useEffect(() => {
    if (wishlist?.length && !isWishlistLoading) {
      dispatch(setWishlist(wishlist));
    }
  }, [wishlist, dispatch, isWishlistLoading]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsResultsVisible(false);
        setIsSearchBarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -- Handlers --
  const handleLogout = async () => {
    try {
      await axios.post(`${URL}/user/logout`, {}, { withCredentials: true });
      localStorage.removeItem("userInfo");
      dispatch({ type: "auth/clearUser" });
      navigate("/");
      setIsNavOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev);
    if (isSearchBarVisible) {
      setSearchQuery("");
      setSearchResults([]);
      setIsResultsVisible(false);
    }
  };

  const handleFullSearch = useCallback(
    (query) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery !== "") {
        navigate(`/search-results?keyword=${encodeURIComponent(trimmedQuery)}`);
        setSearchQuery("");
        setSearchResults([]);
        setIsResultsVisible(false);
        setIsSearchBarVisible(false);
      }
    },
    [navigate],
  );

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFullSearch(searchQuery);
    }
  };

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (!isSearchBarVisible || trimmedQuery === "") {
      setSearchResults([]);
      setIsResultsVisible(false);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      setIsSearching(true);
      setHasSearched(true);
      axios
        .get(`${URL}/product/search?keyword=${trimmedQuery}`)
        .then((res) => {
          const products = res.data?.products?.length
            ? res.data.products
            : res.data?.jeweleries?.length
              ? res.data.jeweleries
              : [];
          setSearchResults(products);
          setIsResultsVisible(true);
          setIsSearching(false);
        })
        .catch((err) => {
          setSearchResults([]);
          setIsResultsVisible(true);
          setIsSearching(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, URL, isSearchBarVisible]);

  const formatPrice = (price) =>
    `₹${Number(price)?.toLocaleString("en-IN") || "0"}`;

  const SearchResultsDropdown = () => {
    const trimmedQuery = searchQuery.trim();
    const showNoResults =
      !isSearching &&
      hasSearched &&
      searchResults.length === 0 &&
      trimmedQuery !== "";

    const isJewelry = (item) => !!item.jewelryName;
    const getName = (item) => (isJewelry(item) ? item.jewelryName : item.name);
    const getPrice = (item) =>
      isJewelry(item) ? item.jewelryPrice : item.price;
    const handleClick = (item) => {
      const slug = item.slug || item._id;
      navigate(
        isJewelry(item) ? `/details/product/${slug}` : `/gemstones/${slug}`,
      );
      setIsResultsVisible(false);
      setSearchQuery("");
      setIsSearchBarVisible(false);
    };

    return (
      <div className="absolute top-[115%] right-0 w-[300px] sm:w-[350px] bg-white border border-gray-100 rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-[100]">
        {isSearching && (
          <div className="p-4 text-center text-sm text-gray-500">
            Searching...
          </div>
        )}
        {!isSearching && searchResults.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-50">
              Results ({searchResults.length})
            </div>
            {searchResults.map((item) => (
              <div
                key={item._id}
                onClick={() => handleClick(item)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
              >
                <img
                  src={
                    item.images?.[0]?.url || item.image || "/placeholder.svg"
                  }
                  alt=""
                  className="w-10 h-10 rounded-md object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {getName(item)}
                  </p>
                  <p className="text-xs text-[#264A3F] font-semibold">
                    {formatPrice(getPrice(item))}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
        {showNoResults && (
          <div className="p-4 text-center text-sm text-gray-500">
            No results found.
          </div>
        )}
      </div>
    );
  };

  if (isDataLoading) return <NavbarSkeleton />;

  return (
    <header className="w-full relative  font-sans">
      {/* 1. TOP BAR (Hidden on Mobile) */}
      <div className="hidden lg:block w-full bg-gray-50 border-b border-gray-200 px-8 py-2 text-xs text-gray-600">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-1">
              <span className="text-[#264A3F] font-bold">●</span> Free Shipping
              All Over India
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <span className="text-[#264A3F] font-bold">●</span> 10 Day No
              Hassle Returns
            </span>
          </div>
          <div className="flex items-center gap-6">
            <TypewriterText />
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <span>Need Help?</span>
              <span className="text-[#264A3F]">+91 98179 75978</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-[50] shadow-sm">
        <div className="container mx-auto px-4 sm:px-8 h-[60px] lg:h-[75px] flex items-center justify-between">
          {/* A. LOGO */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/GemRishi.svg"
              alt="GemRishi"
              className="h-[35px] lg:h-[65px] w-auto object-contain hover:opacity-95 transition-opacity"
            />
          </div>

          {/* B. DESKTOP NAV (Added missing links here) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center px-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              <li
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-[#264A3F] transition-colors cursor-pointer"
                onClick={() => navigate("/")}
              >
                HOME
              </li>

              {/* Gemstones */}
              <li
                className="relative h-[75px] flex items-center group cursor-pointer"
                onMouseEnter={() => setHoveredMenu("gemstones")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-1 text-sm font-semibold tracking-wide text-gray-700 group-hover:text-[#264A3F] transition-colors">
                  GEMSTONES{" "}
                  <KeyboardArrowDownIcon
                    className={`w-4 h-4 transition-transform ${hoveredMenu === "gemstones" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {hoveredMenu === "gemstones" && (
                    <PremiumDropdown>
                      <CategoryModal
                        onHover={() => setHoveredMenu("gemstones")}
                        onMouseLeave={() => setHoveredMenu(null)}
                        setIsGemstonesHovered={() => {}}
                        closeNavbar={() => {}}
                      />
                    </PremiumDropdown>
                  )}
                </AnimatePresence>
              </li>

              {/* Jewellery */}
              <li
                className="relative h-[75px] flex items-center group cursor-pointer"
                onMouseEnter={() => setHoveredMenu("jewellery")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div className="flex items-center gap-1 text-sm font-semibold tracking-wide text-gray-700 group-hover:text-[#264A3F] transition-colors">
                  JEWELLERY{" "}
                  <KeyboardArrowDownIcon
                    className={`w-4 h-4 transition-transform ${hoveredMenu === "jewellery" ? "rotate-180" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {hoveredMenu === "jewellery" && (
                    <PremiumDropdown>
                      <JewelleryModal
                        onHover={() => setHoveredMenu("jewellery")}
                        onMouseLeave={() => setHoveredMenu(null)}
                        closeNavbar={() => {}}
                      />
                    </PremiumDropdown>
                  )}
                </AnimatePresence>
              </li>

              {/* ADDED: OUR BLOGS */}
              <li
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-[#264A3F] transition-colors cursor-pointer"
                onClick={() => window.open("https://gemrishi.com/our-blog")}
              >
                BLOGS
              </li>

              <li
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-[#264A3F] transition-colors cursor-pointer"
                onClick={() => navigate("/suggest")}
              >
                SUGGESTION
              </li>

              <li
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-[#264A3F] transition-colors cursor-pointer"
                onClick={() => navigate("/aboutUs")}
              >
                ABOUT
              </li>

              {/* ADDED: CONTACT US */}
              <li
                className="text-sm font-semibold tracking-wide text-gray-700 hover:text-[#264A3F] transition-colors cursor-pointer"
                onClick={() => navigate("/contactUs")}
              >
                CONTACT
              </li>
            </ul>
          </nav>

          {/* C. RIGHT ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-5" ref={searchBarRef}>
            {/* Search Bar */}
            <motion.div
              initial={false}
              animate={{
                width: isSearchBarVisible
                  ? window.innerWidth < 640
                    ? 160
                    : 240
                  : 40,
              }}
              className={`flex items-center bg-gray-50 rounded-full border ${isSearchBarVisible ? "border-[#264A3F] px-3" : "border-transparent p-0 justify-center"} h-[36px] lg:h-[40px] transition-all overflow-hidden cursor-pointer`}
              onClick={() => !isSearchBarVisible && toggleSearchBar()}
            >
              {isSearchBarVisible && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  autoFocus
                />
              )}
              <SearchIcon
                className="text-gray-600 hover:text-[#264A3F]"
                style={{ fontSize: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  isSearchBarVisible
                    ? handleFullSearch(searchQuery)
                    : toggleSearchBar();
                }}
              />
            </motion.div>
            {isResultsVisible && <SearchResultsDropdown />}

            {/* Cart */}
            {!insufficientStock && (
              <div
                className="relative group cursor-pointer"
                onClick={() => navigate("/shopping/cart")}
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-50 hover:bg-[#264A3F] flex items-center justify-center transition-colors group-hover:text-white text-gray-700">
                  <ShoppingCartOutlinedIcon style={{ fontSize: 20 }} />
                </div>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gray-50 hover:bg-[#264A3F] flex items-center justify-center transition-colors group-hover:text-white text-gray-700">
                <FavoriteBorderOutlinedIcon style={{ fontSize: 20 }} />
              </div>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth / Profile */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <ProfileDropdown user={user} handleLogout={handleLogout} />
              ) : (
                <button
                  className="px-5 py-2 bg-[#264A3F] text-white rounded-lg text-sm font-medium shadow-md hover:bg-[#1e3a30] transition-all transform active:scale-95"
                  onClick={handleLoginClick}
                >
                  Log In
                </button>
              )}
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="lg:hidden ml-1">
              <button
                onClick={toggleNav}
                className="text-[#264A3F] focus:outline-none p-1"
              >
                {isNavOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE SLIDE-IN MENU (DRAWER) */}
        <AnimatePresence>
          {isNavOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNavOpen(false)}
                className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
              />

              {/* The Drawer Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white z-[100] shadow-2xl overflow-y-auto lg:hidden"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <img
                    src="/GemRishi.svg"
                    alt="Logo"
                    className="h-[35px] w-auto"
                  />
                  <button
                    onClick={() => setIsNavOpen(false)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <CloseIcon />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-4 flex flex-col h-[calc(100%-80px)] justify-between">
                  <nav className="flex flex-col gap-2">
                    {/* Home */}
                    <div
                      className="p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3"
                      onClick={() => {
                        navigate("/");
                        setIsNavOpen(false);
                      }}
                    >
                      Home
                    </div>

                    {/* Mobile Gemstones Accordion */}
                    <div className="border-b border-gray-50">
                      <div
                        className="flex items-center justify-between p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() =>
                          setMobileMenuOpen(
                            mobileMenuOpen === "gemstones" ? null : "gemstones",
                          )
                        }
                      >
                        <span>Gemstones</span>
                        <KeyboardArrowDownIcon
                          className={`w-5 h-5 text-gray-400 transition-transform ${mobileMenuOpen === "gemstones" ? "rotate-180" : ""}`}
                        />
                      </div>
                      <AnimatePresence>
                        {mobileMenuOpen === "gemstones" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                          >
                            <div className="p-2">
                              <CategoryModal
                                onHover={() => {}}
                                onMouseLeave={() => {}}
                                setIsGemstonesHovered={() => {}}
                                closeNavbar={() => setIsNavOpen(false)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile Jewellery Accordion */}
                    <div className="border-b border-gray-50">
                      <div
                        className="flex items-center justify-between p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() =>
                          setMobileMenuOpen(
                            mobileMenuOpen === "jewellery" ? null : "jewellery",
                          )
                        }
                      >
                        <span>Jewellery</span>
                        <KeyboardArrowDownIcon
                          className={`w-5 h-5 text-gray-400 transition-transform ${mobileMenuOpen === "jewellery" ? "rotate-180" : ""}`}
                        />
                      </div>
                      <AnimatePresence>
                        {mobileMenuOpen === "jewellery" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                          >
                            <div className="p-2">
                              <JewelleryModal
                                onHover={() => {}}
                                onMouseLeave={() => {}}
                                closeNavbar={() => setIsNavOpen(false)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ADDED: Blogs */}
                    <div
                      className="p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        window.open("https://gemrishi.com/our-blog");
                        setIsNavOpen(false);
                      }}
                    >
                      Our Blogs
                    </div>

                    <div
                      className="p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        navigate("/suggest");
                        setIsNavOpen(false);
                      }}
                    >
                      Gem Suggestion
                    </div>

                    <div
                      className="p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        navigate("/aboutUs");
                        setIsNavOpen(false);
                      }}
                    >
                      About Us
                    </div>

                    {/* ADDED: Contact Us */}
                    <div
                      className="p-3 text-gray-800 font-semibold hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        navigate("/contactUs");
                        setIsNavOpen(false);
                      }}
                    >
                      Contact Us
                    </div>
                  </nav>

                  {/* Bottom Action (Log In / Profile) */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    {isLoggedIn ? (
                      <div
                        className="flex items-center gap-3 p-3 bg-[#264A3F]/5 rounded-xl cursor-pointer"
                        onClick={() => navigate("/personal/profile")}
                      >
                        <div className="w-10 h-10 bg-[#264A3F] rounded-full flex items-center justify-center text-white">
                          <PersonOutlineIcon />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#264A3F]">
                            {user?.name || "My Account"}
                          </p>
                          <p className="text-xs text-gray-500">View Profile</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="w-full py-3 bg-[#264A3F] text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                        onClick={() => {
                          handleLoginClick();
                          setIsNavOpen(false);
                        }}
                      >
                        Log In / Sign Up
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
