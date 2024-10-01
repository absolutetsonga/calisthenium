"use client";
import { useState } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Avatar } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { ArrowUpCircle } from "lucide-react";

export default function MyAvatarPage() {
  return (
    <div className="flex h-[800px] w-[896px] flex-row items-center justify-center px-4 md:px-10">
      <div className="h-full w-1/2 sm:w-1/3">
        <Canvas camera={{ position: [1, 1.5, 2.5], fov: 50 }}>
          <Experience />
        </Canvas>
      </div>
      <AvatarCharacteristics />
    </div>
  );
}

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <directionalLight
        position={[-5, 5, 5]}
        castShadow
        shadow-mapSize={1024}
      />
      <group position={[0, -1, 0]}>
        <Suspense fallback={null}>
          <Avatar scale={[0.1, 0.1, 0.1]} />
        </Suspense>
      </group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10, 1, 1]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};

type Characteristic = {
  name: string;
  level: number;
  pointsRequired: number;
};

const AvatarCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState<Characteristic[]>([
    { name: "Strength", level: 0, pointsRequired: 50 },
    { name: "Flexibility", level: 0, pointsRequired: 50 },
    { name: "Endurance", level: 0, pointsRequired: 50 },
    { name: "Balance", level: 0, pointsRequired: 50 },
    { name: "Discipline", level: 0, pointsRequired: 50 },
  ]);

  const [availablePoints, setAvailablePoints] = useState(100);
  const [avatarLevel, setAvatarLevel] = useState(0);

  const handleUpgrade = (index: number) => {
    const char = characteristics[index];
    if (char && availablePoints >= char.pointsRequired) {
      setCharacteristics((prev) =>
        prev.map((char, i) => {
          if (i === index) {
            return {
              ...char,
              level: char.level + 1,
              pointsRequired: Math.round(char.pointsRequired * 1.5),
            };
          }
          return char;
        }),
      );
      setAvailablePoints((prev) => prev - char.pointsRequired);
      setAvatarLevel((prev) => prev + 1);
    }
  };

  const totalLevels = characteristics.reduce(
    (sum, char) => sum + char.level,
    0,
  );
  const maxPossibleLevel = characteristics.length * 10; // Assuming max level of 10 per characteristic

  return (
    <div className="container mx-auto w-1/2 max-w-2xl p-4 sm:w-2/3">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-400">Avatar</h1>
        <span className="text-lg font-semibold text-green-400">
          Level: {avatarLevel}
        </span>
      </div>
      <Progress
        value={(totalLevels / maxPossibleLevel) * 100}
        className="mb-4 h-2 bg-green-900"
      >
        <div
          className="h-full bg-green-400"
          style={{ width: `${(totalLevels / maxPossibleLevel) * 100}%` }}
        />
      </Progress>
      <p className="mb-4 text-green-400">Available Points: {availablePoints}</p>
      <div className="flex flex-col gap-4">
        {characteristics.map((char, index) => (
          <Card
            key={char.name}
            className="relative overflow-hidden border-2 border-green-400 bg-black"
          >
            <div className="absolute left-0 top-0 rounded-br bg-green-400 px-2 py-1 text-sm font-bold text-black">
              {char.level}
            </div>
            <CardContent className="p-4 pt-8">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-green-400">{char.name}</span>
                <Button
                  onClick={() => handleUpgrade(index)}
                  disabled={availablePoints < char.pointsRequired}
                  size="sm"
                  className="flex items-center gap-1 bg-green-700 text-white hover:bg-green-600"
                >
                  <ArrowUpCircle className="h-4 w-4" />
                  <span className="sr-only">Upgrade</span>
                  <span aria-hidden="true">{char.pointsRequired}</span>
                </Button>
              </div>
              <Progress
                value={(char.level / 10) * 100}
                className="mb-2 h-1 bg-green-900"
              >
                <div
                  className="h-full bg-green-400"
                  style={{ width: `${(char.level / 10) * 100}%` }}
                />
              </Progress>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
