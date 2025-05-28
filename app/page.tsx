"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";

// Particle component remains the same...

const Header = () => {
  // Previous state and effects remain the same...

  return (
    <motion.header
      ref={containerRef}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background elements remain the same... */}

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center gap-12 h-full relative z-10 text-white">
        <motion.div
          className="profile-image-container relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src="/avator.jpg"
            alt="Profile"
            className="w-[300px] h-[300px] rounded-full border-8 border-white shadow-2xl object-cover"
            initial={{ scale: 0.9 }}
            animate={{
              scale: 1,
              // Circular motion animation
              x: [0, 10, 0, -10, 0],
              y: [0, -15, -20, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              // Spring animation for initial load
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
              // Circular motion settings
              x: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-8 pointer-events-none"
            animate={{
              rotate: 360,
              borderRadius: ["50%", "45%", "50%", "55%", "50%"],
              borderColor: ["#fde047", "#a78bfa", "#ec4899", "#fde047"],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
              borderRadius: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              borderColor: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          />
        </motion.div>

        {/* Rest of the component remains the same... */}
      </div>
    </motion.header>
  );
};

export default Header;