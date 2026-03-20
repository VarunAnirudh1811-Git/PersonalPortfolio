import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const heroRef      = useRef(null)
  const skyRef       = useRef(null)
  const moonRef      = useRef(null)
  const cloudsFarRef = useRef(null)
  const mountainsRef = useRef(null)
  const cloudsNearRef= useRef(null)
  const foregroundRef= useRef(null)
  const textRef      = useRef(null)

  useEffect(function() {
    function onScroll() {
      var scrollY = window.scrollY

      if (skyRef.current)
        skyRef.current.style.transform = 'translateY(' + (scrollY * 0.10) + 'px)'

      if (moonRef.current)
        moonRef.current.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)'

      if (cloudsFarRef.current)
        cloudsFarRef.current.style.transform = 'translateY(' + (scrollY * 0.20) + 'px)'

      if (mountainsRef.current)
        mountainsRef.current.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)'

      if (cloudsNearRef.current)
        cloudsNearRef.current.style.transform = 'translateY(' + (scrollY * 0.45) + 'px)'

      if (foregroundRef.current)
        foregroundRef.current.style.transform = 'translateY(' + (scrollY * 0.60) + 'px)'

      if (textRef.current)
        textRef.current.style.transform = 'translateY(' + (scrollY * 0.25) + 'px)'
        textRef.current.style.opacity   = 1 - (scrollY / 500)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return function() {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={heroRef}>

      <div className="hero__layers">
        <div className="hero__layer hero__sky"        ref={skyRef}></div>
        <div className="hero__layer hero__moon"       ref={moonRef}></div>
        <div className="hero__layer hero__clouds-far" ref={cloudsFarRef}></div>
        <div className="hero__layer hero__mountains"  ref={mountainsRef}></div>
        <div className="hero__layer hero__clouds-near"ref={cloudsNearRef}></div>
        <div className="hero__layer hero__foreground" ref={foregroundRef}></div>
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content" ref={textRef}>
        <p className="hero__eyebrow">Welcome to my world</p>
        <h1 className="hero__title">
          VARUN<br />
          <span className="hero__title-outline">ANIRUDH</span>
        </h1>
        <p className="hero__subtitle">
          Game Developer &nbsp;·&nbsp; Electronics Enthusiast &nbsp;·&nbsp; Painter
        </p>
        <div className="hero__cta-group">
          <a href="#games" className="hero__btn hero__btn--primary" onClick={function(e) {
            e.preventDefault()
            document.querySelector('#games').scrollIntoView({ behavior: 'smooth' })
          }}>
            View My Work
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost" onClick={function(e) {
            e.preventDefault()
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
          }}>
            Get In Touch
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span></span>
        <p>Scroll</p>
      </div>

    </section>
  )
}