import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface Props {
  onBack: () => void;
  onContinue: (seats: string[]) => void;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const BOOKED_SEATS = new Set([
  "B3", "B4", "C5", "C6", "D2", "D7", "D8", "E3", "E4", "E5", "F6", "F7", "G1", "G2",
]);

const SHOWTIME_OPTIONS = ["10:30 AM", "1:15 PM", "4:00 PM", "7:30 PM", "10:15 PM"];

export function SeatSelectionScreen({ onBack, onContinue }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedTime, setSelectedTime] = useState("7:30 PM");

  const toggleSeat = (seat: string) => {
    if (BOOKED_SEATS.has(seat)) return;
    const next = new Set(selected);
    if (next.has(seat)) {
      next.delete(seat);
    } else if (next.size < 6) {
      next.add(seat);
    }
    setSelected(next);
  };

  const totalPrice = selected.size * 280;

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
        <div>
          <h2
            className="text-white"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem", fontWeight: 700 }}
          >
            Select Seats
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.75rem" }}>
            PVR Cinemas · IMAX Hall 3
          </p>
        </div>
      </div>

      {/* Date / Time picker */}
      <div className="px-5 mb-5">
        <div
          className="flex items-center justify-between p-3 rounded-xl"
          style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}
          >
            Sat, Jun 14 · 2025
          </span>
          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: "'Inter', sans-serif", color: "#E50914", fontSize: "0.85rem" }}>
              {selectedTime}
            </span>
            <ChevronDown size={14} color="#E50914" />
          </div>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SHOWTIME_OPTIONS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className="flex-shrink-0 px-3 py-1.5 rounded-xl transition-all"
              style={{
                background: selectedTime === t ? "#E50914" : "#1E1E1E",
                fontFamily: "'Inter', sans-serif",
                color: selectedTime === t ? "#fff" : "#9ca3af",
                fontSize: "0.72rem",
                border: `1px solid ${selectedTime === t ? "#E50914" : "rgba(255,255,255,0.07)"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Screen indicator */}
      <div className="px-8 mb-5">
        <div className="relative flex flex-col items-center">
          <div
            className="w-full h-2 rounded-full mb-1"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />
          <div
            className="w-3/4 h-0.5 rounded-full mb-3"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,215,0,0.3), transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#9ca3af",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Screen — All Eyes This Way
          </span>
        </div>
      </div>

      {/* Seat grid */}
      <div className="px-4 mb-5 overflow-x-auto">
        <div style={{ minWidth: "280px" }}>
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-1 mb-1.5">
              <span
                className="w-4 text-center flex-shrink-0"
                style={{ fontFamily: "'Inter', sans-serif", color: "#4b5563", fontSize: "0.65rem" }}
              >
                {row}
              </span>
              <div className="flex gap-1 flex-1 justify-center">
                {COLS.map((col) => {
                  const seat = `${row}${col}`;
                  const isBooked = BOOKED_SEATS.has(seat);
                  const isSelected = selected.has(seat);
                  const isPremium = row === "A" || row === "B";

                  return (
                    <motion.button
                      key={seat}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleSeat(seat)}
                      disabled={isBooked}
                      className="rounded-sm flex-shrink-0"
                      style={{
                        width: "24px",
                        height: "20px",
                        background: isBooked
                          ? "#2a2a2a"
                          : isSelected
                          ? "#E50914"
                          : isPremium
                          ? "rgba(255,215,0,0.15)"
                          : "#1E1E1E",
                        border: isBooked
                          ? "1px solid #333"
                          : isSelected
                          ? "1px solid #E50914"
                          : isPremium
                          ? "1px solid rgba(255,215,0,0.3)"
                          : "1px solid rgba(255,255,255,0.12)",
                        cursor: isBooked ? "not-allowed" : "pointer",
                        borderRadius: "4px 4px 6px 6px",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-center gap-5">
          {[
            { color: "#1E1E1E", border: "rgba(255,255,255,0.12)", label: "Available" },
            { color: "#2a2a2a", border: "#333", label: "Booked" },
            { color: "#E50914", border: "#E50914", label: "Selected" },
            { color: "rgba(255,215,0,0.15)", border: "rgba(255,215,0,0.3)", label: "Premium" },
          ].map(({ color, border, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="w-4 h-3 rounded-sm"
                style={{
                  background: color,
                  border: `1px solid ${border}`,
                  borderRadius: "3px 3px 4px 4px",
                }}
              />
              <span
                style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.65rem" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom panel */}
      <div
        className="mx-4 mb-4 p-4 rounded-2xl"
        style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {selected.size > 0 ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.72rem" }}>
                  Selected Seats
                </p>
                <p
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}
                >
                  {Array.from(selected).sort().join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.72rem" }}>
                  Total
                </p>
                <p
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700", fontSize: "1rem", fontWeight: 700 }}
                >
                  ₹{totalPrice}
                </p>
              </div>
            </div>
            <button
              onClick={() => onContinue(Array.from(selected).sort())}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all active:scale-95"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(135deg, #E50914, #b0060f)",
                fontSize: "0.9rem",
                boxShadow: "0 6px 24px rgba(229,9,20,0.35)",
              }}
            >
              Continue · {selected.size} seat{selected.size !== 1 ? "s" : ""}
            </button>
          </>
        ) : (
          <p
            className="text-center py-2"
            style={{ fontFamily: "'Inter', sans-serif", color: "#4b5563", fontSize: "0.85rem" }}
          >
            Tap seats to select (max 6)
          </p>
        )}
      </div>
    </div>
  );
}
