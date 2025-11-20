import { useEffect, useRef, useState } from 'react'
import { Menu, Sun, Moon, MonitorSmartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const { mode, setMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: hidden ? -70 : 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-[#121212]/60 border-b border-black/5 dark:border-white/10"
    >
      <div className="container mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <a href="#" className="font-bold tracking-tight text-gray-900 dark:text-gray-100">SomDev Solutions</a>

        <div className="hidden md:flex items-center gap-7">
          <a className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors" href="#services">Services</a>
          <a className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors" href="#projects">Projects</a>
          <a className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors" href="#about">Company</a>
          <a className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors" href="#contact">Contact</a>
          <div className="flex items-center gap-2">
            <button aria-label="Light" onClick={() => setMode('light')} className={`p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 ${mode==='light'?'text-blue-600 dark:text-cyan-300':''}`}><Sun size={18} /></button>
            <button aria-label="Dark" onClick={() => setMode('dark')} className={`p-2 rounded hover:bg-black/5 dark:hover:bg:white/10 ${mode==='dark'?'text-blue-600 dark:text-cyan-300':''}`}><Moon size={18} /></button>
            <button aria-label="System" onClick={() => setMode('system')} className={`p-2 rounded hover:bg-black/5 dark:hover:bg-white/10 ${mode==='system'?'text-blue-600 dark:text-cyan-300':''}`}><MonitorSmartphone size={18} /></button>
          </div>
          <a href="#contact" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white transition-colors">Start a Project</a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}><Menu /></button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-6 pb-6 space-y-3 bg-white/80 dark:bg-[#121212]/70 backdrop-blur border-t border-black/5 dark:border-white/10"
          >
            <a onClick={() => setOpen(false)} className="block" href="#services">Services</a>
            <a onClick={() => setOpen(false)} className="block" href="#projects">Projects</a>
            <a onClick={() => setOpen(false)} className="block" href="#about">Company</a>
            <a onClick={() => setOpen(false)} className="block" href="#contact">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
