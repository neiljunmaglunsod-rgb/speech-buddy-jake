import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  addQuizScore,
  getStarsToday,
  getStreak,
  loadProgress,
  loadSettings,
  markWordLearned,
  saveSettings,
} from '../utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [progress, setProgress] = useState({
    starsTotal:   0,
    wordsLearned: {},
    quizScores:   [],
    lastActive:   null,
  });
  const [settings, setSettings] = useState({
    childName:  'Jake Adam',
    speechRate: 0.6,
    language:   'english',
  });
  const [streak, setStreak] = useState({ count: 0, dates: [] });
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

  const starsToday = getStarsToday(progress);

  return (
    <AppContext.Provider
      value={{
        progress,
        settings,
        streak,
        loading,
        starsToday,
        learnWord,
        recordQuiz,
        updateSettings,
        isWordLearned,
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
