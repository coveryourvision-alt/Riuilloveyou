
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId, TabId } from './types';
import { soundService } from './services/SoundService';
import PasswordPage from './components/PasswordPage';
import LoveQuestionPage from './components/LoveQuestionPage';
import ProposalPage from './components/ProposalPage';
import ConfirmationPage from './components/ConfirmationPage';
import TeasingPage from './components/TeasingPage';
import MainContentPage from './components/MainContentPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('password');
  const [history, setHistory] = useState<PageId[]>([]);

  const navigateTo = useCallback((page: PageId, pushHistory: boolean = true) => {
    if (pushHistory) {
      setHistory((prev) => [...prev, currentPage]);
    }
    setCurrentPage(page);
    soundService.playTap();
  }, [currentPage]);

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((prevH) => prevH.slice(0, -1));
      setCurrentPage(prev);
      soundService.playTap();
    }
  }, [history]);

  // Handle page transitions
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          {currentPage === 'password' && (
            <PasswordPage onCorrect={() => navigateTo('love-question')} />
          )}
          {currentPage === 'love-question' && (
            <LoveQuestionPage onYes={() => navigateTo('proposal')} />
          )}
          {currentPage === 'proposal' && (
            <ProposalPage 
              onYes={() => navigateTo('confirmation')} 
              onNo={() => navigateTo('teasing')}
              onBack={() => navigateTo('love-question', false)} 
            />
          )}
          {currentPage === 'confirmation' && (
            <ConfirmationPage 
              onNext={() => navigateTo('main')} 
              onBack={() => navigateTo('proposal', false)}
            />
          )}
          {currentPage === 'teasing' && (
            <TeasingPage onBack={() => navigateTo('proposal', false)} />
          )}
          {currentPage === 'main' && (
            <MainContentPage onBack={() => navigateTo('confirmation', false)} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 opacity-10 -z-10 animate-pulse">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 -z-10 animate-bounce">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>
  );
};

export default App;
