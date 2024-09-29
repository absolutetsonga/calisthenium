import React from "react";
import { useGLTF } from "@react-three/drei";

export const Avatar = (props: any) => {
  const { nodes, materials } = useGLTF("/guy-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        //@ts-ignore
        geometry={nodes.polySurface11_polySurface12?.geometry}
        material={materials.initialShadingGroup}
      />
    </group>
  );
};

useGLTF.preload("/guy-transformed.glb");
