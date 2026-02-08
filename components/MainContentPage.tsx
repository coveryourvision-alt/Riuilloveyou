
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabId } from '../types';
import { soundService } from '../services/SoundService';
import Envelope from './Envelope';
import Gallery from './Gallery';

interface Props {
  onBack: () => void;
}

const MainContentPage: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabId>('message');

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    soundService.playTap();
  };

  return (
    <div className="flex flex-col h-full w-full max-h-[80vh] bg-white rounded-[40px] shadow-2xl relative overflow-hidden border-4 border-[#FFF0F5]">
      {/* Top Header */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="text-pink-300">←</button>
        <span className="font-bold text-pink-400">valentine '25</span>
        <div className="w-6" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'message' && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              <Envelope />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full"
            >
              <Gallery />
            </motion.div>
          )}

          {activeTab === 'video' && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col gap-4"
            >
              <div className="aspect-video bg-pink-50 rounded-3xl shadow-inner flex items-center justify-center overflow-hidden border-2 border-pink-100 relative group">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Standard placeholder, user can replace
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 pointer-events-none group-active:bg-pink-400/10 transition-colors"></div>
              </div>
              <p className="text-center text-sm text-pink-300 px-4">our favorite tune 🎶</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tabs */}
      <div className="bg-[#FFF0F5] p-3 flex justify-around items-center border-t border-pink-100">
        <TabButton 
          active={activeTab === 'message'} 
          onClick={() => handleTabChange('message')}
          icon="✉️"
          label="message"
        />
        <TabButton 
          active={activeTab === 'gallery'} 
          onClick={() => handleTabChange('gallery')}
          icon="🖼️"
          label="gallery"
        />
        <TabButton 
          active={activeTab === 'video'} 
          onClick={() => handleTabChange('video')}
          icon="🎥"
          label="video"
        />
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all ${active ? 'bg-white shadow-sm' : 'opacity-50'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default MainContentPage;
