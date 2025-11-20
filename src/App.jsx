import { useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'

function App() {
  const contactRef = useRef(null)

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-[#1F1F1F] dark:bg-[#121212] dark:text-[#E0E0E0]">
        <Navbar />

        <main>
          <Hero onCTA={scrollToContact} />
          <Services />
          <Projects />
          <About />
          <Contact ref={contactRef} />
        </main>

        <Footer />

        <Chatbot />
      </div>
    </ThemeProvider>
  )
}

export default App
