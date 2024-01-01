import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
    >
      <App />
    </Canvas>
  </React.StrictMode>
);
