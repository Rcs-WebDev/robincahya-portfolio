import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroPreloader({ onCurtainOpen, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Initial hold showing branding monogram with longer luxury delay (1200ms)
    const holdTimer = setTimeout(() => {
      setIsExiting(true);
      if (onCurtainOpen) {
        onCurtainOpen();
      }
    }, 1200);

    return () => clearTimeout(holdTimer);
  }, [onCurtainOpen]);

  // Animasi tirai vertikal membuka ke atas secara halus & bertahap (stagger)
  const panelVariants = {
    initial: { scaleY: 1 },
    exit: (i) => ({
      scaleY: 0,
      transition: {
        duration: 1.65,
        ease: [0.83, 0, 0.17, 1],
        delay: i * 0.11,
      },
    }),
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          key="intro-preloader-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 2.3 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Kolom Tirai Vertikal Merah (#ff113a / #E33527) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={panelVariants}
                initial="initial"
                exit="exit"
                style={{
                  flex: 1,
                  height: "100%",
                  background: "linear-gradient(180deg, #741A2f 0%, #fb9660ff 50%, #FFC6A8 100%)",
                  transformOrigin: "top",
                  borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
            ))}
          </div>

          {/* Opening Branding Monogram in Center */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.94,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              zIndex: 10,
              pointerEvents: "none",
              letterSpacing: "0.2em",
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "0.15em",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span>ROBIN</span>
              <span style={{ color: "#fdfefaff", fontSize: "1.3rem" }}>✱</span>
              <span>PORTOFOLIO</span>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                opacity: 0.9,
                marginTop: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#d4f09e",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              Design • Create • Innovate
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}