import { 
  Glasses, ArrowRight,
  Home, History, ScanEye, Cpu,
  Activity, Layers, Sparkles, ChevronRight,
  Search, PlusSquare, Heart, User,
  LucideIcon
} from 'lucide-react';
import { SceneType } from '../types';

// --- ASSETS ---
export const SCENE_IMAGES: Record<SceneType, string> = {
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

export interface SceneContentData {
    label: string; 
    title: string; 
    description: string; 
    align: 'left' | 'center' | 'right';
    icon: LucideIcon;
}

// --- FEATURE CONTENT DATA ---
export const SCENE_CONTENT: Record<SceneType, SceneContentData> = {
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
