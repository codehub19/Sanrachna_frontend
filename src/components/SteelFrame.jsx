import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, Line, OrbitControls, Text, Plane } from "@react-three/drei";

const SCALE_XZ = 5;
const SCALE_Y = 5;

const sensorPositions = [
  [0.2, 0, 0.2], [0.8, 0, 0.2], [0.2, 0, 0.8], [0.8, 0, 0.8], // Base (Bottom)
  [0.2, 0.6, 0.2], [0.8, 0.6, 0.2], [0.2, 0.6, 0.8], [0.8, 0.6, 0.8], // Mid Level
  [0.2, 1.2, 0.2], [0.8, 1.2, 0.2], [0.2, 1.2, 0.8], [0.8, 1.2, 0.8], // Upper Level
  [0.2, 1.8, 0.2], [0.8, 1.8, 0.2], [0.2, 1.8, 0.8], [0.8, 1.8, 0.8]  // Top
].map(([x, y, z]) => [x * SCALE_XZ, y * SCALE_Y, z * SCALE_XZ]);

const horizontalEdges = [
  [4, 5], [4, 6], [5, 7], [6, 7], 
  [8, 9], [8, 10], [9, 11], [10, 11], 
  [12, 13], [12, 14], [13, 15], [14, 15]
];

const verticalEdges = [
  [0, 4], [1, 5], [2, 6], [3, 7], 
  [4, 8], [5, 9], [6, 10], [7, 11], 
  [8, 12], [9, 13], [10, 14], [11, 15]
];

const SteelFrame = ({ sensorData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Canvas 
      camera={{ position: [40, 30, 30], fov: 20 }}
      style={{ height: "71vh", width: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <OrbitControls minDistance={10} maxDistance={100} maxPolarAngle={Math.PI / 2} />

      {sensorPositions.map((pos, index) => {
        const textPosition = [pos[0], pos[1] + 1, pos[2]];
        const isHovered = index === hoveredIndex;

        return (
          <React.Fragment key={index}>
            {index < 4 ? (
              <Plane args={[1, 1]} position={pos} rotation={[-Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#4fbd4f" />
              </Plane>
            ) : (
              <Sphere 
                args={[isHovered ? 0.4 : 0.3, 16, 16]} 
                position={pos} 
                onPointerOver={() => setHoveredIndex(index)} 
                onPointerOut={() => setHoveredIndex(null)}
              >
                <meshStandardMaterial color={isHovered ? "yellow" : (sensorData[index] > 0.1 ? "red" : "green")} />
              </Sphere>
            )}
            
            <Text position={textPosition} fontSize={1} color="white" anchorX="center" anchorY="middle">
              {index + 1}
            </Text>
          </React.Fragment>
        );
      })}

      {horizontalEdges.map(([start, end], index) => (
        <Line key={index} points={[sensorPositions[start], sensorPositions[end]]} color="blue" lineWidth={5} />
      ))}

      {verticalEdges.map(([start, end], index) => (
        <Line key={index + 100} points={[sensorPositions[start], sensorPositions[end]]} color="red" lineWidth={5} />
      ))}
    </Canvas>
  );
};

export default SteelFrame;
