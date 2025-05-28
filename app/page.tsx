"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";

const Particle = ({
  delay,
  size,
  startX,
  startY,
  endX,
  endY,
  duration,
  repeatDelay,
  color,
}: {
  delay: number;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  repeatDelay: number;
  color: string;
}) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        top: `${startY}%`,
        backgroundColor: color,
      }}
      initial={{ scale: 0 }}
      animate={{
        scale: [0, 1.2, 0],
        x: `${endX - startX}%`,
        y: `${endY - startY}%`,
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: repeatDelay,
        ease: "easeInOut",
      }}
    />
  );
};

const Header = () => {
  // Properly define containerRef at the top of the component
  const containerRef = useRef<HTMLDivElement>(null);
  
  type ParticleProps = {
    delay: number;
    size: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
    repeatDelay: number;
    color: string;
  };

  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      delay: Math.random() * 5,
      size: 5 + Math.random() * 15,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      repeatDelay: Math.random() * 5,
      color: `hsla(${Math.random() * 60 + 200}, 80%, 70%, 0.7)`,
    }));
    setParticles(generatedParticles);
  }, []);

  // Ensure the ref is properly passed to useGSAP
  useGSAP(
    () => {
      gsap.to(".gradient-bg", {
        backgroundPosition: "100% 50%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      const tl = gsap.timeline();
      tl.from(".profile-image-container", {
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".social-icon",
        {
          stagger: 0.1,
          y: -20,
          duration: 0.5,
          ease: "back.out",
        },
        "-=0.3"
      )
      .from(
        ".header-content h1",
        {
          y: 20,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        ".header-content p",
        {
          y: 20,
          duration: 0.6,
        },
        "-=0.3"
      )
      .from(
        ".action-buttons",
        {
          y: 20,
          duration: 0.6,
        },
        "-=0.2"
      );
    },
    { scope: containerRef } // Properly scoped to containerRef
  );

  return (
    <motion.header
      ref={containerRef} // Ref properly attached here
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Rest of your component remains the same */}
      <div
        className="gradient-bg absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #4f46e5, #8b5cf6, #ec4899)",
          backgroundSize: "300% 300%",
          zIndex: -2,
        }}
      />

      {/* ... rest of your JSX ... */}
    </motion.header>
  );
};

export default Header;