import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onYes: () => void;
  onNo: () => void;
  onBack: () => void;
}

const ProposalPage: React.FC<Props> = ({ onYes, onNo, onBack }) => {
  return (
    <div className="flex flex-col items-center gap-10 w-full relative">
      <button 
        onClick={onBack}
        className="absolute -top-16 left-0 p-2 text-sm opacity-60 hover:opacity-100"
      >
        ← back
      </button>

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-32 h-32 flex items-center justify-center text-6xl"
      >
        💘
      </motion.div>

      <h1 className="text-3xl font-bold text-center leading-tight">riu, will you be my valentine?</h1>
      
      <div className="flex flex-col gap-3 w-full max-w-[170px]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="w-full bg-[#FF4D94] text-white py-2 rounded-2xl text-sm font-bold shadow-lg"
        >
          yes
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNo}
          className="w-full bg-white text-[#FF4D94] py-2 rounded-2xl text-sm font-bold border-2 border-[#FF4D94] shadow-sm"
        >
          no
        </motion.button>
      </div>
    </div>
  );
};

export default ProposalPage;