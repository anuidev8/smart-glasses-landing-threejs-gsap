import React, { forwardRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GlassesProps } from '../types';

export const GlassesModel = forwardRef<THREE.Group, GlassesProps>(({ wireframe = false }, ref) => {
  // --- MATERIALS ---
  
  // High-end Platinum/Titanium finish
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: "#e8e8e8",
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 2.5,
    wireframe: wireframe
  });

  // Darker detailed metal for hinges/screws
  const hardwareMaterial = new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    metalness: 0.8,
    roughness: 0.2,
    wireframe: wireframe
  });

  // Soft Silicone for nose pads/ear tips
  const padMaterial = new THREE.MeshStandardMaterial({
    color: "#f0f0f0",
    roughness: 0.8,
    transparent: true,
    opacity: 0.9,
    wireframe: wireframe
  });

  // Neon Glow for the inner rim
  const neonMaterial = new THREE.MeshBasicMaterial({
    color: "#00f0ff",
    toneMapped: false
  });

  return (
    <group ref={ref} dispose={null}>
      
      {/* --- LEFT EYE ASSEMBLY --- */}
      <group position={[-1.2, 0, 0]}>
        {/* Main Rim (Outer Metal) */}
        <mesh material={frameMaterial}>
          <torusGeometry args={[0.95, 0.04, 32, 100]} />
        </mesh>
        
        {/* Inner Rim (Neon Accent) */}
        <mesh>
          <torusGeometry args={[0.94, 0.015, 16, 100]} />
          <primitive object={neonMaterial} />
        </mesh>

        {/* The Lens (Glass) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.05, 64]} />
          <MeshTransmissionMaterial 
             backside
             samples={16}
             resolution={1024}
             thickness={0.15}
             roughness={0.02}
             ior={1.5}
             chromaticAberration={0.06}
             anisotropy={0.1}
             distortion={0.2}
             distortionScale={0.3}
             temporalDistortion={0.5}
             clearcoat={1}
             attenuationDistance={0.5}
             attenuationColor="#ffffff"
             color="#eef"
             bg="#000"
          />
        </mesh>
      </group>

      {/* --- RIGHT EYE ASSEMBLY --- */}
      <group position={[1.2, 0, 0]}>
        {/* Main Rim */}
        <mesh material={frameMaterial}>
          <torusGeometry args={[0.95, 0.04, 32, 100]} />
        </mesh>

        {/* Inner Rim (Neon Accent) */}
        <mesh>
          <torusGeometry args={[0.94, 0.015, 16, 100]} />
          <primitive object={neonMaterial} />
        </mesh>

        {/* The Lens */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.05, 64]} />
          <MeshTransmissionMaterial 
             backside
             samples={16}
             resolution={1024}
             thickness={0.15}
             roughness={0.02}
             ior={1.5}
             chromaticAberration={0.06}
             anisotropy={0.1}
             distortion={0.2}
             distortionScale={0.3}
             temporalDistortion={0.5}
             clearcoat={1}
             attenuationDistance={0.5}
             attenuationColor="#ffffff"
             color="#eef"
             bg="#000"
          />
        </mesh>
      </group>

      {/* --- BRIDGE AREA --- */}
      
      {/* Top Bar (Double Bridge) */}
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, Math.PI / 2]} material={frameMaterial}>
        <cylinderGeometry args={[0.025, 0.025, 2.5, 32]} />
      </mesh>
      
      {/* Nose Bridge (Curved) */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]} material={frameMaterial}>
        {/* Using a partial torus for the nose curve */}
        <torusGeometry args={[0.35, 0.03, 16, 32, Math.PI]}  />
      </mesh>
      {/* Rotating the nose bridge to face correct way */}
      <group position={[0, 0.1, 0]}> 
         {/* Fix rotation hack: since torus is created on XY plane */}
      </group>


      {/* --- NOSE PADS --- */}
      <group position={[0, -0.1, 0]}>
        {/* Left Pad Arm */}
        <mesh position={[-0.35, 0, -0.1]} rotation={[0, 0, -0.5]} material={frameMaterial}>
           <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        </mesh>
        {/* Left Pad */}
        <mesh position={[-0.4, -0.15, -0.2]} rotation={[0.5, -0.5, 0]} material={padMaterial}>
           <capsuleGeometry args={[0.1, 0.3, 4, 16]} />
        </mesh>

        {/* Right Pad Arm */}
        <mesh position={[0.35, 0, -0.1]} rotation={[0, 0, 0.5]} material={frameMaterial}>
           <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
        </mesh>
        {/* Right Pad */}
        <mesh position={[0.4, -0.15, -0.2]} rotation={[0.5, 0.5, 0]} material={padMaterial}>
           <capsuleGeometry args={[0.1, 0.3, 4, 16]} />
        </mesh>
      </group>


      {/* --- TEMPLES (ARMS) & HINGES --- */}
      
      {/* Left Hinge Block */}
      <group position={[-2.2, 0.1, 0]}>
         <mesh material={hardwareMaterial}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
         </mesh>
         <mesh rotation={[0, 0, Math.PI/2]} material={hardwareMaterial}>
             <cylinderGeometry args={[0.03, 0.03, 0.2, 16]} />
         </mesh>
      </group>

      {/* Right Hinge Block */}
      <group position={[2.2, 0.1, 0]}>
         <mesh material={hardwareMaterial}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
         </mesh>
         <mesh rotation={[0, 0, Math.PI/2]} material={hardwareMaterial}>
             <cylinderGeometry args={[0.03, 0.03, 0.2, 16]} />
         </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-2.2, 0.1, -0.05]} rotation={[0, -0.15, 0]}>
         {/* Main Metal Arm */}
         <mesh position={[0, 0, -1.5]} rotation={[Math.PI/2, 0, 0]} material={frameMaterial}>
            <cylinderGeometry args={[0.02, 0.02, 3, 32]} />
         </mesh>
         {/* Ear Tip (Silicone/Plastic) */}
         <mesh position={[0, -0.1, -3]} rotation={[Math.PI/4, 0, 0]} material={padMaterial}>
             <capsuleGeometry args={[0.03, 0.8, 4, 16]} />
         </mesh>
      </group>
      
      {/* Right Arm */}
      <group position={[2.2, 0.1, -0.05]} rotation={[0, 0.15, 0]}>
         {/* Main Metal Arm */}
         <mesh position={[0, 0, -1.5]} rotation={[Math.PI/2, 0, 0]} material={frameMaterial}>
            <cylinderGeometry args={[0.02, 0.02, 3, 32]} />
         </mesh>
         {/* Ear Tip */}
         <mesh position={[0, -0.1, -3]} rotation={[Math.PI/4, 0, 0]} material={padMaterial}>
             <capsuleGeometry args={[0.03, 0.8, 4, 16]} />
         </mesh>
      </group>

      {/* --- LIGHTING ACCENTS --- */}
      {/* Subtle point lights attached to the frame for that "product shot" glint */}
      <pointLight position={[-1.2, 0.5, 0.5]} intensity={0.2} color="#fff" distance={1} />
      <pointLight position={[1.2, 0.5, 0.5]} intensity={0.2} color="#fff" distance={1} />

    </group>
  );
});