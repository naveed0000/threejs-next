import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function Face() {
  const faceRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse position safely
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (faceRef.current) {
      // Convert mouse to world coordinates
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);

      // Smooth rotation
      const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(faceRef.current.position, vector, faceRef.current.up)
      );
      faceRef.current.quaternion.slerp(targetQuaternion, 0.1);
    }
  });

  return (
    <mesh ref={faceRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
