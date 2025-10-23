// src/pages/DetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ResepMakanan } from "../data/makanan";
import { ResepMinuman } from "../data/minuman";
import { Heart, ArrowLeft } from "lucide-react";

export default function DetailPage({ onToggleFavorite, favorites }) {
  const { id, kategori } = useParams();

  const sumberData =
    kategori === "makanan"
      ? Object.values(ResepMakanan.resep)
      : kategori === "minuman"
      ? Object.values(ResepMinuman.resep)
      : [];

  const resep = sumberData.find((r) => r.id.toString() === id);

  if (!resep) {
    return (
      <div className="text-center py-20 text-slate-600">
        Resep tidak ditemukan.
      </div>
    );
  }

  const isFavorite = favorites.some(
    (fav) => fav.id === resep.id && fav.kategori === kategori
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20 md:pb-8">
      <Link
        to={`/${kategori}`}
        className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft size={18} /> Kembali ke {kategori}
      </Link>

      <div className="relative mb-6">
        <img
          src={resep.image_url}
          alt={resep.name}
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
        />
        <button
          onClick={() => onToggleFavorite({ ...resep, kategori })}
          className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Toggle Favorite"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? "text-red-500 fill-current" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">
        {resep.name}
      </h1>
      <span
        className={`text-sm font-semibold ${
          kategori === "makanan"
            ? "text-blue-700 bg-blue-100/90"
            : "text-green-700 bg-green-100/90"
        } px-3 py-1 rounded-full inline-block mb-6`}
      >
        {kategori}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Bahan-bahan
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {resep.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Langkah-langkah
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-slate-700">
            {resep.steps.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
