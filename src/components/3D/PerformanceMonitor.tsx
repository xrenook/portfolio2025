import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface PerformanceMonitorProps {
  onPerformanceChange?: (fps: number) => void;
}

export default function PerformanceMonitor({
  onPerformanceChange,
}: PerformanceMonitorProps) {
  const { gl } = useThree();
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  useFrame(() => {
    frameCountRef.current++;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;

    // Calculate FPS every second
    if (deltaTime >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
      fpsRef.current = fps;

      if (onPerformanceChange) {
        onPerformanceChange(fps);
      }

      // Auto-adjust quality based on FPS
      if (fps < 30) {
        // Low FPS - reduce quality
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      } else if (fps > 50) {
        // Good FPS - increase quality
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }

      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
    }
  });

  useEffect(() => {
    // Initial quality setting based on device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }
  }, [gl]);

  return null;
}
