import { Audio } from 'expo-av';
import { useEffect, useRef } from 'react';

export function useSound(enabled = true) {
  const correctRef = useRef(null);
  const wrongRef   = useRef(null);
  const mounted    = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function load() {
      try {
        // Allow audio to play even when the device is in silent mode
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

        const [{ sound: correct }, { sound: wrong }] = await Promise.all([
          Audio.Sound.createAsync(require('../../assets/sounds/correct.wav')),
          Audio.Sound.createAsync(require('../../assets/sounds/wrong.wav')),
        ]);

        if (mounted.current) {
          correctRef.current = correct;
          wrongRef.current   = wrong;
        } else {
          // Component unmounted before load finished — release immediately
          correct.unloadAsync();
          wrong.unloadAsync();
        }
      } catch {
        // Sound files missing or expo-av unavailable — fail silently
      }
    }

    load();

    return () => {
      mounted.current = false;
      correctRef.current?.unloadAsync();
      wrongRef.current?.unloadAsync();
      correctRef.current = null;
      wrongRef.current   = null;
    };
  }, []);

  async function playCorrect() {
    if (!enabled || !correctRef.current) return;
    try { await correctRef.current.replayAsync(); } catch {}
  }

  async function playWrong() {
    if (!enabled || !wrongRef.current) return;
    try { await wrongRef.current.replayAsync(); } catch {}
  }

  return { playCorrect, playWrong };
}
