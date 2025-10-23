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
import MakananPage from "./pages/MakananPage";
import MinumanPage from "./pages/MinumanPage";
import DetailPage from "./pages/DetailPage";
import FavoritePage from "./pages/FavoritePage";
import ProfilePage from "./pages/ProfilePage";

import DesktopNavbar from "./components/navbar/DesktopNavbar";
import MobileNavbar from "./components/navbar/MobileNavbar";
import PWABadge from "./PWABadge";

import "./index.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [notif, setNotif] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (resep) => {
    setFavorites((prev) => {
      const isFavorited = prev.some(
        (fav) => fav.id === resep.id && fav.kategori === resep.kategori
      );
      if (isFavorited) {
        setNotif(`${resep.name} dihapus dari favorit`);
        return prev.filter(
          (fav) => !(fav.id === resep.id && fav.kategori === resep.kategori)
        );
      } else {
        setNotif(`${resep.name} ditambahkan ke favorit`);
        return [...prev, resep];
      }
    });

    setTimeout(() => setNotif(""), 2000);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <AppContent
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        notif={notif}
      />
    </Router>
  );
}

function AppContent({ favorites, onToggleFavorite, notif }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getCurrentPage = () => {
    switch (location.pathname) {
      case "/":
        return "home";
      case "/makanan":
        return "makanan";
      case "/minuman":
        return "minuman";
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
      <DesktopNavbar
        currentPage={getCurrentPage()}
        onNavigate={(page) => navigate(`/${page === "home" ? "" : page}`)}
      />

      {notif && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50 transition-all duration-300">
          {notif}
        </div>
      )}

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/makanan" element={<MakananPage />} />
          <Route path="/minuman" element={<MinumanPage />} />
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

      <MobileNavbar
        currentPage={getCurrentPage()}
        onNavigate={(page) => navigate(`/${page === "home" ? "" : page}`)}
      />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
