"use client"; // This directive is necessary for Client Components in Next.js

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Correct import for the X (Twitter) icon
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";

// Particle component with TypeScript
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
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
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
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".social-icon",
          {
            stagger: 0.1,
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "back.out",
          },
          "-=0.3"
        )
        .from(
          ".header-content h1",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".header-content p",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".action-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <motion.header
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="gradient-bg absolute inset-0"
        style={{
          background: "linear-gradient(45deg, #4f46e5, #8b5cf6, #ec4899)",
          backgroundSize: "300% 300%",
          zIndex: -2,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: "0 0" }}
        animate={{ backgroundPosition: "50px 50px" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          zIndex: -1,
        }}
      />

      <div className="absolute inset-0 z-0">
        {particles.map((particle, i) => (
          <Particle
            key={i}
            delay={particle.delay}
            size={particle.size}
            startX={particle.startX}
            startY={particle.startY}
            endX={particle.endX}
            endY={particle.endY}
            duration={particle.duration}
            repeatDelay={particle.repeatDelay}
            color={particle.color}
          />
        ))}
      </div>

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
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-8 pointer-events-none"
            animate={{
              rotate: 360,
              borderRadius: ["50%", "30%", "70%", "50%"],
              borderColor: ["#fde047", "#a78bfa", "#ec4899", "#fde047"],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
              borderRadius: {
                duration: 2.5,
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

        <div className="header-content text-center flex flex-col items-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Mohammed Hussen
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-white/90 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Full-stack Developer | UI/UX Designer
          </motion.p>

          <motion.div
            className="flex justify-center gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              {
                icon: <FaGithub size={28} />,
                url: "https://github.com/awash-dev",
                name: "GitHub",
              },
              {
                icon: <FaLinkedin size={28} />,
                url: "https://www.linkedin.com/in/mohammed-hussen-mohammed-70981b299/",
                name: "LinkedIn",
              },
              {
                icon: <FaXTwitter size={28} />,
                url: "https://x.com/awash_dev",
                name: "X (Twitter)",
              },
              {
                icon: <FaTelegram size={28} />,
                url: "https://t.me/m0h4mm3d_hu554n",
                name: "Telegram",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                className="social-icon text-white hover:text-yellow-300 transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="action-buttons flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="https://awash-port.vercel.app/"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all"
            >
              View Portfolio
            </motion.a>
            <motion.a
              href="https://mame-journey.vercel.app/"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgb(124, 58, 237)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              Read Blog
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
