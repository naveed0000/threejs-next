"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Model } from "./_components/Model";
export default function Index() {

  return (
    <>

      <div className="w-full h-screen flex justify-center items-center bg-gray-500">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} shadows dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ambientLight intensity={1.5} color={"#fff"} />
            <Model
              position={[0, -4, 0]}
              scale={3}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
