import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundService } from '../services/SoundService';

const DEFAULT_IMAGES = [
  'https://picsum.photos/seed/love1/400/500',
  'https://picsum.photos/seed/love2/400/500',
  'https://picsum.photos/seed/love3/400/500',
  'https://picsum.photos/seed/love4/400/500',
  'https://picsum.photos/seed/love5/400/500',
  'https://picsum.photos/seed/love6/400/500',
];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('valentine_gallery');
    if (saved) {
      try {
        setImages(JSON.parse(saved));
      } catch (e) {
        setImages(DEFAULT_IMAGES);
      }
    } else {
      setImages(DEFAULT_IMAGES);
    }
  }, []);

  // Save images to localStorage when updated
  const saveImages = (newImages: string[]) => {
    setImages(newImages);
    localStorage.setItem('valentine_gallery', JSON.stringify(newImages));
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev + 1) % images.length);
    soundService.playShuffle();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [...images];
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          // If we reach 6, start replacing or just stop? Let's allow up to 6.
          if (newImages.length < 6) {
            newImages.push(base64);
          } else {
            // Replace current index if full
            newImages[index] = base64;
          }
          saveImages([...newImages]);
        }
      };
      // Fixed: Cast 'file' to Blob to resolve "unknown" type inference error
      reader.readAsDataURL(file as Blob);
    });
  };

  const resetGallery = () => {
    if (window.confirm('reset to original photos?')) {
      saveImages(DEFAULT_IMAGES);
      setIndex(0);
      soundService.playTap();
    }
  };

  const clearGallery = () => {
    if (window.confirm('clear all photos?')) {
      saveImages([]);
      setIndex(0);
      soundService.playTap();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/*" 
        multiple 
        className="hidden" 
      />

      <div className="relative w-full aspect-[4/5] perspective-1000">
        <AnimatePresence mode="popLayout">
          {images.length > 0 ? (
            <motion.div
              key={index + (images[index]?.substring(0, 20) || '')}
              initial={{ x: 300, rotate: 10, opacity: 0 }}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              exit={{ x: -300, rotate: -10, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onClick={nextImage}
              className="absolute inset-0 bg-white p-2 rounded-3xl shadow-xl cursor-pointer ring-4 ring-[#FFF0F5]"
            >
              <img 
                src={images[index]} 
                alt="gallery memory" 
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap">
                tap to shuffle ✨
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-pink-50 rounded-3xl border-4 border-dashed border-pink-200 flex flex-col items-center justify-center gap-4 p-8 text-center"
            >
              <span className="text-4xl">📸</span>
              <p className="text-sm text-pink-300">no photos yet! upload your favorite memories.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-pink-400 text-white px-6 py-2 rounded-full text-xs font-bold"
              >
                upload photos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Gallery Controls */}
      <div className="w-full flex flex-col gap-4 mt-2">
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-pink-400 w-4' : 'bg-pink-100'}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center px-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] font-bold text-pink-400 bg-pink-50 px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
          >
            {images.length >= 6 ? 'replace photo' : '+ add photo'}
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={resetGallery}
              className="text-[10px] font-bold text-pink-300 hover:text-pink-400"
            >
              reset
            </button>
            <button 
              onClick={clearGallery}
              className="text-[10px] font-bold text-pink-300 hover:text-pink-400"
            >
              clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;