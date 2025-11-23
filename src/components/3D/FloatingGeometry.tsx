import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometryProps {
  position: [number, number, number];
  geometry: "icosahedron" | "torus" | "box" | "octahedron";
  color: string;
  wireframe?: boolean;
  speed?: number;
}

export default function FloatingGeometry({
  position,
  geometry,
  color,
  wireframe = false,
  speed = 1,
}: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(time * speed * 0.5) * 0.5;

    // Rotation
    meshRef.current.rotation.x = time * speed * 0.2;
    meshRef.current.rotation.y = time * speed * 0.3;
    meshRef.current.rotation.z = time * speed * 0.1;
  });

  const renderGeometry = () => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 16, 100]} />;
      case "box":
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      {renderGeometry()}
      {wireframe ? (
        <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
      ) : (
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      )}
    </mesh>
  );
}
