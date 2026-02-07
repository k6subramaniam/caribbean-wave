import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, MapPin, Clock, ChevronDown, Menu, X, Star, Search, ExternalLink, ChevronUp, Users, UtensilsCrossed, Flame, Leaf, Sparkles, ArrowRight, Mail, Send, Instagram, Facebook, Youtube } from "lucide-react";

// ─── MENU DATA ───────────────────────────────────────────────────────────────
const MENU_DATA = [
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Perfect to share or enjoy on your own",
    items: [
      { name: "Wave Wings", price: 14.49, tags: ["spicy", "popular"] },
      { name: "Chicken Wings (12pc)", price: 13.99, tags: [] },
      { name: "Buffalo Wings (12pc)", price: 14.49, tags: ["spicy"] },
      { name: "Honey Garlic Wings (12pc)", price: 14.49, tags: [] },
      { name: "BBQ Wings (12pc)", price: 14.49, tags: [] },
      { name: "Wave Spicy Fish", price: 15.99, tags: ["spicy", "new"] },
      { name: "Fried Fish (Banga)", price: 14.99, tags: [] },
      { name: "Fried Shrimp", price: 14.99, tags: [] },
      { name: "Pepper Shrimp", price: 15.99, tags: ["spicy", "popular"] },
      { name: "Fried Wonton (10pc)", price: 10.99, tags: [] },
      { name: "Jerk Chicken", price: 15.99, tags: ["spicy", "popular"] },
      { name: "Fried Chicken (Half)", price: 12.99, tags: [] },
      { name: "Fried Chicken (Whole)", price: 22.99, tags: [] },
      { name: "Saltfish Cake (3)", price: 4.99, tags: [] },
      { name: "Polouri (10pc)", price: 3.99, tags: ["veg"] },
      { name: "Potato Ball (3pc)", price: 4.99, tags: ["veg"] },
      { name: "Spring Rolls (5pc)", price: 4.99, tags: [] },
      { name: "Eggball", price: 3.39, tags: [] },
    ],
  },
  {
    id: "dhalpuri",
    name: "Dhalpuri / Roti",
    description: "Selection of Roti and Curry",
    items: [
      { name: "Paratha (Plain Roti)", price: 3.99, tags: ["veg"] },
      { name: "Dhalpuri", price: 3.99, tags: ["veg"] },
      { name: "Dhalpuri & Curry Potato", price: 9.49, tags: ["veg"] },
      { name: "Dhalpuri & Curry Channa", price: 9.49, tags: ["veg"] },
      { name: "Dhalpuri & Curry Chicken", price: 12.99, tags: [] },
      { name: "Dhalpuri & Curry Duck", price: 14.49, tags: [] },
      { name: "Dhalpuri & Curry Goat", price: 13.49, tags: [] },
      { name: "Dhalpuri & Curry Shrimp", price: 14.49, tags: [] },
      { name: "Dhalpuri & Curry Beef", price: 12.49, tags: [] },
    ],
  },
  {
    id: "curry",
    name: "Curry Portions",
    description: "Selection of various curry dishes",
    items: [
      { name: "Small Dhall (Yellow Split Peas)", price: 5.49, tags: ["veg"] },
      { name: "Large Dhall", price: 8.49, tags: ["veg"] },
      { name: "Curry Potato & Channa", price: 8.99, tags: ["veg"] },
      { name: "Curry Chicken & Potato", price: 13.99, tags: [] },
      { name: "Curry Goat & Potato", price: 16.49, tags: ["popular"] },
      { name: "Curry Duck & Potato", price: 16.49, tags: [] },
      { name: "Curry Shrimp & Potato", price: 15.99, tags: [] },
      { name: "Curry Beef & Potato", price: 14.49, tags: [] },
      { name: "Sm Stew Oxtail", price: 11.49, tags: [] },
      { name: "Lg Stew Oxtail", price: 19.99, tags: ["popular"] },
    ],
  },
  {
    id: "rice",
    name: "Rice & Curry",
    description: "Selection of dishes with rice",
    items: [
      { name: "Plain Rice", price: 4.0, tags: ["veg"] },
      { name: "Rice & Peas", price: 6.99, tags: ["veg"] },
      { name: "Curry Potato & Rice", price: 8.49, tags: ["veg"] },
      { name: "Curry Channa & Rice", price: 8.99, tags: ["veg"] },
      { name: "Curry Chicken & Rice", price: 11.49, tags: [] },
      { name: "Curry Duck & Rice", price: 13.49, tags: [] },
      { name: "Curry Goat & Rice", price: 12.49, tags: [] },
      { name: "Curry Shrimp & Rice", price: 12.99, tags: [] },
      { name: "Curry Beef & Rice", price: 11.99, tags: [] },
      { name: "Oxtail w/ Rice", price: 12.49, tags: [] },
      { name: "Oxtail w/ Rice & Peas", price: 14.9, tags: [] },
      { name: "Jerk Chicken w/ Rice", price: 11.49, tags: ["spicy"] },
      { name: "Jerk Chicken w/ Rice & Peas", price: 14.49, tags: ["spicy"] },
    ],
  },
  {
    id: "vegmeat",
    name: "Vegetables & Meat",
    description: "Various meat and vegetable dishes · Extra Meat +$3.85",
    items: [
      { name: "Mixed Vegetables", price: 8.99, tags: ["veg"] },
      { name: "Mixed Vegetables & Chicken", price: 11.49, tags: [] },
      { name: "Mixed Vegetables & Shrimp", price: 12.49, tags: [] },
      { name: "Mixed Vegetables & Beef", price: 11.49, tags: [] },
      { name: "Mixed Veg & Chicken & Shrimp", price: 13.49, tags: [] },
      { name: "Chicken Black Bean Sauce", price: 11.99, tags: [] },
      { name: "Shrimp Black Bean Sauce", price: 12.49, tags: [] },
      { name: "Beef Black Bean Sauce", price: 11.99, tags: [] },
      { name: "Sweet & Sour Chicken", price: 13.49, tags: [] },
      { name: "Chilli Chicken", price: 12.99, tags: ["spicy"] },
      { name: "Chicken w/ Broccoli", price: 11.49, tags: [] },
      { name: "Shrimp w/ Broccoli", price: 12.49, tags: [] },
      { name: "Beef w/ Broccoli", price: 11.99, tags: [] },
      { name: "Szechuan Chicken", price: 10.99, tags: ["spicy"] },
      { name: "Szechuan Shrimp", price: 12.49, tags: ["spicy"] },
      { name: "Szechuan Beef", price: 11.49, tags: ["spicy"] },
      { name: "Steam Broccoli", price: 10.99, tags: ["veg"] },
    ],
  },
  {
    id: "friedrice",
    name: "Fried Rice",
    description: "Caribbean Style · Extra Shrimp +$4.12",
    items: [
      { name: "Plain Fried Rice", price: 7.05, tags: [] },
      { name: "Vegetable Fried Rice", price: 10.49, tags: ["veg"] },
      { name: "Chicken Fried Rice", price: 11.49, tags: [], desc: "Chicken mixed inside" },
      { name: "Shrimp Fried Rice", price: 12.49, tags: [] },
      { name: "Beef Fried Rice", price: 12.49, tags: [] },
      { name: "Mixed Fried Rice", price: 12.99, tags: [], desc: "Chicken, Beef & Shrimp" },
      { name: "Special Chicken Fried Rice", price: 12.49, tags: [], desc: "Chicken on top" },
      { name: "Jerk Chicken Fried Rice", price: 13.49, tags: ["spicy"] },
      { name: "Caribbean Wave Fried Rice", price: 14.99, tags: ["popular"], desc: "Chicken, Beef, Shrimp w/ Chicken on Top" },
      { name: "Jerk Wave Fried Rice", price: 16.49, tags: ["spicy", "popular"], desc: "Jerk Chicken on top, Beef, Chicken, Shrimp inside" },
    ],
  },
  {
    id: "chowmein",
    name: "Chow Mein",
    description: "Caribbean Style",
    items: [
      { name: "Vegetable Chow Mein", price: 10.99, tags: ["veg"] },
      { name: "Chicken Chow Mein", price: 11.49, tags: [], desc: "Chicken mixed inside" },
      { name: "Special Chicken Chow Mein", price: 12.99, tags: [], desc: "Chicken on top" },
      { name: "Jerk Chicken Chow Mein", price: 13.99, tags: ["spicy"] },
      { name: "Jerk Wave Chow Mein", price: 16.99, tags: ["spicy", "popular"], desc: "Jerk Chicken on top, Beef, Chicken, Shrimp inside" },
      { name: "Shrimp Chow Mein", price: 12.49, tags: [] },
      { name: "Beef Chow Mein", price: 11.49, tags: [] },
      { name: "Mixed Chow Mein", price: 12.49, tags: [], desc: "Chicken, Beef, Shrimp" },
      { name: "Caribbean Wave Chow Mein", price: 14.99, tags: ["popular"], desc: "Chicken, Beef, Shrimp w/ Chicken on Top" },
    ],
  },
  {
    id: "lomein",
    name: "Lo Mein",
    description: "Caribbean Style",
    items: [
      { name: "Vegetable Lo Mein", price: 10.99, tags: ["veg"] },
      { name: "Chicken Lo Mein", price: 12.49, tags: [] },
      { name: "Special Chicken Lo Mein", price: 13.49, tags: [], desc: "w/ Chicken on top" },
      { name: "Jerk Chicken Lo Mein", price: 13.99, tags: ["spicy"] },
      { name: "Jerk Wave Lo Mein", price: 17.49, tags: ["spicy", "popular"], desc: "Jerk Chicken on top, Beef, Chicken, Shrimp inside" },
      { name: "Shrimp Lo Mein", price: 12.99, tags: [] },
      { name: "Beef Lo Mein", price: 12.49, tags: [] },
      { name: "Mixed Lo Mein", price: 13.49, tags: [], desc: "Chicken, Beef, Shrimp" },
      { name: "Caribbean Wave Lo Mein", price: 14.99, tags: ["popular"], desc: "Chicken, Beef, Shrimp w/ Chicken on Top" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Cold Drinks",
    items: [
      { name: "Assorted Pop", price: 1.49, tags: [] },
      { name: "West Indian Pop", price: 1.99, tags: [] },
      { name: "Ice Tea", price: 1.99, tags: [] },
      { name: "Minute Maid", price: 2.49, tags: [] },
      { name: "Mauby (Sm)", price: 2.29, tags: [] },
      { name: "Mauby (Lg)", price: 3.29, tags: [] },
      { name: "Nutrament", price: 3.49, tags: [] },
      { name: "Peanut Punch", price: 2.29, tags: [] },
      { name: "Solo", price: 2.49, tags: [] },
    ],
  },
];

const TESTIMONIALS = [
  { text: "A great taste of the Caribbean with an excellent price point. The food is always consistent and the service is superb. A must visit if ever you are in Scarborough.", author: "TripAdvisor Reviewer", stars: 5, source: "TripAdvisor" },
  { text: "Best west Indian food I've tasted in a very long time, possibly ever! And the prices are reasonable too.", author: "Scott H.", stars: 5, source: "Google" },
  { text: "Caribbean Wave has and continues to be my go to for family celebrations food orders.", author: "Chantel F.", stars: 5, source: "Google" },
  { text: "I travel through Toronto frequently and always plan my trips around a lunch here. Special fried rice with chicken on top — you'll be full for the entire day.", author: "TripAdvisor Reviewer", stars: 5, source: "TripAdvisor" },
  { text: "Food is excellent. Service is superb. Value for your buck. They also serve excellent vegetarian food. Very community minded.", author: "Gopal", stars: 5, source: "TripAdvisor" },
];

const HOURS = [
  { day: "Monday", hours: "11:00 AM – 9:30 PM" },
  { day: "Tuesday", hours: "11:00 AM – 9:30 PM" },
  { day: "Wednesday", hours: "11:00 AM – 9:30 PM" },
  { day: "Thursday", hours: "11:00 AM – 9:30 PM" },
  { day: "Friday", hours: "11:00 AM – 10:30 PM" },
  { day: "Saturday", hours: "11:00 AM – 10:30 PM" },
  { day: "Sunday", hours: "11:30 AM – 9:30 PM" },
];

const FEATURED = [
  { name: "Caribbean Wave Fried Rice", price: 14.99, tagline: "The Signature — loaded with chicken, beef & shrimp", emoji: "🍚" },
  { name: "Jerk Chicken", price: 15.99, tagline: "Smoky, spicy, unforgettable island heat", emoji: "🍗" },
  { name: "Pepper Shrimp", price: 15.99, tagline: "Fiery Caribbean shrimp — not for the faint", emoji: "🦐" },
  { name: "Curry Goat & Potato", price: 16.49, tagline: "Slow-cooked, tender, richly spiced", emoji: "🍛" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  :root {
    --orange: #FF6B35;
    --orange-dark: #E55A2B;
    --green-deep: #1B4332;
    --green-light: #2D6A4F;
    --gold: #FFD166;
    --navy: #0D1B2A;
    --navy-light: #1B2838;
    --cream: #FFF8F0;
    --cream-dark: #F5EDE3;
    --text-primary: #1A1A2E;
    --text-secondary: #6B7280;
    --emerald: #10B981;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--cream);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  .font-display { font-family: 'DM Serif Display', serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }

  /* Noise texture overlay */
  .noise-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }

  /* Wave divider SVG */
  .wave-divider {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 2;
  }
  .wave-divider svg {
    display: block;
    width: 100%;
    height: 60px;
  }

  /* Scroll animations */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* Nav transition */
  .nav-glass {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(13, 27, 42, 0.92);
    box-shadow: 0 4px 30px rgba(0,0,0,0.3);
  }

  /* Menu tab underline */
  .tab-active {
    color: var(--orange);
    border-bottom: 3px solid var(--orange);
  }

  /* Card hover */
  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }

  /* Button glow */
  .btn-glow {
    position: relative;
    overflow: hidden;
  }
  .btn-glow::after {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, var(--orange), var(--gold), var(--orange));
    z-index: -1;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(12px);
  }
  .btn-glow:hover::after {
    opacity: 0.6;
  }

  /* Tag styles */
  .tag-spicy { background: #FEE2E2; color: #DC2626; }
  .tag-veg { background: #D1FAE5; color: #059669; }
  .tag-popular { background: #FEF3C7; color: #D97706; }
  .tag-new { background: #DBEAFE; color: #2563EB; }

  /* Hamburger animation */
  .menu-open .bar-1 { transform: rotate(45deg) translate(5px, 5px); }
  .menu-open .bar-2 { opacity: 0; }
  .menu-open .bar-3 { transform: rotate(-45deg) translate(7px, -6px); }

  /* Mobile overlay */
  .mobile-overlay {
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }
  .mobile-overlay.open {
    opacity: 1;
    visibility: visible;
  }
  .mobile-overlay.closed {
    opacity: 0;
    visibility: hidden;
  }

  /* Scrollbar for menu tabs */
  .tabs-scroll::-webkit-scrollbar { display: none; }
  .tabs-scroll { -ms-overflow-style: none; scrollbar-width: none; }

  /* Gradient text */
  .gradient-text {
    background: linear-gradient(135deg, var(--orange), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Pulse animation */
  @keyframes pulse-soft {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  .pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

  /* Float animation for hero badge */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .float-anim { animation: float 3s ease-in-out infinite; }

  /* Testimonial card */
  .testimonial-card {
    background: white;
    border-radius: 16px;
    padding: 28px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.04);
    transition: all 0.3s ease;
  }
  .testimonial-card:hover {
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    transform: translateY(-4px);
  }

  /* Form input styles */
  .form-input {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #E5E7EB;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background: white;
    color: var(--text-primary);
  }
  .form-input:focus {
    outline: none;
    border-color: var(--orange);
    box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.12);
  }
  .form-input::placeholder { color: #9CA3AF; }

  /* Stats counter */
  .stat-item {
    text-align: center;
    padding: 20px;
  }
  .stat-number {
    font-family: 'DM Serif Display', serif;
    font-size: 2.5rem;
    color: var(--orange);
    line-height: 1;
  }

  /* Back to top */
  .back-to-top {
    position: fixed;
    bottom: 90px;
    right: 24px;
    z-index: 40;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--orange);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(255, 107, 53, 0.4);
    transition: all 0.3s ease;
    border: none;
  }
  .back-to-top:hover {
    background: var(--orange-dark);
    transform: translateY(-3px);
  }

  /* Mobile sticky CTA bar */
  .mobile-cta-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 45;
    background: var(--navy);
    padding: 12px 20px;
    display: none;
    gap: 12px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  }
  @media (max-width: 768px) {
    .mobile-cta-bar { display: flex; }
  }

  /* Section padding responsive */
  .section-pad {
    padding: 80px 20px;
  }
  @media (min-width: 768px) {
    .section-pad { padding: 100px 40px; }
  }
  @media (min-width: 1024px) {
    .section-pad { padding: 120px 60px; }
  }
`;

// ─── HELPER: useInView Hook ─────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── WAVE SVG COMPONENT ─────────────────────────────────────────────────────
function WaveSVG({ fill = "var(--cream)", flip = false }) {
  return (
    <div className="wave-divider" style={flip ? { top: -2, bottom: "auto", transform: "rotate(180deg)" } : {}}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ─── TAG BADGE ───────────────────────────────────────────────────────────────
function TagBadge({ tag }) {
  const config = {
    spicy: { className: "tag-spicy", label: "🌶️ Spicy" },
    veg: { className: "tag-veg", label: "🥬 Veg" },
    popular: { className: "tag-popular", label: "⭐ Popular" },
    new: { className: "tag-new", label: "🆕 New" },
  };
  const c = config[tag];
  if (!c) return null;
  return (
    <span className={`${c.className} font-mono`} style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, letterSpacing: 0.3 }}>
      {c.label}
    </span>
  );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={16} fill="#FFD166" stroke="#FFD166" />
      ))}
    </div>
  );
}

// ─── MAIN APP COMPONENT ─────────────────────────────────────────────────────
export default function CaribbeanWave() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", guests: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const tabsRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Filter menu items
  const getFilteredItems = useCallback((category) => {
    let items = category.items;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(q) || (item.desc && item.desc.toLowerCase().includes(q)));
    }
    if (activeFilter !== "all") {
      if (activeFilter === "vegetarian") items = items.filter(i => i.tags.includes("veg"));
      else if (activeFilter === "spicy") items = items.filter(i => i.tags.includes("spicy"));
      else if (activeFilter === "popular") items = items.filter(i => i.tags.includes("popular"));
    }
    return items;
  }, [searchQuery, activeFilter]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    document.getElementById(`cat-${catId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Menu", id: "menu" },
    { label: "About", id: "about" },
    { label: "Catering", id: "catering" },
    { label: "Location", id: "location" },
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "var(--cream)" }}>

        {/* ═══ NAVIGATION ═══ */}
        <nav
          className={scrolled ? "nav-glass" : ""}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
            padding: scrolled ? "12px 24px" : "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            transition: "all 0.4s ease",
            background: scrolled ? undefined : "linear-gradient(to bottom, rgba(13,27,42,0.8), transparent)",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => scrollToSection("hero")}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 20 }}>🌊</span>
            </div>
            <div>
              <div className="font-display" style={{ color: "white", fontSize: 20, lineHeight: 1.1, letterSpacing: -0.5 }}>Caribbean</div>
              <div className="font-display" style={{ color: "var(--gold)", fontSize: 20, lineHeight: 1, fontWeight: 700, letterSpacing: -0.5 }}>Wave</div>
            </div>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--gold)"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}
              >
                {link.label}
              </button>
            ))}
            <a href="tel:4162869283" style={{ color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 6, fontSize: 13, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              <Phone size={14} /> (416) 286-9283
            </a>
            <button onClick={() => scrollToSection("order")}
              style={{ background: "var(--orange)", color: "white", border: "none", padding: "10px 24px", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "var(--orange-dark)"; e.target.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.target.style.background = "var(--orange)"; e.target.style.transform = "scale(1)"; }}
            >
              Order Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 8 }}
            className="show-mobile"
          >
            {mobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <div className={`mobile-overlay ${mobileMenuOpen ? "open" : "closed"}`}
          style={{ position: "fixed", inset: 0, zIndex: 49, background: "rgba(13,27,42,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
          {navLinks.map((link, i) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)}
              style={{ background: "none", border: "none", color: "white", fontSize: 28, fontFamily: "'DM Serif Display', serif", cursor: "pointer", opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)", transition: `all 0.4s ease ${i * 0.08}s` }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollToSection("order")}
            style={{ background: "var(--orange)", color: "white", border: "none", padding: "16px 48px", borderRadius: 50, fontSize: 18, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 16 }}>
            Order Now
          </button>
        </div>

        {/* ═══ HERO SECTION ═══ */}
        <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {/* Background */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, rgba(13,27,42,0.85) 0%, rgba(27,67,50,0.7) 50%, rgba(13,27,42,0.9) 100%), 
                         radial-gradient(ellipse at 30% 50%, rgba(255,107,53,0.15) 0%, transparent 60%),
                         radial-gradient(ellipse at 70% 80%, rgba(255,209,102,0.1) 0%, transparent 50%)`,
            backgroundColor: "var(--navy)",
          }} />
          <div className="noise-overlay" style={{ position: "absolute", inset: 0 }} />

          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,107,53,0.1)", opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: "15%", left: "-8%", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,209,102,0.08)" }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 3, textAlign: "center", maxWidth: 800, padding: "0 24px", marginTop: 40 }}>
            {/* Badge */}
            <div className="float-anim" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 50, padding: "8px 20px", marginBottom: 32 }}>
              <Flame size={16} color="var(--orange)" />
              <span className="font-mono" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>OPEN LATE FRI & SAT — UNTIL 10:30 PM</span>
            </div>

            <h1 className="font-display" style={{ color: "white", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
              Scarborough's Home for{" "}
              <span className="gradient-text" style={{ WebkitTextFillColor: "transparent" }}>
                Caribbean Fusion
              </span>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 40px", fontWeight: 300 }}>
              Authentic West Indian flavours meet Chinese wok mastery. Dine in, take out, or let us cater your next event.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => scrollToSection("menu")}
                style={{ padding: "16px 36px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.3)", background: "transparent", color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--gold)"; e.target.style.color = "var(--gold)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "white"; }}
              >
                <UtensilsCrossed size={18} /> View Menu
              </button>
              <button onClick={() => scrollToSection("order")} className="btn-glow"
                style={{ padding: "16px 36px", borderRadius: 50, border: "none", background: "var(--orange)", color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}
              >
                Order Online <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <WaveSVG fill="var(--cream)" />
        </section>

        {/* ═══ FEATURED DISHES ═══ */}
        <FeaturedSection />

        {/* ═══ ABOUT ═══ */}
        <AboutSection />

        {/* ═══ MENU ═══ */}
        <section id="menu" className="section-pad noise-overlay" style={{ background: "var(--navy)", position: "relative" }}>
          <WaveSVG fill="var(--cream)" flip />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2, paddingTop: 40 }}>
            {/* Menu Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Our Menu</span>
              <h2 className="font-display" style={{ color: "white", fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: 8 }}>
                100+ Dishes of <span style={{ color: "var(--gold)" }}>Pure Flavour</span>
              </h2>
            </div>

            {/* Search & Filter Bar */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 400 }}>
                <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input
                  type="text" placeholder="Search the menu..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border-color 0.3s" }}
                  onFocus={e => e.target.style.borderColor = "var(--orange)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { key: "all", label: "All" },
                  { key: "popular", label: "⭐ Popular" },
                  { key: "spicy", label: "🌶️ Spicy" },
                  { key: "vegetarian", label: "🥬 Vegetarian" },
                ].map(f => (
                  <button key={f.key} onClick={() => setActiveFilter(f.key)}
                    style={{
                      padding: "8px 18px", borderRadius: 50, border: "1px solid",
                      borderColor: activeFilter === f.key ? "var(--orange)" : "rgba(255,255,255,0.15)",
                      background: activeFilter === f.key ? "var(--orange)" : "transparent",
                      color: activeFilter === f.key ? "white" : "rgba(255,255,255,0.7)",
                      fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div ref={tabsRef} className="tabs-scroll" style={{
              display: "flex", gap: 4, overflowX: "auto", paddingBottom: 16, marginBottom: 32,
              borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 64, zIndex: 10,
              background: "var(--navy)", paddingTop: 8,
            }}>
              {MENU_DATA.map(cat => (
                <button key={cat.id} onClick={() => handleCategoryClick(cat.id)}
                  className={activeCategory === cat.id ? "tab-active" : ""}
                  style={{
                    padding: "10px 18px", whiteSpace: "nowrap", border: "none",
                    background: "transparent", cursor: "pointer", fontFamily: "inherit",
                    fontSize: 13, fontWeight: 600, letterSpacing: 0.3, transition: "all 0.2s",
                    color: activeCategory === cat.id ? "var(--orange)" : "rgba(255,255,255,0.5)",
                    borderBottom: activeCategory === cat.id ? "3px solid var(--orange)" : "3px solid transparent",
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Categories */}
            {MENU_DATA.map(cat => {
              const filtered = getFilteredItems(cat);
              if (filtered.length === 0 && (searchQuery || activeFilter !== "all")) return null;
              return (
                <div key={cat.id} id={`cat-${cat.id}`} style={{ marginBottom: 56, scrollMarginTop: 140 }}>
                  <div style={{ marginBottom: 20 }}>
                    <h3 className="font-display" style={{ color: "white", fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}>{cat.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 4 }}>{cat.description}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: 12 }}>
                    {filtered.map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                        padding: "16px 20px", borderRadius: 12,
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                        transition: "all 0.2s", cursor: "default", gap: 16,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,107,53,0.2)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ color: "white", fontSize: 15, fontWeight: 600 }}>{item.name}</span>
                            {item.tags.map(t => <TagBadge key={t} tag={t} />)}
                          </div>
                          {item.desc && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 4 }}>{item.desc}</p>}
                        </div>
                        <span className="font-mono" style={{ color: "var(--gold)", fontSize: 15, fontWeight: 600, whiteSpace: "nowrap" }}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <WaveSVG fill="var(--cream)" />
        </section>

        {/* ═══ ORDER ONLINE ═══ */}
        <OrderSection />

        {/* ═══ CATERING ═══ */}
        <CateringSection formData={formData} setFormData={setFormData} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} />

        {/* ═══ TESTIMONIALS ═══ */}
        <TestimonialsSection testimonialIndex={testimonialIndex} setTestimonialIndex={setTestimonialIndex} />

        {/* ═══ LOCATION & HOURS ═══ */}
        <LocationSection today={today} />

        {/* ═══ FOOTER ═══ */}
        <footer style={{ background: "var(--navy)", position: "relative", padding: "60px 24px 120px" }}>
          <WaveSVG fill="var(--cream-dark)" flip />
          <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48 }}>
              {/* Brand col */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 18 }}>🌊</span>
                  </div>
                  <span className="font-display" style={{ color: "white", fontSize: 22 }}>Caribbean <span style={{ color: "var(--gold)" }}>Wave</span></span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                  West Indian Fusion Cuisine — where Caribbean flavours ride the wave of Chinese wok mastery.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {[Instagram, Facebook, Youtube].map((Icon, i) => (
                    <a key={i} href="#" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.borderColor = "var(--orange)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                      <Icon size={18} color="white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Quick Links</h4>
                {["Menu", "Catering", "Order Online", "Location"].map(l => (
                  <button key={l} onClick={() => scrollToSection(l === "Order Online" ? "order" : l.toLowerCase())}
                    style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, cursor: "pointer", fontFamily: "inherit", padding: "6px 0", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--orange)"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{l}</button>
                ))}
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Contact</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <a href="tel:4162869283" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "white"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
                    <Phone size={16} /> (416) 286-9283
                  </a>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                    <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>875 Milner Ave, Unit #106<br />Scarborough, ON M1B 5N6</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 48, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>© 2025 Caribbean Wave. All rights reserved.</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>West Indian Fusion Cuisine — Scarborough, Ontario</p>
            </div>
          </div>
        </footer>

        {/* Back to top */}
        {showBackToTop && (
          <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ChevronUp size={22} />
          </button>
        )}

        {/* Mobile sticky CTA bar */}
        <div className="mobile-cta-bar">
          <a href="tel:4162869283" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "white", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
            <Phone size={18} /> Call
          </a>
          <button onClick={() => scrollToSection("order")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, background: "var(--orange)", color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <ExternalLink size={18} /> Order
          </button>
        </div>
      </div>

      {/* Responsive CSS for mobile hamburger visibility */}
      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 900px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ─── FEATURED SECTION ────────────────────────────────────────────────────────
function FeaturedSection() {
  const [ref, vis] = useInView();
  return (
    <section className="section-pad" style={{ background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`reveal ${vis ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Don't Miss</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: 8, color: "var(--text-primary)" }}>Fan Favourites</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {FEATURED.map((dish, i) => (
            <div key={i} className={`card-hover reveal ${vis ? "visible" : ""} reveal-delay-${i + 1}`}
              style={{
                background: "white", borderRadius: 20, padding: 28, position: "relative", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{dish.emoji}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: "var(--text-primary)" }}>{dish.name}</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>{dish.tagline}</p>
              <span className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: "var(--orange)" }}>${dish.price.toFixed(2)}</span>
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,107,53,0.06)" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
function AboutSection() {
  const [ref, vis] = useInView();
  const stats = [
    { number: "20+", label: "Years Serving Scarborough" },
    { number: "100+", label: "Menu Items" },
    { number: "680+", label: "Sq Ft Sports Lounge" },
    { number: "500+", label: "Max Catering Guests" },
  ];
  return (
    <section id="about" className="section-pad" style={{ background: "var(--cream-dark)", position: "relative" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 60, alignItems: "center" }}>
          {/* Image side */}
          <div className={`reveal ${vis ? "visible" : ""}`} style={{ position: "relative" }}>
            <div style={{
              width: "100%", paddingBottom: "110%", borderRadius: 24, position: "relative", overflow: "hidden",
              background: "linear-gradient(135deg, var(--green-deep), var(--navy))",
            }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <span style={{ fontSize: 80 }}>🌊</span>
                <span className="font-display" style={{ color: "white", fontSize: 28, textAlign: "center" }}>Caribbean Wave</span>
                <span style={{ color: "var(--gold)", fontSize: 14, letterSpacing: 2, textTransform: "uppercase" }}>Est. Scarborough</span>
              </div>
            </div>
            {/* Decorative offset */}
            <div style={{ position: "absolute", bottom: -16, right: -16, width: "60%", height: "40%", borderRadius: 20, border: "3px solid var(--orange)", opacity: 0.2, zIndex: -1 }} />
          </div>

          {/* Text side */}
          <div className={`reveal reveal-delay-2 ${vis ? "visible" : ""}`}>
            <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Our Story</span>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginTop: 8, marginBottom: 20, lineHeight: 1.2 }}>
              More Than a Restaurant —<br /><span style={{ color: "var(--green-deep)" }}>A Wave of Flavour</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8 }}>
              <p>
                Caribbean Wave is where the bold, aromatic spices of the West Indies collide with the sizzling wok traditions of Chinese cuisine. Born in the heart of Scarborough, we've been serving the community for over two decades with a menu that celebrates the unique fusion only the Caribbean can produce.
              </p>
              <p>
                From our legendary jerk chicken fried rice to our slow-simmered curry goat, every dish tells a story of cultures coming together. Our full-service bar and sports lounge make us the perfect spot for game nights, family dinners, or just grabbing a plate of your favourite comfort food.
              </p>
              <p>
                We're more than food — we're a Scarborough institution. Whether you're dining in, picking up, or letting us cater your next big event, we bring the wave of flavour to you.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`reveal reveal-delay-3 ${vis ? "visible" : ""}`} style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginTop: 60,
          background: "white", borderRadius: 20, padding: "24px 16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)"
        }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{s.number}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ORDER SECTION ───────────────────────────────────────────────────────────
function OrderSection() {
  const [ref, vis] = useInView();
  const platforms = [
    { name: "UberEats", emoji: "🟢", color: "#06C167", url: "#" },
    { name: "DoorDash", emoji: "🔴", color: "#FF3008", url: "#" },
    { name: "SkipTheDishes", emoji: "🟠", color: "#FF6B00", url: "#" },
  ];
  return (
    <section id="order" className="section-pad" style={{ background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div className={`reveal ${vis ? "visible" : ""}`}>
          <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Order Online</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: 8, marginBottom: 12 }}>
            Ready to Eat? <span style={{ color: "var(--green-deep)" }}>Order Your Way</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 48 }}>
            Pick your favourite delivery platform, or call us for pickup
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
          {platforms.map((p, i) => (
            <a key={i} href={p.url} className={`card-hover reveal ${vis ? "visible" : ""} reveal-delay-${i + 1}`}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 32,
                background: "white", borderRadius: 20, textDecoration: "none",
                border: "2px solid rgba(0,0,0,0.04)", transition: "all 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)"}
            >
              <span style={{ fontSize: 40 }}>{p.emoji}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</span>
              <span style={{ padding: "10px 28px", borderRadius: 50, background: p.color, color: "white", fontSize: 14, fontWeight: 600, transition: "transform 0.2s" }}>
                Order Now
              </span>
            </a>
          ))}
        </div>

        <div className={`reveal reveal-delay-4 ${vis ? "visible" : ""}`} style={{
          background: "var(--cream-dark)", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap"
        }}>
          <Phone size={20} color="var(--green-deep)" />
          <span style={{ fontSize: 15, color: "var(--text-secondary)" }}>Prefer to call?</span>
          <a href="tel:4162869283" className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--green-deep)", textDecoration: "none" }}>(416) 286-9283</a>
        </div>
      </div>
    </section>
  );
}

// ─── CATERING SECTION ────────────────────────────────────────────────────────
function CateringSection({ formData, setFormData, formSubmitted, setFormSubmitted }) {
  const [ref, vis] = useInView();
  const cateringTypes = [
    { emoji: "🏢", title: "Corporate Events", desc: "Lunches, meetings & company celebrations" },
    { emoji: "🎉", title: "Private Parties", desc: "Birthdays, weddings & family gatherings" },
    { emoji: "🤝", title: "Community Events", desc: "Fundraisers, shelters & cultural events" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="catering" className="section-pad noise-overlay" style={{ background: "var(--green-deep)", position: "relative" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className={`reveal ${vis ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-mono" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Catering</span>
          <h2 className="font-display" style={{ color: "white", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: 8 }}>
            Let Us Bring the Wave to <span style={{ color: "var(--gold)" }}>Your Event</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
            From intimate gatherings to large celebrations — Caribbean Wave catering delivers authentic flavour to any occasion.
          </p>
        </div>

        {/* Catering type cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
          {cateringTypes.map((ct, i) => (
            <div key={i} className={`reveal ${vis ? "visible" : ""} reveal-delay-${i + 1}`}
              style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 28, textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontSize: 40 }}>{ct.emoji}</span>
              <h4 style={{ color: "white", fontSize: 16, fontWeight: 700, marginTop: 12 }}>{ct.title}</h4>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 6 }}>{ct.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className={`reveal reveal-delay-3 ${vis ? "visible" : ""}`}
          style={{ background: "white", borderRadius: 24, padding: "clamp(24px, 4vw, 48px)", maxWidth: 700, margin: "0 auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
          {formSubmitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <span style={{ fontSize: 56 }}>🎉</span>
              <h3 className="font-display" style={{ fontSize: 24, marginTop: 16, marginBottom: 8 }}>Quote Request Sent!</h3>
              <p style={{ color: "var(--text-secondary)" }}>We'll get back to you within 24 hours. Thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-display" style={{ fontSize: 22, marginBottom: 24, textAlign: "center" }}>Request a Catering Quote</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Name *</label>
                  <input className="form-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Email *</label>
                  <input className="form-input" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Phone *</label>
                  <input className="form-input" type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="(416) 000-0000" />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Event Date</label>
                  <input className="form-input" type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Estimated Guests</label>
                  <select className="form-input" value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                    <option value="">Select...</option>
                    <option>10 – 25</option>
                    <option>25 – 50</option>
                    <option>50 – 100</option>
                    <option>100 – 200</option>
                    <option>200+</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Message</label>
                <textarea className="form-input" rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your event..." style={{ resize: "vertical" }} />
              </div>
              <button type="submit" style={{
                width: "100%", padding: 16, borderRadius: 12, border: "none", background: "var(--orange)", color: "white",
                fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 24,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s"
              }}
                onMouseEnter={e => e.target.style.background = "var(--orange-dark)"}
                onMouseLeave={e => e.target.style.background = "var(--orange)"}
              >
                <Send size={18} /> Request a Quote
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ────────────────────────────────────────────────────
function TestimonialsSection({ testimonialIndex, setTestimonialIndex }) {
  const [ref, vis] = useInView();
  return (
    <section className="section-pad" style={{ background: "var(--cream)" }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className={`reveal ${vis ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Reviews</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: 8 }}>
            What Scarborough <span style={{ color: "var(--green-deep)" }}>Says</span>
          </h2>
        </div>

        {/* Desktop: grid of cards */}
        <div className={`reveal reveal-delay-1 ${vis ? "visible" : ""}`}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.slice(0, 4).map((t, i) => (
            <div key={i} className="testimonial-card">
              <StarRating count={t.stars} />
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-primary)", marginTop: 16, marginBottom: 16, fontStyle: "italic" }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{t.author}</span>
                <span className="font-mono" style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION SECTION ────────────────────────────────────────────────────────
function LocationSection({ today }) {
  const [ref, vis] = useInView();
  return (
    <section id="location" className="section-pad" style={{ background: "var(--cream-dark)" }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className={`reveal ${vis ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="font-mono" style={{ color: "var(--orange)", fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" }}>Find Us</span>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginTop: 8 }}>
            Location & <span style={{ color: "var(--green-deep)" }}>Hours</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 32 }}>
          {/* Map */}
          <a href="https://maps.google.com/?q=875+Milner+Ave+Unit+106+Scarborough+ON+M1B+5N6" target="_blank" rel="noopener noreferrer"
            className={`reveal reveal-delay-1 ${vis ? "visible" : ""}`}
            style={{
              borderRadius: 20, overflow: "hidden", minHeight: 400, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)", position: "relative",
              background: "linear-gradient(145deg, #1B4332 0%, #0D1B2A 60%, #1A1A2E 100%)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)"; }}
          >
            {/* Grid

          {/* Info */}
          <div className={`reveal reveal-delay-2 ${vis ? "visible" : ""}`}>
            {/* Address card */}
            <div style={{ background: "white", borderRadius: 20, padding: 28, marginBottom: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,107,53,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={22} color="var(--orange)" />
                </div>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>875 Milner Ave, Unit #106</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Scarborough, Ontario M1B 5N6</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>Free plaza parking available</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                <a href="https://maps.google.com/?q=875+Milner+Ave+Unit+106+Scarborough+ON" target="_blank" rel="noopener noreferrer"
                  style={{ padding: "10px 20px", borderRadius: 10, background: "var(--orange)", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <ExternalLink size={14} /> Get Directions
                </a>
                <a href="tel:4162869283"
                  style={{ padding: "10px 20px", borderRadius: 10, background: "var(--cream)", color: "var(--text-primary)", textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, border: "1px solid rgba(0,0,0,0.08)" }}>
                  <Phone size={14} /> Call Us
                </a>
              </div>
            </div>

            {/* Hours card */}
            <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(27,67,50,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={22} color="var(--green-deep)" />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700 }}>Hours of Operation</h4>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {HOURS.map((h, i) => {
                  const isToday = h.day === today;
                  return (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10,
                      background: isToday ? "rgba(255,107,53,0.06)" : "transparent",
                      border: isToday ? "1px solid rgba(255,107,53,0.15)" : "1px solid transparent",
                    }}>
                      <span style={{ fontSize: 14, fontWeight: isToday ? 700 : 400, color: isToday ? "var(--orange)" : "var(--text-primary)" }}>
                        {h.day} {isToday && "●"}
                      </span>
                      <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: isToday ? "var(--orange)" : "var(--text-secondary)" }}>
                        {h.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
