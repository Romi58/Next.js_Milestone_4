"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const programmingSymbols = ["{ }", "[ ]", "( )", "<>", "//", "/*", "*/", "=>", "++", "--"]
const programmingKeywords = ["function", "const", "let", "var", "if", "else", "for", "while", "return", "class"]

interface Particle {
  x: number
  y: number
  text: string
  size: number
  speed: number
  color: string
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text:
          Math.random() > 0.5
            ? programmingSymbols[Math.floor(Math.random() * programmingSymbols.length)]
            : programmingKeywords[Math.floor(Math.random() * programmingKeywords.length)],
        size: Math.random() * 14 + 10,
        speed: Math.random() * 2 + 0.5,
        color: `rgba(52, 144, 220, ${Math.random() * 0.5 + 0.1})`,
      })
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.font = `${particle.size}px Arial`
        ctx.fillStyle = particle.color
        ctx.fillText(particle.text, particle.x, particle.y)

        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0 - particle.size
          particle.x = Math.random() * canvas.width
        }
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export default AnimatedBackground

