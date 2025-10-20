// src/pages/FavoritePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function FavoritePage({ favorites }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-8">
          Resep Favorit Anda
        </h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {favorites.map((recipe) => (
              <Link
                to={`/resep/${recipe.kategori}/${recipe.id}`}
                key={`${recipe.id}-${recipe.kategori}`}
              >
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-800 truncate group-hover:text-blue-600">
                        {recipe.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            Anda belum menambahkan resep favorit.
          </p>
        )}
      </main>
    </div>
  );
}
