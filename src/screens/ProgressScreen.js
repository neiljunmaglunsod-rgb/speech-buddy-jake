import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarCounter from '../components/StarCounter';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getCategoryWords } from '../data/words';
import { COLORS, FONTS, SHADOW } from '../theme';

// ── Streak calendar ────────────────────────────────────────────────────────────
function StreakCalendar({ streak }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const last28 = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const ds = d.toISOString().split('T')[0];
    return {
      dateStr: ds,
      active:  streak.dates.includes(ds),
      isToday: ds === todayStr,
      dow:     d.getDay(), // 0=Sun
    };
  });

  const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.calendarWrap}>
      <View style={styles.calendarRow}>
        {DAY_LABELS.map((l, i) => (
          <Text key={i} style={styles.dowLabel}>{l}</Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {/* pad start so first dot aligns with correct weekday column */}
        {Array.from({ length: last28[0].dow }, (_, i) => (
          <View key={'pad' + i} style={styles.dayDot} />
        ))}
        {last28.map((day) => (
          <View
            key={day.dateStr}
            style={[
              styles.dayDot,
              day.active  && styles.dayDotActive,
              day.isToday && styles.dayDotToday,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// ── Category progress bar ─────────────────────────────────────────────────────
function CategoryBar({ cat, learned }) {
  const total = getCategoryWords(cat.id).length;
  const pct   = total === 0 ? 0 : Math.min(learned / total, 1);

  return (
    <View style={styles.catBarRow}>
      <Text style={styles.catBarEmoji}>{cat.emoji}</Text>
      <View style={styles.catBarInfo}>
        <View style={styles.catBarTopRow}>
          <Text style={styles.catBarLabel}>{cat.label}</Text>
          <Text style={styles.catBarCount}>
            {learned}/{total} words
          </Text>
        </View>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              { width: `${pct * 100}%`, backgroundColor: cat.color },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ProgressScreen() {
  const { progress, streak, settings } = useApp();
  const childName = settings.childName || 'Jake Adam';

  const totalWords = Object.values(progress.wordsLearned)
    .reduce((sum, arr) => sum + arr.length, 0);

  const recentQuizzes = [...(progress.quizScores || [])]
    .reverse()
    .slice(0, 5);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Progress 📊</Text>
          <Text style={styles.headerSub}>{childName}'s learning journey</Text>
        </View>

        {/* Stars + streak hero */}
        <View style={styles.heroRow}>
          <View style={[styles.heroCard, { backgroundColor: COLORS.lightYellow }]}>
            <StarCounter count={progress.starsTotal} size="large" />
            <Text style={styles.heroCardLabel}>Total Stars</Text>
          </View>
          <View style={styles.heroRight}>
            <View style={[styles.miniCard, { backgroundColor: '#FFE4E1' }]}>
              <Text style={styles.miniCardEmoji}>🔥</Text>
              <Text style={styles.miniCardNum}>{streak.count}</Text>
              <Text style={styles.miniCardLabel}>Day Streak</Text>
            </View>
            <View style={[styles.miniCard, { backgroundColor: COLORS.lightGreen }]}>
              <Text style={styles.miniCardEmoji}>📖</Text>
              <Text style={styles.miniCardNum}>{totalWords}</Text>
              <Text style={styles.miniCardLabel}>Words Learned</Text>
            </View>
          </View>
        </View>

        {/* Streak calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗓️ Activity (last 28 days)</Text>
          <View style={[styles.card, styles.calCard]}>
            <View style={styles.streakRow}>
              <Text style={styles.streakNum}>🔥 {streak.count}-day streak!</Text>
            </View>
            <StreakCalendar streak={streak} />
            <View style={styles.legendRow}>
              <View style={[styles.dayDot, styles.dayDotActive, { marginRight: 4 }]} />
              <Text style={styles.legendText}>Active day</Text>
              <View style={[styles.dayDot, { marginLeft: 12, marginRight: 4 }]} />
              <Text style={styles.legendText}>No activity</Text>
            </View>
          </View>
        </View>

        {/* Words per category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Words Learned</Text>
          <View style={styles.card}>
            {CATEGORIES.map((cat) => (
              <CategoryBar
                key={cat.id}
                cat={cat}
                learned={(progress.wordsLearned[cat.id] || []).length}
              />
            ))}
          </View>
        </View>

        {/* Recent quizzes */}
        {recentQuizzes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌟 Recent Quizzes</Text>
            <View style={styles.card}>
              {recentQuizzes.map((q, i) => (
                <View key={i} style={styles.quizRow}>
                  <Text style={styles.quizDate}>{q.date}</Text>
                  <View style={styles.quizStars}>
                    {Array.from({ length: q.total }, (_, si) => (
                      <Text key={si} style={styles.quizStar}>
                        {si < q.score ? '⭐' : '☆'}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.quizScore}>
                    {q.score}/{q.total}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.offWhite },
  scroll: { paddingHorizontal: 16 },

  header: {
    paddingTop:    20,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 30, fontFamily: FONTS.black,   color: COLORS.darkText },
  headerSub:   { fontSize: 14, fontFamily: FONTS.regular, color: COLORS.lightText, marginTop: 2 },

  heroRow:  { flexDirection: 'row', gap: 12, marginBottom: 20 },
  heroCard: {
    flex:         1,
    borderRadius: 20,
    padding:      16,
    alignItems:   'center',
    ...SHADOW.small,
  },
  heroCardLabel: { fontSize: 14, fontFamily: FONTS.bold, color: COLORS.mediumText, marginTop: 8 },
  heroRight:    { flex: 0.9, gap: 12 },
  miniCard: {
    flex:         1,
    borderRadius: 16,
    alignItems:   'center',
    justifyContent: 'center',
    paddingVertical: 10,
    ...SHADOW.small,
  },
  miniCardEmoji: { fontSize: 28 },
  miniCardNum:   { fontSize: 28, fontFamily: FONTS.black,   color: COLORS.darkText },
  miniCardLabel: { fontSize: 11, fontFamily: FONTS.bold,    color: COLORS.mediumText },

  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontFamily: FONTS.extraBold, color: COLORS.darkText, marginBottom: 10 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius:    18,
    padding:         16,
    ...SHADOW.small,
  },
  calCard: { paddingBottom: 12 },

  streakRow: { marginBottom: 12 },
  streakNum: { fontSize: 18, fontFamily: FONTS.extraBold, color: '#E25822' },

  calendarWrap: {},
  calendarRow:  { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 4 },
  dowLabel:     { width: 34, textAlign: 'center', fontSize: 11, fontFamily: FONTS.bold, color: COLORS.lightText },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-start' },
  dayDot: {
    width:        30,
    height:       30,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray,
    margin:       2,
  },
  dayDotActive: { backgroundColor: COLORS.sunshineYellow },
  dayDotToday:  { borderWidth: 2, borderColor: COLORS.coral },

  legendRow:   { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  legendText:  { fontSize: 12, fontFamily: FONTS.regular, color: COLORS.lightText },

  catBarRow:  { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  catBarEmoji:{ fontSize: 26, marginRight: 10 },
  catBarInfo: { flex: 1 },
  catBarTopRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  catBarLabel:  { fontSize: 15, fontFamily: FONTS.bold,    color: COLORS.darkText },
  catBarCount:  { fontSize: 13, fontFamily: FONTS.regular, color: COLORS.lightText },
  barTrack: {
    height:       10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    overflow:    'hidden',
  },
  barFill: {
    height:       10,
    borderRadius: 5,
  },

  quizRow:   { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  quizDate:  { fontSize: 13, fontFamily: FONTS.regular, color: COLORS.lightText, width: 90 },
  quizStars: { flexDirection: 'row', flex: 1 },
  quizStar:  { fontSize: 16 },
  quizScore: { fontSize: 15, fontFamily: FONTS.extraBold, color: COLORS.darkText, width: 36, textAlign: 'right' },
});
