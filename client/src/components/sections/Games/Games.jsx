import { useState, useEffect } from 'react'
import './Games.css'

const GAMES = [
  { id: 1, title: 'Project Nexus',  genre: 'Action RPG',    year: '2024', description: 'An open-world action RPG with procedurally generated dungeons and a deep crafting system.', tags: ['Unity', 'C#', 'Procedural Gen'],   color: '#ff6b2b' },
  { id: 2, title: 'Void Runner',    genre: 'Endless Runner', year: '2023', description: 'A fast-paced endless runner set in deep space with dynamic obstacle generation.',            tags: ['Godot', 'GDScript', 'Mobile'],     color: '#4d9fff' },
  { id: 3, title: 'Echoes of War',  genre: 'Strategy',       year: '2023', description: 'A turn-based strategy game inspired by classic tactical RPGs with a modern art style.',       tags: ['Unity', 'C#', 'Turn-Based'],       color: '#a855f7' },
  { id: 4, title: 'Neon Drift',     genre: 'Racing',         year: '2022', description: 'A cyberpunk racing game with neon aesthetics, drifting mechanics and a synthwave soundtrack.', tags: ['Unreal', 'Blueprints', 'Physics'], color: '#22d3ee' },
  { id: 5, title: 'Forest Spirit',  genre: 'Platformer',     year: '2022', description: 'A hand-drawn platformer about a forest spirit restoring balance to a corrupted woodland.',    tags: ['Godot', '2D', 'Hand-drawn'],       color: '#4ade80' },
  { id: 6, title: 'Cipher',         genre: 'Puzzle',         year: '2021', description: 'A minimalist puzzle game built around cryptographic ciphers and pattern recognition.',        tags: ['Unity', 'C#', 'Puzzle Design'],    color: '#f59e0b' },
]

export default function Games() {
  const [index, setIndex]   = useState(0)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(3)

  // Update VISIBLE count based on window width (matches CSS breakpoints)
  useEffect(function() {
    function updateVisible() {
      if (window.innerWidth <= 580) {
        setVisible(1)
      } else if (window.innerWidth <= 900) {
        setVisible(2)
      } else {
        setVisible(3)
      }
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return function() { window.removeEventListener('resize', updateVisible) }
  }, [])

  // Reset index if it's out of bounds when visible changes
  useEffect(function() {
    if (index > GAMES.length - visible) {
      setIndex(Math.max(0, GAMES.length - visible))
    }
  }, [visible])

  // Clear hovered state when slide changes
  useEffect(function() {
    setHovered(null)
  }, [index])

  function prev() {
    setIndex(function(i) { return Math.max(0, i - 1) })
  }

  function next() {
    setIndex(function(i) { return Math.min(GAMES.length - visible, i + 1) })
  }

  function goTo(i) {
    setIndex(i)
  }

  var canPrev  = index > 0
  var canNext  = index < GAMES.length - visible
  var visibleGames  = GAMES.slice(index, index + visible)
  var dotCount = GAMES.length - visible + 1

  return (
    <section className="games section" id="games">

      <div className="container">
        <div className="games__header">
          <div>
            <p className="section-label">02 / Games Portfolio</p>
            <h2 className="games__heading">Games I've Built</h2>
          </div>
          <p className="games__subheading">
            A selection of projects ranging from game jams to full releases.
          </p>
        </div>
      </div>

      <div className="games__carousel">

        <button
          className={canPrev ? 'games__arrow' : 'games__arrow games__arrow--disabled'}
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous"
        >
          &#8592;
        </button>

        <div className="games__track">
          {visibleGames.map(function(game) {
            return (
              <div
                key={game.id}
                className={hovered === game.id ? 'games__card games__card--hovered' : 'games__card'}
                onMouseEnter={function() { setHovered(game.id) }}
                onMouseLeave={function() { setHovered(null) }}
                style={{ '--card-accent': game.color }}
              >
                <div className="games__card-border"></div>

                <div className="games__card-top">
                  <div className="games__card-thumb">
                    <div className="games__card-thumb-placeholder">
                      {game.title.charAt(0)}
                    </div>
                    <div className="games__card-thumb-glow"></div>
                  </div>
                  <div className="games__card-meta">
                    <span className="games__card-genre">{game.genre}</span>
                    <span className="games__card-year">{game.year}</span>
                  </div>
                </div>

                <div className="games__card-body">
                  <h3 className="games__card-title">{game.title}</h3>
                  <p className="games__card-desc">{game.description}</p>
                </div>

                <div className="games__card-footer">
                  <div className="games__card-tags">
                    {game.tags.map(function(tag) {
                      return (
                        <span key={tag} className="games__card-tag">{tag}</span>
                      )
                    })}
                  </div>
                  <a href="#" className="games__card-link">View &#8594;</a>
                </div>

              </div>
            )
          })}
        </div>

        <button
          className={canNext ? 'games__arrow' : 'games__arrow games__arrow--disabled'}
          onClick={next}
          disabled={!canNext}
          aria-label="Next"
        >
          &#8594;
        </button>

      </div>

      <div className="container">
        <div className="games__dots">
          {Array.from({ length: dotCount }).map(function(_, i) {
            return (
              <button
                key={i}
                className={i === index ? 'games__dot games__dot--active' : 'games__dot'}
                onClick={function() { goTo(i) }}
                aria-label={'Go to slide ' + (i + 1)}
              ></button>
            )
          })}
        </div>
      </div>

    </section>
  )
}