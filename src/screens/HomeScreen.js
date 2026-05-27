import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, FONTS, SHADOW } from '../theme';

// ── Floating decoration ───────────────────────────────────────────────────────
function FloatDot({ emoji, style, delay }) {
  const y = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: -14, duration: 2200, delay, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0,   duration: 2200,         useNativeDriver: true }),
      ]),
    ).start();
  }, []);
  return (
    <Animated.Text style={[styles.floatDot, style, { transform: [{ translateY: y }] }]}>
      {emoji}
    </Animated.Text>
  );
}

// ── Quick-action card ─────────────────────────────────────────────────────────
function ActionCard({ emoji, title, subtitle, color, bg, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, tension: 400 }),
      Animated.spring(scale, { toValue: 1,    useNativeDriver: true, tension: 200 }),
    ]).start();
    onPress();
  };
  return (
    <Animated.View style={{ transform: [{ scale }], flex: 1, margin: 6 }}>
      <TouchableOpacity
        style={[styles.actionCard, { backgroundColor: bg, borderColor: color }]}
        onPress={press}
        activeOpacity={0.85}
      >
        <Text style={styles.actionEmoji}>{emoji}</Text>
        <Text style={[styles.actionTitle, { color }]}>{title}</Text>
        <Text style={styles.actionSub}>{subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const { progress, settings, streak, starsToday } = useApp();

  const childName = settings.childName || 'Jake Adam';

  return (
    <LinearGradient colors={['#87CEEB', '#D4EFFF', '#E8F5FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Floating decorations */}
        <FloatDot emoji="⭐" style={{ top: 60,  left: 28  }} delay={0}    />
        <FloatDot emoji="🌟" style={{ top: 120, right: 40 }} delay={600}  />
        <FloatDot emoji="✨" style={{ top: 200, left: 60  }} delay={1200} />
        <FloatDot emoji="🌈" style={{ top: 80,  right: 80 }} delay={800}  />
        <FloatDot emoji="☀️" style={{ top: 300, right: 30 }} delay={400}  />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero greeting */}
          <View style={styles.hero}>
            <Text style={styles.wave}>👋</Text>
            <Text style={styles.greeting}>Hi {childName}!</Text>
            <Text style={styles.subtitle}>Ready to learn today? 🌟</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: COLORS.lightYellow }]}>
              <Text style={styles.statEmoji}>⭐</Text>
              <Text style={styles.statNumber}>{starsToday}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFE4E1' }]}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statNumber}>{streak.count}</Text>
              <Text style={styles.statLabel}>Day streak</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: COLORS.lightGreen }]}>
              <Text style={styles.statEmoji}>⭐</Text>
              <Text style={styles.statNumber}>{progress.starsTotal}</Text>
              <Text style={styles.statLabel}>Total stars</Text>
            </View>
          </View>

          {/* Quick actions */}
          <Text style={styles.sectionTitle}>Let's go! 🚀</Text>
          <View style={styles.actionsRow}>
            <ActionCard
              emoji="📚"
              title="Learn"
              subtitle="Tap cards, hear words"
              color={COLORS.skyBlue}
              bg={COLORS.lightBlue}
              onPress={() => navigation.navigate('Learn')}
            />
            <ActionCard
              emoji="🌟"
              title="Quiz"
              subtitle="Match emoji to words"
              color={COLORS.coral}
              bg={COLORS.lightCoral}
              onPress={() => navigation.navigate('Quiz')}
            />
          </View>
          <View style={styles.actionsRow}>
            <ActionCard
              emoji="📊"
              title="Progress"
              subtitle="See how far you've come"
              color={COLORS.grassGreen}
              bg={COLORS.lightGreen}
              onPress={() => navigation.navigate('Progress')}
            />
            <ActionCard
              emoji="💡"
              title="Tips"
              subtitle="Parent guide"
              color={COLORS.purple}
              bg={COLORS.lightPurple}
              onPress={() => navigation.navigate('Tips')}
            />
          </View>

          {/* Encouragement */}
          <View style={styles.encourageBox}>
            <Text style={styles.encourageText}>
              {childName} already knows{' '}
              <Text style={styles.boldAccent}>Mama</Text> and{' '}
              <Text style={styles.boldAccent}>Papa</Text>! 🎉{'\n'}
              Keep it up — you're doing amazing!
            </Text>
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe:     { flex: 1 },
  scroll:   { paddingHorizontal: 16, paddingTop: 16 },

  floatDot: {
    position:  'absolute',
    fontSize:  28,
    opacity:   0.55,
    zIndex:    0,
  },

  hero: {
    alignItems:    'center',
    paddingTop:    24,
    paddingBottom: 16,
    zIndex:        1,
  },
  wave:     { fontSize: 52 },
  greeting: {
    fontSize:    42,
    fontFamily:  FONTS.black,
    color:       COLORS.darkText,
    marginTop:   4,
    textAlign:   'center',
  },
  subtitle: {
    fontSize:   20,
    fontFamily: FONTS.bold,
    color:      COLORS.mediumText,
    marginTop:  6,
  },

  statsRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    gap:            8,
  },
  statCard: {
    flex:           1,
    borderRadius:   16,
    paddingVertical: 12,
    alignItems:     'center',
    ...SHADOW.small,
  },
  statEmoji:  { fontSize: 24 },
  statNumber: { fontSize: 28, fontFamily: FONTS.black, color: COLORS.darkText, marginTop: 2 },
  statLabel:  { fontSize: 12, fontFamily: FONTS.bold,  color: COLORS.mediumText },

  sectionTitle: {
    fontSize:     22,
    fontFamily:   FONTS.extraBold,
    color:        COLORS.darkText,
    marginBottom: 8,
    marginTop:    4,
  },
  actionsRow: { flexDirection: 'row', marginBottom: 0 },
  actionCard: {
    borderRadius:  20,
    padding:       18,
    alignItems:    'center',
    borderWidth:   2,
    ...SHADOW.small,
  },
  actionEmoji: { fontSize: 40 },
  actionTitle: { fontSize: 20, fontFamily: FONTS.extraBold, marginTop: 6 },
  actionSub:   { fontSize: 12, fontFamily: FONTS.regular,   color: COLORS.mediumText, textAlign: 'center', marginTop: 2 },

  encourageBox: {
    backgroundColor: COLORS.white,
    borderRadius:    18,
    padding:         18,
    marginTop:       16,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.sunshineYellow,
    ...SHADOW.small,
  },
  encourageText: {
    fontSize:   16,
    fontFamily: FONTS.regular,
    color:      COLORS.darkText,
    lineHeight: 24,
  },
  boldAccent: {
    fontFamily: FONTS.extraBold,
    color:      COLORS.coral,
  },
});
