import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import "./Project3DCard.scss";

interface Project3DCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  index: number;
}

function Card3D({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    if (isHovered) {
      meshRef.current.rotation.y = Math.sin(time * 2) * 0.1;
      meshRef.current.rotation.x = Math.cos(time * 2) * 0.05;
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[4, 5, 0.2]} />
      <meshStandardMaterial
        color="#e8e8e8"
        metalness={0.3}
        roughness={0.4}
        emissive="#00d1ff"
        emissiveIntensity={isHovered ? 0.2 : 0.05}
      />

      {/* Border glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4, 5, 0.2)]} />
        <lineBasicMaterial
          color={isHovered ? "#00d1ff" : "#ff0055"}
          linewidth={2}
        />
      </lineSegments>
    </mesh>
  );
}

export default function Project3DCard({
  title,
  description,
  tags,
  image,
  link,
  index,
}: Project3DCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-3d-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Background */}
      <div className="card-3d-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00d1ff" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff0055" />
          <Card3D isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Project Image */}
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}

      {/* Card Content */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="card-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  );
}
