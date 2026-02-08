import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onYes: () => void;
}

const LoveQuestionPage: React.FC<Props> = ({ onYes }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const handleNoInteraction = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 300;
    setNoPos({ x: randomX, y: randomY });
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <h1 className="text-2xl font-semibold text-center leading-relaxed">let’s start simple…<br/>do you love me?</h1>
      
      <div className="flex flex-col gap-3 w-full relative max-w-[170px]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYes}
          className="w-full bg-[#FF4D94] text-white py-2 rounded-2xl text-sm font-bold shadow-lg"
        >
          yes
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          onMouseEnter={handleNoInteraction}
          onTouchStart={handleNoInteraction}
          className="w-full bg-white text-[#FF4D94] py-2 rounded-2xl text-sm font-bold border-2 border-[#FF4D94] shadow-sm z-10"
        >
          no
        </motion.button>
      </div>
    </div>
  );
};

export default LoveQuestionPage;