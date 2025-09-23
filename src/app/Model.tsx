import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
export function Model() {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Animation_Walking_withSkin.glb"
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.01}>
          <skinnedMesh
            name="char1"
            geometry={(nodes.char1 as THREE.SkinnedMesh).geometry}
            material={materials.Material_1}
            skeleton={(nodes.char1 as THREE.SkinnedMesh).skeleton}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Animation_Walking_withSkin.glb");
