"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Grid } from "@react-three/drei";
import * as THREE from "three";
import { RotateCw, Sun, Wind, ZoomIn, Eye, Sparkles } from "lucide-react";

// Procedural Rover 3D Mesh
function RoverMesh({ dustLevel = 50, isSpinning = true }: { dustLevel: number; isSpinning: boolean }) {
  const roverGroupRef = useRef<THREE.Group>(null);
  const mastRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Group>(null);

  // Dynamic Martian dust color blend based on dustLevel slider
  const dustFactor = dustLevel / 100;
  const baseColor = new THREE.Color("#94a3b8").lerp(new THREE.Color("#c2410c"), dustFactor * 0.7);
  const solarPanelColor = new THREE.Color("#1e293b").lerp(new THREE.Color("#9a3412"), dustFactor * 0.6);
  const goldFoilColor = new THREE.Color("#eab308").lerp(new THREE.Color("#78350f"), dustFactor * 0.4);

  useFrame((state, delta) => {
    const elapsed = state.clock?.getElapsedTime ? state.clock.getElapsedTime() : performance.now() * 0.001;
    if (roverGroupRef.current && isSpinning) {
      roverGroupRef.current.rotation.y += delta * 0.2;
    }
    if (mastRef.current) {
      mastRef.current.rotation.y = Math.sin(elapsed * 0.8) * 0.4;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(elapsed * 0.5) * 0.15;
    }
  });

  return (
    <group ref={roverGroupRef} position={[0, -0.4, 0]}>
      {/* Main Body Chassis (Warm Electronics Box - WEB) */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.6, 0.4, 1.2]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Solar Array Deck (Cruciform wings) */}
      <mesh position={[0, 0.67, 0]}>
        <boxGeometry args={[2.4, 0.04, 1.8]} />
        <meshStandardMaterial color={solarPanelColor} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Solar Cells Grid Lines Accent */}
      <mesh position={[0, 0.7, 0]}>
        <planeGeometry args={[2.3, 1.7]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Panoramic Camera Mast (Pancam Mast Assembly - PMA) */}
      <group ref={mastRef} position={[0.5, 0.7, 0.4]}>
        {/* Mast stalk */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
          <meshStandardMaterial color={baseColor} metalness={0.6} />
        </mesh>
        {/* Mast head bar */}
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[0.4, 0.12, 0.15]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Twin Pancam Lenses */}
        <mesh position={[-0.12, 1.0, 0.09]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.12, 1.0, 0.09]}>
          <cylinderGeometry args={[0.035, 0.035, 0.05, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* High-Gain Dish Antenna (HGA) */}
      <group ref={antennaRef} position={[-0.6, 0.75, -0.4]}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.05, 0.08, 24]} />
          <meshStandardMaterial color={goldFoilColor} roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0.05]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
        </mesh>
      </group>

      {/* Robotic Arm (Instrument Deployment Device - IDD) folded under front */}
      <mesh position={[0.3, 0.2, 0.65]} rotation={[0.4, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.6]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} />
      </mesh>

      {/* Rocker-Bogie Suspension Tubes (Left & Right) */}
      {[-0.9, 0.9].map((side, i) => (
        <group key={i} position={[side, 0.3, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 6 Wheels (Left 3, Right 3 with cleat treads) */}
      {[
        [-0.95, 0.1, 0.8],
        [-1.0, 0.1, 0.0],
        [-0.95, 0.1, -0.8],
        [0.95, 0.1, 0.8],
        [1.0, 0.1, 0.0],
        [0.95, 0.1, -0.8],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 24]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.5} />
          </mesh>
          {/* Wheel Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
            <meshStandardMaterial color={goldFoilColor} metalness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Apollo 11 Lunar Module Descent Stage 3D Mesh
function ApolloDescentMesh() {
  const apolloRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (apolloRef.current) {
      apolloRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={apolloRef} position={[0, -0.3, 0]}>
      {/* Octagonal Descent Stage Core */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.8, 8]} />
        <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Descent Propulsion Engine Bell (DPS) */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 0.6, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* 4 Landing Gear Legs & Footpads */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
        const x = Math.cos(angle) * 1.5;
        const z = Math.sin(angle) * 1.5;
        return (
          <group key={i}>
            {/* Primary Strut */}
            <mesh position={[x * 0.6, 0.4, z * 0.6]} rotation={[0, -angle, 0.4]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.9} />
            </mesh>
            {/* Circular Footpad */}
            <mesh position={[x, -0.05, z]}>
              <cylinderGeometry args={[0.28, 0.28, 0.06, 16]} />
              <meshStandardMaterial color="#e2e8f0" metalness={0.7} />
            </mesh>
          </group>
        );
      })}

      {/* Ladder on Forward Strut */}
      <mesh position={[0, 0.4, 1.1]}>
        <boxGeometry args={[0.2, 0.8, 0.05]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function RoverCanvas3D() {
  const [selectedRelic, setSelectedRelic] = useState<"opportunity" | "apollo">("opportunity");
  const [dustLevel, setDustLevel] = useState(65);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-black border border-slate-800 p-4 sm:p-6 overflow-hidden shadow-2xl">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              NASA Hardware 3D Mesh Inspector
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time WebGL rendering based on NASA 3D Models & LROC Orbital Telemetry
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedRelic("opportunity")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedRelic === "opportunity"
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Opportunity (MER-B)
          </button>
          <button
            onClick={() => setSelectedRelic("apollo")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedRelic === "apollo"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Apollo 11 LM Descent
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[450px] rounded-xl overflow-hidden bg-radial from-slate-900 to-slate-950 border border-slate-800/80">
        {mounted ? (
          <Canvas
            camera={{ position: [3, 2.5, 3.5], fov: 45 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={selectedRelic === "opportunity" ? 0.6 : 0.8} />
            <directionalLight
              position={[5, 8, 5]}
              intensity={selectedRelic === "opportunity" ? 1.4 : 2.0}
              color={selectedRelic === "opportunity" ? "#ffedd5" : "#ffffff"}
            />
            <pointLight position={[-4, 2, -4]} intensity={0.4} color="#60a5fa" />

            <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
              {selectedRelic === "opportunity" ? (
                <RoverMesh dustLevel={dustLevel} isSpinning={autoRotate} />
              ) : (
                <ApolloDescentMesh />
              )}
            </Float>

            {/* Ground Grid Reference Plane */}
            <Grid
              position={[0, -0.65, 0]}
              args={[10, 10]}
              cellSize={0.5}
              cellThickness={1}
              cellColor={selectedRelic === "opportunity" ? "#7c2d12" : "#475569"}
              sectionSize={2}
              sectionThickness={1.5}
              sectionColor={selectedRelic === "opportunity" ? "#ea580c" : "#94a3b8"}
              fadeDistance={12}
              fadeStrength={1.5}
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={2}
              maxDistance={7}
              maxPolarAngle={Math.PI / 2 + 0.1}
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
            Initializing Three.js WebGL Pipeline...
          </div>
        )}

        {/* Overlay HUD Readout */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="text-orange-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3 h-3" />
            <span>Target: {selectedRelic === "opportunity" ? "MER-B Opportunity" : "Apollo 11 LM-5"}</span>
          </div>
          <div>Coords: {selectedRelic === "opportunity" ? "2.3364° S, 354.7431° E" : "0.67416° N, 23.47314° E"}</div>
          <div>Status: {selectedRelic === "opportunity" ? "Silent (Sol 5111)" : "Lunar Monument"}</div>
          {selectedRelic === "opportunity" && <div>Dust Coverage: {dustLevel}%</div>}
        </div>

        {/* Orbit Helper Tip */}
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] text-slate-400 flex items-center gap-1.5">
          <ZoomIn className="w-3 h-3" />
          <span>Click & Drag to rotate • Scroll to zoom</span>
        </div>
      </div>

      {/* Interactive Controls Footbar */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Dust Accumulation Simulation Slider (For Mars Relics) */}
        {selectedRelic === "opportunity" ? (
          <div className="w-full sm:w-1/2 flex items-center gap-3">
            <Wind className="w-4 h-4 text-orange-400 shrink-0" />
            <div className="w-full">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Martian Dust Accumulation</span>
                <span className="font-mono text-orange-400 font-semibold">{dustLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={dustLevel}
                onChange={(e) => setDustLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Lunar Vacuum Heritage: Preserved in ultra-high vacuum for 57+ years.</span>
          </div>
        )}

        {/* Rotate Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              autoRotate
                ? "bg-slate-800 border-slate-700 text-slate-200"
                : "bg-slate-900 border-slate-800 text-slate-400"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin text-orange-400" : ""}`} />
            <span>{autoRotate ? "Auto-Rotate ON" : "Auto-Rotate PAUSED"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
