import React, { useRef, useEffect, JSX } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, Material, SkinnedMesh, Bone, AnimationClip } from "three";
import { GLTF } from "three-stdlib";

// Define the GLTF interface with your specific structure
type GLTFResult = GLTF & {
  nodes: {
    _rootJoint: Bone;
    Object_220: SkinnedMesh;
    Object_219: Group;
    Bot: Group;
  };
  materials: {
    material: Material;
  };
  animations: AnimationClip[];
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/robot.glb"
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  console.log("nodes: ", nodes);
  // Optional: Play an animation when component mounts
  useEffect(() => {
    // You can play a specific animation if you know its name
    // For example: actions?.SomeAnimationName?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="562ea4e4dc1c46e7a30707eb27f445c6fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Armature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_220"
                      geometry={nodes.Object_220.geometry}
                      material={materials.material}
                      skeleton={nodes.Object_220.skeleton}
                    />
                    <group
                      name="Object_219"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group name="Bot" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/robot.glb");
