import './About.css'

const STATS = [
  { value: '3+',  label: 'Years Coding'        },
  { value: '10+', label: 'Games Built'          },
  { value: '15+', label: 'Electronics Projects' },
  { value: '20+', label: 'Paintings'            },
]

export default function About() {
  function handleContactClick(e) {
    e.preventDefault()
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <p className="section-label">01 / About Me</p>
            <h2 className="about__heading">
              Crafting worlds,<br />
              <span className="about__heading-accent">one pixel at a time.</span>
            </h2>
            <p className="about__bio">
              Hey! I am Varun — a game developer with a love for building
              immersive experiences. When I am not writing game logic or
              pushing pixels, I am tinkering with electronics or painting
              landscapes inspired by the worlds I build.
            </p>
            <p className="about__bio">
              I believe great design lives at the intersection of technology
              and art — and I chase that intersection every day.
            </p>
            <div className="about__actions">
              <a href="/assets/resume.pdf" download="Varun_Anirudh_Resume.pdf" className="about__btn-resume">
                <span className="about__btn-icon">↓</span>
                Download Resume
              </a>
              <a href="#contact" className="about__btn-contact" onClick={handleContactClick}>
                Let's Talk
              </a>
            </div>
          </div>
          <div className="about__right">
            <div className="about__avatar-wrap">
              <div className="about__avatar-placeholder">
                <span>VA</span>
              </div>
              <div className="about__avatar-glow"></div>
            </div>
          </div>
        </div>
        <div className="about__stats">
          {STATS.map(function(stat) {
            return (
              <div className="about__stat" key={stat.label}>
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}