import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <>
      <Html fullscreen>
        <div className="black-screen">
          <div className="loading-bar">
            <div
              className="loading-bar-inner-1"
              style={{ transform: `scaleX(${progress / 100.0})` }}
            ></div>
          </div>
        </div>
      </Html>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Canvas
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>
);
