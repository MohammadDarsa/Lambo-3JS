import { Suspense, forwardRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLoader } from "@react-three/fiber";

function Scene() {
  const scene = useLoader(GLTFLoader, "./models/stage.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });

  return (
    <>
      {/* scene */}
      <primitive object={scene.scene} />
    </>
  );
}

export default Scene;
