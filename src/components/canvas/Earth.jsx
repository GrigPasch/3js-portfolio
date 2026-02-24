/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  )
}

useGLTF.preload('./planet/scene.gltf')

/* CSS globe fallback for mobile */
const CSSGlobe = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-40 h-40 sm:w-48 sm:h-48">
      {/* Globe rings */}
      {[1, 0.75, 0.5].map((s, i) => (
        <div key={i} className="absolute inset-0 rounded-full border border-[#5ec4ff]/20"
          style={{
            transform: `scale(${s}) rotateX(${60 + i * 15}deg)`,
            animation: `spin ${6 + i * 2}s linear infinite`,
          }} />
      ))}
      <div className="absolute inset-0 rounded-full border-2 border-[#5ec4ff]/30"
        style={{ boxShadow: "0 0 40px rgba(94,196,255,0.15), inset 0 0 40px rgba(94,196,255,0.05)" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl">🌍</span>
      </div>
    </div>
  </div>
)

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  if (isMobile) return <CSSGlobe />;

  return (
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: false, powerPreference: "high-performance" }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default EarthCanvas