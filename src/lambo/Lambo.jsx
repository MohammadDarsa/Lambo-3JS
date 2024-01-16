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

  const [isDoorOpen, setIsDoorOpen] = useState(false);

  const animations = useAnimations(model.animations, model.scene);
  const planeRef = useRef();

  console.log(animations);

  const leftDoorClose = animations.actions.left_door_close;
  leftDoorClose.setLoop(THREE.LoopOnce, 1);
  leftDoorClose.clampWhenFinished = true;

  const rightDoorClose = animations.actions.right_door_close;
  rightDoorClose.setLoop(THREE.LoopOnce, 1);
  rightDoorClose.clampWhenFinished = true;

  const leftFrontWheelTilt = animations.actions.left_front_wheel_tilt;
  leftFrontWheelTilt.setLoop(THREE.LoopOnce, 1);
  leftFrontWheelTilt.clampWhenFinished = true;
  leftFrontWheelTilt.timeScale = 0.5;

  const rightFrontWheelTilt = animations.actions.right_front_wheel_tilt;
  rightFrontWheelTilt.setLoop(THREE.LoopOnce, 1);
  rightFrontWheelTilt.clampWhenFinished = true;
  rightFrontWheelTilt.timeScale = 0.5;

  rightDoorClose.setLoop(THREE.LoopOnce, 1);

  useEffect(() => {
    // leftFrontWheelTilt.play();
    // rightFrontWheelTilt.play();
    leftDoorClose.play();
    rightDoorClose.play();
  }, []);

  useFrame((state, delta) => {
    planeRef.current.lookAt(state.camera.position);
  });

  const leftDoorOpen = animations.actions.left_door_open;
  leftDoorOpen.setLoop(THREE.LoopOnce, 1);
  leftDoorOpen.clampWhenFinished = true;

  const rightDoorOpen = animations.actions.right_door_open;
  rightDoorOpen.setLoop(THREE.LoopOnce, 1);
  rightDoorOpen.clampWhenFinished = true;

  const onDoorClick = () => {
    console.log(isDoorOpen);
    if (leftDoorClose.isRunning() || leftDoorOpen.isRunning()) return;

    if (isDoorOpen) {
      leftDoorOpen.stop();
      rightDoorOpen.stop();
      leftDoorClose.reset();
      rightDoorClose.reset();
      leftDoorClose.play();
      rightDoorClose.play();
      setIsDoorOpen(false);
      return;
    }
    leftDoorClose.stop();
    rightDoorClose.stop();
    leftDoorOpen.reset();
    rightDoorOpen.reset();
    leftDoorOpen.play();
    rightDoorOpen.play();
    setIsDoorOpen(true);
  };

  const onPointerEnter = (event) => {
    let interval = setInterval(() => {
      planeRef.current.scale.set(
        lerp(planeRef.current.scale.x, 1.2, 0.5),
        lerp(planeRef.current.scale.y, 1.2, 0.5),
        lerp(planeRef.current.scale.y, 1.2, 0.5)
      );
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      planeRef.current.scale.set(1.2, 1.2, 1.2);
    }, 100);
  };

  const onPointerLeave = (event) => {
    let interval = setInterval(() => {
      planeRef.current.scale.set(
        lerp(planeRef.current.scale.x, 1, 0.5),
        lerp(planeRef.current.scale.y, 1, 0.5),
        lerp(planeRef.current.scale.y, 1, 0.5)
      );
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      planeRef.current.scale.set(1, 1, 1);
    }, 500);
  };

  return (
    <>
      {/* circle for the door to open */}
      <mesh
        ref={planeRef}
        position={[-1, 1, 0.25]}
        onClick={onDoorClick}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>

      {/* scene */}
      <primitive object={model.scene} />
    </>
  );
}

//       planeRef.current.scale.set(
//   lerp(planeRef.current.scale.x, 1.2, 0.5),
//   lerp(planeRef.current.scale.y, 1.2, 0.5),
//   lerp(planeRef.current.scale.y, 1.2, 0.5)
// );
