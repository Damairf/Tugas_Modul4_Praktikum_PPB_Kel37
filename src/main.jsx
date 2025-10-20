// src/main.jsx
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import DetailPage from "./pages/DetailPage";
import FavoritePage from "./pages/FavoritePage";
import ProfilePage from "./pages/ProfilePage";
import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import "./index.css";
import PWABadge from "./PWABadge";

// ===============================
// ✅ Komponen Utama (dengan Splash)
// ===============================
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (resep) => {
    setFavorites((prev) => {
      const isFavorited = prev.some(
        (fav) => fav.id === resep.id && fav.kategori === resep.kategori
      );
      if (isFavorited) {
        return prev.filter(
          (fav) => !(fav.id === resep.id && fav.kategori === resep.kategori)
        );
      } else {
        return [...prev, resep];
      }
    });
  };

  // ✅ Tampilkan SplashScreen sebelum masuk ke Router
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AppContent
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </Router>
  );
}

// ===============================
// ✅ Komponen isi aplikasi (Router)
// ===============================
function AppContent({ favorites, onToggleFavorite }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Menentukan halaman aktif berdasarkan URL
  const getCurrentPage = () => {
    switch (location.pathname) {
      case "/":
        return "home";
      case "/menu":
        return "menu";
      case "/favorites":
        return "favorites";
      case "/profile":
        return "profile";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Desktop */}
      <DesktopNavbar
        currentPage={getCurrentPage()}
        onNavigate={(page) => navigate(`/${page === "home" ? "" : page}`)}
      />

      {/* Konten Utama */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route
            path="/resep/:kategori/:id"
            element={
              <DetailPage
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={<FavoritePage favorites={favorites} />}
          />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      {/* Navbar Mobile */}
      <MobileNavbar
        currentPage={getCurrentPage()}
        onNavigate={(page) => navigate(`/${page === "home" ? "" : page}`)}
      />

      <PWABadge />
    </div>
  );
}

// ===============================
// ✅ Render ke root
// ===============================
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
