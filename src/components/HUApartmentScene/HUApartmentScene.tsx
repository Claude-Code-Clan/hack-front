import {Box, ContactShadows, OrbitControls, Plane, SoftShadows} from "@react-three/drei";
import {Canvas, useThree} from "@react-three/fiber";
import {Cylinder} from "@react-three/drei/core/shapes";
import {Vector3} from "three";
import {useEffect} from "react";

interface DevicesCoordinates {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}

const DEVICES_COORDINATES: DevicesCoordinates[] = [
  {
    position: [-0.2, 0.7, -1.9],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [-0.2, 0.7, 0.55],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [0.4, 0.7, 0.55],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [-1.4, 0.7, -1.9],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [-1.4, 0.7, 1.9],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [-0.75, 0.7, 0.4],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    color: '#27EB96',
  },
  {
    position: [-2, 0.7, 0.4],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    color: '#27EB96',
  },
  {
    position: [2, 0.7, -1],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    color: '#27EB96',
  },
  {
    position: [1.5, 0.7, 1.9],
    rotation: [Math.PI / 2, 0, 0],
    color: '#27EB96',
  },
  {
    position: [-0.65, 0.7, 1.6],
    rotation: [Math.PI / 2, 0, Math.PI / 2],
    color: '#27EB96',
  },
];

function ApartmentScene({devicesCount, selectedDeviceIndex}: HUApartmentScenePropsI) {
  const {camera} = useThree()

  function lookAt(position: [number, number, number]) {
    const target = new Vector3(...position);
    const direction = target.clone().normalize().negate().multiplyScalar(3); // Расстояние от датчика
    const newPosition = target.clone().add(direction);

    camera.lookAt(target)
    camera.position.set(newPosition.x, 7, newPosition.z)
  }

  useEffect(() => {
    if (selectedDeviceIndex !== null) {
      lookAt(DEVICES_COORDINATES?.[selectedDeviceIndex]?.position);
    }
  }, [selectedDeviceIndex]);

  return (
    <>
      {/*Датчик*/}
      {DEVICES_COORDINATES.filter((_, index) => index < devicesCount).map(({position, rotation, color}, index) => (
        <Cylinder
          key={position[0] + position[1] + position[2] + index}
          receiveShadow
          castShadow
          position={position}
          rotation={rotation}
          args={[0.1, 0.1, 0.1]}
          scale={selectedDeviceIndex === index ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        >
          <meshStandardMaterial color={color}/>
        </Cylinder>
      ))}

      {/* Плоскость пола */}
      <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="lightgray"/>
      </Plane>

      {/* Стены как коробки */}
      <Box receiveShadow castShadow position={[0, 0.5, -1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[0, 0.5, 1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[0.1, 0.5, 0.6]} args={[1.7, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[1.8, 0.5, 0.6]} args={[0.5, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, 1]} args={[0.1, 1, 2]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, -1.2]} args={[0.1, 1, 1.4]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-1.8, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
      <Box receiveShadow castShadow position={[-0.9, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color="white"/>
      </Box>
    </>
  )
}

interface HUApartmentScenePropsI {
  devicesCount: number;
  selectedDeviceIndex: number | null;
}

export default function HUApartmentScene(props: HUApartmentScenePropsI) {
  return (
    <Canvas
      style={{width: 600, height: 600}}
      camera={{
        fov: 50,
        far: 100,
        near: 0.1,
        position: [0, 7, 0]
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      shadows
    >
      <ApartmentScene {...props}/>

      <OrbitControls
        enableRotate
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        minDistance={8}
        maxDistance={8}
        enablePan={false}
        target={[0, 0.5, 0]}
      />

      <hemisphereLight
        color="white"
        groundColor="#171717"
        intensity={0.8}
      />

      {/* Основной направленный свет */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
        shadow-normalBias={0.05}
      />

      {/* Дополнительный мягкий свет сбоку */}
      <directionalLight
        position={[-10, 5, 0]}
        intensity={0.4}
        castShadow={false}
      />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={10}
      />

      <SoftShadows size={25} samples={16}/>
      <ambientLight intensity={1}/>
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow={true}
      />
    </Canvas>
  )
}
