import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, Ticket, User, Film } from "lucide-react";

import { SplashScreen } from "./components/SplashScreen";
import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { MovieDetailsScreen } from "./components/MovieDetailsScreen";
import { SeatSelectionScreen } from "./components/SeatSelectionScreen";
import { BookingSummaryScreen } from "./components/BookingSummaryScreen";
import { PaymentScreen } from "./components/PaymentScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";

/* MARKER-MAKE-KIT-INVOKED */

type Screen =
  | "splash"
  | "login"
  | "home"
  | "details"
  | "seats"
  | "summary"
  | "payment"
  | "confirmation";

const ALL_SCREENS: Screen[] = [
  "splash", "login", "home", "details", "seats", "summary", "payment", "confirmation",
];

const NAV_TABS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "search", icon: Search, label: "Search" },
  { id: "bookings", icon: Ticket, label: "Bookings" },
  { id: "profile", icon: User, label: "Profile" },
] as const;

const DEFAULT_MOVIE = {
  id: 1,
  title: "Dusk Protocol",
  genre: "Action",
  rating: 8.4,
  duration: "2h 18m",
  image:
    "https://images.unsplash.com/photo-1771380089194-cfd2877e93f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  year: 2025,
  category: "Action",
};

function getDirection(from: Screen, to: Screen) {
  return ALL_SCREENS.indexOf(to) >= ALL_SCREENS.indexOf(from) ? 1 : -1;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [prevScreen, setPrevScreen] = useState<Screen>("splash");
  const [activeTab, setActiveTab] = useState<"home" | "search" | "bookings" | "profile">("home");
  const [selectedMovie, setSelectedMovie] = useState(DEFAULT_MOVIE);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const navigate = (to: Screen) => {
    setPrevScreen(screen);
    setScreen(to);
  };

  const direction = getDirection(prevScreen, screen);
  const showBottomNav = screen === "home";

  const pricePerSeat = 280;
  const convenienceFee = 45;
  const gst = Math.round((selectedSeats.length * pricePerSeat + convenienceFee) * 0.18);
  const total = selectedSeats.length * pricePerSeat + convenienceFee + gst;

  const variants = {
    enter: (dir: number) => ({ x: dir * 360, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -360, opacity: 0 }),
  };

  function renderScreen() {
    switch (screen) {
      case "splash":
        return <SplashScreen onGetStarted={() => navigate("login")} />;
      case "login":
        return <LoginScreen onLogin={() => navigate("home")} />;
      case "home":
        return (
          <HomeScreen
            onMovieSelect={(movie) => {
              setSelectedMovie(movie);
              navigate("details");
            }}
          />
        );
      case "details":
        return (
          <MovieDetailsScreen
            movie={selectedMovie}
            onBack={() => navigate("home")}
            onBook={() => navigate("seats")}
          />
        );
      case "seats":
        return (
          <SeatSelectionScreen
            onBack={() => navigate("details")}
            onContinue={(seats) => {
              setSelectedSeats(seats);
              navigate("summary");
            }}
          />
        );
      case "summary":
        return (
          <BookingSummaryScreen
            movie={selectedMovie}
            seats={selectedSeats}
            onBack={() => navigate("seats")}
            onConfirm={() => navigate("payment")}
          />
        );
      case "payment":
        return (
          <PaymentScreen
            amount={total || 660}
            onBack={() => navigate("summary")}
            onPay={() => navigate("confirmation")}
          />
        );
      case "confirmation":
        return (
          <ConfirmationScreen
            movie={selectedMovie}
            seats={selectedSeats}
            onHome={() => {
              setSelectedSeats([]);
              navigate("home");
            }}
          />
        );
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0a0a0a", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229,9,20,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)" }}
      />

      {/* Screen navigator dots (top) */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {ALL_SCREENS.map((s) => (
          <button
            key={s}
            onClick={() => navigate(s)}
            title={s.charAt(0).toUpperCase() + s.slice(1)}
            className="rounded-full transition-all duration-300"
            style={{
              width: screen === s ? "24px" : "6px",
              height: "6px",
              background: screen === s ? "#E50914" : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>

      {/* Screen labels hint */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20">
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.25)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {screen}
        </span>
      </div>

      {/* Phone frame */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "50px",
          background: "#111",
          boxShadow: [
            "0 0 0 1.5px rgba(255,255,255,0.08)",
            "0 0 0 9px rgba(0,0,0,0.9)",
            "0 0 0 11px rgba(255,255,255,0.04)",
            "0 60px 120px rgba(0,0,0,0.8)",
            "0 0 80px rgba(229,9,20,0.06)",
          ].join(", "),
          overflow: "hidden",
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between"
          style={{ height: "50px", padding: "0 28px" }}
        >
          <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>9:41</span>

          {/* Dynamic island */}
          <div
            className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center gap-1.5"
            style={{ width: "120px", height: "30px", background: "#000" }}
          >
            <Film size={10} color="#E50914" />
            <span style={{ color: "#fff", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em" }}>
              CINEBOOK
            </span>
          </div>

          {/* Status icons */}
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="6" width="3" height="6" rx="0.8" fill="white" fillOpacity="0.5" />
              <rect x="4.5" y="3.5" width="3" height="8.5" rx="0.8" fill="white" fillOpacity="0.7" />
              <rect x="9" y="1" width="3" height="11" rx="0.8" fill="white" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="white" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x="0.75" y="0.75" width="20.5" height="10.5" rx="2.5" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
              <rect x="2.5" y="2.5" width="14" height="7" rx="1.2" fill="white" />
              <path d="M22.5 4v4c1-.6 1.5-1.2 1.5-2s-.5-1.4-1.5-2Z" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Content area */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            paddingTop: "50px",
            paddingBottom: showBottomNav ? "72px" : "0",
            background: "#121212",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
              style={{
                paddingTop: "50px",
                paddingBottom: showBottomNav ? "72px" : "0",
                overflow: "hidden",
              }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom navigation */}
        <AnimatePresence>
          {showBottomNav && (
            <motion.div
              key="bottomnav"
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="absolute bottom-0 left-0 right-0 z-20 flex items-center"
              style={{
                height: "72px",
                background: "rgba(14,14,14,0.97)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {NAV_TABS.map(({ id, icon: Icon, label }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id as typeof activeTab);
                      if (id === "home") navigate("home");
                    }}
                    className="flex-1 flex flex-col items-center justify-center gap-1"
                    style={{ height: "100%" }}
                  >
                    <div className="relative">
                      <Icon
                        size={22}
                        color={active ? "#E50914" : "#4b5563"}
                        strokeWidth={active ? 2.2 : 1.5}
                      />
                      {active && (
                        <motion.div
                          layoutId="activeNavDot"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: "#E50914" }}
                        />
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: active ? "#E50914" : "#4b5563",
                        fontSize: "0.58rem",
                        fontWeight: active ? 600 : 400,
                        transition: "color 0.2s",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home indicator */}
        {!showBottomNav && (
          <div
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)", zIndex: 20 }}
          />
        )}
      </div>

      {/* Branding beneath phone */}
      <div className="mt-8 flex items-center gap-2" style={{ opacity: 0.35 }}>
        <Film size={14} color="#E50914" />
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          CINEBOOK
        </span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>·</span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
          }}
        >
          Mobile App UI Prototype
        </span>
      </div>
    </div>
  );
}
