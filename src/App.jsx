import "./App.css";
import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  EffectComposer,
  FXAA,
  Noise,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import Scene from "./scene/Scene";

function App() {
  const spotLightRef = useRef();

  return (
    <>
      {/* environment */}
      <Environment files="./moonless_golf_2k.hdr" />
      <color attach="background" args={["#000"]} />
      //create a camera as default camera
      <PerspectiveCamera fov={45} position={[0, 1.5, -5]} makeDefault />
      {/* orbit controls */}
      <OrbitControls
        target={[0, 0.25, 0]}
        autoRotate
        maxDistance={10}
        minDistance={5}
      />
      {/* scene */}
      <Scene />
      {/* spot light with helper */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={40}
        intensity={100}
        penumbra={1}
      />
      {/* effects */}
      <Suspense>
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={0}
            focalLength={0.05}
            bokehScale={1}
            height={480}
          />
          <FXAA />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
          <BrightnessContrast
            brightness={0} // brightness. min: -1, max: 1
            contrast={0.1} // contrast: min -1, max: 1
          />
        </EffectComposer>
      </Suspense>
      <fog attach="fog" args={["#000", 5, 35]} />
    </>
  );
}

export default App;
