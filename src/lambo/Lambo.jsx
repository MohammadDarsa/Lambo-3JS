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
  const planeRef = useRef();

  const [leftDoorOpenState, setLeftDoorOpenState] = useState(false);
  const [leftDoorCloseState, setLeftDoorCloseState] = useState(false);

  const leftDoorClosedIdle = animations.actions.left_door_closed_idle;

  const leftDoorOpenIdle = animations.actions.left_door_open_idle;

  const leftDoorClose = animations.actions.left_door_close;
  leftDoorClose.setLoop(THREE.LoopOnce, 1);
  leftDoorClose.getMixer().addEventListener("finished", function (e) {
    console.log("open state1", leftDoorOpenState);
    console.log("close state1", leftDoorCloseState);
    if (!leftDoorOpenState && leftDoorCloseState) {
      console.log("left door close");
      leftDoorClosedIdle.play();
      planeRef.current.scale.set(1, 1, 1);
      planeRef.current.position.set(
        leftDoorHandleClosed.position.x,
        leftDoorHandleClosed.position.y,
        leftDoorHandleClosed.position.z
      );
      setLeftDoorCloseState(false);
      setLeftDoorOpenState(false);
    }
  });

  const leftDoorOpen = animations.actions.left_door_open;
  leftDoorOpen.setLoop(THREE.LoopOnce, 1);
  leftDoorOpen.getMixer().addEventListener("finished", function (e) {
    console.log("open state2", leftDoorOpenState);
    console.log("close state2", leftDoorCloseState);
    if (leftDoorOpenState && !leftDoorCloseState) {
      console.log("left door open");
      leftDoorOpenIdle.play();
      planeRef.current.scale.set(1, 1, 1);
      planeRef.current.position.set(
        leftDoorHandleOpen.position.x,
        leftDoorHandleOpen.position.y,
        leftDoorHandleOpen.position.z
      );
      setLeftDoorCloseState(false);
      setLeftDoorOpenState(false);
    }
  });

  const onDoorClick = () => {
    setLeftDoorCloseState(false);
    setLeftDoorOpenState(false);
    if (leftDoorClosedIdle.isRunning()) {
      leftDoorClosedIdle.paused = true;
      planeRef.current.scale.set(0, 0, 0);
      leftDoorOpen.play();
      setLeftDoorOpenState(true);
      setLeftDoorCloseState(false);
    } else if (leftDoorOpenIdle.isRunning()) {
      leftDoorOpenIdle.paused = true;
      planeRef.current.scale.set(0, 0, 0);
      leftDoorClose.play();
      setLeftDoorOpenState(false);
      setLeftDoorCloseState(true);
    }
  };

  // const onPointerEnter = (event) => {
  //   let interval = setInterval(() => {
  //     planeRef.current.scale.set(
  //       lerp(planeRef.current.scale.x, 1.2, 0.5),
  //       lerp(planeRef.current.scale.y, 1.2, 0.5),
  //       lerp(planeRef.current.scale.y, 1.2, 0.5)
  //     );
  //   }, 50);

  //   setTimeout(() => {
  //     clearInterval(interval);
  //     planeRef.current.scale.set(1.2, 1.2, 1.2);
  //   }, 100);
  // };

  // const onPointerLeave = (event) => {
  //   let interval = setInterval(() => {
  //     planeRef.current.scale.set(
  //       lerp(planeRef.current.scale.x, 1, 0.5),
  //       lerp(planeRef.current.scale.y, 1, 0.5),
  //       lerp(planeRef.current.scale.y, 1, 0.5)
  //     );
  //   }, 50);

  //   setTimeout(() => {
  //     clearInterval(interval);
  //     planeRef.current.scale.set(1, 1, 1);
  //   }, 500);
  // };

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
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* scene */}
      <primitive object={model.scene} />
    </>
  );
}
