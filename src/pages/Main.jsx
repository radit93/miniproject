// src/pages/Main.jsx
import "../App.css";
import ProductCarousel from "../components/Product/ProductCarousel";
import SectionTitle from "../components/Product/SectionTitle";
import Container from "../components/Layout/Container/Container";
import HeroCarousel from "../components/HeroCarousel";
import Header from "../components/Layout/Header/Header";

import { useEffect, useState, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import { searchProducts } from "../services/ProductService";
import ProductCard from "../components/Product/ProductCard";

function Main() {
  const heroRef = useRef(null);
  const [isOnHero, setIsOnHero] = useState(true);

  const { searchQuery } = useSearch();
  const [results, setResults] = useState([]);

  // DETEKSI HERO: selama hero masih kelihatan di viewport, isOnHero = true
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnHero(entry.isIntersecting);
      },
      { threshold: 0.2 } // kalau 20% hero masih kelihatan, kita anggap masih di hero
    );

    observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function run() {
      if (!searchQuery || searchQuery.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const res = await searchProducts(searchQuery);
        setResults(res);
      } catch (err) {
        console.log("Search error:", err);
      }
    }

    run();
  }, [searchQuery]);

  const isSearching = searchQuery.trim() !== "";

  return (
    <div className="bg-white min-h-screen w-full overflow-x-hidden flex flex-col">

      {/* HEADER SEKARANG DIKASIH INFO isOnHero */}
      <Header isOnHero={isOnHero} />

      <main className="flex-1 w-full text-gray-800">
        {/* HERO PUNYA ref */}
        <HeroCarousel ref={heroRef} />

        <Container>
          {isSearching ? (
            <>
              <h2 className="text-xl font-bold mb-6 text-center">
                Hasil pencarian: "{searchQuery}"
              </h2>

              {results.length === 0 && (
                <p className="text-center text-gray-500 mb-6">
                  Tidak ada produk ditemukan.
                </p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {results.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </>
          ) : (
            <>

              <SectionTitle title="Nike" link="/category/nike" />
              <ProductCarousel brandSlug="nike" />

              <SectionTitle title="Puma" link="/category/puma" />
              <ProductCarousel brandSlug="puma" />

              <SectionTitle title="New Balance" link="/category/newbalance" />
              <ProductCarousel brandSlug="newbalance" />
            </>
          )}
        </Container>
      </main>
    </div>
  );
}

export default Main;
