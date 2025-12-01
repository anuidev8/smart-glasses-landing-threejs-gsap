import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

export const MobileBlocker: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
            const isSmallScreen = window.innerWidth < 1024; // Less than lg breakpoint

            setIsMobile(isMobileDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isMobile) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="max-w-md text-center">
                {/* Icon Animation */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-blue-500/10 rounded-full animate-pulse" />
                    </div>
                    <div className="relative flex items-center justify-center gap-4">
                        <Smartphone
                            size={48}
                            className="text-gray-600 animate-bounce"
                            style={{ animationDelay: '0s' }}
                        />
                        <div className="text-gray-600 text-2xl">→</div>
                        <Monitor
                            size={48}
                            className="text-[#00f0ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                        />
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                    Experiencia de Escritorio
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                    Esta experiencia 3D inmersiva está optimizada para pantallas grandes.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    Por favor, visita este sitio desde una computadora de escritorio o laptop para disfrutar de la experiencia completa.
                </p>

                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400 font-mono">Powered by Three.js + GSAP</span>
                </div>
            </div>
        </div>
    );
};
