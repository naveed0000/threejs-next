"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";
import { Robet } from "./Robet";
import { OrbitControls, Sky, Environment, Sparkles } from "@react-three/drei";
import { Robot } from "./Robot";

export default function Index() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-orange-400 via-red-500 to-purple-900">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} shadows dpr={[1, 2]}>
        {/* Deep Sunset Background */}
        
        {/* Dramatic Sunset Sky */}
        <Sky 
          distance={450000}
          sunPosition={[0, 0.5, -1]}
          inclination={0}
          azimuth={0.25}
          mieCoefficient={0.005}
          mieDirectionalG={0.9}
          rayleigh={2}
          turbidity={20}
        />
        
        {/* Sunset Environment with warm tones */}
        <Environment 
          preset="sunset"
        />
        
        {/* Warm Ambient Lighting */}
        
        {/* Main Sunset Light */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#ff8c00"
          castShadow
          shadow-mapSize={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill Light */}
        <directionalLight 
          position={[-5, 5, -5]} 
          intensity={0.6} 
          color="#ffb74d"
        />
        
        {/* Rim Light */}
        <directionalLight 
          position={[0, 5, -10]} 
          intensity={0.8} 
          color="#ff5252"
        />

        {/* Desert-like Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial 
            color="#cd853f" 
            roughness={0.9} 
            metalness={0.1}
          />
        </mesh>

        {/* Optional: Add some sparkles for magical effect */}
        <Sparkles 
          count={100} 
          scale={10} 
          size={2} 
          speed={0.3} 
          color="#ffa500"
        />

        {/* Robot */}
        {/* <Robet /> */}
        <Robot />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          zoomSpeed={0.8}
          rotateSpeed={0.5}
          panSpeed={0.5}
          minDistance={2}
          maxDistance={20}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          target={[0, 1, 0]}
          makeDefault
        />

        {/* Additional atmospheric lights */}
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#ff6b6b" />
        <pointLight position={[5, 2, 5]} intensity={0.2} color="#ffd93d" />
      </Canvas>
    </div>
  );
}