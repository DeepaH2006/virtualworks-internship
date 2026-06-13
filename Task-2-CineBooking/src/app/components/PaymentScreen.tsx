import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CreditCard, Smartphone, Wallet, ChevronRight, Shield, Lock } from "lucide-react";

interface Props {
  amount: number;
  onBack: () => void;
  onPay: () => void;
}

const PAYMENT_METHODS = [
  {
    id: "card",
    icon: <CreditCard size={20} color="#E50914" />,
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, RuPay",
  },
  {
    id: "upi",
    icon: <Smartphone size={20} color="#E50914" />,
    label: "UPI",
    desc: "GPay, PhonePe, Paytm UPI",
  },
  {
    id: "wallet",
    icon: <Wallet size={20} color="#E50914" />,
    label: "Wallets",
    desc: "Paytm, Mobikwik, Amazon Pay",
  },
];

export function PaymentScreen({ amount, onBack, onPay }: Props) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const formatCard = (val: string) => {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val: string) => {
    return val
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/")
      .slice(0, 5);
  };

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
            Payment
          </h2>
          <div className="flex items-center gap-1.5">
            <Shield size={11} color="#4ade80" />
            <span
              style={{ fontFamily: "'Inter', sans-serif", color: "#4ade80", fontSize: "0.65rem" }}
            >
              100% Secure Payment
            </span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-5 pb-32"
      >
        {/* Amount due */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(229,9,20,0.15), rgba(229,9,20,0.05))",
            border: "1px solid rgba(229,9,20,0.25)",
          }}
        >
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.75rem" }}>
              Amount Due
            </p>
            <p
              style={{ fontFamily: "'Poppins', sans-serif", color: "#FFD700", fontSize: "1.4rem", fontWeight: 700 }}
            >
              ₹{amount}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(229,9,20,0.2)", border: "1px solid rgba(229,9,20,0.3)" }}
          >
            <span
              style={{ fontFamily: "'Inter', sans-serif", color: "#E50914", fontSize: "0.72rem", fontWeight: 600 }}
            >
              Due Now
            </span>
          </div>
        </div>

        {/* Payment method tabs */}
        <div className="mb-5">
          <h4
            className="text-white mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}
          >
            Payment Method
          </h4>
          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className="w-full flex items-center justify-between p-4 rounded-2xl transition-all"
                style={{
                  background: selectedMethod === method.id ? "rgba(229,9,20,0.1)" : "#1E1E1E",
                  border: `1px solid ${selectedMethod === method.id ? "rgba(229,9,20,0.4)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(229,9,20,0.1)" }}
                  >
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <p
                      style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}
                    >
                      {method.label}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.7rem" }}>
                      {method.desc}
                    </p>
                  </div>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    border: `2px solid ${selectedMethod === method.id ? "#E50914" : "rgba(255,255,255,0.2)"}`,
                    background: selectedMethod === method.id ? "#E50914" : "transparent",
                  }}
                >
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Card details (shown only for card method) */}
        {selectedMethod === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mb-5"
          >
            <div
              className="p-4 rounded-2xl space-y-3"
              style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h4
                style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}
              >
                Card Details
              </h4>

              {/* Card preview */}
              <div
                className="p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                  height: "100px",
                }}
              >
                <div className="absolute top-3 right-4">
                  <div className="flex">
                    <div className="w-6 h-6 rounded-full opacity-80" style={{ background: "#E50914" }} />
                    <div className="w-6 h-6 rounded-full -ml-2 opacity-60" style={{ background: "#FFD700" }} />
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", marginBottom: "8px" }}>
                  Card Number
                </p>
                <p
                  style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.9rem", letterSpacing: "0.15em" }}
                >
                  {cardNumber || "•••• •••• •••• ••••"}
                </p>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between">
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.55rem" }}>CARDHOLDER</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.7rem" }}>
                      {name || "YOUR NAME"}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: "0.55rem" }}>EXPIRES</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", color: "#fff", fontSize: "0.7rem" }}>
                      {expiry || "MM/YY"}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCard(e.target.value))}
                placeholder="Card Number"
                maxLength={19}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: "#2a2a2a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  letterSpacing: "0.08em",
                }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Cardholder Name"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{
                  background: "#2a2a2a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="flex-1 px-4 py-3 rounded-xl outline-none"
                  style={{
                    background: "#2a2a2a",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                  }}
                />
                <div className="flex-1 relative">
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                    placeholder="CVV"
                    maxLength={3}
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: "#2a2a2a",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2" color="#9ca3af" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedMethod === "upi" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-5"
          >
            <div
              className="p-4 rounded-2xl"
              style={{ background: "#1E1E1E", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h4
                style={{ fontFamily: "'Poppins', sans-serif", color: "#fff", fontSize: "0.85rem", fontWeight: 600, marginBottom: "12px" }}
              >
                UPI Apps
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {["GPay", "PhonePe", "Paytm"].map((app) => (
                  <button
                    key={app}
                    className="py-3 rounded-xl flex flex-col items-center gap-1.5"
                    style={{ background: "#2a2a2a", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background:
                          app === "GPay"
                            ? "linear-gradient(135deg, #4285F4, #34A853)"
                            : app === "PhonePe"
                            ? "#5F259F"
                            : "#00BAF2",
                      }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", color: "#9ca3af", fontSize: "0.65rem" }}>
                      {app}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", color: "#4b5563", fontSize: "0.7rem" }}>or enter UPI ID</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              </div>
              <input
                type="text"
                placeholder="yourname@upi"
                className="w-full mt-3 px-4 py-3 rounded-xl outline-none"
                style={{
                  background: "#2a2a2a",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Pay Now button */}
        <button
          onClick={onPay}
          className="w-full py-4 rounded-2xl font-semibold text-white transition-all active:scale-95"
          style={{
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(135deg, #E50914, #b0060f)",
            fontSize: "1rem",
            boxShadow: "0 8px 32px rgba(229,9,20,0.4)",
          }}
        >
          Pay ₹{amount} Now
        </button>

        {/* Security note */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <Shield size={12} color="#4b5563" />
          <span style={{ fontFamily: "'Inter', sans-serif", color: "#4b5563", fontSize: "0.7rem" }}>
            Secured by 256-bit SSL encryption
          </span>
        </div>
      </motion.div>
    </div>
  );
}
