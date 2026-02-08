import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundService } from '../services/SoundService';

const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    soundService.playEnvelope();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            onClick={toggleEnvelope}
            className="cursor-pointer group flex flex-col items-center gap-4"
          >
            <div className="w-56 h-36 bg-pink-100 rounded-2xl relative shadow-lg overflow-hidden flex items-center justify-center border-4 border-white transition-transform group-active:scale-95">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-200 clip-path-envelope-flap" />
              <span className="text-4xl">✉️</span>
            </div>
            <p className="font-bold text-pink-400">to my homie</p>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full h-full flex flex-col"
          >
            <div className="flex justify-end mb-2">
              <button onClick={toggleEnvelope} className="text-pink-200 text-xs">close letter</button>
            </div>
            <div className="paper-texture flex-1 rounded-2xl p-6 shadow-md border-t-8 border-pink-400 overflow-y-auto no-scrollbar relative">
              <div className="flex flex-col gap-4 text-pink-800 leading-relaxed text-sm italic">
                <p className="text-lg not-italic font-bold text-pink-500 mb-2">to my homie,</p>
                <p>
                  i just wanted to write this little note to tell you how much you mean to me. from the laughs to the quiet moments, being with you is the highlight of every single day.
                </p>
                <p>
                  you're more than just my partner; you're my best friend, my rock, and my absolute favorite person in this whole world. 
                </p>
                <p>
                  thanks for being you. i'm the luckiest person to have you by my side.
                </p>
                <p className="mt-4 text-right not-italic font-bold text-pink-500">with all my love, <br/>from your homie 💗</p>
              </div>
              <div className="absolute bottom-4 right-4 text-3xl opacity-20 rotate-12">💖</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;