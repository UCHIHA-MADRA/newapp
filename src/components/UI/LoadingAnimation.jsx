import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';

/**
 * Animated 3D cube for loading state
 * @returns {JSX.Element} 3D loading animation
 */
const AnimatedCube = () => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshWobbleMaterial 
        color="#4a5af8" 
        factor={0.3} 
        speed={2} 
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

/**
 * Loading animation component using Three.js
 * @returns {JSX.Element} Loading animation component
 */
const LoadingAnimation = () => {
  return (
    <div className="w-full h-40 flex items-center justify-center">
      <div className="w-20 h-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedCube />
        </Canvas>
      </div>
    </div>
  );
};

export default LoadingAnimation;