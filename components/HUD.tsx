
import React, { useEffect, useRef } from 'react';
import { SceneType, HUDProps } from '../types';
import { 
  Scan, Activity, Heart, Globe, 
  MapPin, Code, Cpu, ShieldCheck, 
  MessageSquare, Mic, Wifi, Eye
} from 'lucide-react';
import gsap from 'gsap';

export const HUD: React.FC<HUDProps> = ({ scene }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade in container on scene change
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      );
    }

    // Special Animation: Accessibility Scanner
    if (scene === SceneType.PRESENT_ACCESS && scannerRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(scannerRef.current, { top: "100%", duration: 2, ease: "linear" })
        .set(scannerRef.current, { top: "0%" });
    }

  }, [scene]);

  // Common Styles
  const fullSize = "absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-[40%]";
  const neonText = "text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]";
  const glassCard = "bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3";

  // Render logic based on Timeline Era
  switch (scene) {
    case SceneType.HERO:
      return null;

    // --- THE PAST ---
    case SceneType.PAST_1200:
      return (
        <div ref={containerRef} className={fullSize}>
           <div className="absolute inset-0 bg-amber-900/20 mix-blend-overlay pointer-events-none" />
           {/* Simulate a magnifying glass effect via border/vignette */}
           <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
           <div className="absolute inset-0 backdrop-blur-[1px] scale-110" />
        </div>
      );
    
    case SceneType.PAST_1780:
      return (
        <div ref={containerRef} className={`${fullSize} items-start justify-center pl-6`}>
           <div className="absolute inset-0 bg-amber-100/10 mix-blend-overlay pointer-events-none" />
           
           {/* Bifocal Split Line Visual */}
           <div className="absolute bottom-[40%] left-0 right-0 h-[1px] bg-white/40 shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
           
           {/* Bottom Lens Distortion (Reading Area) */}
           <div className="absolute bottom-0 left-0 right-0 top-[60%] backdrop-blur-[1.5px] bg-white/5" />

           {/* Technical Annotations (Left Aligned) */}
           <div className="flex flex-col gap-8 z-10 opacity-90 mt-[-20px]">
              {/* Top Annotation */}
              <div className="group flex items-center gap-2 animate-in slide-in-from-left-4 duration-1000 delay-300">
                  <div className="w-6 h-[1px] bg-white/70" />
                  <div className="flex flex-col">
                      <span className="text-[9px] font-serif text-white/80 tracking-widest uppercase">Distance</span>
                      <span className="text-[10px] font-serif text-white italic">Concave</span>
                  </div>
              </div>

              {/* Bottom Annotation */}
              <div className="group flex items-center gap-2 animate-in slide-in-from-left-4 duration-1000 delay-500 mt-4">
                  <div className="w-6 h-[1px] bg-white/70" />
                  <div className="flex flex-col">
                      <span className="text-[9px] font-serif text-white/80 tracking-widest uppercase">Near Vision</span>
                      <span className="text-[10px] font-serif text-white italic">Convex</span>
                  </div>
              </div>
           </div>
           
           {/* Vintage Year Stamp / Material Spec */}
           <div className="absolute top-8 right-8 border border-white/20 px-2 py-1 rounded-sm opacity-60">
               <span className="text-[9px] font-serif text-white">Fe + SiO₂</span>
           </div>
        </div>
      );

    case SceneType.PAST_FASHION:
       return (
        <div ref={containerRef} className={fullSize}>
            {/* Film grain overlay feel */}
           <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 mix-blend-screen" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay" />
        </div>
       );

    // --- THE PRESENT (Real Use Cases) ---
    case SceneType.PRESENT_ACCESS:
      return (
        <div ref={containerRef} className={`${fullSize} items-start justify-end p-8`}>
           {/* AI Scanner Line */}
           <div ref={scannerRef} className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff] shadow-[0_0_15px_#00f0ff] opacity-70 z-10" />
           
           {/* Detected Object Box */}
           <div className="absolute top-1/3 left-1/3 w-24 h-24 border border-[#00f0ff]/50 rounded-lg animate-pulse">
               <span className="absolute -top-4 left-0 text-[8px] bg-[#00f0ff]/20 text-[#00f0ff] px-1">PERSON (98%)</span>
           </div>

           {/* Context Card */}
           <div className={`${glassCard} flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-1000 border-l-4 border-l-[#00f0ff]`}>
              <Eye size={20} className={neonText} />
              <div className="flex flex-col">
                  <span className="text-[#00f0ff] text-[9px] tracking-widest uppercase">Visual Assist</span>
                  <span className="text-white text-xs font-mono">Crosswalk detected. Safe to cross.</span>
              </div>
           </div>
        </div>
      );

    case SceneType.PRESENT_LEARNING:
      return (
        <div ref={containerRef} className={`${fullSize} items-center justify-center`}>
            {/* Holographic Projection Feel */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite] opacity-20">
                 <div className="w-[120%] h-[120%] border border-dashed border-[#00f0ff] rounded-full" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center animate-in zoom-in-50 duration-700">
               <Globe className="text-[#00f0ff] mb-2 drop-shadow-[0_0_15px_#00f0ff]" size={32} />
               <div className="flex gap-1 mb-1">
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" />
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-100" />
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce delay-200" />
               </div>
               <div className="bg-[#00f0ff]/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#00f0ff]/30 text-center">
                   <span className="text-[10px] text-[#00f0ff] font-mono tracking-widest block">TRANSLATING</span>
                   <span className="text-white text-xs font-bold">"La percepción es realidad"</span>
               </div>
               <div className="h-8 w-[1px] bg-gradient-to-b from-[#00f0ff] to-transparent mt-2" />
            </div>

            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-1 h-1 bg-[#00f0ff] rounded-full animate-ping" />
            <div className="absolute bottom-10 right-10 w-1 h-1 bg-[#00f0ff] rounded-full animate-ping delay-500" />
        </div>
      );

    case SceneType.PRESENT_NAV:
      return (
        <div ref={containerRef} className={fullSize}>
           <div className="absolute top-12 right-12 flex flex-col items-end">
              <div className="text-5xl font-bold text-white italic tracking-tighter drop-shadow-lg">24<span className="text-sm text-[#00f0ff] not-italic ml-1">km/h</span></div>
           </div>
           
           {/* AR Path Overlay */}
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
               <div className="w-1 h-20 bg-gradient-to-t from-[#00f0ff] to-transparent" />
           </div>

           <div className="absolute bottom-24 flex gap-3 items-center text-[#00f0ff] bg-black/60 px-4 py-2 rounded-full backdrop-blur-md border border-[#00f0ff]/30">
              <MapPin size={20} />
              <span className="text-lg font-medium">Turn Right</span>
              <span className="text-sm opacity-70 border-l border-[#00f0ff]/30 pl-2 ml-2">50m</span>
           </div>
        </div>
      );

    case SceneType.PRESENT_WORK:
        return (
            <div ref={containerRef} className={fullSize}>
               {/* Code overlay */}
               <div className="absolute top-[20%] left-6 font-mono text-[9px] text-green-400/90 bg-black/80 p-3 rounded border-l-2 border-green-500 shadow-lg backdrop-blur-sm">
                  <div className="opacity-50 mb-1">// AR Init Sequence</div>
                  {`const future = await vision.init();`} <br/>
                  {`return future.render();`}
               </div>
               {/* Grid lines */}
               <div className="absolute inset-6 border border-dashed border-[#00f0ff]/20 rounded-xl" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-[#00f0ff] opacity-50" />
               <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#00f0ff] rounded-full" />
            </div>
        );

    // --- THE FUTURE (AI) ---
    case SceneType.FUTURE_TRANSLATE:
    case SceneType.FUTURE_HEALTH:
    case SceneType.FUTURE_COMPANION:
        return (
            <div ref={containerRef} className={fullSize}>
                {/* Holographic Circle */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-[#00f0ff]/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-[180px] h-[180px] rounded-full border-t border-b border-[#00f0ff]/60 animate-[spin_5s_reverse_linear_infinite]" />
                
                {scene === SceneType.FUTURE_HEALTH && (
                    <div className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-4 rounded-full w-32 h-32 border border-red-500/30">
                        <Heart className="text-red-500 animate-pulse mb-1 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" size={28} />
                        <span className="text-3xl font-bold text-white">72</span>
                        <span className="text-[9px] text-red-400 uppercase tracking-widest">BPM</span>
                    </div>
                )}
                
                {scene === SceneType.FUTURE_COMPANION && (
                    <div className="absolute bottom-16 flex gap-4 bg-white/10 p-3 rounded-full backdrop-blur-md">
                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce delay-200" />
                    </div>
                )}
            </div>
        );

    // --- BREAKDOWN ---
    case SceneType.BREAKDOWN:
        return (
            <div ref={containerRef} className={fullSize}>
                <div className="absolute inset-0 bg-[#00f0ff]/5" />
                <div className="absolute top-[20%] right-[10%] flex items-center gap-2 animate-in fade-in slide-in-from-right-10 duration-700">
                    <div className="w-12 h-[1px] bg-[#00f0ff]" />
                    <span className="text-[9px] text-[#00f0ff] font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-[#00f0ff]/30">LiDAR Scanner</span>
                </div>
                <div className="absolute bottom-[30%] left-[10%] flex items-center gap-2 flex-row-reverse animate-in fade-in slide-in-from-left-10 duration-700 delay-300">
                    <div className="w-12 h-[1px] bg-[#00f0ff]" />
                    <span className="text-[9px] text-[#00f0ff] font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-[#00f0ff]/30">Bone Conduction</span>
                </div>
                <div className="absolute top-[10%] left-[30%] flex flex-col items-center animate-pulse">
                    <Cpu className={neonText} size={24} />
                    <span className="text-[8px] text-[#00f0ff] mt-1 tracking-widest">NPU CORE</span>
                </div>
            </div>
        );

    default:
      return null;
  }
};
