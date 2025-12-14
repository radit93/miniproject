import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import SidebarFilter from "../components/SidebarFilter";
import ProductCard from "../components/Product/ProductCard";
import {
  searchProducts,
  searchProductsFiltered,
} from "../services/ProductService";

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchSearch();
  }, [q, params.toString()]);

  async function fetchSearch() {
    const filters = {
      grades: params.get("grades") ? params.get("grades").split(",") : [],
      price: params.get("price") || null,
    };

    const hasFilter = filters.grades.length > 0 || !!filters.price;

    let data = [];

    if (!hasFilter) {
      // MODE LAMA — search enter biasa
      data = await searchProducts(q);
    } else {
      // MODE BARU — search + filter
      data = await searchProductsFiltered(q, filters);
    }

    setProducts(data || []);
  }

  return (
    <div className="p-6 pt-28">
      {/* HEADER – SAMA PERSIS CATEGORY PAGE */}
      <div className="flex items-center gap-3 mb-4">
        <button
          className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="text-black" />
        </button>

        <h1 className="text-xl font-bold">
          Search: <span className="text-gray-500">"{q}"</span>
        </h1>
      </div>

      <div className="flex">
        {/* SIDEBAR FILTER */}
        <SidebarFilter />

        {/* GRID PRODUK */}
        <div className="flex-1">
          {products.length === 0 && (
            <p className="text-center">Tidak ada produk ditemukan.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
