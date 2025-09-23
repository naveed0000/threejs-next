import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group, MathUtils, SkinnedMesh } from "three";
import { useFrame } from "@react-three/fiber";

export function Robot() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF("/robot.glb");
  const { actions, names } = useAnimations(animations, group);
  
  console.log('Available animations:', names);
  console.log('actions: ', actions);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      setCursorPosition({ x, y });
      
      // Only set isMoving to true if we weren't already moving
      if (!isMoving) {
        setIsMoving(true);
      }

      // Clear previous timeout
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }

      // Set timeout to return to initial position after cursor stops
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 500); // 500ms delay after cursor stops moving
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [isMoving]);

  // Control walking animation based on movement
  useEffect(() => {
    // Check what animation names are available
    const walkAction = actions['Walk'] || actions['walk'] || actions['Walking'] || actions['walking'] || actions[names[0]];
    
    if (walkAction) {
      if (isMoving) {
        // Start walking animation
        walkAction.reset().fadeIn(0.2).play();
      } else {
        // Fade out walking animation
        walkAction.fadeOut(0.5);
        
        // Optionally play idle animation when not walking
        const idleAction = actions['Idle'] || actions['idle'] || actions['IDLE'];
        if (idleAction) {
          idleAction.reset().fadeIn(0.5).play();
        }
      }
    }

    return () => {
      // Cleanup animations when component unmounts
      Object.values(actions).forEach(action => {
        if (action && action.isRunning()) {
          action.fadeOut(0.1);
        }
      });
    };
  }, [isMoving, actions, names]);

  // Animation frame to rotate robot
  useFrame(() => {
    if (group.current) {
      if (isMoving) {
        // Calculate target rotation based on cursor position
        const targetRotationY = cursorPosition.x * Math.PI * 0.5;
        const targetRotationX = cursorPosition.y * Math.PI * 0.25;

        // Smoothly interpolate rotation
        group.current.rotation.y = MathUtils.lerp(
          group.current.rotation.y,
          targetRotationY,
          0.1
        );
        group.current.rotation.x = MathUtils.lerp(
          group.current.rotation.x,
          targetRotationX,
          0.1
        );
      } else {
        // Smoothly return to initial rotation
        group.current.rotation.y = MathUtils.lerp(
          group.current.rotation.y,
          0,
          0.05
        );
        group.current.rotation.x = MathUtils.lerp(
          group.current.rotation.x,
          0,
          0.05
        );
      }
    }
  });

  return (
    <group ref={group} dispose={null}>
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
                      geometry={(nodes.Object_220 as SkinnedMesh).geometry}
                      material={materials.material}
                      skeleton={(nodes.Object_220 as SkinnedMesh).skeleton}
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