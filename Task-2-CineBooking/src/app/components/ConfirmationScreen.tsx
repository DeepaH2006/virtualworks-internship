import { motion } from "motion/react";
import { CheckCircle, Download, Home, Ticket, Calendar, MapPin, Clock } from "lucide-react";

interface Movie {
  title: string;
  genre: string;
  rating: number;
  duration: string;
  image: string;
}

interface Props {
  movie: Movie;
  seats: string[];
  onHome: () => void;
}

function generateBookingId() {
  return "CB" + Math.random().toString(36).toUpperCase().slice(2, 10);
}

const BOOKING_ID = generateBookingId();

export function ConfirmationScreen({ movie, seats, onHome }: Props) {
  const pricePerSeat = 280;
  const convenienceFee = 45;
  const gst = Math.round((seats.length * pricePerSeat + convenienceFee) * 0.18);
  const total = seats.length * pricePerSeat + convenienceFee + gst;

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto"
      style={{ background: "#121212", scrollbarWidth: "none" }}
    >
      {/* Success header */}
      <div
        className="relative flex flex-col items-center justify-center pt-12 pb-8 px-6"
        style={{
          background: "linear-gradient(180deg, rgba(229,9,20,0.08) 0%, transparent 100%)",
        }}
      >
        {/* Animated ring */}
        <div className="relative mb-5">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "rgba(74,222,128,0.12)", border: "2px solid rgba(74,222,128,0.3)" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
            >
              <CheckCircle size={52} color="#4ade80" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Orbiting dots */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ delay: 0.5 + i * 0.08, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "#E50914" : "#FFD700",
                top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
                left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2
            className="text-white mb-1"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.4rem", fontWeight: 700 }}
          >
            Booking Confirmed!
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.85rem" }}>
            Your tickets are ready. Enjoy the show!
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-5 pb-32 flex flex-col gap-4"
      >
        {/* Booking ID card */}
        <div
          className="p-4 rounded-2xl flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(229,9,20,0.12), rgba(229,9,20,0.04))",
            border: "1px solid rgba(229,9,20,0.25)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(229,9,20,0.15)" }}
            >
              <Ticket size={18} color="#E50914" />
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.7rem" }}>
                Booking ID
              </p>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                }}
              >
                {BOOKING_ID}
              </p>
            </div>
          </div>
          <div
            className="px-2.5 py-1 rounded-lg"
            style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", color: "#4ade80", fontSize: "0.65rem", fontWeight: 600 }}>
              CONFIRMED
            </span>
          </div>
        </div>

        {/* Ticket card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Movie info */}
          <div className="flex gap-4 p-4">
            <div className="w-16 h-22 rounded-xl overflow-hidden flex-shrink-0" style={{ height: "88px" }}>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <h3
                className="text-white"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.95rem", fontWeight: 700 }}
              >
                {movie.title}
              </h3>
              <span
                className="px-2.5 py-0.5 rounded-lg w-fit"
                style={{
                  background: "rgba(229,9,20,0.15)",
                  border: "1px solid rgba(229,9,20,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  color: "#E50914",
                  fontSize: "0.65rem",
                }}
              >
                {movie.genre}
              </span>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.72rem" }}>
                {movie.duration} · ⭐ {movie.rating}
              </p>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative flex items-center px-4">
            <div
              className="flex-1 border-dashed border-t"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            />
            <div
              className="absolute -left-3 w-6 h-6 rounded-full"
              style={{ background: "#121212" }}
            />
            <div
              className="absolute -right-3 w-6 h-6 rounded-full"
              style={{ background: "#121212" }}
            />
          </div>

          {/* Show details */}
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { icon: <Calendar size={13} color="#E50914" />, label: "Date", value: "Sat, Jun 14, 2025" },
              { icon: <Clock size={13} color="#E50914" />, label: "Time", value: "7:30 PM" },
              {
                icon: <MapPin size={13} color="#E50914" />,
                label: "Theater",
                value: "PVR IMAX Hall 3",
              },
              {
                icon: <Ticket size={13} color="#E50914" />,
                label: "Seats",
                value: seats.length > 0 ? seats.join(", ") : "A1, A2",
              },
            ].map(({ icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  {icon}
                  <span style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.65rem" }}>
                    {label}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QR code placeholder */}
        <div
          className="p-4 rounded-2xl flex flex-col items-center gap-3"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.72rem" }}>
            Show this QR at the entrance
          </p>
          <div
            className="w-28 h-28 rounded-xl p-2 flex items-center justify-center"
            style={{ background: "#fff" }}
          >
            {/* QR pattern simulation */}
            <div className="w-full h-full grid grid-cols-7 gap-px">
              {Array.from({ length: 49 }).map((_, i) => {
                const isCorner =
                  (i < 7 && (i < 3 || i === 6)) ||
                  (i >= 42 && (i < 45 || i === 48)) ||
                  (i % 7 === 0 && i < 21) ||
                  (i % 7 === 6 && i < 21) ||
                  (i >= 7 && i < 14 && (i === 7 || i === 13)) ||
                  Math.random() > 0.55;
                return (
                  <div
                    key={i}
                    className="rounded-sm"
                    style={{
                      background: isCorner ? "#121212" : "#ffffff",
                      aspectRatio: "1",
                    }}
                  />
                );
              })}
            </div>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#4b5563",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
            }}
          >
            {BOOKING_ID}
          </p>
        </div>

        {/* Amount paid */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.82rem" }}>
            Amount Paid
          </span>
          <span
            style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700", fontSize: "1rem", fontWeight: 700 }}
          >
            ₹{total}
          </span>
        </div>

        {/* Action buttons */}
        <button
          className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2.5 transition-all active:scale-95"
          style={{
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.12)",
            fontFamily: "'Poppins', sans-serif",
            color: "#fff",
            fontSize: "0.9rem",
          }}
        >
          <Download size={18} color="#E50914" />
          Download E-Ticket
        </button>

        <button
          onClick={onHome}
          className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "0.9rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.35)",
          }}
        >
          <Home size={18} color="#fff" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
