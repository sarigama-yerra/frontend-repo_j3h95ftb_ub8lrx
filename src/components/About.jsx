import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Company Overview</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">SomDev Solutions delivers cutting-edge, reliable technology built for scale. Our cross-functional teams design and ship digital products that move metrics and delight users.</p>
            <p className="mt-3 text-gray-600 dark:text-gray-300">We combine modern engineering, thoughtful design, and pragmatic product strategy to achieve outcomes quickly and sustainably.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20">
              <div className="absolute inset-6 rounded-2xl border-2 border-dashed border-blue-500/40"/>
              <div className="absolute inset-12 rounded-2xl border-2 border-dashed border-cyan-500/40"/>
              <div className="absolute inset-20 rounded-2xl border-2 border-dashed border-purple-500/40"/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
