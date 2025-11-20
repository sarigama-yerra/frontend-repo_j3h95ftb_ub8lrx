import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [{ role: 'assistant', content: 'Hi! I\'m SomDev\'s assistant. Ask me about services, projects, or pricing.' }])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const userId = localStorage.getItem('somdev-user') || crypto.randomUUID()
    localStorage.setItem('somdev-user', userId)
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)
    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message: userMsg.content })
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.answer }])
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button onClick={() => setOpen(!open)} className="h-12 w-12 rounded-full grid place-content-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 shadow-lg">
        {open ? <X /> : <MessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.2 }} className="mt-3 w-[min(92vw,380px)] rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#0f1115]">
            <div className="px-4 py-3 border-b border-black/5 dark:border-white/10 font-semibold">SomDev Assistant</div>
            <div ref={containerRef} className="h-64 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm ${m.role==='assistant' ? 'text-gray-800 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}`}>{m.content}</div>
              ))}
              {typing && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 className="animate-spin" size={16}/> typing…</div>}
            </div>
            <div className="p-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=> e.key==='Enter' && send()} placeholder="Ask about services, projects, pricing…" className="flex-1 px-3 py-2 rounded-lg bg-black/5 dark:bg-white/10 focus:outline-none" />
              <button onClick={send} className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
