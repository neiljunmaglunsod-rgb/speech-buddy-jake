import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PROGRESS: 'sb_progress',
  SETTINGS: 'sb_settings',
  STREAK:   'sb_streak',
};

const DEFAULT_PROGRESS = {
  starsTotal:   0,
  wordsLearned: {},   // { [category]: string[] }
  quizScores:   [],   // { score, total, date }[]
  lastActive:   null,
};

const DEFAULT_SETTINGS = {
  childName:  'Jake Adam',
  speechRate: 0.6,
  language:   'english', // 'english' | 'filipino' | 'bisaya'
};

const DEFAULT_STREAK = {
  count: 0,
  dates: [], // ISO date strings, last 30
};

// ── Progress ──────────────────────────────────────────────────────────────────

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PROGRESS);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      // Guard against null/non-object stored values that would crash Object.values()
      wordsLearned:
        parsed.wordsLearned &&
        typeof parsed.wordsLearned === 'object' &&
        !Array.isArray(parsed.wordsLearned)
          ? parsed.wordsLearned
          : {},
      quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
      starsTotal: typeof parsed.starsTotal === 'number' ? parsed.starsTotal : 0,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  } catch {}
}

export async function markWordLearned(wordId, category) {
  const progress = await loadProgress();
  if (!progress.wordsLearned[category]) {
    progress.wordsLearned[category] = [];
  }
  if (!progress.wordsLearned[category].includes(wordId)) {
    progress.wordsLearned[category].push(wordId);
    progress.starsTotal += 1;
  }
  progress.lastActive = today();
  await saveProgress(progress);
  return progress;
}

export async function addQuizScore(score, total) {
  const progress = await loadProgress();
  progress.quizScores.push({ score, total, date: today() });
  if (progress.quizScores.length > 100) {
    progress.quizScores = progress.quizScores.slice(-100);
  }
  progress.starsTotal += score * 2;
  progress.lastActive = today();
  await saveProgress(progress);
  return progress;
}

// ── Settings ──────────────────────────────────────────────────────────────────

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch {}
}

// ── Streak ────────────────────────────────────────────────────────────────────

export async function getStreak() {
  try {
    const raw  = await AsyncStorage.getItem(KEYS.STREAK);
    const streak = raw ? { ...DEFAULT_STREAK, ...JSON.parse(raw) } : { ...DEFAULT_STREAK };

    const todayStr     = today();
    const yesterdayStr = yesterday();

    if (!streak.dates.includes(todayStr)) {
      if (streak.dates.includes(yesterdayStr)) {
        streak.count += 1;
      } else if (streak.dates.length > 0) {
        streak.count = 1;
      } else {
        streak.count = 1;
      }
      streak.dates.push(todayStr);
      if (streak.dates.length > 30) {
        streak.dates = streak.dates.slice(-30);
      }
      await AsyncStorage.setItem(KEYS.STREAK, JSON.stringify(streak));
    }

    return streak;
  } catch {
    return { ...DEFAULT_STREAK };
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0];
}

function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function getStarsToday(progress) {
  const t = today();
  return (progress.quizScores || [])
    .filter((s) => s.date === t)
    .reduce((sum, s) => sum + s.score * 2, 0);
}

export function getWordsLearnedCount(progress, categoryId) {
  return (progress.wordsLearned[categoryId] || []).length;
}
