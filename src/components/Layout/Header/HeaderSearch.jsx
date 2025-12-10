import { Search } from "lucide-react";

export default function HeaderSearch({ query, setQuery, handleSearch, isOnHero }) {
  return (
    <div className="relative w-40">

      {/* icon ikut warna header */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2"
        strokeWidth={1.5}
        size={18}
      />

      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className={`
          w-full rounded-full py-1.5 pl-9 pr-3 text-sm transition
          ${isOnHero 
            ? "bg-white/20 text-white placeholder-white/50 border-white/40"
            : "bg-white text-black border-gray-300"
          }
        `}
      />
    </div>
  );
}
