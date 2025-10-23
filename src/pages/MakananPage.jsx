// src/pages/MakananPage.jsx
import { useState, useEffect } from "react";
import { ResepMakanan } from "../data/makanan";
import RecipeGrid from "../components/makanan/RecipeGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MakananPage() {
  const allMakanan = Object.values(ResepMakanan.resep).map((item) => ({
    ...item,
    kategori: "makanan",
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(allMakanan);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allMakanan.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Makanan Nusantara
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Jelajahi berbagai resep makanan lezat dari seluruh penjuru Indonesia.
        </p>

        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama makanan..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <RecipeGrid recipes={currentItems} />

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Makanan tidak ditemukan.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Sebelumnya
            </button>

            <span className="text-slate-700 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
