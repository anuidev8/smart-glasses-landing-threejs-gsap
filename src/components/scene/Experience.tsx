import React, { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { GlassesModel } from '../GlassesModel';
import { SceneType } from '../../types';
import { useSceneAnimation } from '../../hooks/useSceneAnimation';
import * as THREE from 'three';

interface ExperienceProps {
    sectionsRef: React.MutableRefObject<(HTMLElement | null)[]>;
    maskRef: React.RefObject<HTMLDivElement>;
    hudContainerRef: React.RefObject<HTMLDivElement>;
    onSceneChange: (scene: SceneType) => void;
    onWireframeChange: (isWireframe: boolean) => void;
    isWireframe: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({
    sectionsRef,
    maskRef,
    hudContainerRef,
    onSceneChange,
    onWireframeChange,
    isWireframe
}) => {
    const glassesRef = useRef<THREE.Group>(null);

    useSceneAnimation({
        sectionsRef,
        maskRef,
        hudContainerRef,
        glassesRef,
        onSceneChange,
        onWireframeChange
    });

    return <GlassesModel ref={glassesRef} wireframe={isWireframe} />;
};
