import { useState, useEffect } from 'react'
import './Hobbies.css'

const TABS = ['Electronics', 'Painting']

const ELECTRONICS = [
  { id: 1, title: 'Arduino Weather Station', desc: 'A DIY weather station using Arduino, DHT22 sensor and an OLED display showing real-time temperature, humidity and pressure.', tags: ['Arduino', 'C++', 'IoT'], year: '2024' },
  { id: 2, title: 'Custom Mechanical Keyboard', desc: 'Hand-soldered 65% mechanical keyboard with custom PCB design, hot-swap sockets and per-key RGB lighting.', tags: ['PCB Design', 'Soldering', 'QMK'], year: '2024' },
  { id: 3, title: 'Raspberry Pi NAS', desc: 'A home network attached storage server built on Raspberry Pi 4 with RAID configuration and a web dashboard.', tags: ['Raspberry Pi', 'Linux', 'Networking'], year: '2023' },
  { id: 4, title: 'LED Matrix Display', desc: 'A 32x16 LED matrix controlled via ESP32 that displays scrolling text, animations and live clock data.', tags: ['ESP32', 'C++', 'LED'], year: '2023' },
]

const PAINTINGS = [
  { id: 1, title: 'Mountain at Dusk', desc: 'Acrylic on canvas depicting a mountain landscape with warm orange and purple tones at dusk.', tags: ['Acrylic', 'Landscape', 'Canvas'], year: '2024' },
  { id: 2, title: 'Cyberpunk Alley', desc: 'Digital painting of a neon-lit cyberpunk back alley with rain reflections and glowing signs.', tags: ['Digital', 'Cyberpunk', 'Procreate'], year: '2024' },
  { id: 3, title: 'Forest Spirit', desc: 'Watercolour piece inspired by Japanese folklore, depicting a spirit emerging from an ancient forest.', tags: ['Watercolour', 'Fantasy', 'Japanese'], year: '2023' },
  { id: 4, title: 'Abstract Circuit', desc: 'Oil painting merging circuit board patterns with abstract expressionism. Where tech meets art.', tags: ['Oil', 'Abstract', 'Canvas'], year: '2023' },
]

export default function Hobbies() {
  const [activeTab, setActiveTab] = useState(0)
  const [hovered, setHovered] = useState(null)

  // Reset hovered state when tab changes
  useEffect(function() {
    setHovered(null)
  }, [activeTab])

  var items = activeTab === 0 ? ELECTRONICS : PAINTINGS

  return (
    <section className="hobbies section" id="hobbies">
      <div className="container">

        <div className="hobbies__header">
          <div>
            <p className="section-label">03 / Hobbies</p>
            <h2 className="hobbies__heading">Beyond the Screen</h2>
          </div>
          <p className="hobbies__subheading">
            When I am not coding games, I am building circuits or painting worlds.
          </p>
        </div>

        <div className="hobbies__tabs">
          {TABS.map(function(tab, i) {
            return (
              <button
                key={tab}
                className={i === activeTab ? 'hobbies__tab hobbies__tab--active' : 'hobbies__tab'}
                onClick={function() { setActiveTab(i) }}
              >
                <span className="hobbies__tab-icon">
                  {i === 0 ? '⚡' : '🎨'}
                </span>
                {tab}
              </button>
            )
          })}
        </div>

        <div className="hobbies__grid">
          {items.map(function(item) {
            return (
              <div
                key={item.id}
                className={hovered === item.id ? 'hobbies__card hobbies__card--hovered' : 'hobbies__card'}
                onMouseEnter={function() { setHovered(item.id) }}
                onMouseLeave={function() { setHovered(null) }}
              >
                <div className="hobbies__card-border"></div>

                <div className="hobbies__card-top">
                  <div className="hobbies__card-icon">
                    {activeTab === 0 ? '⚡' : '🎨'}
                  </div>
                  <span className="hobbies__card-year">{item.year}</span>
                </div>

                <div className="hobbies__card-body">
                  <h3 className="hobbies__card-title">{item.title}</h3>
                  <p className="hobbies__card-desc">{item.desc}</p>
                </div>

                <div className="hobbies__card-footer">
                  <div className="hobbies__card-tags">
                    {item.tags.map(function(tag) {
                      return (
                        <span key={tag} className="hobbies__card-tag">{tag}</span>
                      )
                    })}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
