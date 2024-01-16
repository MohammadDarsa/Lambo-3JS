import "./App.css";
import {
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
  FXAA,
  Noise,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Scene from "./scene/Scene";
import Lambo from "./lambo/Lambo";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils";

function App() {
  const [cameraPosition, setCameraPosition] = useState([0, 1, -4]);

  const brightnessRef = useRef({ brightness: 0 });

  useEffect(() => {
    let interval = setInterval(() => {
      brightnessRef.current.brightness = lerp(
        brightnessRef.current.brightness,
        0,
        0.1
      );
    }, 50);
    setInterval(() => {
      clearInterval(interval);
      brightnessRef.current.brightness = 0;
    }, 7000);
  });

  return (
    <>
      {/* environment */}
      <Environment files="./moonless_golf_2k.hdr" />
      <color attach="background" args={["#000"]} />
      {/* create a camera as default camera */}
      <PerspectiveCamera fov={45} position={cameraPosition} makeDefault />
      {/* orbit controls */}
      <OrbitControls
        target={[0, 0.25, 0]}
        maxDistance={10}
        minDistance={5}
        maxPolarAngle={Math.PI * 0.45}
        minPolarAngle={Math.PI * 0.1}
      />
      {/* scene */}
      <Scene />
      <Lambo />
      {/* spot light with helper */}
      <spotLight
        position={[0, 10, 0]}
        angle={40}
        intensity={100}
        penumbra={1}
      />
      {/* effects */}
      <EffectComposer multisampling={0}>
        <FXAA />
        <DepthOfField
          focusDistance={0}
          focalLength={0.05}
          bokehScale={1}
          height={480}
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
        <BrightnessContrast
          ref={brightnessRef}
          brightness={-10} // brightness. min: -1, max: 1
          contrast={0.1} // contrast: min -1, max: 1
        />
      </EffectComposer>
      <fog attach="fog" args={["#000", 5, 35]} />
    </>
  );
}

export default App;
