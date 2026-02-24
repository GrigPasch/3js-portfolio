/* eslint-disable react/no-unknown-property */
import { useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

const StarField = (props) => {
  const ref = useRef();
  const rawSphere = random.inSphere(new Float32Array(3000), { radius: 1.2 });
  const sphere    = Float32Array.from(rawSphere, (v) => (isNaN(v) ? 0 : v));

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#f272c8" size={0.004} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

/* CSS star fallback for mobile*/
const CSSStars = () => (
  <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none"
    style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(94,196,255,0.03) 0%, transparent 70%)" }}>
    {Array.from({ length: 60 }).map((_, i) => (
      <div key={i} className="absolute rounded-full bg-white"
        style={{
          width:  Math.random() * 2 + 1,
          height: Math.random() * 2 + 1,
          left:   `${Math.random() * 100}%`,
          top:    `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
    ))}
  </div>
);

const StarsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      {isMobile ? (
        <CSSStars />
      ) : (
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
          <Preload all />
        </Canvas>
      )}
    </div>
  );
};

export default StarsCanvas;