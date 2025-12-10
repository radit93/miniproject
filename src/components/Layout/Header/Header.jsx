// src/components/Layout/Header/Header.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";

import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import HeaderIcons from "./HeaderIcons";
import { useSearch } from "../../../context/SearchContext";
import { RightSidebar } from "../../SideBar/RightSidebar";

import Cart from "../../../pages/Cart";
import Wishlist from "../../../pages/Wishlist";

export default function Header({ isOnHero }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setSearchQuery } = useSearch();

  const [sidebar, setSidebar] = useState(null);
  const [query, setQuery] = useState("");

  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const handleTyping = (value) => {
    setQuery(value);
    if (value.trim() === "") return setSearchQuery("");
    setSearchQuery(value);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") setSearchQuery(query);
  };

  // SCROLL DOWN → HIDE, SCROLL UP → SHOW
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300

          ${hidden ? "-translate-y-full" : "translate-y-0"}

          bg-transparent
          ${isOnHero ? "text-white" : "text-black"}
        `}
      >
        <div className="flex items-center justify-between px-8 py-4">
          <div
            className="font-bold text-xl cursor-pointer relative -top-1"
            onClick={() => {
              navigate("/");
              setQuery("");
              setSearchQuery("");
            }}
          >
            Kavva
          </div>

          <HeaderNav isOnHero={isOnHero} />

          <div className="flex items-center gap-4">
            <HeaderSearch
              query={query}
              setQuery={handleTyping}
              handleSearch={handleSearch}
              isOnHero={isOnHero}
            />

            <HeaderIcons
              user={user}
              setSidebar={setSidebar}
              isOnHero={isOnHero}
            />
          </div>
        </div>
      </header>

      <RightSidebar open={sidebar !== null} onClose={() => setSidebar(null)}>
        {sidebar === "cart" && <Cart />}
        {sidebar === "wishlist" && <Wishlist />}
      </RightSidebar>
    </>
  );
}
