import { motion } from "motion/react";
import { Film } from "lucide-react";

interface Props {
  onGetStarted: () => void;
}

export function SplashScreen({ onGetStarted }: Props) {
  return (
    <div
      className="relative flex flex-col items-center justify-between w-full h-full overflow-hidden"
      style={{ background: "#121212" }}
    >
      {/* Background cinema image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1768381937064-0cff674a09ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
          alt="Cinema seats"
          className="w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,18,18,0.4) 0%, rgba(18,18,18,0.85) 60%, #121212 100%)",
          }}
        />
      </div>

      {/* Top decorative red glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "#E50914" }}
      />

      {/* Center logo */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          {/* Logo mark */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{ background: "#E50914" }}
          >
            <Film size={48} color="#ffffff" strokeWidth={1.5} />
          </div>

          {/* App name */}
          <div className="text-center">
            <h1
              className="text-white tracking-widest"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "2.5rem",
                fontWeight: 800,
                letterSpacing: "0.15em",
              }}
            >
              CINE<span style={{ color: "#E50914" }}>BOOK</span>
            </h1>
            <p
              className="mt-1"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#9ca3af",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
              }}
            >
              YOUR CINEMA COMPANION
            </p>
          </div>
        </motion.div>

        {/* Film strip decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex gap-2 mt-4"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-8 rounded-sm border"
              style={{
                borderColor: i === 3 ? "#E50914" : "rgba(255,255,255,0.15)",
                background: i === 3 ? "rgba(229,9,20,0.15)" : "transparent",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative w-full px-8 pb-12 flex flex-col items-center gap-4"
      >
        <p
          className="text-center mb-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          Book movies, skip the queues
        </p>
        <button
          onClick={onGetStarted}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all active:scale-95 shadow-lg"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.4)",
          }}
        >
          Get Started
        </button>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#4b5563",
            fontSize: "0.75rem",
          }}
        >
          Already have an account?{" "}
          <span style={{ color: "#E50914" }}>Sign In</span>
        </p>
      </motion.div>
    </div>
  );
}
