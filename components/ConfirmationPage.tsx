
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundService } from '../services/SoundService';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const ConfirmationPage: React.FC<Props> = ({ onNext, onBack }) => {
  useEffect(() => {
    soundService.playSuccess();
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 w-full relative text-center">
      <button 
        onClick={onBack}
        className="absolute -top-16 left-0 p-2 text-sm opacity-60 hover:opacity-100"
      >
        ← back
      </button>

      <div className="text-7xl">🌸</div>

      <h1 className="text-3xl font-bold leading-relaxed">
        good girl 💗<br/>now you can proceed
      </h1>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full bg-[#FF4D94] text-white py-5 rounded-3xl text-xl font-bold shadow-lg mt-4"
      >
        next
      </motion.button>
    </div>
  );
};

export default ConfirmationPage;
