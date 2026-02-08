
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundService } from '../services/SoundService';

interface Props {
  onCorrect: () => void;
}

const PasswordPage: React.FC<Props> = ({ onCorrect }) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const correctPass = '191019';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPassword(val);
    if (val.length === 6) {
      if (val === correctPass) {
        setIsError(false);
      } else {
        setIsError(true);
        soundService.playShake();
        setTimeout(() => setIsError(false), 500);
      }
    }
  };

  const handleGo = () => {
    if (password === correctPass) {
      onCorrect();
    } else {
      setIsError(true);
      soundService.playShake();
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="text-2xl font-semibold tracking-tight text-center">you should know this</h1>
      
      <motion.div
        animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <input
          type="tel"
          value={password}
          onChange={handleChange}
          placeholder="••••••"
          className="w-full bg-white rounded-3xl p-6 text-center text-3xl tracking-[0.5em] font-bold text-[#FF4D94] shadow-sm outline-none focus:ring-2 ring-[#FF007F] transition-all"
        />
      </motion.div>

      {password.length === 6 && password === correctPass && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleGo}
          className="bg-[#FF4D94] text-white px-12 py-4 rounded-3xl text-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          go
        </motion.button>
      )}
    </div>
  );
};

export default PasswordPage;
