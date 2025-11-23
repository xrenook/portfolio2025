import * as THREE from 'three';

// Holographic shader material
export const createHolographicMaterial = (color: string = '#00d1ff') => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        float pattern = sin(vPosition.y * 10.0 + time) * 0.5 + 0.5;
        vec3 finalColor = color * pattern;
        float alpha = pattern * 0.6 + 0.4;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });
};

// Neon glow material
export const createNeonMaterial = (color: string = '#ff0055') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
  });
};

// Wireframe material
export const createWireframeMaterial = (color: string = '#00d1ff') => {
  return new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
};

// Metallic material
export const createMetallicMaterial = (color: string = '#9d00ff') => {
  return new THREE.MeshStandardMaterial({
    color: color,
    metalness: 1.0,
    roughness: 0.1,
    envMapIntensity: 1.0,
  });
};
