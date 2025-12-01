import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerformanceMonitor } from '@react-three/drei';
import { HUD } from './components/HUD';
import { SceneType } from './types';
import { NavRail } from './components/ui/NavRail';
import { BackgroundLayer } from './components/ui/BackgroundLayer';
import { ContentLayer } from './components/ui/ContentLayer';
import { MobileBlocker } from './components/ui/MobileBlocker';
import { Experience } from './components/scene/Experience';

function App() {
  const [activeScene, setActiveScene] = useState<SceneType>(SceneType.HERO);
  const [isWireframe, setIsWireframe] = useState(false);
  const [dpr, setDpr] = useState(1.5); // Default DPR

  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const scenes = Object.values(SceneType);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-screen font-sans text-white overflow-x-hidden selection:bg-[#3b82f6] selection:text-white">

      <MobileBlocker />

      <NavRail />

      {/* 
        ==========================
        FIXED EXPERIENCE LAYER
        ==========================
      */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">

        <BackgroundLayer activeScene={activeScene} scenes={scenes} />

        {/* Portal Mask (Window to 3D) */}
        <div
          ref={maskRef}
          className="absolute inset-0 z-10 transition-colors duration-700 bg-[#0a0a0a]/90 backdrop-blur-sm"
          style={{
            // @ts-ignore
            '--mask-offset': '0%',
            maskImage: `
                    radial-gradient(circle at calc(35% + var(--mask-offset)) 50%, transparent 17%, black 18%), 
                    radial-gradient(circle at calc(65% + var(--mask-offset)) 50%, transparent 17%, black 18%)
                `,
            WebkitMaskImage: `
                    radial-gradient(circle at calc(35% + var(--mask-offset)) 50%, transparent 17%, black 18%), 
                    radial-gradient(circle at calc(65% + var(--mask-offset)) 50%, transparent 17%, black 18%)
                `,
            maskComposite: 'exclude',
            WebkitMaskComposite: 'source-over',
          }}
        />

        {/* 3D Scene */}
        <div className="absolute inset-0 z-20">
          <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 5], fov: 45 }}
            performance={{ min: 0.5 }} // Allow degrading to 0.5 DPR
          >
            <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
            <Environment preset="city" />

            <Experience
              sectionsRef={sectionsRef}
              maskRef={maskRef}
              hudContainerRef={hudContainerRef}
              onSceneChange={setActiveScene}
              onWireframeChange={setIsWireframe}
              isWireframe={isWireframe}
            />

          </Canvas>
        </div>

        {/* HUD Layer */}
        <div ref={hudContainerRef} className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto">
            <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[28vw] h-[28vw] max-w-[400px] max-h-[400px]">
              <HUD scene={activeScene} />
            </div>
            <div className="absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-[28vw] h-[28vw] max-w-[400px] max-h-[400px]">
              <HUD scene={activeScene} />
            </div>
          </div>
        </div>
      </div>

      <ContentLayer activeScene={activeScene} scenes={scenes} sectionsRef={sectionsRef} />

    </div>
  );
}

export default App;
