import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId  = null;
    let ticking = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(animateRing);
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;

      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        rafId = requestAnimationFrame(animateRing);
      } else {
        ticking = false;
      }
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };
    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove',  onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout',  onMouseOut,  { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout',  onMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;