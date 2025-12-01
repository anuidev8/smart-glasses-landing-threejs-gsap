import React from 'react';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';

export const NavRail: React.FC = () => {
    return (
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
    );
};
