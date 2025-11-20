import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

const phrases = [
  'Innovative Solutions',
  'Modern Technology',
  'Reliable Services',
  'AI-Powered Experiences',
  'Enterprise-Grade Delivery'
]

export default function Hero({ onCTA }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
      </div>

      <div className="relative container mx-auto px-6 sm:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur bg-white/10 dark:bg-black/20 ring-1 ring-black/10 dark:ring-white/10 mb-6">
            <span className="text-[10px] uppercase tracking-wider text-gray-700 dark:text-gray-300">SomDev Solutions</span>
            <span className="mx-2 h-1 w-1 rounded-full bg-gray-400/60" />
            <span className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-cyan-300">Trusted by forward-thinking teams</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
            <span className="block">We build</span>
            <span className="block mt-2 h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent"
                >
                  {phrases[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Premium engineering and design for ambitious companies. We craft fast, reliable, and elegant solutions that scale.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCTA}
              className="px-5 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 shadow-lg shadow-blue-600/20 dark:shadow-sky-500/20 transition-colors"
            >
              Start a Project
            </motion.button>
            <a href="#services" className="px-5 py-3 rounded-lg bg-gray-900/5 dark:bg-white/10 hover:bg-gray-900/10 dark:hover:bg-white/15 text-gray-800 dark:text-gray-100 transition-colors">Explore Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}
