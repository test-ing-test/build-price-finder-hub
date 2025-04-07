
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const BuildingBlocks = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Foundation */}
      <Box 
        args={[3, 0.2, 3]} 
        position={[0, -1.5, 0]}
      >
        <meshStandardMaterial attach="material" color="#cbd5e1" />
      </Box>
      
      {/* Concrete pillars */}
      <Box 
        args={[0.3, 3, 0.3]} 
        position={[-1.3, -0.1, -1.3]}
      >
        <meshStandardMaterial attach="material" color="#94a3b8" />
      </Box>
      <Box 
        args={[0.3, 3, 0.3]} 
        position={[1.3, -0.1, -1.3]}
      >
        <meshStandardMaterial attach="material" color="#94a3b8" />
      </Box>
      <Box 
        args={[0.3, 3, 0.3]} 
        position={[-1.3, -0.1, 1.3]}
      >
        <meshStandardMaterial attach="material" color="#94a3b8" />
      </Box>
      <Box 
        args={[0.3, 3, 0.3]} 
        position={[1.3, -0.1, 1.3]}
      >
        <meshStandardMaterial attach="material" color="#94a3b8" />
      </Box>
      
      {/* Roof beams */}
      <Box 
        args={[3, 0.2, 0.3]} 
        position={[0, 1.3, -1.3]}
      >
        <meshStandardMaterial attach="material" color="#2563eb" />
      </Box>
      <Box 
        args={[3, 0.2, 0.3]} 
        position={[0, 1.3, 1.3]}
      >
        <meshStandardMaterial attach="material" color="#2563eb" />
      </Box>
      <Box 
        args={[0.3, 0.2, 3]} 
        position={[-1.3, 1.3, 0]}
      >
        <meshStandardMaterial attach="material" color="#2563eb" />
      </Box>
      <Box 
        args={[0.3, 0.2, 3]} 
        position={[1.3, 1.3, 0]}
      >
        <meshStandardMaterial attach="material" color="#2563eb" />
      </Box>
      
      {/* Floating price tag */}
      <Torus 
        args={[0.7, 0.1, 16, 32]} 
        position={[0, 0.7, 0]} 
        rotation={[Math.PI/2, 0, 0]}
      >
        <meshStandardMaterial attach="material" color="#f97316" />
      </Torus>
      
      {/* Center sphere with price */}
      <Sphere
        args={[0.5, 32, 32]}
        position={[0, 0.7, 0]}
      >
        <meshStandardMaterial attach="material" color="#f7fafc" />
      </Sphere>
    </group>
  );
};

const ConstructionScene: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <BuildingBlocks />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ConstructionScene;
