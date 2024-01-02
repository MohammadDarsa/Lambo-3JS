import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

export default function Scene() {
  const scene = useGLTF("./scene/scene.glb");

  useEffect(() => {
    scene.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 2;
      }
    });
  }, [scene]);

  return (
    <>
      {/* scene */}
      <Suspense>
        <primitive object={scene.scene} />
      </Suspense>
    </>
  );
}
