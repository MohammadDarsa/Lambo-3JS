import React, { Suspense, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Html, useProgress } from "@react-three/drei";
import StartedContext from "./context/StartedContext";
import StartedContextProvider from "./context/StartedContextProvider.jsx";

const audio = new Audio("./sounds/lamboroar.mp3");

function Loader() {
  const { progress } = useProgress();
  const { startedContext, updateStartedContext } = useContext(StartedContext);

  useEffect(() => {
    if (startedContext) audio.play();
  }, [startedContext]);

  return (
    <>
      <Html fullscreen>
        <div className="black-screen" hidden={startedContext}>
          <button onClick={() => updateStartedContext(true)}>
            Click to start
          </button>
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
      <StartedContextProvider>
        <Suspense fallback={null}>
          <App />
        </Suspense>
        <Loader />
      </StartedContextProvider>
    </Canvas>
  </React.StrictMode>
);
