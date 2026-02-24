/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/globe/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={0.30} groundColor="black" />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1}
        intensity={0.75} castShadow shadow-mapSize={1024} />
      <pointLight intensity={0.75} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1.75 : 2.4}
        position={isMobile ? [-0.5, -1.75, 0] : [-0.5, -1.05, 0]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [show,     setShow]     = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    // Don't render 3D at all on mobile
    if (!mq.matches) setShow(true);
    const h = (e) => { setIsMobile(e.matches); setShow(!e.matches); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  if (!show) return null;

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
          maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;