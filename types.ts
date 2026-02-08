
export type PageId = 'password' | 'love-question' | 'proposal' | 'confirmation' | 'teasing' | 'main';
export type TabId = 'message' | 'gallery' | 'video';

export interface SoundEffects {
  playTap: () => void;
  playSuccess: () => void;
  playShake: () => void;
  playEnvelope: () => void;
  playShuffle: () => void;
  playFaaaa: () => void;
}
