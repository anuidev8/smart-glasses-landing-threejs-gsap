import React from 'react';
import { SceneType } from '../../types';
import { SCENE_IMAGES } from '../../data/scenes';

interface BackgroundLayerProps {
    activeScene: SceneType;
    scenes: SceneType[];
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ activeScene, scenes }) => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
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
                                <div className={`absolute inset-0 z-10 ${isHero
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
        </div>
    );
};
