import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePosition?: { x: number; y: number };
}

export default function ParticleField({
  count = 2000,
  mousePosition = { x: 0, y: 0 },
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);

  // Generate particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Colors - mix of theme colors
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Pink
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 0.33;
      } else if (colorChoice < 0.66) {
        // Blue
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.82;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Orange
        colors[i * 3] = 0.98;
        colors[i * 3 + 1] = 0.62;
        colors[i * 3 + 2] = 0.1;
      }
    }

    return { positions, colors };
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire particle field
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // React to mouse position
    points.current.rotation.x += mousePosition.y * 0.05;
    points.current.rotation.y += mousePosition.x * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          args={[particlesPosition.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          args={[particlesPosition.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
