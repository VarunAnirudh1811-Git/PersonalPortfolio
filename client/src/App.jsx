import Navbar from './components/layout/Navbar/Navbar'
import Cursor from './components/common/Cursor/Cursor'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Games from './components/sections/Games/Games'
import Hobbies from './components/sections/Hobbies/Hobbies'
import Contact from './components/sections/Contact/Contact'

function App() {
  return (
    <>
      {/* Custom cursor — renders on top of everything */}
      <Cursor />

      {/* Sticky navbar */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Games />
        <Hobbies />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        borderTop: '1px solid var(--color-border)'
      }}>
        © {new Date().getFullYear()} Varun Anirudh — Built with React + Node.js
      </footer>
    </>
  )
}

export default App