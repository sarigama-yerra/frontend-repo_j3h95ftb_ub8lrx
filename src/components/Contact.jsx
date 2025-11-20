import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2200)
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Tell us about your goals. We’ll follow up with a tailored plan.</p>
        </div>
        <form onSubmit={submit} className="max-w-2xl grid gap-4">
          <input required placeholder="Your name" className="px-4 py-3 rounded-lg bg-white/70 dark:bg-[#0f1115]/70 border border-black/5 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          <input required type="email" placeholder="Email" className="px-4 py-3 rounded-lg bg-white/70 dark:bg-[#0f1115]/70 border border-black/5 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          <textarea required placeholder="Project details" rows="5" className="px-4 py-3 rounded-lg bg-white/70 dark:bg-[#0f1115]/70 border border-black/5 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="justify-self-start px-5 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 shadow-lg shadow-blue-600/20 dark:shadow-sky-500/20 transition-colors">{sent ? 'Sent ✅' : 'Send message'}</motion.button>
        </form>
      </div>
    </section>
  )
}
