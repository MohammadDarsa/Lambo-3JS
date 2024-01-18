import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "three/src/math/MathUtils";

export default function Lambo() {
  const model = useLoader(GLTFLoader, "./models/lambo.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });

  const leftDoorHandleOpen = model.scene.getObjectByName("left_door_open");
  const leftDoorHandleClosed = model.scene.getObjectByName("left_door_close");

  const animations = useAnimations(model.animations, model.scene);
  const mixer = animations.mixer;
  const planeRef = useRef();

  const leftDoorClosedIdle = animations.actions.left_door_closed_idle;

  const leftDoorOpenIdle = animations.actions.left_door_open_idle;

  const leftDoorClose = animations.actions.left_door_close;
  leftDoorClose.setLoop(THREE.LoopOnce, 1);

  const leftDoorOpen = animations.actions.left_door_open;
  leftDoorOpen.setLoop(THREE.LoopOnce, 1);

  mixer.addEventListener("finished", function (e) {
    if (e.action.getClip().name === "left_door_open") {
      leftDoorOpen.stop();
      leftDoorOpenIdle.play();
      planeRef.current.scale.set(1, 1, 1);
      planeRef.current.position.set(
        leftDoorHandleOpen.position.x,
        leftDoorHandleOpen.position.y,
        leftDoorHandleOpen.position.z
      );
    } else if (e.action.getClip().name === "left_door_close") {
      leftDoorClose.stop();
      leftDoorClosedIdle.play();
      planeRef.current.scale.set(1, 1, 1);
      planeRef.current.position.set(
        leftDoorHandleClosed.position.x,
        leftDoorHandleClosed.position.y,
        leftDoorHandleClosed.position.z
      );
    }
  });

  const onDoorClick = () => {
    if (leftDoorClosedIdle.isRunning()) {
      leftDoorClosedIdle.stop();
      planeRef.current.scale.set(0, 0, 0);
      leftDoorOpen.play();
    } else if (leftDoorOpenIdle.isRunning()) {
      leftDoorOpenIdle.stop();
      planeRef.current.scale.set(0, 0, 0);
      leftDoorClose.play();
    }
  };

  useEffect(() => {
    leftDoorClosedIdle.play();
  }, []);

  useFrame((state, delta) => {
    planeRef.current.lookAt(state.camera.position);
  });

  return (
    <>
      {/* circle for the door to open */}
      <mesh
        ref={planeRef}
        position={leftDoorHandleClosed.position}
        onClick={onDoorClick}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* scene */}
      <primitive object={model.scene} />
    </>
  );
}
