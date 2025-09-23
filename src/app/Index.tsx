"use client";

import { Canvas } from "@react-three/fiber";
import React from "react";
import { Robet } from "./Robet";
import { OrbitControls, Sky, Environment, Sparkles } from "@react-three/drei";
import { Robot } from "./Robot";
import Face from "./Face";

export default function Index() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-500">
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }} shadows dpr={[1, 2]}>
        {/* Deep Sunset Background */}

        {/* Dramatic Sunset Sky */}

        <Environment preset="sunset" />

        {/* Warm Ambient Lighting */}

        {/* Main Sunset Light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Fill Light */}

        {/* Rim Light */}

        {/* Desert-like Ground */}

        {/* Robot */}
        {/* <Robet /> */}
        {/* <Robot /> */}
          <ambientLight intensity={0.5} />
          <Face />

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
      </Canvas>
    </div>
  );
}
