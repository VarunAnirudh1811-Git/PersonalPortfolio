import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)

  useEffect(function() {
    // Don't render custom cursor on touch devices
    var isTouchDevice = function() {
      return (
        (typeof window !== 'undefined' &&
          ('ontouchstart' in window ||
            (window.DocumentTouch && typeof document !== 'undefined' && document instanceof window.DocumentTouch))) ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
      )
    }

    if (isTouchDevice()) {
      return
    }
    var dot  = dotRef.current
    var ring = ringRef.current

    var mouseX = 0
    var mouseY = 0
    var ringX  = 0
    var ringY  = 0

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)'
    }

    var rafId = null

    function animate() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = 'translate(' + ringX + 'px, ' + ringY + 'px)'
      rafId = requestAnimationFrame(animate)
    }

    function onMouseEnterLink() {
      dot.classList.add('cursor-dot--hover')
      ring.classList.add('cursor-ring--hover')
    }

    function onMouseLeaveLink() {
      dot.classList.remove('cursor-dot--hover')
      ring.classList.remove('cursor-ring--hover')
    }

    function addLinkListeners() {
      var links = document.querySelectorAll('a, button')
      links.forEach(function(el) {
        // Remove old listeners first to prevent duplicates
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()
    addLinkListeners()

    var observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return function() {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor">
      <div className="cursor-dot"  ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </div>
  )
}