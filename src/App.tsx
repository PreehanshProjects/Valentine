import { useState } from "react";
import { motion } from "framer-motion";

type Position = { top: number; left: number };
type Butterfly = { left: number; top: number; delay: number; duration: number; scale: number };
type Star = { top: number; left: number; delay: number; size: number; opacity: number };

// Beautiful butterfly SVG
const butterflySVG = (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <g fill="white" opacity="0.9">
      {/* Left wing */}
      <ellipse cx="30" cy="40" rx="25" ry="35" transform="rotate(-20 30 40)" />
      {/* Right wing */}
      <ellipse cx="70" cy="40" rx="25" ry="35" transform="rotate(20 70 40)" />
      {/* Body */}
      <ellipse cx="50" cy="50" rx="4" ry="20" fill="white" />
      {/* Antennae */}
      <path d="M 48 35 Q 45 25 42 20" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M 52 35 Q 55 25 58 20" stroke="white" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

// Floating heart SVG for decoration
const heartSVG = (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <path
      fill="rgba(251, 191, 36, 0.3)"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
  </svg>
);

export default function App() {
  const [noPos, setNoPos] = useState<Position>({ top: 60, left: 50 });
  const [yesClicked, setYesClicked] = useState(false);

  // Flying white butterflies
  const [flyingButterflies] = useState<Butterfly[]>(() =>
    Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 4,
      scale: 0.6 + Math.random() * 0.6,
    }))
  );

  // Floating hearts for first screen
  const [floatingHearts] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2,
    }))
  );

  // Precomputed stars
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    }))
  );

  const moveNo = () => {
    setNoPos({
      top: Math.random() * 60 + 20,
      left: Math.random() * 60 + 20,
    });
  };

  const handleYesClick = () => setYesClicked(true);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Night background */}
      {yesClicked && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black via-blue-900 to-blue-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Floating hearts decoration (first screen only) */}
      {!yesClicked &&
        floatingHearts.map((h, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute z-0"
            style={{ top: `${h.top}%`, left: `${h.left}%` }}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {heartSVG}
          </motion.div>
        ))}

      {/* Stars */}
      {yesClicked &&
        stars.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0, s.opacity, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: s.delay }}
          />
        ))}

      {/* Moon with glow */}
      {yesClicked && (
        <motion.div
          className="absolute top-10 right-1/3 w-40 h-40 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Glow effect */}
          <div className="absolute w-full h-full rounded-full bg-white opacity-30 blur-[40px] z-0" />
          <img
            src="/fullmoon.png"
            className="w-full h-full rounded-full z-10"
            alt="Full Moon"
          />
        </motion.div>
      )}

      {/* First screen content */}
      {!yesClicked && (
        <motion.div
          className="flex flex-col items-center justify-center gap-8 z-10 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Decorative top emoji */}
          <motion.div
            className="text-6xl"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.div>

          {/* Main heading */}
          <motion.div
            className="text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
              Will you be
            </h1>
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 bg-clip-text text-transparent">
              my Valentine?
            </h2>
          </motion.div>

          {/* Subtext */}
          <motion.p
            className="text-amber-600 text-lg md:text-xl font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            to my beautiful bibo... Just say yes, please? 🥺
          </motion.p>

          {/* Buttons container */}
          <motion.div
            className="relative h-48 w-full max-w-lg mt-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {/* Yes button */}
            <div className="flex justify-center">
              <motion.button
                onClick={handleYesClick}
                className="relative px-14 py-5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white text-2xl font-bold shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">Yes! 💖</span>
              </motion.button>
            </div>

            {/* No button (moving) */}
            <motion.button
              onMouseEnter={moveNo}
              onClick={moveNo}
              onTouchStart={moveNo}
              style={{ top: `${noPos.top}%`, left: `${noPos.left}%` }}
              className="absolute px-10 py-4 rounded-full border-3 border-gray-400 text-gray-500 bg-white/80 backdrop-blur text-lg font-semibold shadow-lg transition-all duration-300 hover:border-gray-500"
            >
              No 😢
            </motion.button>
          </motion.div>

          {/* Bottom hint */}
          <motion.p
            className="text-amber-500/60 text-sm mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            (Hint: The "No" button is shy! 😊)
          </motion.p>
        </motion.div>
      )}

      {/* Poem */}
      {yesClicked && (
        <motion.div
          className="flex flex-col items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          
          <motion.p
            className="max-w-2xl text-l md:text-xl text-white text-center leading-relaxed font-light px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            <br /><br /><br /><br />
            My desire for beauty grows with each day,<br />
            My dearest love, you take my breath away.<br />
            Your eyes like emeralds, sparkling so bright,<br />
            And your lips so tender, soft, and just right.<br />
            <br />
            Your beauty knows no limits, no bounds,<br />
            No wonder my heart leaps and resounds.<br />
            With every hour, my love for you grows,<br />
            A love that endures through sun and through rainbows. 💛<br /><br />
            Thank you, my love, for being my Valentine, <br />
            Forever and always, I am yours and you are mine.
          </motion.p>
        </motion.div>
      )}

      {/* Flying white butterflies */}
      {yesClicked &&
        flyingButterflies.map((b, i) => (
          <motion.div
            key={`butterfly-${i}`}
            className="absolute z-20"
            style={{
              top: `${b.top}%`,
              left: `${b.left}%`,
              scale: b.scale,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0, 1, 1, 1],
              y: [50, -100, -250, -400],
              x: [0, 30, -20, 40],
              rotate: [0, 15, -10, 20, -15, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.2, 0.6, 1],
            }}
          >
            <motion.div
              animate={{
                rotateY: [0, 15, -15, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {butterflySVG}
            </motion.div>
          </motion.div>
        ))}
    </div>
  );
}