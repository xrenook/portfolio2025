import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center, Float } from "@react-three/drei";
import * as THREE from "three";

interface Hero3DSceneProps {
  mousePosition?: { x: number; y: number };
}

export default function Hero3DScene({
  mousePosition = { x: 0, y: 0 },
}: Hero3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate the entire group based on mouse
    groupRef.current.rotation.y = mousePosition.x * 0.3;
    groupRef.current.rotation.x = -mousePosition.y * 0.2;

    // Animate individual rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.5;
      ringRef1.current.rotation.y = time * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 0.4;
      ringRef2.current.rotation.z = time * 0.2;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.y = time * 0.6;
      ringRef3.current.rotation.z = -time * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbiting rings */}
      <mesh ref={ringRef1} position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshBasicMaterial color="#00d1ff" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ringRef2} position={[0, 0, 0]}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#ff0055" transparent opacity={0.6} />
      </mesh>

      <mesh ref={ringRef3} position={[0, 0, 0]}>
        <torusGeometry args={[4, 0.05, 16, 100]} />
        <meshBasicMaterial color="#f99e1a" transparent opacity={0.6} />
      </mesh>

      {/* Floating geometric shapes */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-4, 2, -2]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#9d00ff"
            emissive="#9d00ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[4, -2, -2]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#00d1ff"
            emissive="#00d1ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-3, -3, -3]}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial
            color="#ff0055"
            emissive="#ff0055"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}
