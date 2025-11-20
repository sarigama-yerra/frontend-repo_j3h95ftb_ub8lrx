import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/services`)
        const data = await res.json()
        setServices(data)
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const track = async (type, serviceId) => {
    try {
      const userId = localStorage.getItem('somdev-user') || crypto.randomUUID()
      localStorage.setItem('somdev-user', userId)
      await fetch(`${baseUrl}/api/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, type, service_id: serviceId, details: {} })
      })
    } catch (e) { /* noop */ }
  }

  useEffect(() => {
    if (services.length) services.forEach(s => track('view', s.id))
  }, [services])

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Services</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Expert teams delivering end-to-end outcomes, from discovery to launch and beyond.</p>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group rounded-2xl p-6 bg-white/70 dark:bg-[#0f1115]/70 backdrop-blur border border-black/5 dark:border-white/10 hover:shadow-xl hover:shadow-blue-600/10 dark:hover:shadow-cyan-500/10 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white grid place-content-center mb-4 shadow-lg">{s.icon?.slice(0,2) || 'SD'}</div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">From {s.price_from ? `$${s.price_from.toLocaleString()}` : 'custom'}</span>
                  <button onClick={() => track('order', s.id)} className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                    {s.cta_label || 'Order Now'} <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
