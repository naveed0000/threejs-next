import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, MathUtils, SkinnedMesh } from "three";
import { useFrame } from "@react-three/fiber";

export function Robet() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setCursorPosition({ x, y });
      setIsMoving(true);

      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);

      moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  // Animate robot
  useFrame(({ clock }) => {
    if (!group.current) return;

    const time = clock.getElapsedTime();

    // --- Seat animation: subtle bobbing ---
    const bob = Math.sin(time * 1.5) * 0.02; // vertical up/down
    const lean = Math.sin(time * 0.5) * 0.03; // slight forward/back rotation

    group.current.position.y = bob;

    if (isMoving) {
      const targetRotationY = cursorPosition.x * Math.PI * 0.5;
      const targetRotationX = cursorPosition.y * Math.PI * 0.25;

      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.1
      );
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        targetRotationX + lean, // combine cursor and idle lean
        0.1
      );
    } else {
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, 0, 0.05);
      group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, lean, 0.05);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="562ea4e4dc1c46e7a30707eb27f445c6fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_220"
                      geometry={(nodes.Object_220 as SkinnedMesh).geometry}
                      material={materials.material}
                      skeleton={(nodes.Object_220 as SkinnedMesh).skeleton}
                    />
                    <group name="Object_219" rotation={[-Math.PI / 2, 0, 0]} scale={100} />
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
