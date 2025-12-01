import { useRef, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneType } from '../types';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface UseSceneAnimationProps {
    sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
    maskRef: React.RefObject<HTMLDivElement>;
    hudContainerRef: React.RefObject<HTMLDivElement>;
    glassesRef: React.RefObject<THREE.Group>;
    onSceneChange: (scene: SceneType) => void;
    onWireframeChange: (isWireframe: boolean) => void;
}

export const useSceneAnimation = ({
    sectionsRef,
    maskRef,
    hudContainerRef,
    glassesRef,
    onSceneChange,
    onWireframeChange
}: UseSceneAnimationProps) => {
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
                animateScene({ x: -1.5, y: 0.1, z: 1 }, { x: 0, y: 0.3, z: 0.1 }, -25, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PAST_1200);
                animateScene({ x: -1.5, y: 0.1, z: 1 }, { x: 0, y: 0.3, z: 0.1 }, -25, false);
            }
        });

        // PAST: 1780
        ScrollTrigger.create({
            trigger: sectionsRef.current[2],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PAST_1780);
                animateScene({ x: 1.5, y: -0.2, z: 0.5 }, { x: 0.1, y: -0.4, z: -0.1 }, 25, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PAST_1780);
                animateScene({ x: 1.5, y: -0.2, z: 0.5 }, { x: 0.1, y: -0.4, z: -0.1 }, 25, false);
            }
        });

        // PAST: Fashion
        ScrollTrigger.create({
            trigger: sectionsRef.current[3],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PAST_FASHION);
                animateScene({ x: 0, y: 0, z: 1.5 }, { x: -0.1, y: 0, z: 0 }, 0, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PAST_FASHION);
                animateScene({ x: 0, y: 0, z: 1.5 }, { x: -0.1, y: 0, z: 0 }, 0, false);
            }
        });

        // PRESENT: Access
        ScrollTrigger.create({
            trigger: sectionsRef.current[4],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PRESENT_ACCESS);
                animateScene({ x: 0, y: 0, z: 2 }, { x: 0, y: 0, z: 0 }, 0, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PRESENT_ACCESS);
                animateScene({ x: 0, y: 0, z: 2 }, { x: 0, y: 0, z: 0 }, 0, false);
            }
        });

        // PRESENT: Learning
        ScrollTrigger.create({
            trigger: sectionsRef.current[5],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PRESENT_LEARNING);
                animateScene({ x: -1.8, y: 0.1, z: 1.2 }, { x: 0, y: 0.4, z: 0 }, -25, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PRESENT_LEARNING);
                animateScene({ x: -1.8, y: 0.1, z: 1.2 }, { x: 0, y: 0.4, z: 0 }, -25, false);
            }
        });

        // PRESENT: Nav
        ScrollTrigger.create({
            trigger: sectionsRef.current[6],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PRESENT_NAV);
                animateScene({ x: -2, y: -0.5, z: 0 }, { x: 0.2, y: 0.5, z: 0 }, -30, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PRESENT_NAV);
                animateScene({ x: -2, y: -0.5, z: 0 }, { x: 0.2, y: 0.5, z: 0 }, -30, false);
            }
        });

        // PRESENT: Work
        ScrollTrigger.create({
            trigger: sectionsRef.current[7],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.PRESENT_WORK);
                animateScene({ x: 0, y: 0, z: 1.5 }, { x: 0, y: 0, z: 0 }, 0, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.PRESENT_WORK);
                animateScene({ x: 0, y: 0, z: 1.5 }, { x: 0, y: 0, z: 0 }, 0, false);
            }
        });

        // FUTURE: Translate
        ScrollTrigger.create({
            trigger: sectionsRef.current[8],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.FUTURE_TRANSLATE);
                animateScene({ x: 1.5, y: 0, z: 0.5 }, { x: 0, y: -0.8, z: 0.1 }, 20, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.FUTURE_TRANSLATE);
                animateScene({ x: 1.5, y: 0, z: 0.5 }, { x: 0, y: -0.8, z: 0.1 }, 20, false);
            }
        });

        // FUTURE: Health
        ScrollTrigger.create({
            trigger: sectionsRef.current[9],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.FUTURE_HEALTH);
                animateScene({ x: -1.5, y: 0, z: 0.5 }, { x: 0, y: 0.8, z: -0.1 }, -20, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.FUTURE_HEALTH);
                animateScene({ x: -1.5, y: 0, z: 0.5 }, { x: 0, y: 0.8, z: -0.1 }, -20, false);
            }
        });

        // FUTURE: Companion
        ScrollTrigger.create({
            trigger: sectionsRef.current[10],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.FUTURE_COMPANION);
                animateScene({ x: 0, y: 0.2, z: 2.5 }, { x: 0.1, y: 0, z: 0 }, 0, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.FUTURE_COMPANION);
                animateScene({ x: 0, y: 0.2, z: 2.5 }, { x: 0.1, y: 0, z: 0 }, 0, false);
            }
        });

        // BREAKDOWN
        ScrollTrigger.create({
            trigger: sectionsRef.current[11],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.BREAKDOWN);
                animateScene({ x: 0, y: 0, z: 2 }, { x: -0.5, y: 0.5, z: 0.2 }, 0, true);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.BREAKDOWN);
                animateScene({ x: 0, y: 0, z: 2 }, { x: -0.5, y: 0.5, z: 0.2 }, 0, true);
            }
        });

        // CTA
        ScrollTrigger.create({
            trigger: sectionsRef.current[12],
            start: "top bottom",
            onEnter: () => {
                onSceneChange(SceneType.CTA);
                animateScene({ x: 0, y: 0, z: 0.5 }, { x: 0, y: 0, z: 0 }, 0, false);
            },
            onEnterBack: () => {
                onSceneChange(SceneType.CTA);
                animateScene({ x: 0, y: 0, z: 0.5 }, { x: 0, y: 0, z: 0 }, 0, false);
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            idleTl.kill();
        };
    }, [sectionsRef, maskRef, hudContainerRef]);
};
