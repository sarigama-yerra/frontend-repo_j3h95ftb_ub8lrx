import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Projects() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/projects`)
        const data = await res.json()
        setItems(data)
      } catch (e) { /* noop */ }
    }
    load()
  }, [])

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">A glimpse into recent deliveries. Each project balances performance, usability, and maintainability.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0f1115]/70 border border-black/5 dark:border-white/10 hover:shadow-2xl hover:shadow-blue-600/10 dark:hover:shadow-cyan-500/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white text-lg font-semibold">{p.title}</h3>
                  <p className="text-white/80 text-sm">{p.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {p.tags?.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
