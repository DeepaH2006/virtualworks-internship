import { motion } from "motion/react";
import { ArrowLeft, MapPin, Calendar, Clock, Ticket } from "lucide-react";

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
  onBack: () => void;
  onConfirm: () => void;
}

export function BookingSummaryScreen({ movie, seats, onBack, onConfirm }: Props) {
  const pricePerSeat = 280;
  const convenienceFee = 45;
  const gst = Math.round((seats.length * pricePerSeat + convenienceFee) * 0.18);
  const total = seats.length * pricePerSeat + convenienceFee + gst;

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto"
      style={{ background: "#121212", scrollbarWidth: "none" }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "#1E1E1E" }}
        >
          <ArrowLeft size={20} color="#fff" />
        </button>
        <h2
          className="text-white"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
        >
          Booking Summary
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 pb-32"
      >
        {/* Movie card */}
        <div
          className="flex gap-4 p-4 rounded-2xl mb-4"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="w-20 h-28 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h3
              className="text-white"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: 700 }}
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
                fontSize: "0.7rem",
              }}
            >
              {movie.genre}
            </span>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.75rem" }}>
              {movie.duration} · {movie.rating} ★
            </p>
          </div>
        </div>

        {/* Booking info */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h4
            className="text-white mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
          >
            Show Details
          </h4>
          <div className="space-y-3">
            {[
              { icon: <MapPin size={15} color="#E50914" />, label: "Theater", value: "PVR Cinemas — IMAX Hall 3, Mumbai" },
              { icon: <Calendar size={15} color="#E50914" />, label: "Date", value: "Saturday, June 14, 2025" },
              { icon: <Clock size={15} color="#E50914" />, label: "Time", value: "7:30 PM" },
              {
                icon: <Ticket size={15} color="#E50914" />,
                label: "Seats",
                value: seats.join(", ") || "A1, A2",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(229,9,20,0.1)" }}
                >
                  {icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.7rem" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 500 }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div
          className="p-4 rounded-2xl mb-5"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <h4
            className="text-white mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
          >
            Price Breakdown
          </h4>
          <div className="space-y-2.5">
            {[
              { label: `Tickets (${seats.length || 2} × ₹${pricePerSeat})`, amount: `₹${seats.length * pricePerSeat || 560}` },
              { label: "Convenience Fee", amount: `₹${convenienceFee}` },
              { label: `GST (18%)`, amount: `₹${gst}` },
            ].map(({ label, amount }) => (
              <div key={label} className="flex items-center justify-between">
                <span style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.82rem" }}>
                  {label}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.82rem" }}>
                  {amount}
                </span>
              </div>
            ))}
            <div
              className="pt-2.5 mt-1 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.95rem", fontWeight: 700 }}
              >
                Total Amount
              </span>
              <span
                style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700", fontSize: "1.1rem", fontWeight: 700 }}
              >
                ₹{total}
              </span>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.35)",
          }}
        >
          Proceed to Payment
        </button>
      </motion.div>
    </div>
  );
}
