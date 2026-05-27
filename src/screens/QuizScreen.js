import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Confetti from '../components/Confetti';
import QuizCard from '../components/QuizCard';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getWordText, WORDS } from '../data/words';
import { useSpeech } from '../hooks/useSpeech';
import { COLORS, FONTS, SHADOW } from '../theme';

const ROUND_SIZE = 5;

function generateQuestions(count = ROUND_SIZE) {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((word) => {
    const others = WORDS.filter((w) => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [word, ...others].sort(() => Math.random() - 0.5);
    return { word, options };
  });
}

// ── Option button ──────────────────────────────────────────────────────────────
function OptionButton({ word, language, status, onPress, disabled }) {
  const shakeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === 'wrong') {
      Animated.sequence([
        Animated.timing(shakeX, { toValue: 10,  duration: 50, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 8,   duration: 50, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 0,   duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [status]);

  const bg =
    status === 'correct' ? '#D4EDDA' :
    status === 'wrong'   ? '#F8D7DA' :
    status === 'reveal'  ? '#D4EDDA' :
    COLORS.white;

  const border =
    status === 'correct' ? COLORS.grassGreen :
    status === 'wrong'   ? COLORS.coral :
    status === 'reveal'  ? COLORS.grassGreen :
    COLORS.lightGray;

  const textColor =
    status === 'correct' ? '#155724' :
    status === 'wrong'   ? '#721C24' :
    status === 'reveal'  ? '#155724' :
    COLORS.darkText;

  return (
    <Animated.View style={{ transform: [{ translateX: shakeX }] }}>
      <TouchableOpacity
        style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}
        onPress={() => !disabled && onPress(word)}
        activeOpacity={disabled ? 1 : 0.75}
        disabled={disabled}
      >
        <Text style={styles.optionEmoji}>{word.emoji}</Text>
        <Text style={[styles.optionText, { color: textColor }]}>
          {getWordText(word, language)}
        </Text>
        {status === 'correct' && <Text style={styles.optionIcon}>✅</Text>}
        {status === 'wrong'   && <Text style={styles.optionIcon}>❌</Text>}
        {status === 'reveal'  && <Text style={styles.optionIcon}>⭐</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Results ────────────────────────────────────────────────────────────────────
function ResultsScreen({ score, total, onPlayAgain, onHome }) {
  const stars   = score * 2;
  const perfect = score === total;
  return (
    <ScrollView contentContainerStyle={styles.results}>
      <Text style={styles.resultEmoji}>{perfect ? '🏆' : score >= 3 ? '🌟' : '😊'}</Text>
      <Text style={styles.resultTitle}>
        {perfect ? 'Perfect!' : score >= 3 ? 'Great job!' : 'Keep going!'}
      </Text>
      <Text style={styles.resultScore}>
        {score} / {total} correct
      </Text>
      <View style={styles.starsEarned}>
        <Text style={styles.starsEarnedText}>⭐ +{stars} stars earned!</Text>
      </View>
      <TouchableOpacity style={styles.playAgainBtn} onPress={onPlayAgain}>
        <Text style={styles.playAgainText}>Play Again 🎮</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeBtn} onPress={onHome}>
        <Text style={styles.homeBtnText}>🏠 Go Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function QuizScreen({ navigation }) {
  const { settings, recordQuiz } = useApp();
  const { speakWord, speakPhrase } = useSpeech(settings);

  const [questions,    setQuestions]    = useState(() => generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score,        setScore]        = useState(0);
  const [selected,     setSelected]     = useState(null);  // selected word id
  const [answered,     setAnswered]     = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResults,  setShowResults]  = useState(false);

  const current = questions[currentIndex];

  const getOptionStatus = (optionWord) => {
    if (!answered) return 'idle';
    if (optionWord.id === current.word.id) return 'correct';
    if (optionWord.id === selected && selected !== current.word.id) return 'wrong';
    return 'idle';
  };

  const handleAnswer = useCallback(
    (optionWord) => {
      if (answered) return;
      setSelected(optionWord.id);
      setAnswered(true);

      const isCorrect = optionWord.id === current.word.id;

      if (isCorrect) {
        setScore((s) => s + 1);
        setShowConfetti(true);
        speakPhrase('Correct! Great job!');
      } else {
        speakWord(current.word);
      }

      setTimeout(() => {
        setShowConfetti(false);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
          setAnswered(false);
        } else {
          const finalScore = isCorrect ? score + 1 : score;
          recordQuiz(finalScore, questions.length);
          setShowResults(true);
        }
      }, 1600);
    },
    [answered, current, currentIndex, questions, score, speakWord, speakPhrase, recordQuiz],
  );

  const handlePlayAgain = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setShowResults(false);
    setShowConfetti(false);
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.safe}>
        <ResultsScreen
          score={score}
          total={questions.length}
          onPlayAgain={handlePlayAgain}
          onHome={() => navigation.navigate('Home')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Confetti visible={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz Time! 🌟</Text>
        <View style={styles.progress}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    i < currentIndex  ? COLORS.sunshineYellow :
                    i === currentIndex ? COLORS.coral :
                    COLORS.lightGray,
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressText}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Category badge */}
        {(() => {
          const cat = CATEGORIES.find((c) => c.id === current.word.category);
          return (
            <View style={[styles.catBadge, { backgroundColor: cat?.bg }]}>
              <Text style={[styles.catBadgeText, { color: cat?.color }]}>
                {cat?.emoji} {cat?.label}
              </Text>
            </View>
          );
        })()}

        {/* Emoji card */}
        <View style={styles.cardWrap}>
          <QuizCard
            word={current.word}
            onPress={(w) => speakWord(w)}
          />
        </View>

        <Text style={styles.question}>What is this?</Text>

        {/* Options */}
        <View style={styles.options}>
          {current.options.map((opt) => (
            <OptionButton
              key={opt.id}
              word={opt}
              language={settings.language}
              status={getOptionStatus(opt)}
              onPress={handleAnswer}
              disabled={answered}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: COLORS.offWhite },
  header:  {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop:        16,
    paddingBottom:     14,
    alignItems:        'center',
    ...SHADOW.small,
  },
  headerTitle:  { fontSize: 26, fontFamily: FONTS.black, color: COLORS.darkText },
  progress:     { flexDirection: 'row', gap: 8, marginTop: 10 },
  progressDot:  { width: 12, height: 12, borderRadius: 6 },
  progressText: { fontSize: 13, fontFamily: FONTS.bold, color: COLORS.lightText, marginTop: 6 },

  content:  {
    paddingHorizontal: 20,
    paddingTop:        20,
    paddingBottom:     40,
    alignItems:        'center',
  },

  catBadge: {
    borderRadius:   20,
    paddingHorizontal: 16,
    paddingVertical:   6,
    marginBottom:   12,
  },
  catBadgeText: { fontSize: 14, fontFamily: FONTS.bold },

  cardWrap: { marginVertical: 12 },

  question: {
    fontSize:     26,
    fontFamily:   FONTS.extraBold,
    color:        COLORS.darkText,
    marginBottom: 20,
    textAlign:    'center',
  },

  options: { width: '100%', gap: 10 },
  optionBtn: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingVertical:  14,
    paddingHorizontal: 20,
    borderRadius:   16,
    borderWidth:    2,
    ...SHADOW.small,
  },
  optionEmoji: { fontSize: 30, marginRight: 14 },
  optionText:  { fontSize: 22, fontFamily: FONTS.extraBold, flex: 1 },
  optionIcon:  { fontSize: 22 },

  // Results
  results: {
    flexGrow:   1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:    32,
    gap:        16,
  },
  resultEmoji: { fontSize: 90 },
  resultTitle: { fontSize: 36, fontFamily: FONTS.black, color: COLORS.darkText, textAlign: 'center' },
  resultScore: { fontSize: 22, fontFamily: FONTS.bold,  color: COLORS.mediumText },
  starsEarned: {
    backgroundColor: COLORS.lightYellow,
    borderRadius:    20,
    paddingHorizontal: 28,
    paddingVertical:  12,
    ...SHADOW.small,
  },
  starsEarnedText: { fontSize: 22, fontFamily: FONTS.extraBold, color: COLORS.darkText },
  playAgainBtn: {
    backgroundColor: COLORS.coral,
    borderRadius:    20,
    paddingHorizontal: 40,
    paddingVertical:   16,
    ...SHADOW.medium,
    width: '100%',
    alignItems: 'center',
  },
  playAgainText: { fontSize: 22, fontFamily: FONTS.black, color: COLORS.white },
  homeBtn: {
    backgroundColor: COLORS.white,
    borderRadius:    20,
    paddingHorizontal: 40,
    paddingVertical:   14,
    borderWidth:    2,
    borderColor:    COLORS.lightGray,
    width:          '100%',
    alignItems:     'center',
  },
  homeBtnText: { fontSize: 18, fontFamily: FONTS.bold, color: COLORS.mediumText },
});
