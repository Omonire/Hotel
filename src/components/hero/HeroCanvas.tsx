'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Smooth floating and rotation physics
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = time * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.25;
      ringRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central futuristic structure */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#dab781"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner core glow element */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ca9855" transparent opacity={0.6} />
      </mesh>

      {/* Futuristic Orbiting Luxury Rings */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#dab781"
          emissive="#ca9855"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.01, 8, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Sparkle/Particle background
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    // Use a deterministic seed or local pseudo-random helper to adhere to purity rules
    let seed = 12345;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (random() - 0.5) * 12;
      pos[i * 3 + 1] = (random() - 0.5) * 12;
      pos[i * 3 + 2] = (random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#dab781"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-auto opacity-70 md:opacity-100">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ca9855" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />

        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
          <InteractiveCore />
        </Float>

        <ParticleField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
