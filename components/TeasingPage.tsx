
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { soundService } from '../services/SoundService';

interface Props {
  onBack: () => void;
}

const DEFAULT_TEASE = "https://media.tenor.com/79_uJ_R-2c4AAAAM/cat-gun.gif";

const TeasingPage: React.FC<Props> = ({ onBack }) => {
  const [teaseImage, setTeaseImage] = useState<string>(DEFAULT_TEASE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    soundService.playFaaaa();
    const saved = localStorage.getItem('valentine_tease_image');
    if (saved) {
      setTeaseImage(saved);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setTeaseImage(base64);
        localStorage.setItem('valentine_tease_image', base64);
        soundService.playTap();
      }
    };
    reader.readAsDataURL(file);
  };

  const resetTease = () => {
    setTeaseImage(DEFAULT_TEASE);
    localStorage.removeItem('valentine_tease_image');
    soundService.playTap();
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full relative text-center">
      <button 
        onClick={onBack}
        className="absolute -top-16 left-0 p-2 text-sm opacity-60 hover:opacity-100"
      >
        ← back
      </button>

      <h1 className="text-2xl font-bold">are you sure about that?</h1>
      
      <div className="relative group">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-64 h-64 bg-white p-2 rounded-3xl shadow-xl overflow-hidden ring-4 ring-pink-100"
        >
          <img 
            src={teaseImage} 
            alt="tease" 
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>

        {/* Floating Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-4 -right-4 bg-[#FF4D94] text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform"
          title="change tease photo"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm italic opacity-70">wrong answer, try again 😼</p>
        
        {teaseImage !== DEFAULT_TEASE && (
          <button 
            onClick={resetTease}
            className="text-[10px] font-bold text-pink-300 hover:text-pink-400"
          >
            reset to original meme
          </button>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
};

export default TeasingPage;
