
import React, { useState, useRef, useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassesModel } from './components/GlassesModel';
import { HUD } from './components/HUD';
import { SceneType } from './types';
import { 
  Glasses, ArrowRight,
  Home, History, ScanEye, Cpu,
  Activity, Layers, Sparkles, ChevronRight,
  Search, PlusSquare, Heart, User
} from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS ---
const SCENE_IMAGES: Record<SceneType, string> = {
  // HERO: Retro Human connection - High visibility vintage portrait
  [SceneType.HERO]: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1974&auto=format&fit=crop", 
  [SceneType.PAST_1200]: "https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1974&auto=format&fit=crop",
  [SceneType.PAST_1780]: "https://images.unsplash.com/photo-1596568297924-f76150b4d455?q=80&w=2070&auto=format&fit=crop",
  [SceneType.PAST_FASHION]: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
  [SceneType.PRESENT_ACCESS]: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=1974&auto=format&fit=crop",
  [SceneType.PRESENT_LEARNING]: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  [SceneType.PRESENT_NAV]: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop",
  [SceneType.PRESENT_WORK]: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop",
  [SceneType.FUTURE_TRANSLATE]: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
  [SceneType.FUTURE_HEALTH]: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
  [SceneType.FUTURE_COMPANION]: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
  [SceneType.BREAKDOWN]: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  [SceneType.CTA]: "https://images.unsplash.com/photo-1535378437327-10f274a7a607?q=80&w=2000&auto=format&fit=crop",
};

// --- FEATURE CONTENT DATA ---
const SCENE_CONTENT: Record<SceneType, { 
    label: string; 
    title: string; 
    description: string; 
    align: 'left' | 'center' | 'right';
    icon: React.ElementType;
}> = {
  [SceneType.HERO]: { 
      label: "Introduction", title: "Lumina Vision", 
      description: "See the world differently. A journey through the evolution of sight, reimagined for the future.", 
      align: 'center', icon: Sparkles 
  },
  [SceneType.PAST_1200]: { 
      label: "1286 AD", title: "The Reading Stone", 
      description: "It began with a single stone. The first aid for human vision was a revelation for medieval scholars, magnifying manuscripts and preserving knowledge.", 
      align: 'left', icon: History 
  },
  [SceneType.PAST_1780]: { 
      label: "1780 AD", title: "The Bifocal Revolution", 
      description: "Benjamin Franklin united distance and near vision. Iron and glass merged to create the first dual-focus lenses, changing how we interact with the world.", 
      align: 'right', icon: History 
  },
  [SceneType.PAST_FASHION]: { 
      label: "20th Century", title: "Icon of Identity", 
      description: "Eyewear evolved from medical necessity to cultural statement. From aviators to wayfarers, glasses became a defining element of personal style.", 
      align: 'left', icon: Glasses 
  },
  [SceneType.PRESENT_ACCESS]: { 
      label: "Accessibility", title: "Vision for Everyone", 
      description: "AI describes the world in real-time. Objects, people, and text are identified instantly, empowering independence for the visually impaired.", 
      align: 'center', icon: ScanEye 
  },
  [SceneType.PRESENT_LEARNING]: { 
      label: "Communication", title: "Universal Translator", 
      description: "Language is no longer a barrier. Real-time subtitles appear in your field of view, allowing you to understand anyone, anywhere, instantly.", 
      align: 'right', icon: Layers 
  },
  [SceneType.PRESENT_NAV]: { 
      label: "Navigation", title: "Seamless Guidance", 
      description: "Forget looking down at your phone. Holographic arrows and markers blend seamlessly with the street, guiding you exactly where you need to go.", 
      align: 'left', icon: ArrowRight 
  },
  [SceneType.PRESENT_WORK]: { 
      label: "Productivity", title: "Infinite Workspace", 
      description: "The world is your monitor. Prototype designs, review code, and collaborate with spatial computing that extends beyond the screen.", 
      align: 'center', icon: Cpu 
  },
  [SceneType.FUTURE_TRANSLATE]: { 
      label: "2030 Vision", title: "Invisible Interface", 
      description: "The hardware disappears. Only understanding remains. Contextual intelligence provides information before you even ask for it.", 
      align: 'right', icon: Sparkles 
  },
  [SceneType.FUTURE_HEALTH]: { 
      label: "Wellness", title: "Bio-Synchronization", 
      description: "Your health, visualized. Heart rate, stress levels, and focus are tracked biometrically to help you maintain peak performance.", 
      align: 'left', icon: Activity 
  },
  [SceneType.FUTURE_COMPANION]: { 
      label: "AI Companion", title: "Always With You", 
      description: "An intelligence that anticipates your needs. From scheduling to safety, your AI companion is always ready to assist.", 
      align: 'center', icon: Sparkles 
  },
  [SceneType.BREAKDOWN]: { 
      label: "Engineering", title: "Precision Hardware", 
      description: "LiDAR, NPU, and Micro-LED displays packed into a 30g ultra-lightweight titanium frame. A marvel of modern engineering.", 
      align: 'center', icon: Cpu 
  },
  [SceneType.CTA]: { 
      label: "The Future", title: "Experience Vision", 
      description: "The future is looking back at you. Join us in the next era of human augmentation.", 
      align: 'center', icon: Sparkles 
  },
};

// --- SCENE COMPONENT (Inside Canvas) ---
interface SceneProps {
  sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  maskRef: React.RefObject<HTMLDivElement>;
  hudContainerRef: React.RefObject<HTMLDivElement>;
  onSceneChange: (scene: SceneType) => void;
  onWireframeChange: (isWireframe: boolean) => void;
  isWireframe: boolean;
}

const Scene: React.FC<SceneProps> = ({ 
  sectionsRef, 
  maskRef, 
  hudContainerRef, 
  onSceneChange, 
  onWireframeChange, 
  isWireframe 
}) => {
  const glassesRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useLayoutEffect(() => {
    if (!glassesRef.current || sectionsRef.current.length === 0) return;

    const glasses = glassesRef.current;
    glasses.position.set(0, 0, 0);
    glasses.rotation.set(0, 0, 0);

    const animateScene = (
      targetPos: { x: number, y: number, z: number }, 
      targetRot: { x: number, y: number, z: number },
      maskOffset: number,
      wireframe: boolean,
      duration: number = 1.2
    ) => {
      gsap.to(glasses.position, {
        x: targetPos.x, y: targetPos.y, z: targetPos.z,
        duration: duration, ease: "power2.inOut", overwrite: true
      });
      gsap.to(glasses.rotation, {
        x: targetRot.x, y: targetRot.y, z: targetRot.z,
        duration: duration, ease: "power2.inOut", overwrite: true
      });

      if (maskRef.current && hudContainerRef.current) {
        gsap.to(maskRef.current, {
          '--mask-offset': `${maskOffset}%`,
          duration: duration, ease: "power2.inOut", overwrite: true
        });
        gsap.to(hudContainerRef.current, {
          x: `${maskOffset}%`,
          duration: duration, ease: "power2.inOut", overwrite: true
        });
      }

      onWireframeChange(wireframe);
    };

    // --- IDLE ANIMATION (HERO) ---
    const idleTl = gsap.timeline({ repeat: -1, yoyo: true });
    idleTl.to(glasses.rotation, { y: 0.1, x: 0.05, duration: 4, ease: "sine.inOut" });
    idleTl.to(glasses.rotation, { y: -0.1, x: -0.05, duration: 4, ease: "sine.inOut" });

    ScrollTrigger.create({
      trigger: sectionsRef.current[0],
      start: "top center",
      onLeave: () => idleTl.pause(),
      onEnterBack: () => idleTl.play(),
    });

    // --- SCROLL TRIGGERS ---
    
    // PAST: 1200
    ScrollTrigger.create({
      trigger: sectionsRef.current[1],
      start: "top bottom",
      end: "bottom center",
      onEnter: () => {
        onSceneChange(SceneType.PAST_1200);
        animateScene({x: -1.5, y: 0.1, z: 1}, {x: 0, y: 0.3, z: 0.1}, -25, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PAST_1200);
        animateScene({x: -1.5, y: 0.1, z: 1}, {x: 0, y: 0.3, z: 0.1}, -25, false);
      }
    });

    // PAST: 1780
    ScrollTrigger.create({
      trigger: sectionsRef.current[2],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PAST_1780);
        animateScene({x: 1.5, y: -0.2, z: 0.5}, {x: 0.1, y: -0.4, z: -0.1}, 25, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PAST_1780);
        animateScene({x: 1.5, y: -0.2, z: 0.5}, {x: 0.1, y: -0.4, z: -0.1}, 25, false);
      }
    });

    // PAST: Fashion
    ScrollTrigger.create({
      trigger: sectionsRef.current[3],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PAST_FASHION);
        animateScene({x: 0, y: 0, z: 1.5}, {x: -0.1, y: 0, z: 0}, 0, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PAST_FASHION);
        animateScene({x: 0, y: 0, z: 1.5}, {x: -0.1, y: 0, z: 0}, 0, false);
      }
    });

    // PRESENT: Access
    ScrollTrigger.create({
      trigger: sectionsRef.current[4],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PRESENT_ACCESS);
        animateScene({x: 0, y: 0, z: 2}, {x: 0, y: 0, z: 0}, 0, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PRESENT_ACCESS);
        animateScene({x: 0, y: 0, z: 2}, {x: 0, y: 0, z: 0}, 0, false);
      }
    });

    // PRESENT: Learning
    ScrollTrigger.create({
      trigger: sectionsRef.current[5],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PRESENT_LEARNING);
        animateScene({x: -1.8, y: 0.1, z: 1.2}, {x: 0, y: 0.4, z: 0}, -25, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PRESENT_LEARNING);
        animateScene({x: -1.8, y: 0.1, z: 1.2}, {x: 0, y: 0.4, z: 0}, -25, false);
      }
    });

    // PRESENT: Nav
    ScrollTrigger.create({
      trigger: sectionsRef.current[6],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PRESENT_NAV);
        animateScene({x: -2, y: -0.5, z: 0}, {x: 0.2, y: 0.5, z: 0}, -30, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PRESENT_NAV);
        animateScene({x: -2, y: -0.5, z: 0}, {x: 0.2, y: 0.5, z: 0}, -30, false);
      }
    });

    // PRESENT: Work
    ScrollTrigger.create({
      trigger: sectionsRef.current[7],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.PRESENT_WORK);
        animateScene({x: 0, y: 0, z: 1.5}, {x: 0, y: 0, z: 0}, 0, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.PRESENT_WORK);
        animateScene({x: 0, y: 0, z: 1.5}, {x: 0, y: 0, z: 0}, 0, false);
      }
    });

    // FUTURE: Translate
    ScrollTrigger.create({
      trigger: sectionsRef.current[8],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.FUTURE_TRANSLATE);
        animateScene({x: 1.5, y: 0, z: 0.5}, {x: 0, y: -0.8, z: 0.1}, 20, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.FUTURE_TRANSLATE);
        animateScene({x: 1.5, y: 0, z: 0.5}, {x: 0, y: -0.8, z: 0.1}, 20, false);
      }
    });

    // FUTURE: Health
    ScrollTrigger.create({
      trigger: sectionsRef.current[9],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.FUTURE_HEALTH);
        animateScene({x: -1.5, y: 0, z: 0.5}, {x: 0, y: 0.8, z: -0.1}, -20, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.FUTURE_HEALTH);
        animateScene({x: -1.5, y: 0, z: 0.5}, {x: 0, y: 0.8, z: -0.1}, -20, false);
      }
    });

    // FUTURE: Companion
    ScrollTrigger.create({
      trigger: sectionsRef.current[10],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.FUTURE_COMPANION);
        animateScene({x: 0, y: 0.2, z: 2.5}, {x: 0.1, y: 0, z: 0}, 0, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.FUTURE_COMPANION);
        animateScene({x: 0, y: 0.2, z: 2.5}, {x: 0.1, y: 0, z: 0}, 0, false);
      }
    });

    // BREAKDOWN
    ScrollTrigger.create({
      trigger: sectionsRef.current[11],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.BREAKDOWN);
        animateScene({x: 0, y: 0, z: 2}, {x: -0.5, y: 0.5, z: 0.2}, 0, true);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.BREAKDOWN);
        animateScene({x: 0, y: 0, z: 2}, {x: -0.5, y: 0.5, z: 0.2}, 0, true);
      }
    });

    // CTA
    ScrollTrigger.create({
      trigger: sectionsRef.current[12],
      start: "top bottom",
      onEnter: () => {
        onSceneChange(SceneType.CTA);
        animateScene({x: 0, y: 0, z: 0.5}, {x: 0, y: 0, z: 0}, 0, false);
      },
      onEnterBack: () => {
        onSceneChange(SceneType.CTA);
        animateScene({x: 0, y: 0, z: 0.5}, {x: 0, y: 0, z: 0}, 0, false);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      idleTl.kill();
    };
  }, [sectionsRef, maskRef, hudContainerRef]); 

  return <GlassesModel ref={glassesRef} wireframe={isWireframe} />;
};

function App() {
  const [activeScene, setActiveScene] = useState<SceneType>(SceneType.HERO);
  const [isWireframe, setIsWireframe] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const hudContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const scenes = Object.values(SceneType);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-screen font-sans text-white overflow-x-hidden selection:bg-[#3b82f6] selection:text-white">
      
      {/* 
        ==========================
        FLOATING NAV RAIL
        ==========================
      */}
      <div className="fixed top-1/2 -translate-y-1/2 left-6 z-50 hidden md:flex flex-col items-center gap-6 bg-[#1c1c1c] p-3 rounded-[30px] border border-white/5 shadow-2xl backdrop-blur-md">
          <div className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer group" title="Home">
              <Home size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <div className="p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer group" title="Search">
              <Search size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <div className="p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer group" title="Augment">
              <PlusSquare size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <div className="p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer group" title="Wellness">
              <Heart size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <div className="p-3 rounded-full hover:bg-white/10 transition-colors cursor-pointer group" title="Profile">
              <User size={24} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
      </div>

      {/* 
        ==========================
        FIXED EXPERIENCE LAYER
        ==========================
      */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        
        {/* 1. Backgrounds */}
        {scenes.map((scene) => {
          const isHero = scene === SceneType.HERO;
          return (
            <div 
              key={scene}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeScene === scene ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-[#0a0a0a]" />
              
              {/* Render Images */}
              {SCENE_IMAGES[scene] && (
                  <>
                    {/* Conditional Overlay: Blue soft gradient for Hero, Darker for others */}
                    <div className={`absolute inset-0 z-10 ${
                        isHero 
                            ? 'bg-gradient-to-b from-blue-900/40 via-blue-500/10 to-black/60 mix-blend-soft-light' 
                            : 'bg-black/60'
                    }`} />
                    <img 
                      src={SCENE_IMAGES[scene]} 
                      alt={scene} 
                      className={`
                        w-full h-full object-cover transition-transform duration-[10s] scale-105 ease-linear
                        ${isHero ? 'opacity-100 mix-blend-normal' : 'opacity-50 mix-blend-overlay'}
                      `}
                    />
                  </>
              )}
            </div>
          );
        })}

        {/* 2. Portal Mask (Window to 3D) */}
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

        {/* 3. 3D Scene */}
        <div className="absolute inset-0 z-20">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
            <Environment preset="city" />
            
            <Scene 
              sectionsRef={sectionsRef}
              maskRef={maskRef}
              hudContainerRef={hudContainerRef}
              onSceneChange={setActiveScene}
              onWireframeChange={setIsWireframe}
              isWireframe={isWireframe}
            />

          </Canvas>
        </div>

        {/* 4. HUD Layer */}
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

      {/* 
        ==========================
        SCROLLING CONTENT LAYER
        ==========================
      */}
      <div className="relative z-40 pl-24 pr-6">
        {scenes.map((scene, index) => {
            const data = SCENE_CONTENT[scene];
            const isLeft = data.align === 'left';
            const isRight = data.align === 'right';
            const isCenter = data.align === 'center';
            const Icon = data.icon;
            
            // Check if Hero Section
            const isHero = scene === SceneType.HERO;

            return (
                <section 
                    key={scene}
                    ref={el => { sectionsRef.current[index] = el; }}
                    className={`h-screen w-full flex relative perspective-1000 ${isHero ? 'items-end pb-24 justify-center' : 'items-center'}`}
                >
                    <div className={`container mx-auto grid grid-cols-12 ${isHero ? 'flex justify-center w-full' : ''}`}>
                        <div className={`
                            col-span-12
                            ${isHero ? 'absolute bottom-12 left-0 right-0 mx-auto max-w-2xl z-50' : ''}
                            ${!isHero && isRight ? 'md:col-start-8 md:col-span-5' : ''}
                            ${!isHero && isCenter ? 'md:col-start-4 md:col-span-6' : ''}
                            ${!isHero && isLeft ? 'md:col-span-5' : ''}
                        `}>
                            {/* 
                                FEATURE CARD DESIGN
                            */}
                            <div className={`
                                transition-all duration-1000 ease-out transform
                                ${activeScene === scene ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-95'}
                                bg-gradient-to-br from-[#1c1c1c]/80 via-[#1c1c1c]/60 to-blue-500/10 border border-white/10 rounded-[32px] p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden
                            `}>
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 shadow-inner">
                                            <Icon size={20} className="text-gray-300" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-white font-semibold text-lg tracking-tight">{data.title}</h3>
                                            </div>
                                            <p className="text-[#00f0ff] text-xs font-mono tracking-widest uppercase mt-0.5">{data.label}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-600">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="space-y-6">
                                    <p className="text-gray-300 text-base leading-relaxed font-light">
                                        {data.description}
                                    </p>
                                    
                                    {/* Inner box removed */}
                                </div>
                                
                                {scene === SceneType.CTA && (
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        <button className="w-full py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 group">
                                            Pre-order X-Vision 
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            );
        })}
        
        {/* Footer */}
        <section className="py-20 text-center text-gray-600 border-t border-white/5 mx-auto max-w-2xl">
            <Glasses className="mx-auto mb-6 text-gray-500" size={32} />
            <p className="text-xs tracking-widest uppercase mb-2">Lumina Vision Systems</p>
            <div className="flex justify-center gap-4 text-xs text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
        </section>
      </div>

    </div>
  );
}

export default App;
