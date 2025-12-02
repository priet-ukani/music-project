import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  playAmbient: (regionId: string) => void;
  stopAmbient: () => void;
  playInstrument: (instrumentUrl: string) => void;
  stopAllInstruments: () => void;
  setMasterVolume: (volume: number) => void;
  setAmbientVolume: (volume: number) => void;
  masterVolume: number;
  ambientVolume: number;
  currentAmbient: string | null;
  isAmbientPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Ambient sound mappings for each region
// Using placeholder URLs - replace with actual audio files or external sources
// For development: Using silent audio data URLs as placeholders

const AMBIENT_SOUNDS: Record<string, string> = {
  rajasthan: '/audio/ambient/desert_wind.mp3',
  bengal: '/audio/ambient/river_flowing.mp3',
  kerala: '/audio/ambient/tropical_rain.mp3',
  tamilnadu: '/audio/ambient/temple_bells.mp3',
  punjab: '/audio/ambient/village_ambience.mp3',
  gujarat: '/audio/ambient/coastal_waves.mp3',
  maharashtra: '/audio/ambient/monsoon_rain.mp3',
  telangana: '/audio/ambient/rural_evening.mp3',
  kashmir: '/audio/ambient/mountain_breeze.mp3',
  assam: '/audio/ambient/river_forest.mp3',
  karnataka: '/audio/ambient/temple_courtyard.mp3',
  odisha: '/audio/ambient/beach_waves.mp3',
  uttarpradesh: '/audio/ambient/city_temple.mp3',
};

interface AudioProviderProps {
  children: React.ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [ambientVolume, setAmbientVolume] = useState(0.3);
  const [currentAmbient, setCurrentAmbient] = useState<string | null>(null);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  const ambientSoundRef = useRef<Howl | null>(null);
  const instrumentSoundsRef = useRef<Howl[]>([]);

  useEffect(() => {
    // Update ambient volume when it changes
    if (ambientSoundRef.current) {
      ambientSoundRef.current.volume(ambientVolume * masterVolume);
    }
  }, [ambientVolume, masterVolume]);

  const playAmbient = (regionId: string) => {
    // Stop current ambient if playing
    stopAmbient();

    const ambientUrl = AMBIENT_SOUNDS[regionId];
    if (!ambientUrl) {
      console.warn(`No ambient sound found for region: ${regionId}`);
      return;
    }

    // Create new ambient sound with looping
    const sound = new Howl({
      src: [ambientUrl],
      loop: true,
      volume: ambientVolume * masterVolume,
      onload: () => {
        console.log(`✅ Ambient sound loaded for ${regionId}`);
      },
      onloaderror: (_id, error) => {
        console.error(`❌ Failed to load ambient sound for ${regionId}:`, error);
        setIsAmbientPlaying(false);
      },
      onplay: () => {
        setIsAmbientPlaying(true);
        setCurrentAmbient(regionId);
      },
      onstop: () => {
        setIsAmbientPlaying(false);
        setCurrentAmbient(null);
      },
    });

    ambientSoundRef.current = sound;
    sound.play();
  };

  const stopAmbient = () => {
    if (ambientSoundRef.current) {
      ambientSoundRef.current.stop();
      ambientSoundRef.current.unload();
      ambientSoundRef.current = null;
    }
    setIsAmbientPlaying(false);
    setCurrentAmbient(null);
  };

  const playInstrument = (instrumentUrl: string) => {
    const sound = new Howl({
      src: [instrumentUrl],
      volume: masterVolume,
      onend: () => {
        // Remove from array when finished
        const index = instrumentSoundsRef.current.indexOf(sound);
        if (index > -1) {
          instrumentSoundsRef.current.splice(index, 1);
        }
      },
    });

    instrumentSoundsRef.current.push(sound);
    sound.play();
  };

  const stopAllInstruments = () => {
    instrumentSoundsRef.current.forEach((sound) => {
      sound.stop();
      sound.unload();
    });
    instrumentSoundsRef.current = [];
  };

  const handleSetMasterVolume = (volume: number) => {
    setMasterVolume(volume);
    // Update all active sounds
    if (ambientSoundRef.current) {
      ambientSoundRef.current.volume(ambientVolume * volume);
    }
    instrumentSoundsRef.current.forEach((sound) => {
      sound.volume(volume);
    });
  };

  const handleSetAmbientVolume = (volume: number) => {
    setAmbientVolume(volume);
    if (ambientSoundRef.current) {
      ambientSoundRef.current.volume(volume * masterVolume);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbient();
      stopAllInstruments();
    };
  }, []);

  const value: AudioContextType = {
    playAmbient,
    stopAmbient,
    playInstrument,
    stopAllInstruments,
    setMasterVolume: handleSetMasterVolume,
    setAmbientVolume: handleSetAmbientVolume,
    masterVolume,
    ambientVolume,
    currentAmbient,
    isAmbientPlaying,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export default AudioProvider;
