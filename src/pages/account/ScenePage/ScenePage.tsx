import {observer} from "mobx-react";
import {Box, ContactShadows, Html, OrbitControls, Plane, SoftShadows} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {Card} from "antd";
import HUWidgetsSelector from "../../../components/WidgetsSelector/HUWidgetsSelector.tsx";
import {LayoutItem} from "react-grid-layout";
import WidgetsStore, {type WidgetType} from "../../../store/widgetsStore.ts";

const whallColor = '#4097ba'

function ApartmentScene() {
  return (
    <mesh scale={2}> {/* Плоскость пола */}
      <Plane args={[4, 4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial color="lightgray"/>
      </Plane>

      <DisplayView/>

      {/* Стены как коробки */}
      <Box receiveShadow castShadow position={[0, 0.5, -1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[0, 0.5, 1.95]} args={[4, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[0.1, 0.5, 0.6]} args={[1.7, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[1.8, 0.5, 0.6]} args={[0.5, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[-2.05, 0.5, 0]} args={[0.1, 1, 4]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, 1]} args={[0.1, 1, 2]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[-0.7, 0.5, -1.2]} args={[0.1, 1, 1.4]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[-1.8, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow position={[-0.9, 0.5, -1]} args={[0.4, 1, 0.1]}>
        <meshStandardMaterial color={whallColor}/>
      </Box>
      <Box receiveShadow castShadow rotation={[0, Math.PI, 0]} position={[0.2, 0.7, 0.56]} scale={0.2} args={[3.2, 2, 0.2]}>
        <meshStandardMaterial color="black"/>
      </Box>
    </mesh>
  );
}

interface PreviewItemPropsI {
  widgetLayout?: LayoutItem[];
  widgetTypes?: WidgetType[];
}

const PreviewItem = observer(({widgetLayout, widgetTypes}: PreviewItemPropsI) => {

  return (
    <div style={{height: 564, position: 'relative'}}>
      {widgetTypes?.map(wt => {
        const currentLayout = widgetLayout?.find(w => w.i === wt.widgetId);

        const widthCoeficent = 1000 / 6.5;
        const heightCoeficent = 564 / 4;
        const gap = 4;

        const width = (currentLayout?.w ?? 0) * widthCoeficent;
        const height = (currentLayout?.h ?? 0) * heightCoeficent;
        const top = (currentLayout?.y ?? 0) * heightCoeficent;
        const left = (currentLayout?.x ?? 0) * widthCoeficent;
        return (
          <div
            style={{width: width, height: height, position: 'absolute', overflow: 'hidden', top, left, padding: gap}}>
            <Card styles={{body: {padding: 8}}} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
              <HUWidgetsSelector style={{scale: 0.9}} type={wt.type} key={`${wt.widgetId}_preview`}/>
            </Card>
          </div>
        );
      })}
    </div>
  );
});

const DisplayView = observer(() => {

  return (
    <Html
      rotation={[0, Math.PI, 0]}
      position={[0.2, 0.7, 0.53]}
      scale={0.02}
      transform
      occlude='blending'
    >
      <div style={{width: 1200, height: 700, padding: '0 100px'}} onClick={() => console.log('.')}>
        <PreviewItem widgetLayout={WidgetsStore.savedScene.widgetsLayout} widgetTypes={WidgetsStore.savedScene.widgetsTypes}/>
      </div>
    </Html>
  )
});

const ScenePage = observer(() => {
  return (
    <Canvas
      style={{width: 1600, height: 800}}
      camera={{
        fov: 50,
        far: 100,
        near: 0.2,
        position: [0, 3.5, 0],
      }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      shadows
    >
      <ApartmentScene/>

      <OrbitControls
        enableRotate
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={1}
        maxDistance={8}
        enablePan={false}
        target={[0.4, 1.4, 1]}
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
    </Canvas>);
})

export default ScenePage;