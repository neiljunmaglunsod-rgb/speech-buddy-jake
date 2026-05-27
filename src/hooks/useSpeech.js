import { useCallback } from 'react';
import * as Speech from 'expo-speech';

const LANG_CODES = {
  english:  'en-US',
  filipino: 'fil-PH',
  bisaya:   'fil-PH', // closest available — Cebuano TTS not widely supported
};

export function useSpeech(settings = {}) {
  const { speechRate = 0.6, language = 'english' } = settings;

  const speak = useCallback(
    (text, langOverride) => {
      const lang = langOverride || language;
      Speech.stop();
      Speech.speak(text, {
        language: LANG_CODES[lang] || 'en-US',
        rate:     speechRate,
        pitch:    1.1,
      });
    },
    [speechRate, language],
  );

  const speakWord = useCallback(
    (word) => {
      let text = word.english;
      if (language === 'filipino') text = word.filipino;
      if (language === 'bisaya')   text = word.bisaya;
      speak(text);
    },
    [language, speak],
  );

  const speakPhrase = useCallback(
    (phrase) => {
      Speech.stop();
      Speech.speak(phrase, {
        language: LANG_CODES[language] || 'en-US',
        rate:     speechRate,
        pitch:    1.1,
      });
    },
    [speechRate, language],
  );

  const stop = useCallback(() => Speech.stop(), []);

  return { speak, speakWord, speakPhrase, stop };
}
