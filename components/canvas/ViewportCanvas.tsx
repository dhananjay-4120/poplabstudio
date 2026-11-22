'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollMetrics } from '@/components/ui/SmoothScroll';

/**
 * R3F Scroll Modulator:
 * Reads scroll velocity & progress from Lenis in useFrame without causing React re-render thrashing.
 * Smoothly interpolates shader uniform speed and introduces subtle parallax drift.
 */
/**
 * Stable Speed Controller:
 * Gently increases ambient flow speed during active scroll without mutating mesh
 * position or camera coordinates, eliminating z-fighting and WebGL frame flicker.
 */
function ScrollMotionController() {
  const { scene } = useThree();
  const currentSpeedRef = useRef(0.25);

  useFrame((_, delta) => {
    const scrollVelocity = Math.abs(scrollMetrics.velocity || 0);
    const targetSpeed = 0.25 + Math.min(scrollVelocity * 0.02, 0.6);

    const lerpFactor = Math.min(delta * 2, 1);
    currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * lerpFactor;

    const mesh = scene.getObjectByName('shadergradient-mesh') as THREE.Mesh | undefined;
    if (mesh && mesh.material) {
      const mat = mesh.material as unknown as {
        userData?: {
          uSpeed?: { value: number };
        };
      };
      if (mat.userData?.uSpeed) {
        mat.userData.uSpeed.value = currentSpeedRef.current;
      }
    }
  });

  return null;
}

/**
 * CSS Fallback Backdrop for non-WebGL environments
 */
export function CSSGradientFallback() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 30%, #0E4D7A 0%, #1A2436 45%, #090D14 85%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen animate-pulse"
        style={{
          background: 'radial-gradient(circle at 80% 20%, #FF5E14 0%, transparent 50%)',
          filter: 'blur(60px)',
          animationDuration: '6s',
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-color-dodge"
        style={{
          background: 'radial-gradient(circle at 20% 80%, #0E4D7A 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}

export default function ViewportCanvas() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // During non-WebGL fallback
  if (hasWebGL === false) {
    return <CSSGradientFallback />;
  }

  return (
    <div className="w-full h-full relative">
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        lazyLoad={false}
        pointerEvents="none"
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          control="props"
          type="plane"
          animate="on"
          uSpeed={0.3}
          uStrength={3.2}
          uDensity={1.3}
          uFrequency={5.5}
          cDistance={3.6}
          cPolarAngle={90}
          cAzimuthAngle={180}
          color1="#FF5E14"
          color2="#0E4D7A"
          color3="#1A2436"
          lightType="3d"
          brightness={1.1}
          grain="off"
        />
        <ScrollMotionController />
      </ShaderGradientCanvas>
    </div>
  );
}
