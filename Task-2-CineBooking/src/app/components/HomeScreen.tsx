import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Star,
  Bell,
  ChevronRight,
  Play,
} from "lucide-react";

const MOVIES = [
  {
    id: 1,
    title: "Dusk Protocol",
    genre: "Action",
    rating: 8.4,
    duration: "2h 18m",
    image:
      "https://images.unsplash.com/photo-1771380089194-cfd2877e93f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    year: 2025,
    category: "Action",
  },
  {
    id: 2,
    title: "Midnight Echo",
    genre: "Thriller",
    rating: 7.9,
    duration: "1h 54m",
    image:
      "https://images.unsplash.com/photo-1642290687545-8ab7e6002472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    year: 2025,
    category: "Thriller",
  },
  {
    id: 3,
    title: "Velvet Horizon",
    genre: "Romance",
    rating: 8.1,
    duration: "2h 05m",
    image:
      "https://images.unsplash.com/photo-1775250869743-d08c72844f6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    year: 2025,
    category: "Romance",
  },
  {
    id: 4,
    title: "Neon Requiem",
    genre: "Horror",
    rating: 7.6,
    duration: "1h 48m",
    image:
      "https://images.unsplash.com/photo-1771707691434-12ea601b5c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    year: 2025,
    category: "Horror",
  },
];

const CATEGORIES = ["All", "Action", "Comedy", "Horror", "Romance", "Thriller"];

const BANNER_MOVIES = [
  {
    id: 1,
    title: "The Last Frontier",
    genre: "Epic Action · 2025",
    image:
      "https://images.unsplash.com/photo-1764237769175-47c3e556daa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    rating: 9.1,
  },
  {
    id: 2,
    title: "Crimson Tide Rising",
    genre: "Drama · 2025",
    image:
      "https://images.unsplash.com/photo-1771380089194-cfd2877e93f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    rating: 8.7,
  },
];

interface Props {
  onMovieSelect: (movie: typeof MOVIES[0]) => void;
}

export function HomeScreen({ onMovieSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBanner, setActiveBanner] = useState(0);

  const filteredMovies =
    activeCategory === "All"
      ? MOVIES
      : MOVIES.filter((m) => m.category === activeCategory);

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto"
      style={{ background: "#121212", scrollbarWidth: "none" }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#9ca3af",
              fontSize: "0.8rem",
            }}
          >
            Good Evening 👋
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.35rem",
              fontWeight: 700,
            }}
          >
            Alex Johnson
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: "#1E1E1E" }}
          >
            <Bell size={18} color="#9ca3af" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#E50914" }}
            />
          </button>
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2"
            style={{ borderColor: "#E50914" }}
          >
            <img
              src="https://images.unsplash.com/photo-1571512599285-9ac4fdf3dba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 mb-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            color="#9ca3af"
          />
          <input
            type="text"
            placeholder="Search movies, genres..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none"
            style={{
              background: "#1E1E1E",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "#ffffff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
            }}
          />
        </div>
      </div>

      {/* Banner carousel */}
      <div className="px-5 mb-5">
        <div className="relative rounded-3xl overflow-hidden" style={{ height: "180px" }}>
          <img
            src={BANNER_MOVIES[activeBanner].image}
            alt={BANNER_MOVIES[activeBanner].title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(18,18,18,0.9) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mb-2 w-fit"
              style={{ background: "rgba(229,9,20,0.2)", border: "1px solid rgba(229,9,20,0.4)" }}
            >
              <span style={{ color: "#FFD700", fontSize: "0.7rem" }}>★</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              >
                {BANNER_MOVIES[activeBanner].rating}
              </span>
            </div>
            <h3
              className="text-white mb-1"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              {BANNER_MOVIES[activeBanner].title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#9ca3af",
                fontSize: "0.75rem",
              }}
            >
              {BANNER_MOVIES[activeBanner].genre}
            </p>
            <button
              className="mt-3 flex items-center gap-2 rounded-xl px-4 py-2 w-fit"
              style={{
                background: "#E50914",
                fontFamily: "'Inter', sans-serif",
                color: "#ffffff",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              <Play size={12} fill="#fff" />
              Watch Trailer
            </button>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {BANNER_MOVIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className="rounded-full transition-all"
                style={{
                  width: activeBanner === i ? "20px" : "6px",
                  height: "6px",
                  background: activeBanner === i ? "#E50914" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <div className="px-5 flex items-center justify-between mb-3">
          <h3
            className="text-white"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Categories
          </h3>
          <ChevronRight size={18} color="#E50914" />
        </div>
        <div
          className="flex gap-2 px-5 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-xl transition-all"
              style={{
                background: activeCategory === cat ? "#E50914" : "#1E1E1E",
                border: `1px solid ${activeCategory === cat ? "#E50914" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "'Inter', sans-serif",
                color: activeCategory === cat ? "#ffffff" : "#9ca3af",
                fontSize: "0.8rem",
                fontWeight: activeCategory === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Movies */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-white"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Popular Movies
          </h3>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#E50914",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            See All
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onMovieSelect(movie)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: "#1E1E1E" }}
            >
              <div className="relative" style={{ height: "160px" }}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(18,18,18,0.9) 100%)",
                  }}
                />
                <div
                  className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <Star size={10} fill="#FFD700" color="#FFD700" />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#FFD700",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {movie.rating}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h4
                  className="text-white mb-0.5"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {movie.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#9ca3af",
                    fontSize: "0.7rem",
                  }}
                >
                  {movie.genre} · {movie.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
