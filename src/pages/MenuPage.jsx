// src/pages/MenuPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { semuaResep } from "../data/semua-resep";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(semuaResep);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = semuaResep.filter((recipe) =>
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
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Jelajahi Semua Resep
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Temukan inspirasi masakan dan minuman Nusantara favoritmu.
        </p>

        <div className="mb-8 max-w-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama resep..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {currentItems.map((recipe) => (
            <Link
              to={`/resep/${recipe.kategori}/${recipe.id}`}
              key={`${recipe.id}-${recipe.kategori}`}
            >
              <div className="group transform transition-all duration-300 hover:scale-105">
                <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span
                      className={`text-xs font-semibold ${recipe.kategori === "makanan" ? "text-blue-700 bg-blue-100/90" : "text-green-700 bg-green-100/90"} px-2 py-1 rounded-full`}
                    >
                      {recipe.kategori}
                    </span>
                    <h3 className="font-bold text-slate-800 mt-2 truncate group-hover:text-blue-600">
                      {recipe.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Resep tidak ditemukan.</p>
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