import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About',   href: '#about'   },
  { label: 'Games',   href: '#games'   },
  { label: 'Hobbies', href: '#hobbies' },
]

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(function() {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return function() {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function handleNavClick(e, href) {
    e.preventDefault()
    setMenuOpen(false)
    var el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  var navClass = scrolled ? 'navbar navbar--scrolled' : 'navbar'
  var mobileClass = menuOpen ? 'navbar__mobile navbar__mobile--open' : 'navbar__mobile'
  var hamburgerClass = menuOpen ? 'navbar__hamburger open' : 'navbar__hamburger'

  return (
    <div className="navbar-wrapper">
      <nav className={navClass}>
        <div className="navbar__inner">
          <a href="#hero" className="navbar__logo" onClick={function(e) { handleNavClick(e, '#hero') }}>
            <span className="navbar__logo-bracket">[</span>
            VA
            <span className="navbar__logo-bracket">]</span>
          </a>
          <ul className="navbar__links">
            {NAV_LINKS.map(function(link) {
              return (
                <li key={link.href}>
                  <a href={link.href} className="navbar__link" onClick={function(e) { handleNavClick(e, link.href) }}>
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <a href="/assets/resume.pdf" download="Varun_Anirudh_Resume.pdf" className="navbar__resume">
            Resume ↓
          </a>
          <a href="#contact" className="navbar__cta" onClick={function(e) { handleNavClick(e, '#contact') }}>
            Hire Me
          </a>
          <button className={hamburgerClass} onClick={function() { setMenuOpen(!menuOpen) }} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={mobileClass}>
        {NAV_LINKS.map(function(link) {
          return (
            <a key={link.href} href={link.href} className="navbar__mobile-link" onClick={function(e) { handleNavClick(e, link.href) }}>
              {link.label}
            </a>
          )
        })}
        <a href="/assets/resume.pdf" download="Varun_Anirudh_Resume.pdf" className="navbar__resume">
          Resume ↓
        </a>
        <a href="#contact" className="navbar__cta" onClick={function(e) { handleNavClick(e, '#contact') }}>
          Hire Me
        </a>
      </div>
    </div>
  )
}
