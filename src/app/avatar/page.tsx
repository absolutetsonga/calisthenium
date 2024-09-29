"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Avatar } from "~/components/ui/avatar";

export default function MyAvatarPage() {
  return (
    <div className="h-[800px] w-1/2">
      <Canvas camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
        <Experience />
      </Canvas>
    </div>
  );
}

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize={1024}
      />
      <group position={[0, -1, 0]}>
        <Suspense fallback={null}>
          <Avatar scale={[0.1, 0.1, 0.1]} />
        </Suspense>
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
