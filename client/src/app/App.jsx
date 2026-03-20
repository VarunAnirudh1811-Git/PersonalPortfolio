import Navbar from '../components/layout/Navbar/Navbar'
import Cursor from '../components/common/Cursor/Cursor'
import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary'
import Hero from '../components/sections/Hero/Hero'
import About from '../components/sections/About/About'
import Games from '../components/sections/Games/Games'
import Hobbies from '../components/sections/Hobbies/Hobbies'
import Contact from '../components/sections/Contact/Contact'

const FOOTER_STYLE = {
  textAlign: 'center',
  padding: '2rem',
  color: 'var(--color-text-muted)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  borderTop: '1px solid var(--color-border)'
}
function App() {
  return (
    <ErrorBoundary>
      <>
        {/* Custom cursor — renders on top of everything */}
        <Cursor />

        {/* Sticky navbar */}
        <Navbar />

        {/* Main content */}
        <main>
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
          <ErrorBoundary>
            <Games />
          </ErrorBoundary>
          <ErrorBoundary>
            <Hobbies />
          </ErrorBoundary>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <footer style={FOOTER_STYLE}>
          © {new Date().getFullYear()} Varun Anirudh — Built with React + Node.js
        </footer>
      </>
    </ErrorBoundary>
  )
}

export default App