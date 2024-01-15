import { useGLTF } from "@react-three/drei";
import { Suspense, forwardRef } from "react";

const Scene = forwardRef(function Scene(props,ref) {
  const scene = useGLTF("./scene/scene.glb");

  return (
    <>
      {/* scene */}
      <Suspense>
        <primitive ref={ref} object={scene.scene} />
      </Suspense>
    </>
  );
});

export default Scene;
