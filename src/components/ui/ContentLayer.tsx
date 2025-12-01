import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { SceneType } from '../../types';
import { SCENE_CONTENT } from '../../data/scenes';
import { Glasses } from 'lucide-react';

interface ContentLayerProps {
    activeScene: SceneType;
    scenes: SceneType[];
    sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const ContentLayer: React.FC<ContentLayerProps> = ({ activeScene, scenes, sectionsRef }) => {
    return (
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
    );
};
