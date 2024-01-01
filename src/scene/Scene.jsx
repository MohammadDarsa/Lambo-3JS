import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";

export default function Scene() {
  const scene = useGLTF("./scene/scene.glb");

  return (
    <>
      <primitive object={scene.scene} />
    </>
  );
}
