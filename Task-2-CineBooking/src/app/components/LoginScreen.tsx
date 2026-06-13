import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Film } from "lucide-react";

interface Props {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex flex-col w-full h-full overflow-y-auto"
      style={{ background: "#121212" }}
    >
      {/* Header image area */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1759230766134-e3ff1c27d20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80"
          alt="Cinema"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,18,18,0.3), #121212)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "#E50914" }}
          >
            <Film size={28} color="#fff" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 px-6 pb-8"
      >
        <h2
          className="text-white mb-1"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.75rem",
            fontWeight: 700,
          }}
        >
          Welcome Back
        </h2>
        <p
          className="mb-8"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          Sign in to continue your cinematic journey
        </p>

        {/* Email field */}
        <div className="mb-4">
          <label
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#9ca3af",
              fontSize: "0.75rem",
              display: "block",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              color="#9ca3af"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@cinebook.com"
              className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none transition-all"
              style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>

        {/* Password field */}
        <div className="mb-6">
          <label
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#9ca3af",
              fontSize: "0.75rem",
              display: "block",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              color="#9ca3af"
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 rounded-2xl outline-none"
              style={{
                background: "#1E1E1E",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={18} color="#9ca3af" />
              ) : (
                <Eye size={18} color="#9ca3af" />
              )}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#E50914",
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </span>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all active:scale-95 mb-4"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.35)",
          }}
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#4b5563",
              fontSize: "0.75rem",
            }}
          >
            or continue with
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 mb-8"
          style={{
            background: "#1E1E1E",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "'Inter', sans-serif",
            color: "#ffffff",
            fontSize: "0.9rem",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Sign up link */}
        <p
          className="text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{ color: "#E50914", fontWeight: 600, cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
