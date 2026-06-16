import { useState, useEffect, useRef } from "react";
import {
  MapPin, Calendar, Users, Search, Star, ArrowRight, Check,
  Phone, Mail, Globe, Facebook, Instagram, Linkedin, Youtube,
  Menu, X, ChevronLeft, ChevronRight, Heart, Clock, Shield,
  CreditCard, Headphones, Award, Plane, Hotel, Car, Camera,
  CheckCircle, Download, Home, ChevronDown, Wifi, Coffee,
  UtensilsCrossed, Waves, Mountain, TreePine, Eye
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Page =
  | "home" | "destinations" | "destination-detail"
  | "packages" | "package-detail" | "about" | "contact"
  | "signin" | "signup" | "booking" | "booking-success"
  | "search-results" | "404";

// ─── Data ─────────────────────────────────────────────────────────────────────
const DESTINATIONS = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with ancient temples, lush rice terraces, and vibrant culture.",
    longDescription: "Bali is a living postcard — an island paradise with dramatic dances, river-fed rice terraces, and a deeply spiritual culture. From the iconic terraced fields of Tegallalang to the sacred sea temple of Tanah Lot, every corner reveals something extraordinary.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=700&fit=crop&auto=format",
    price: 1299,
    rating: 4.9,
    reviews: 2341,
    duration: "7 nights",
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach", "Mount Batur Sunrise"],
    hotels: ["Four Seasons Resort Bali", "COMO Uma Ubud", "Alila Villas Uluwatu"],
    tips: ["Visit temples early morning to avoid crowds", "Hire a private driver for day trips", "Respect local customs when entering temples"],
    gallery: [
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop&auto=format",
    ],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "The city of light — timeless boulevards, world-class art, and sublime cuisine.",
    longDescription: "Paris is the world's most visited city for good reason. From the glittering Eiffel Tower to the Louvre's priceless collections, the city delivers unrivaled culture, gastronomy, and romance at every turn.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&h=700&fit=crop&auto=format",
    price: 1599,
    rating: 4.8,
    reviews: 3102,
    duration: "5 nights",
    highlights: ["Eiffel Tower", "The Louvre", "Montmartre", "Seine River Cruise"],
    hotels: ["Le Meurice", "Hotel Plaza Athénée", "Shangri-La Paris"],
    tips: ["Buy museum passes in advance", "Explore neighborhoods on foot", "Book restaurant reservations early"],
    gallery: [
      "https://images.unsplash.com/photo-1431274172761-fcdab704f2e4?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1471874276752-65e2d717604a?w=400&h=300&fit=crop&auto=format",
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    description: "Futuristic skyline meets desert grandeur — the ultimate luxury destination.",
    longDescription: "Dubai is a city that rewrites what's possible. The world's tallest building, indoor ski slopes in the desert, and souks fragrant with spices and gold — it's a place where ambition becomes architecture.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&h=700&fit=crop&auto=format",
    price: 1899,
    rating: 4.7,
    reviews: 1876,
    duration: "6 nights",
    highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Palm Jumeirah"],
    hotels: ["Burj Al Arab", "Atlantis The Palm", "Armani Hotel Dubai"],
    tips: ["Dress modestly in public areas", "Plan outdoor activities for cooler months", "Try traditional Emirati food in Old Dubai"],
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1533395427226-788cee21cc9e?w=400&h=300&fit=crop&auto=format",
    ],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    description: "Alpine majesty, precision-crafted villages, and crystalline mountain lakes.",
    longDescription: "Switzerland is nature perfected. Impossibly blue lakes mirror the Alps, cog railways climb to snow-dusted peaks, and fondue-scented chalets dot valleys that look painted into existence.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop&auto=format",
    price: 2199,
    rating: 4.9,
    reviews: 1543,
    duration: "8 nights",
    highlights: ["Matterhorn", "Lucerne Old Town", "Jungfraujoch", "Lake Geneva"],
    hotels: ["Badrutt's Palace St. Moritz", "Victoria-Jungfrau Grand Hotel", "Beau-Rivage Palace Lausanne"],
    tips: ["Buy a Swiss Travel Pass for rail and boats", "Book Jungfraujoch tickets early", "Try cheese fondue in Gruyères"],
    gallery: [
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1543429258-5b2a52495b5a?w=400&h=300&fit=crop&auto=format",
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description: "Overwater bungalows above turquoise lagoons in the Indian Ocean.",
    longDescription: "The Maldives is the archetype of paradise: microscopic coral islands fringed by fluorescent reefs, overwater villas suspended above glass-clear lagoons, and sunsets that paint the sky in improbable pinks.",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1400&h=700&fit=crop&auto=format",
    price: 2899,
    rating: 5.0,
    reviews: 987,
    duration: "7 nights",
    highlights: ["Overwater Villas", "Snorkeling Reefs", "Dolphin Watching", "Private Beach Dining"],
    hotels: ["Gili Lankanfushi", "Soneva Fushi", "Six Senses Laamu"],
    tips: ["Travel April–October for calmer seas", "Book island transfers in advance", "Bring reef-safe sunscreen only"],
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=400&h=300&fit=crop&auto=format",
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "Where ancient ritual and hyper-modern living fuse into something entirely its own.",
    longDescription: "Tokyo is a city of extraordinary contradictions: serene Shinto shrines flanked by neon towers, ramen shops refined over decades next to robot restaurants. No city on earth feels more alive.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format",
    bannerImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&h=700&fit=crop&auto=format",
    price: 1749,
    rating: 4.8,
    reviews: 2187,
    duration: "9 nights",
    highlights: ["Shibuya Crossing", "Senso-ji Temple", "Tsukiji Market", "Mount Fuji Day Trip"],
    hotels: ["Aman Tokyo", "The Peninsula Tokyo", "Park Hyatt Tokyo"],
    tips: ["Get a Suica card for transit", "Visit during cherry blossom season (March–April)", "Book popular restaurants weeks ahead"],
    gallery: [
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop&auto=format",
    ],
  },
];

const PACKAGES = [
  {
    id: "bali-serenity",
    title: "Bali Serenity Escape",
    destination: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop&auto=format",
    duration: "7 nights",
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 312,
    includes: ["Return Flights", "5-Star Hotel", "Daily Breakfast", "Private Transfers", "Temple Tour", "Rice Terrace Trek"],
    accommodation: "Four Seasons Resort Bali at Sayan",
    transportation: "Private car + internal domestic flights",
    overview: "Immerse yourself in Bali's spiritual and natural beauty with this curated 7-night itinerary. Mornings in misty rice terraces, afternoons at sacred water temples, and evenings watching the sun melt into the Indian Ocean.",
    reviewsList: [
      { name: "Sarah M.", location: "London, UK", rating: 5, text: "Absolutely magical. The private villa exceeded every expectation and the guides were extraordinary." },
      { name: "James T.", location: "Sydney, AU", rating: 5, text: "Best holiday of my life. The resort staff remembered our names from day one." },
    ],
  },
  {
    id: "paris-romance",
    title: "Paris Romance Week",
    destination: "Paris",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop&auto=format",
    duration: "5 nights",
    price: 2199,
    originalPrice: 2799,
    rating: 4.8,
    reviews: 218,
    includes: ["Return Flights", "Boutique Hotel", "Champagne Arrival", "Louvre Skip-the-Line", "Seine Dinner Cruise", "Day Trip to Versailles"],
    accommodation: "Hôtel de Crillon, A Rosewood Hotel",
    transportation: "CDG Airport private transfer + metro card",
    overview: "Five nights of pure Parisian enchantment. Skip the queues at the city's finest museums, dine above the Seine at sunset, and wander neighborhoods that have inspired artists for centuries.",
    reviewsList: [
      { name: "Elena K.", location: "New York, US", rating: 5, text: "TravelEase handled every detail flawlessly. The Seine dinner cruise was unforgettable." },
      { name: "Marco R.", location: "Milan, IT", rating: 4, text: "Excellent curation. Would have liked one more free afternoon but the experience was superb." },
    ],
  },
  {
    id: "dubai-luxury",
    title: "Dubai Luxury Discovery",
    destination: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop&auto=format",
    duration: "6 nights",
    price: 2599,
    originalPrice: 3199,
    rating: 4.7,
    reviews: 175,
    includes: ["Return Flights", "5-Star Hotel", "Desert Safari", "Burj Khalifa Observation Deck", "Dhow Cruise", "Gold Souk Tour"],
    accommodation: "Burj Al Arab Jumeirah",
    transportation: "Luxury private car service throughout",
    overview: "Six nights inside the world's most audacious city. Ascend the Burj Khalifa, ride camels at sunset in the red dunes, sail the Dubai Creek by dhow, and shop where gold is sold by the gram.",
    reviewsList: [
      { name: "Priya S.", location: "Mumbai, IN", rating: 5, text: "The Burj Al Arab was a dream. Every meal, every excursion — perfectly orchestrated." },
      { name: "Tom W.", location: "Toronto, CA", rating: 5, text: "Desert safari alone was worth the entire trip. Spectacular." },
    ],
  },
  {
    id: "swiss-alpine",
    title: "Swiss Alpine Journey",
    destination: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&auto=format",
    duration: "8 nights",
    price: 3199,
    originalPrice: 3899,
    rating: 4.9,
    reviews: 143,
    includes: ["Return Flights", "Luxury Chalet", "Swiss Travel Pass", "Jungfraujoch Excursion", "Glacier Express", "Cheese Fondue Evening"],
    accommodation: "Badrutt's Palace Hotel, St. Moritz",
    transportation: "Swiss Travel Pass (all trains, buses, boats)",
    overview: "Eight nights across Switzerland's most spectacular landscapes. Ride the iconic Glacier Express, take the cogwheel to Jungfraujoch — the Top of Europe — and unwind in a palace overlooking Lake St. Moritz.",
    reviewsList: [
      { name: "Anna H.", location: "Stockholm, SE", rating: 5, text: "The Glacier Express journey is something out of a film. Breathtaking from first to last station." },
      { name: "David L.", location: "Boston, US", rating: 5, text: "Flawless organisation. Switzerland rewards slow travel and this itinerary understood that." },
    ],
  },
  {
    id: "maldives-paradise",
    title: "Maldives Overwater Paradise",
    destination: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=500&fit=crop&auto=format",
    duration: "7 nights",
    price: 3899,
    originalPrice: 4799,
    rating: 5.0,
    reviews: 89,
    includes: ["Return Flights", "Overwater Villa", "All-Inclusive", "Snorkeling Equipment", "Dolphin Watching Cruise", "Couples Spa Treatment"],
    accommodation: "Gili Lankanfushi (Overwater Villa)",
    transportation: "Speedboat transfer from Malé",
    overview: "Seven nights in an overwater villa above the clearest water on earth. All-inclusive luxury with every meal, every excursion, and every experience crafted to total perfection.",
    reviewsList: [
      { name: "Sophie & James B.", location: "Edinburgh, UK", rating: 5, text: "Our honeymoon — and nothing will ever compare. Every morning you wake up and can't believe it's real." },
      { name: "Yuki T.", location: "Tokyo, JP", rating: 5, text: "The villa butler service was extraordinary. Nothing was too much trouble." },
    ],
  },
  {
    id: "tokyo-culture",
    title: "Tokyo Culture Immersion",
    destination: "Tokyo",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop&auto=format",
    duration: "9 nights",
    price: 2499,
    originalPrice: 3099,
    rating: 4.8,
    reviews: 267,
    includes: ["Return Flights", "Boutique Hotel", "Suica Card", "Tea Ceremony", "Tsukiji Market Tour", "Mount Fuji Day Trip"],
    accommodation: "Aman Tokyo",
    transportation: "Narita Express + Suica IC card",
    overview: "Nine days inside the world's most complex city — and its serene ancient heart. Tea ceremonies, twilight temple visits, Michelin-star ramen, and one unforgettable sunrise over Mount Fuji.",
    reviewsList: [
      { name: "Chris O.", location: "San Francisco, US", rating: 5, text: "Tokyo broke every expectation. The tea ceremony was deeply moving. I'll be back within the year." },
      { name: "Ingrid N.", location: "Oslo, NO", rating: 5, text: "Perfect mix of structured experiences and free time to wander. Aman Tokyo is extraordinary." },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Rebecca Hart",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "TravelEase made our anniversary trip to the Maldives completely seamless. From the moment we booked to our final transfer home, every detail was handled with extraordinary care.",
    destination: "Maldives",
  },
  {
    name: "Luca Ferrara",
    location: "Milan, Italy",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "I have traveled with many agencies and none come close. The Bali package was curated perfectly — not a single generic tourist trap on the itinerary. Genuine, beautiful travel.",
    destination: "Bali",
  },
  {
    name: "Yuna Park",
    location: "Seoul, South Korea",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    rating: 5,
    text: "The 24/7 support line saved us when our connecting flight was cancelled in Dubai. Within 45 minutes TravelEase had rebooked everything at no additional cost. Simply outstanding.",
    destination: "Dubai",
  },
];

const TEAM = [
  {
    name: "Alexandra Chen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format",
    bio: "20 years crafting transformative journeys. Former Condé Nast Traveler contributing editor.",
  },
  {
    name: "Marcus Williams",
    role: "Head of Destinations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    bio: "Visited 94 countries. Specialist in Southeast Asia and the Indian Ocean.",
  },
  {
    name: "Sophia Rossi",
    role: "Customer Experience Director",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&auto=format",
    bio: "Leads our 24/7 support team with an unbroken 99.2% satisfaction record.",
  },
  {
    name: "Tariq Al-Rashid",
    role: "Luxury Partnerships",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format",
    bio: "Curates our hotel portfolio — personally vetting every property TravelEase recommends.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${s} ${i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

function Badge({ children, variant = "blue" }: { children: React.ReactNode; variant?: "blue" | "amber" | "green" | "gray" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    green: "bg-green-50 text-green-700 border-green-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[variant]}`}>
      {children}
    </span>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Navbar({ current, navigate }: { current: Page; navigate: (p: Page, data?: unknown) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHero = current === "home";
  const transparent = isHero && !scrolled;

  const links: Array<{ label: string; page: Page }> = [
    { label: "Home", page: "home" },
    { label: "Destinations", page: "destinations" },
    { label: "Packages", page: "packages" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 font-bold text-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className={transparent ? "text-white" : "text-slate-800"}>
              Travel<span className="text-blue-600">Ease</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
                className={`text-sm font-medium transition-colors ${
                  transparent
                    ? current === l.page
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : current === l.page
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigate("signin")}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                transparent
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("booking")}
              className="text-sm font-medium px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm shadow-blue-200"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden p-2 rounded-lg ${transparent ? "text-white" : "text-slate-700"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.page}
                onClick={() => { navigate(l.page); setMenuOpen(false); }}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  current === l.page ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => { navigate("signin"); setMenuOpen(false); }}
                className="flex-1 text-center py-2.5 text-sm font-medium rounded-lg border border-slate-200 text-slate-700"
              >
                Sign In
              </button>
              <button
                onClick={() => { navigate("booking"); setMenuOpen(false); }}
                className="flex-1 text-center py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => navigate("home")}
              className="flex items-center gap-2 font-bold text-xl mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Plane className="w-4 h-4 text-white" />
              </div>
              <span>Travel<span className="text-blue-400">Ease</span></span>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Crafting extraordinary journeys since 2014. Your trusted partner for premium travel experiences worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {(["home", "destinations", "packages", "about", "contact"] as Page[]).map((p) => (
                <li key={p}>
                  <button
                    onClick={() => navigate(p)}
                    className="text-slate-400 hover:text-white text-sm capitalize transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {["Flight Booking", "Hotel Reservations", "Travel Insurance", "Airport Transfers", "Custom Itineraries", "Group Travel"].map((s) => (
                <li key={s}>
                  <span className="text-slate-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90 uppercase tracking-wider">Contact</h4>
            <div className="space-y-2.5 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>hello@travelease.com</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><span>+1 (800) 123-4567</span></div>
              <div className="flex items-start gap-2"><Globe className="w-4 h-4 shrink-0 mt-0.5" /><span>123 Fifth Ave, New York, NY 10001</span></div>
            </div>
            <h4 className="font-semibold text-sm mb-3 text-white/90 uppercase tracking-wider">Newsletter</h4>
            {subscribed ? (
              <p className="text-green-400 text-sm flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Thanks for subscribing!</p>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="px-3 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© 2025 TravelEase. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────
function SearchBar({ onSearch }: { onSearch: (dest: string, date: string, travelers: number) => void; compact?: boolean }) {
  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(2);

  const handleSearch = () => {
    onSearch(dest, date, travelers);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-black/10 p-3 flex flex-col lg:flex-row gap-2">
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Destination</div>
          <input
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
            placeholder="Where do you want to go?"
            value={dest}
            onChange={(e) => setDest(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
        <div className="flex-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Travel Date</div>
          <input
            type="date"
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 min-w-[160px]">
        <Users className="w-4 h-4 text-blue-600 shrink-0" />
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Travelers</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="text-blue-600 font-bold text-lg leading-none hover:text-blue-800 transition-colors">−</button>
            <span className="text-sm font-semibold text-slate-800 min-w-[20px] text-center">{travelers}</span>
            <button onClick={() => setTravelers(Math.min(20, travelers + 1))} className="text-blue-600 font-bold text-lg leading-none hover:text-blue-800 transition-colors">+</button>
          </div>
        </div>
      </div>
      <button
        onClick={handleSearch}
        className="flex items-center justify-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 active:scale-95"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </div>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────
function DestinationCard({
  dest,
  onExplore,
}: {
  dest: typeof DESTINATIONS[0];
  onExplore: () => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/5 border border-slate-100 hover:shadow-lg hover:shadow-black/8 transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-200">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${liked ? "bg-red-500 text-white" : "bg-white/90 text-slate-500 hover:bg-white"}`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <Badge variant="blue">{dest.duration}</Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-bold text-slate-800 text-base" style={{ fontFamily: "var(--font-heading)" }}>{dest.name}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{dest.country}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">from</p>
            <p className="font-bold text-blue-600 text-lg" style={{ fontFamily: "var(--font-heading)" }}>${dest.price.toLocaleString()}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mt-2 mb-3 line-clamp-2">{dest.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarRating rating={dest.rating} />
            <span className="text-xs text-slate-500">{dest.rating} ({dest.reviews.toLocaleString()})</span>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
          >
            Explore <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, onBook }: { pkg: typeof PACKAGES[0]; onBook: () => void }) {
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm shadow-black/5 border border-slate-100 hover:shadow-lg hover:shadow-black/8 transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-video bg-slate-200">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full">{discount}% OFF</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{pkg.title}</h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pkg.duration}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{pkg.destination}</span>
          <span className="flex items-center gap-1"><StarRating rating={pkg.rating} />{pkg.rating}</span>
        </div>
        <ul className="flex flex-wrap gap-1.5 mb-4">
          {pkg.includes.slice(0, 3).map((inc) => (
            <li key={inc} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">{inc}</li>
          ))}
          {pkg.includes.length > 3 && (
            <li className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">+{pkg.includes.length - 3} more</li>
          )}
        </ul>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 line-through">${pkg.originalPrice.toLocaleString()}</span>
            <p className="font-bold text-xl text-blue-600" style={{ fontFamily: "var(--font-heading)" }}>${pkg.price.toLocaleString()}</p>
            <span className="text-xs text-slate-400">per person</span>
          </div>
          <button
            onClick={onBook}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 20);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-extrabold text-4xl lg:text-5xl text-blue-600" style={{ fontFamily: "var(--font-heading)" }}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ navigate }: { navigate: (p: Page, data?: unknown) => void }) {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const goLeft = () => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goRight = () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);

  const handleSearch = (dest: string) => {
    const match = DESTINATIONS.find((d) => d.name.toLowerCase().includes(dest.toLowerCase()));
    navigate("search-results", { dest, match });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&h=1000&fit=crop&auto=format"
            alt="Travel"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/70" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Rated #1 Travel Platform — 50,000+ happy travelers
          </div>
          <h1
            className="text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Discover Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400">
              Next Adventure
            </span>
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Book unforgettable trips, explore breathtaking destinations, and travel with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => navigate("destinations")}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              Explore Destinations <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("packages")}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all"
            >
              View Packages
            </button>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { target: 50000, suffix: "+", label: "Happy Travelers" },
            { target: 100, suffix: "+", label: "Destinations" },
            { target: 10, suffix: "+", label: "Years Experience" },
            { target: 49, suffix: "/5.0", label: "Average Rating" },
          ].map(({ target, suffix, label }) => (
            <div key={label}>
              <AnimatedCounter target={target} suffix={suffix} />
              <p className="text-blue-100 text-sm mt-1" style={{ fontFamily: "var(--font-body)" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="blue">Popular Destinations</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Explore the World&apos;s Finest Places
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Hand-curated destinations selected for their extraordinary beauty, culture, and experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              onExplore={() => navigate("destination-detail", dest)}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("destinations")}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
          >
            View All Destinations <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="blue">Why TravelEase</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Travel Better With Us
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We go beyond bookings — we craft experiences that stay with you for life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, color: "bg-blue-50 text-blue-600", title: "Easy Booking", desc: "Book your dream trip in minutes with our streamlined checkout process." },
              { icon: Award, color: "bg-amber-50 text-amber-600", title: "Best Price Guarantee", desc: "Find a lower price anywhere and we'll match it — guaranteed." },
              { icon: Headphones, color: "bg-green-50 text-green-600", title: "24/7 Support", desc: "Our team is available round-the-clock wherever you are in the world." },
              { icon: Shield, color: "bg-purple-50 text-purple-600", title: "Secure Payments", desc: "Bank-grade encryption and fraud protection on every transaction." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="amber">Special Offers</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mt-3 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Featured Travel Packages
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Exceptional value, extraordinary experiences. Limited-time deals on our most sought-after journeys.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBook={() => navigate("package-detail", pkg)} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("packages")}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all"
          >
            View All Packages <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-400 rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <Badge variant="blue">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3" style={{ fontFamily: "var(--font-heading)" }}>
              What Our Travelers Say
            </h2>
          </div>
          <div className="relative">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 backdrop-blur-sm">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white/85 text-lg leading-relaxed mb-8 italic">
                &ldquo;{TESTIMONIALS[testimonialIdx].text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[testimonialIdx].avatar}
                  alt={TESTIMONIALS[testimonialIdx].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{TESTIMONIALS[testimonialIdx].name}</p>
                  <p className="text-slate-400 text-sm">{TESTIMONIALS[testimonialIdx].location}</p>
                </div>
                <div className="ml-auto">
                  <Badge variant="blue">{TESTIMONIALS[testimonialIdx].destination}</Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={goLeft} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`rounded-full transition-all ${i === testimonialIdx ? "w-6 h-2 bg-blue-500" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
              <button onClick={goRight} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-10 lg:p-16 text-center text-white shadow-xl shadow-blue-200">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Ready for Your Next Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ travelers who trust TravelEase to deliver extraordinary experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("booking")}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all"
            >
              Book Your Trip Now
            </button>
            <button
              onClick={() => navigate("contact")}
              className="px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold rounded-xl transition-all"
            >
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DESTINATIONS PAGE ────────────────────────────────────────────────────────
function DestinationsPage({ navigate }: { navigate: (p: Page, data?: unknown) => void }) {
  const [filter, setFilter] = useState("All");
  const regions = ["All", "Asia", "Europe", "Middle East", "Pacific"];

  const regionMap: Record<string, string[]> = {
    Asia: ["Bali", "Tokyo"],
    Europe: ["Paris", "Switzerland"],
    "Middle East": ["Dubai"],
    Pacific: ["Maldives"],
  };

  const filtered =
    filter === "All"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => regionMap[filter]?.includes(d.name));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-72 bg-slate-900 flex items-end">
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&h=500&fit=crop&auto=format"
          alt="Destinations"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
          <p className="text-blue-300 text-sm font-medium mb-2">Explore the World</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            All Destinations
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === r
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              onExplore={() => navigate("destination-detail", dest)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DESTINATION DETAIL PAGE ──────────────────────────────────────────────────
function DestinationDetailPage({
  dest,
  navigate,
}: {
  dest: typeof DESTINATIONS[0];
  navigate: (p: Page, data?: unknown) => void;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative h-[50vh] bg-slate-900">
        <img src={dest.bannerImage} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-blue-300 text-sm mb-2 flex items-center gap-1"><MapPin className="w-4 h-4" />{dest.country}</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{dest.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={dest.rating} size="md" />
                <span className="text-white/80 text-sm">{dest.rating} · {dest.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-white/60 text-sm">Starting from</p>
              <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>${dest.price.toLocaleString()}</p>
              <button
                onClick={() => navigate("booking", { destination: dest.name })}
                className="mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Overview</h2>
              <p className="text-slate-600 leading-relaxed">{dest.longDescription}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Top Attractions</h2>
              <div className="grid grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotels */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Recommended Hotels</h2>
              <div className="space-y-3">
                {dest.hotels.map((hotel) => (
                  <div key={hotel} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <Hotel className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{hotel}</p>
                      <div className="flex gap-0.5 mt-0.5">{[1,2,3,4,5].map((s) => <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Travel Tips</h2>
              <ul className="space-y-3">
                {dest.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {dest.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-200">
                    <img src={img} alt={`${dest.name} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <p className="text-slate-400 text-sm">Starting price</p>
              <p className="text-4xl font-bold text-blue-600 mb-1" style={{ fontFamily: "var(--font-heading)" }}>${dest.price.toLocaleString()}</p>
              <p className="text-slate-400 text-sm mb-5">per person · {dest.duration}</p>
              <button
                onClick={() => navigate("booking", { destination: dest.name })}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all mb-3"
              >
                Book Now
              </button>
              <button
                onClick={() => navigate("contact")}
                className="w-full py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                Ask an Expert
              </button>
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-3 text-sm">
                {[
                  { icon: Shield, text: "Free cancellation within 48 hours" },
                  { icon: Award, text: "Best Price Guarantee" },
                  { icon: Headphones, text: "24/7 dedicated support" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-slate-600">
                    <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PACKAGES PAGE ────────────────────────────────────────────────────────────
function PackagesPage({ navigate }: { navigate: (p: Page, data?: unknown) => void }) {
  const [sort, setSort] = useState("popular");
  const sorted = [...PACKAGES].sort((a, b) =>
    sort === "price-asc" ? a.price - b.price :
    sort === "price-desc" ? b.price - a.price :
    b.reviews - a.reviews
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 bg-slate-900 flex items-end">
        <img
          src="https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1400&h=500&fit=crop&auto=format"
          alt="Packages"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
          <p className="text-blue-300 text-sm font-medium mb-2">Curated for you</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Travel Packages
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 text-sm">{sorted.length} packages available</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:border-blue-400"
          >
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onBook={() => navigate("package-detail", pkg)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PACKAGE DETAIL PAGE ──────────────────────────────────────────────────────
function PackageDetailPage({
  pkg,
  navigate,
}: {
  pkg: typeof PACKAGES[0];
  navigate: (p: Page, data?: unknown) => void;
}) {
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[45vh] bg-slate-900">
        <img src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="amber">{discount}% OFF</Badge>
            <Badge variant="blue">{pkg.duration}</Badge>
          </div>
          <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{pkg.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={pkg.rating} size="md" />
            <span className="text-white/80 text-sm">{pkg.rating} · {pkg.reviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Package Overview</h2>
              <p className="text-slate-600 leading-relaxed">{pkg.overview}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.includes.map((inc) => (
                  <div key={inc} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Accommodation</h2>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Hotel className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm">{pkg.accommodation}</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Transportation</h2>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Car className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm">{pkg.transportation}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Customer Reviews</h2>
              <div className="space-y-4">
                {pkg.reviewsList.map((rev, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-slate-800">{rev.name}</p>
                        <p className="text-xs text-slate-500">{rev.location}</p>
                      </div>
                      <StarRating rating={rev.rating} />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic">&ldquo;{rev.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sticky top-24">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: "var(--font-heading)" }}>${pkg.price.toLocaleString()}</span>
                <span className="text-slate-400 text-sm line-through">${pkg.originalPrice.toLocaleString()}</span>
              </div>
              <p className="text-slate-400 text-sm mb-5">per person · {pkg.duration}</p>
              <button
                onClick={() => navigate("booking", { destination: pkg.destination, packageTitle: pkg.title })}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all mb-3"
              >
                Book Now
              </button>
              <button className="w-full py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all">
                Request Custom Quote
              </button>
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-2 text-sm text-slate-500">
                <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No hidden fees</p>
                <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Instant confirmation</p>
                <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free changes up to 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  const timeline = [
    { year: "2014", event: "TravelEase founded in New York with a team of 5 travel specialists." },
    { year: "2016", event: "Expanded to 25 destinations. Launched 24/7 customer support line." },
    { year: "2018", event: "Reached 10,000 happy travelers. Opened London and Singapore offices." },
    { year: "2020", event: "Launched digital platform — bookings 100% online-accessible." },
    { year: "2022", event: "50+ destination partnerships. Awarded Best Travel Agency by Condé Nast." },
    { year: "2025", event: "50,000+ journeys completed. 100+ destinations. Global team of 200+." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-80 bg-slate-900 flex items-end">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&h=500&fit=crop&auto=format"
          alt="About"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
          <p className="text-blue-300 text-sm mb-2">Who We Are</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>About TravelEase</h1>
          <p className="text-white/70 mt-2 max-w-xl">Crafting extraordinary journeys since 2014.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="blue">Our Story</Badge>
            <h2 className="text-3xl font-bold text-slate-800 mt-3 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Born from a Passion for Meaningful Travel
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              TravelEase was founded in 2014 by Alexandra Chen, a travel journalist who believed the world's best journeys were being hidden behind generic tourist packages. She set out to build something different: a platform where every recommendation is earned through personal experience, not commission.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Today our team of 200+ travel specialists, cultural guides, and hospitality veterans has collectively visited every destination we offer — because we believe you cannot sell what you haven't lived.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop&auto=format"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Plane, color: "bg-blue-600", title: "Our Mission", text: "To make extraordinary travel accessible — connecting people with the world's most remarkable places through expert curation, seamless booking, and exceptional care." },
            { icon: Eye, color: "bg-sky-500", title: "Our Vision", text: "A world where every journey is a transformative experience rather than a logistical burden — where travel broadens perspectives and deepens human connection." },
            { icon: Heart, color: "bg-amber-500", title: "Our Values", text: "Integrity in every recommendation. Respect for every culture we visit. Accountability when plans change. And genuine joy in the art of discovery." },
          ].map(({ icon: Icon, color, title, text }) => (
            <div key={title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <Badge variant="blue">The Team</Badge>
            <h2 className="text-3xl font-bold text-slate-800 mt-3" style={{ fontFamily: "var(--font-heading)" }}>Meet the People Behind TravelEase</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 bg-slate-200">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-center mb-10">
            <Badge variant="blue">Our Journey</Badge>
            <h2 className="text-3xl font-bold text-slate-800 mt-3" style={{ fontFamily: "var(--font-heading)" }}>A Decade of Extraordinary Travel</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-100" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="w-16 h-16 shrink-0 bg-blue-600 rounded-2xl flex items-center justify-center z-10">
                    <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-heading)" }}>{item.year}</span>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center">
                    <p className="text-slate-600 text-sm leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-64 bg-slate-900 flex items-end">
        <img
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1400&h=400&fit=crop&auto=format"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Contact Us</h1>
          <p className="text-white/70 mt-2">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Get in Touch</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you have a question about a destination, need help planning a custom itinerary, or want to provide feedback — our team is ready to help.
            </p>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Address", value: "123 Fifth Avenue, New York, NY 10001, USA" },
                { icon: Phone, label: "Phone", value: "+1 (800) 123-4567" },
                { icon: Mail, label: "Email", value: "hello@travelease.com" },
                { icon: Clock, label: "Hours", value: "24/7 — We never close" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-slate-700 text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=300&fit=crop&auto=format"
                alt="Map"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">TravelEase HQ · New York</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Message Sent!</h3>
                <p className="text-slate-600 max-w-xs">
                  Thank you for contacting TravelEase. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Send a Message</h2>
                <div className="space-y-4">
                  {[
                    { key: "name", label: "Full Name", placeholder: "Alexandra Chen", type: "text" },
                    { key: "email", label: "Email Address", placeholder: "hello@email.com", type: "email" },
                    { key: "subject", label: "Subject", placeholder: "Travel inquiry for Bali", type: "text" },
                  ].map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 focus:outline-none focus:border-blue-400 transition-colors ${errors[key] ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                      />
                      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 focus:outline-none focus:border-blue-400 transition-colors resize-none ${errors.message ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIGN IN PAGE ─────────────────────────────────────────────────────────────
function SignInPage({ navigate }: { navigate: (p: Page) => void }) {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!form.email) e.email = "Email is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("home");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&h=900&fit=crop&auto=format"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-blue-900/60" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Welcome Back</h1>
            <p className="text-white/60 text-sm mt-1">Sign in to your TravelEase account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400 transition-colors ${errors.email ? "border-red-400" : "border-white/20"}`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400 transition-colors ${errors.password ? "border-red-400" : "border-white/20"}`}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white/70">Remember me</span>
              </label>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-70 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Don't have an account?{" "}
              <button onClick={() => navigate("signup")} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIGNUP PAGE ──────────────────────────────────────────────────────────────
function SignUpPage({ navigate }: { navigate: (p: Page) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); navigate("home"); }, 1500);
    }
  };

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Alexandra Chen", type: "text" },
    { key: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
    { key: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel" },
    { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
    { key: "confirm", label: "Confirm Password", placeholder: "••••••••", type: "password" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=1400&h=900&fit=crop&auto=format"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-sky-900/60" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-7">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Create Account</h1>
            <p className="text-white/60 text-sm mt-1">Join 50,000+ travelers worldwide</p>
          </div>

          <div className="space-y-4">
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-white/80 mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 text-sm focus:outline-none focus:border-blue-400 transition-colors ${errors[key] ? "border-red-400" : "border-white/20"}`}
                />
                {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-70 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
              ) : "Create Account"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Already have an account?{" "}
              <button onClick={() => navigate("signin")} className="text-blue-400 hover:text-blue-300 font-medium">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING PAGE ─────────────────────────────────────────────────────────────
function BookingPage({
  initial,
  navigate,
}: {
  initial?: { destination?: string; packageTitle?: string };
  navigate: (p: Page, data?: unknown) => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    destination: initial?.destination || "",
    package: initial?.packageTitle || "",
    date: "", travelers: "2", requests: "",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const totalSteps = 4;
  const stepLabels = ["Traveler Info", "Package", "Travel Details", "Payment"];

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const confirm = () => navigate("booking-success", { name: form.name, destination: form.destination });

  const f = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:border-blue-400 transition-colors";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-100 pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Book Your Trip</h1>
          {/* Progress */}
          <div className="flex items-center gap-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2 flex-1 last:flex-initial">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === i + 1 ? "text-blue-600" : "text-slate-400"}`}>{label}</span>
                {i < stepLabels.length - 1 && <div className={`flex-1 h-0.5 ${step > i + 1 ? "bg-green-500" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Traveler Information</h2>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label><input type="text" className={inputCls} placeholder="Alexandra Chen" value={form.name} onChange={f("name")} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label><input type="email" className={inputCls} placeholder="you@example.com" value={form.email} onChange={f("email")} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label><input type="tel" className={inputCls} placeholder="+1 (555) 000-0000" value={form.phone} onChange={f("phone")} /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Package Selection</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Destination</label>
                <select className={inputCls} value={form.destination} onChange={f("destination")}>
                  <option value="">Select destination</option>
                  {DESTINATIONS.map((d) => <option key={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Package</label>
                <select className={inputCls} value={form.package} onChange={f("package")}>
                  <option value="">Select package</option>
                  {PACKAGES.map((p) => <option key={p.id}>{p.title}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Travel Details</h2>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Travel Date</label><input type="date" className={inputCls} value={form.date} onChange={f("date")} /></div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Travelers</label>
                <select className={inputCls} value={form.travelers} onChange={f("travelers")}>
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Special Requests <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Dietary requirements, accessibility needs, celebrations..." value={form.requests} onChange={f("requests")} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Payment Summary</h2>
              {/* Summary */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4 text-sm space-y-1.5">
                <div className="flex justify-between"><span className="text-slate-500">Name</span><span className="font-medium text-slate-800">{form.name || "—"}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Destination</span><span className="font-medium text-slate-800">{form.destination || "—"}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Package</span><span className="font-medium text-slate-800">{form.package || "—"}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Travelers</span><span className="font-medium text-slate-800">{form.travelers}</span></div>
                <div className="flex justify-between pt-2 border-t border-blue-200 mt-2">
                  <span className="font-semibold text-slate-800">Estimated Total</span>
                  <span className="font-bold text-blue-600 text-lg">
                    ${(PACKAGES.find((p) => p.title === form.package)?.price || 1899) * parseInt(form.travelers)}.00
                  </span>
                </div>
              </div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Cardholder Name</label><input type="text" className={inputCls} placeholder="Alexandra Chen" value={form.cardName} onChange={f("cardName")} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Card Number</label><input type="text" className={inputCls} placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={f("cardNumber")} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">Expiry</label><input type="text" className={inputCls} placeholder="MM / YY" value={form.expiry} onChange={f("expiry")} /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1.5">CVV</label><input type="text" className={inputCls} placeholder="•••" value={form.cvv} onChange={f("cvv")} /></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your payment information is encrypted and secure.</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={prev} className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            {step < totalSteps ? (
              <button onClick={next} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={confirm}
                className="flex-1 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" /> Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING SUCCESS PAGE ─────────────────────────────────────────────────────
function BookingSuccessPage({ data, navigate }: { data?: { name?: string; destination?: string }; navigate: (p: Page) => void }) {
  const ref = Math.random().toString(36).slice(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
          <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Booking Confirmed!
        </h1>
        <p className="text-slate-600 mb-6">
          {data?.name ? `${data.name}, your` : "Your"} trip{data?.destination ? ` to ${data.destination}` : ""} has been booked successfully.
        </p>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Booking Reference</span>
            <span className="font-bold text-blue-600 font-mono">TE-{ref}</span>
          </div>
          {data?.destination && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Destination</span>
              <span className="font-medium text-slate-800">{data.destination}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <Badge variant="green">Confirmed</Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Confirmation Email</span>
            <span className="text-slate-600 text-xs">Sent to your inbox</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Itinerary
          </button>
          <button
            onClick={() => navigate("home")}
            className="flex-1 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH RESULTS PAGE ──────────────────────────────────────────────────────
function SearchResultsPage({
  data,
  navigate,
}: {
  data?: { dest?: string; match?: typeof DESTINATIONS[0] | null };
  navigate: (p: Page, d?: unknown) => void;
}) {
  const dest = data?.dest || "";
  const match = data?.match;

  const related = match
    ? DESTINATIONS.filter((d) => d.id !== match.id).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("home")} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Home
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 text-sm">Search Results</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Search Results
        </h1>
        <p className="text-slate-500 mb-8">
          {dest ? `Results for "${dest}"` : "Showing all destinations"}
        </p>

        {match ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-64 h-48 sm:h-auto bg-slate-200 shrink-0">
                  <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "var(--font-heading)" }}>{match.name}</h2>
                      <p className="text-slate-500 text-sm flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{match.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">from</p>
                      <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "var(--font-heading)" }}>${match.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={match.rating} />
                    <span className="text-xs text-slate-500">{match.rating} · {match.reviews.toLocaleString()} reviews</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{match.description}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("destination-detail", match)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all"
                    >
                      Explore
                    </button>
                    <button
                      onClick={() => navigate("booking", { destination: match.name })}
                      className="px-5 py-2.5 border-2 border-blue-600 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>You Might Also Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((d) => (
                    <DestinationCard key={d.id} dest={d} onExplore={() => navigate("destination-detail", d)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              No Matching Destinations Found
            </h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              We couldn't find a destination matching &ldquo;{dest}&rdquo;. Try Bali, Paris, Dubai, Switzerland, Maldives, or Tokyo.
            </p>
            <button
              onClick={() => navigate("destinations")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              Browse All Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── 404 PAGE ─────────────────────────────────────────────────────────────────
function NotFoundPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-blue-100 mb-4" style={{ fontFamily: "var(--font-heading)" }}>404</div>
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Destination Not Found</h1>
        <p className="text-slate-500 mb-8">Looks like this page took a detour. Let us get you back on the right path.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("home")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return Home
          </button>
          <button
            onClick={() => navigate("destinations")}
            className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-blue-300 transition-all"
          >
            Browse Destinations
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [pageData, setPageData] = useState<unknown>(null);

  const navigate = (p: Page, data?: unknown) => {
    setPage(p);
    setPageData(data ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pagesWithoutFooter: Page[] = ["signin", "signup", "booking", "booking-success"];
  const pagesWithoutNav: Page[] = [];

  const showNav = !pagesWithoutNav.includes(page);
  const showFooter = !pagesWithoutFooter.includes(page);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {showNav && <Navbar current={page} navigate={navigate} />}

      <main>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "destinations" && <DestinationsPage navigate={navigate} />}
        {page === "destination-detail" && (
          <DestinationDetailPage dest={pageData as typeof DESTINATIONS[0] || DESTINATIONS[0]} navigate={navigate} />
        )}
        {page === "packages" && <PackagesPage navigate={navigate} />}
        {page === "package-detail" && (
          <PackageDetailPage pkg={pageData as typeof PACKAGES[0] || PACKAGES[0]} navigate={navigate} />
        )}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "contact" && <ContactPage />}
        {page === "signin" && <SignInPage navigate={navigate} />}
        {page === "signup" && <SignUpPage navigate={navigate} />}
        {page === "booking" && <BookingPage initial={pageData as { destination?: string; packageTitle?: string }} navigate={navigate} />}
        {page === "booking-success" && <BookingSuccessPage data={pageData as { name?: string; destination?: string }} navigate={navigate} />}
        {page === "search-results" && <SearchResultsPage data={pageData as { dest?: string; match?: typeof DESTINATIONS[0] | null }} navigate={navigate} />}
        {page === "404" && <NotFoundPage navigate={navigate} />}
      </main>

      {showFooter && <Footer navigate={navigate} />}
    </div>
  );
}
