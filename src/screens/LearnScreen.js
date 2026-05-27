import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WordCard from '../components/WordCard';
import { useApp } from '../context/AppContext';
import { CATEGORIES, getCategoryWords } from '../data/words';
import { useSpeech } from '../hooks/useSpeech';
import { COLORS, FONTS, SHADOW } from '../theme';

export default function LearnScreen() {
  const { settings, learnWord, isWordLearned } = useApp();
  const { speakWord } = useSpeech(settings);
  const [activeCat, setActiveCat] = useState('family');

  const words = getCategoryWords(activeCat);
  const catMeta = CATEGORIES.find((c) => c.id === activeCat);

  const handleWordPress = async (word) => {
    speakWord(word);
    await learnWord(word.id, word.category);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Let's Learn! 📚</Text>
        <Text style={styles.headerSub}>Tap a card to hear the word</Text>
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {CATEGORIES.map((cat) => {
          const active = activeCat === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.tab,
                active
                  ? { backgroundColor: cat.color, borderColor: cat.color }
                  : { backgroundColor: COLORS.white, borderColor: COLORS.lightGray },
              ]}
              onPress={() => setActiveCat(cat.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.tabEmoji}>{cat.emoji}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  { color: active ? COLORS.white : COLORS.mediumText },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Category title strip */}
      <View style={[styles.catStrip, { backgroundColor: catMeta?.bg || COLORS.offWhite }]}>
        <Text style={styles.catStripEmoji}>{catMeta?.emoji}</Text>
        <Text style={[styles.catStripLabel, { color: catMeta?.color }]}>
          {catMeta?.label} ({words.length} words)
        </Text>
      </View>

      {/* Word grid */}
      <FlatList
        key={activeCat}
        data={words}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <WordCard
            word={item}
            language={settings.language}
            onPress={handleWordPress}
            isLearned={isWordLearned(item.id, item.category)}
          />
        )}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.offWhite },

  header: {
    paddingHorizontal: 20,
    paddingTop:        16,
    paddingBottom:     12,
    backgroundColor:   COLORS.white,
    ...SHADOW.small,
  },
  headerTitle: { fontSize: 28, fontFamily: FONTS.black,     color: COLORS.darkText },
  headerSub:   { fontSize: 14, fontFamily: FONTS.regular,   color: COLORS.lightText, marginTop: 2 },

  tabBar:        { maxHeight: 76, backgroundColor: COLORS.white },
  tabBarContent: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  tab: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: 14,
    paddingVertical:   8,
    borderRadius:   20,
    borderWidth:    2,
    marginRight:    2,
    ...SHADOW.small,
  },
  tabEmoji: { fontSize: 18 },
  tabLabel: { fontSize: 13, fontFamily: FONTS.bold, marginLeft: 6 },

  catStrip: {
    flexDirection:  'row',
    alignItems:     'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  catStripEmoji: { fontSize: 22 },
  catStripLabel: { fontSize: 16, fontFamily: FONTS.extraBold, marginLeft: 8 },

  grid: { paddingHorizontal: 10, paddingTop: 10 },
});
