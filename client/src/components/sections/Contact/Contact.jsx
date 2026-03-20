import { useState, useRef, useEffect } from 'react'
import './Contact.css'

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/VarunAnirudh1811-Git', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/varun-anirudh', icon: 'LI' },
  { label: 'Twitter',  href: 'https://twitter.com/VarunAnirudh', icon: 'TW' },
  { label: 'Email',    href: 'mailto:your@email.com', icon: 'EM' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState('')
  const abortControllerRef  = useRef(null)

  // Cleanup AbortController on unmount
  useEffect(function() {
    return function() {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  function handleChange(e) {
    var field = e.target.name
    var value = e.target.value
    setForm(function(prev) {
      return { ...prev, [field]: value }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setStatus('loading')
    
    // Use environment variable or fallback to relative path for Vite proxy
    const apiUrl = import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/api/contact`
      : '/api/contact'
    
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    .then(function(res) { return res.json() })
    .then(function(data) {
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setError(data.error || 'Something went wrong.')
      }
    })
    .catch(function(err) {
      // Don't set error if request was aborted (unmounted)
      if (err.name !== 'AbortError') {
        setStatus('error')
        setError('Could not send message. Please try again.')
      }
    })
  }

  function handleReset() {
    setStatus('idle')
    setError('')
  }

  function renderSocials() {
    return SOCIALS.map(function(s) {
      return (
        <a key={s.label} href={s.href} className="contact__social" target="_blank" rel="noreferrer">
          <span className="contact__social-icon">{s.icon}</span>
          <span className="contact__social-label">{s.label}</span>
        </a>
      )
    })
  }

  if (status === 'success') {
    return (
      <section className="contact section" id="contact">
        <div className="container">
          <div className="contact__success">
            <div className="contact__success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I will get back to you soon.</p>
            <button className="contact__btn" onClick={handleReset}>Send Another</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__grid">

          <div className="contact__left">
            <p className="section-label">04 / Contact</p>
            <h2 className="contact__heading">
              Let's build
              <br />
              <span className="contact__heading-accent">something together.</span>
            </h2>
            <p className="contact__bio">
              Whether you have a project in mind, want to collaborate,
              or just want to say hi — my inbox is always open.
            </p>
            <div className="contact__socials">
              {renderSocials()}
            </div>
          </div>

          <div className="contact__right">
            <form className="contact__form-wrap" onSubmit={handleSubmit}>

              <div className="contact__field">
                <label className="contact__label" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact__input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact__input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              <div className="contact__field">
                <label className="contact__label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  onKeyDown={function(e) {
                    // Allow Ctrl+Enter or Cmd+Enter to submit, but Enter alone adds newline
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                      handleSubmit(e)
                    }
                  }}
                  rows="5"
                ></textarea>
              </div>

              {error && (
                <p className="contact__error">{error}</p>
              )}

              <button
                type="submit"
                className={status === 'loading' ? 'contact__btn contact__btn--loading' : 'contact__btn'}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
