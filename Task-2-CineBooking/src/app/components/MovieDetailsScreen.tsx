import { motion } from "motion/react";
import { ArrowLeft, Star, Clock, Bookmark, Share2, Play } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  duration: string;
  image: string;
  year: number;
}

interface Props {
  movie: Movie;
  onBack: () => void;
  onBook: () => void;
}

const CAST = [
  {
    name: "Marcus Reed",
    role: "Lead",
    img: "https://images.unsplash.com/photo-1771380089194-cfd2877e93f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&q=80",
  },
  {
    name: "Lena Cruz",
    role: "Supporting",
    img: "https://images.unsplash.com/photo-1642290687545-8ab7e6002472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&q=80",
  },
  {
    name: "Sam Draven",
    role: "Villain",
    img: "https://images.unsplash.com/photo-1571512599285-9ac4fdf3dba9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&q=80",
  },
  {
    name: "Aria Voss",
    role: "Supporting",
    img: "https://images.unsplash.com/photo-1771707691434-12ea601b5c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&q=80",
  },
];

export function MovieDetailsScreen({ movie, onBack, onBook }: Props) {
  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto"
      style={{ background: "#121212", scrollbarWidth: "none" }}
    >
      {/* Hero poster */}
      <div className="relative flex-shrink-0" style={{ height: "300px" }}>
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,18,18,0.3) 0%, #121212 100%)",
          }}
        />

        {/* Nav buttons */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(18,18,18,0.7)", backdropFilter: "blur(10px)" }}
          >
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div className="flex gap-2">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(18,18,18,0.7)", backdropFilter: "blur(10px)" }}
            >
              <Bookmark size={18} color="#fff" />
            </button>
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(18,18,18,0.7)", backdropFilter: "blur(10px)" }}
            >
              <Share2 size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(229,9,20,0.9)",
              boxShadow: "0 0 30px rgba(229,9,20,0.5)",
            }}
          >
            <Play size={22} fill="#fff" color="#fff" />
          </button>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 pb-28"
      >
        {/* Title & meta */}
        <div className="mb-4">
          <h2
            className="text-white mb-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {movie.title}
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#FFD700",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {movie.rating}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#9ca3af",
                  fontSize: "0.75rem",
                }}
              >
                /10
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} color="#9ca3af" />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#9ca3af",
                  fontSize: "0.85rem",
                }}
              >
                {movie.duration}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#9ca3af",
                fontSize: "0.85rem",
              }}
            >
              {movie.year}
            </span>
          </div>
        </div>

        {/* Genre tags */}
        <div className="flex gap-2 mb-5">
          {[movie.genre, "Adventure", "HD"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl"
              style={{
                background: tag === movie.genre ? "rgba(229,9,20,0.15)" : "#1E1E1E",
                border: `1px solid ${tag === movie.genre ? "rgba(229,9,20,0.4)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "'Inter', sans-serif",
                color: tag === movie.genre ? "#E50914" : "#9ca3af",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Synopsis */}
        <div className="mb-6">
          <h3
            className="text-white mb-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Synopsis
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#9ca3af",
              fontSize: "0.875rem",
              lineHeight: "1.7",
            }}
          >
            In a world on the brink of collapse, a rogue operative uncovers a
            conspiracy that stretches across governments and shadows. As enemies
            close in and allies vanish, every move becomes a matter of survival
            — and the truth is more dangerous than the lies.
          </p>
        </div>

        {/* Cast */}
        <div className="mb-6">
          <h3
            className="text-white mb-3"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Cast
          </h3>
          <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {CAST.map((person) => (
              <div key={person.name} className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div
                  className="w-14 h-14 rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#ffffff",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {person.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#9ca3af",
                    fontSize: "0.6rem",
                  }}
                >
                  {person.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Book Tickets Button */}
        <button
          onClick={onBook}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.4)",
          }}
        >
          Book Tickets
        </button>
      </motion.div>
    </div>
  );
}
