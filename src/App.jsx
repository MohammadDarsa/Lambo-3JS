import { useRef, useEffect, useState } from "react";
import "./App.css";
import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Scene from "./scene/Scene";

function App() {
  return (
    <>
      {/* environment */}
      <Environment background files="./moonless_golf_2k.hdr" intensity={1} />

      {/* orbit controls */}
      <OrbitControls />

      {/* scene */}
      <Scene />
    </>
  );
}

export default App;
