export default function Footer(){
  return (
    <footer className="py-12 border-t border-black/5 dark:border-white/10">
      <div className="container mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} SomDev Solutions. All rights reserved.</div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">Twitter</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
