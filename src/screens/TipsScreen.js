import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SHADOW } from '../theme';

const TIPS = [
  {
    section: '🌟 Jake Adam First',
    color: COLORS.coral,
    bg: COLORS.lightCoral,
    items: [
      { icon: '✅', text: 'He already says "Mama" and "Papa" — reinforce daily. These are his foundation!' },
      { icon: '📋', text: 'Teach next: Lola, Lolo, Ate, Kuya, Water, Rice, Milk (see PLAN.md priority list).' },
      { icon: '⏱️', text: 'Keep sessions 5–10 minutes. End on a word you know he knows — always finish with a win.' },
      { icon: '🔁', text: 'Repeat the same words across multiple days before moving on. Consistency builds memory.' },
    ],
  },
  {
    section: '🗣️ How to Use This App',
    color: COLORS.skyBlue,
    bg: COLORS.lightBlue,
    items: [
      { icon: '📱', text: 'Tap a card → it speaks the word aloud. Encourage Jake to look, listen, then try to say it.' },
      { icon: '🔊', text: 'Play the word multiple times. Tap 3–5 times while pointing at real objects around you.' },
      { icon: '⭐', text: 'Quiz mode gives stars. Celebrate every star loudly — clap, cheer, high-five!' },
      { icon: '🌐', text: 'Try all three languages: English → Filipino → Bisaya. Switching keeps it interesting.' },
    ],
  },
  {
    section: '💡 What Works Best',
    color: COLORS.grassGreen,
    bg: COLORS.lightGreen,
    items: [
      { icon: '👁️', text: 'Show real objects alongside the app. Hold up a banana while the app says "Saging".' },
      { icon: '🎵', text: 'Children with Cri du Chat respond well to music and rhythm. Try singing the words!' },
      { icon: '🤸', text: 'Use gestures — point to your mouth for "Bibig", wave for "Halika". Movement helps memory.' },
      { icon: '🙌', text: 'Never say "Can you say...?" Just model the word naturally. "Look! Banana! Ba-na-na!"' },
      { icon: '😌', text: 'Accept any approximation of a word as a success. "Ma" for "Mama" is excellent progress.' },
    ],
  },
  {
    section: '❤️ Positive Reinforcement',
    color: COLORS.purple,
    bg: COLORS.lightPurple,
    items: [
      { icon: '🎉', text: 'Celebrate EVERY attempt at a word — not just perfect pronunciation.' },
      { icon: '🤗', text: 'Physical affection during learning (hugs, high-fives) helps engagement and trust.' },
      { icon: '😄', text: 'Your enthusiasm is contagious! The more excited you are, the more he wants to participate.' },
      { icon: '🚫', text: 'Never show frustration. If he is tired or disinterested, stop — try again in 30 minutes.' },
    ],
  },
  {
    section: '📖 About Cri du Chat Syndrome',
    color: COLORS.orange,
    bg: COLORS.lightOrange,
    items: [
      { icon: '🧬', text: 'Cri du Chat (5p-) is caused by a partial deletion of chromosome 5. It affects about 1 in 20,000–50,000 births.' },
      { icon: '🗣️', text: 'Speech delay is common but most children DO learn to communicate meaningfully with support and practice.' },
      { icon: '💪', text: 'Jake can walk independently — this motor milestone is a great sign for his overall development!' },
      { icon: '📈', text: 'With early and consistent intervention, children make remarkable progress. You are doing the right thing.' },
      { icon: '🏥', text: 'AAC (Augmentative & Alternative Communication) tools can be used alongside speech therapy. Apps like this one help.' },
      { icon: '🇵🇭', text: 'Speech therapy access in Surigao may be limited — consistent daily home practice is the next best thing and absolutely makes a difference.' },
    ],
  },
  {
    section: '📅 Daily Routine Ideas',
    color: COLORS.teal,
    bg: COLORS.lightTeal,
    items: [
      { icon: '🌅', text: 'Morning: Name 2–3 things at breakfast (Rice, Egg, Milk). Practice Feelings words: Happy, Hungry.' },
      { icon: '☀️', text: 'Midday: Animals during play. Use toy animals or point out real ones. Cat = Pusa, Dog = Aso.' },
      { icon: '🛁', text: 'Bath time: Body parts! Eyes, Nose, Mouth, Hand, Foot. Point and say together.' },
      { icon: '🌙', text: 'Bedtime: Family words while looking at photos. Mama, Papa, Lola, Lolo — reinforce who loves him.' },
    ],
  },
];

export default function TipsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Parent Guide 💡</Text>
          <Text style={styles.headerSub}>
            Tips for helping Jake Adam learn to speak
          </Text>
        </View>

        <View style={styles.madeWithLove}>
          <Text style={styles.loveText}>
            Made with ❤️ by Jake Adam's Papa in Surigao, Philippines.{'\n'}
            You are doing something amazing for your son.
          </Text>
        </View>

        {TIPS.map((section) => (
          <View key={section.section} style={styles.section}>
            <View style={[styles.sectionHeader, { backgroundColor: section.bg, borderLeftColor: section.color }]}>
              <Text style={[styles.sectionTitle, { color: section.color }]}>
                {section.section}
              </Text>
            </View>
            {section.items.map((item, i) => (
              <View key={i} style={styles.tipRow}>
                <Text style={styles.tipIcon}>{item.icon}</Text>
                <Text style={styles.tipText}>{item.text}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🌟 Every word Jake Adam learns is a victory.{'\n'}
            Keep going, Papa. He needs you — and you're here. 🌟
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: COLORS.offWhite },
  scroll: { paddingHorizontal: 16 },

  header: { paddingTop: 20, paddingBottom: 16 },
  headerTitle: { fontSize: 30, fontFamily: FONTS.black,   color: COLORS.darkText },
  headerSub:   { fontSize: 14, fontFamily: FONTS.regular, color: COLORS.lightText, marginTop: 2 },

  madeWithLove: {
    backgroundColor: COLORS.white,
    borderRadius:    16,
    padding:         16,
    marginBottom:    20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.coral,
    ...SHADOW.small,
  },
  loveText: { fontSize: 15, fontFamily: FONTS.bold, color: COLORS.darkText, lineHeight: 22 },

  section:       { marginBottom: 20 },
  sectionHeader: {
    borderRadius:    12,
    padding:         12,
    marginBottom:    8,
    borderLeftWidth: 4,
  },
  sectionTitle: { fontSize: 18, fontFamily: FONTS.extraBold },

  tipRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    backgroundColor: COLORS.white,
    borderRadius:  12,
    padding:       14,
    marginBottom:  6,
    ...SHADOW.small,
  },
  tipIcon: { fontSize: 22, marginRight: 12, marginTop: 1 },
  tipText: { flex: 1, fontSize: 15, fontFamily: FONTS.regular, color: COLORS.darkText, lineHeight: 22 },

  footer: {
    backgroundColor: COLORS.lightYellow,
    borderRadius:    16,
    padding:         20,
    alignItems:      'center',
    marginTop:       8,
    ...SHADOW.small,
  },
  footerText: {
    fontSize:   17,
    fontFamily: FONTS.extraBold,
    color:      COLORS.darkText,
    textAlign:  'center',
    lineHeight: 26,
  },
});
