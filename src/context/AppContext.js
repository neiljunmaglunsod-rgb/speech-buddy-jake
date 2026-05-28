import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addQuizScore,
  clearProgress,
  getStarsToday,
  getStreak,
  loadProgress,
  loadSettings,
  markWordLearned,
  saveSettings,
} from '../utils/storage';

const AppContext = createContext(null);

// Maps fontSize setting → numeric multiplier used by components
const FONT_SCALE_MAP = {
  normal: 1.0,
  large:  1.2,
  xlarge: 1.45,
};

const DEFAULT_PROGRESS = {
  starsTotal:   0,
  wordsLearned: {},
  quizScores:   [],
  lastActive:   null,
};

const DEFAULT_STREAK = { count: 0, dates: [] };

export function AppProvider({ children }) {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [settings, setSettings] = useState({
    childName:    'Jake Adam',
    speechRate:   0.6,
    language:     'english',
    soundEnabled: true,
    fontSize:     'normal',
  });
  const [streak,  setStreak]  = useState(DEFAULT_STREAK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [p, s, str] = await Promise.all([
          loadProgress(),
          loadSettings(),
          getStreak(),
        ]);
        setProgress(p);
        setSettings(s);
        setStreak(str);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const learnWord = useCallback(async (wordId, category) => {
    const updated = await markWordLearned(wordId, category);
    setProgress({ ...updated });
  }, []);

  const recordQuiz = useCallback(async (score, total) => {
    const updated = await addQuizScore(score, total);
    setProgress({ ...updated });
  }, []);

  const updateSettings = useCallback(
    async (patch) => {
      const merged = { ...settings, ...patch };
      await saveSettings(merged);
      setSettings(merged);
    },
    [settings],
  );

  const isWordLearned = useCallback(
    (wordId, category) =>
      !!((progress.wordsLearned || {})[category] || []).includes(wordId),
    [progress],
  );

  // Wipes learned words, quiz scores and streak — keeps settings intact
  const resetProgress = useCallback(async () => {
    await clearProgress();
    setProgress({ ...DEFAULT_PROGRESS });
    setStreak({ ...DEFAULT_STREAK });
  }, []);

  const starsToday = getStarsToday(progress);
  const fontScale  = FONT_SCALE_MAP[settings.fontSize] ?? 1.0;

  return (
    <AppContext.Provider
      value={{
        progress,
        settings,
        streak,
        loading,
        starsToday,
        fontScale,
        learnWord,
        recordQuiz,
        updateSettings,
        isWordLearned,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
