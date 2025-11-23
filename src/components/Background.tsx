import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./3D/ParticleField";
import FloatingGeometry from "./3D/FloatingGeometry";
import PerformanceMonitor from "./3D/PerformanceMonitor";
import useMousePosition from "../hooks/useMousePosition";
import "./Background.scss";

const Background = () => {
  const mousePosition = useMousePosition();

  // Normalize mouse position for 3D
  const normalizedMouse = {
    x: (mousePosition.x / window.innerWidth) * 2 - 1,
    y: -(mousePosition.y / window.innerHeight) * 2 + 1,
  };

  return (
    <div className="global-background">
      <div className="grid-overlay"></div>

      {/* 3D Canvas Background */}
      <div className="canvas-3d-background">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <PerformanceMonitor />

            {/* Ambient lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d1ff" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ff0055"
            />

            {/* Particle field */}
            <ParticleField count={1500} mousePosition={normalizedMouse} />

            {/* Floating geometric shapes */}
            <FloatingGeometry
              position={[-8, 3, -5]}
              geometry="icosahedron"
              color="#00d1ff"
              wireframe
              speed={0.8}
            />
            <FloatingGeometry
              position={[8, -3, -8]}
              geometry="torus"
              color="#ff0055"
              wireframe
              speed={1.2}
            />
            <FloatingGeometry
              position={[-6, -4, -6]}
              geometry="octahedron"
              color="#9d00ff"
              wireframe
              speed={1.0}
            />
            <FloatingGeometry
              position={[7, 4, -7]}
              geometry="box"
              color="#f99e1a"
              wireframe
              speed={0.9}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Background;
