
class SoundService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private beep(freq: number, type: OscillatorType, duration: number, volume: number) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playTap = () => {
    this.beep(800, 'sine', 0.1, 0.1);
  };

  playSuccess = () => {
    this.init();
    setTimeout(() => this.beep(600, 'sine', 0.1, 0.1), 0);
    setTimeout(() => this.beep(800, 'sine', 0.1, 0.1), 100);
    setTimeout(() => this.beep(1000, 'sine', 0.2, 0.1), 200);
  };

  playShake = () => {
    this.beep(150, 'square', 0.1, 0.05);
  };

  playEnvelope = () => {
    // Soft rustle sound
    this.beep(400, 'triangle', 0.3, 0.05);
  };

  playShuffle = () => {
    this.beep(600, 'sine', 0.05, 0.1);
  };

  playFaaaa = () => {
    // Playful humorous slide down
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 1.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.5);
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);
  };
}

export const soundService = new SoundService();
