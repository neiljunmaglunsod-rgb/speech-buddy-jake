import React, { useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { getWordText } from '../data/words';
import { COLORS, FONTS, SHADOW } from '../theme';

export default function WordCard({ word, language, onPress, isLearned }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { fontScale } = useApp();

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.88,
        useNativeDriver: true,
        tension: 400,
        friction: 5,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        useNativeDriver: true,
        tension: 200,
        friction: 5,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 7,
      }),
    ]).start();

    onPress?.(word);
  };

  const displayWord = getWordText(word, language);
  const subWord =
    language !== 'english' ? word.english : null;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1, margin: 6 }}>
      <TouchableOpacity
        style={[styles.card, isLearned && styles.learnedCard]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        {isLearned && <Text style={styles.starBadge}>⭐</Text>}
        <Text style={styles.emoji}>{word.emoji}</Text>
        <Text
          style={[styles.wordText, { fontSize: 22 * fontScale }]}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {displayWord}
        </Text>
        {subWord && (
          <Text style={[styles.subText, { fontSize: 13 * fontScale }]} numberOfLines={1}>
            {subWord}
          </Text>
        )}
        <View style={styles.tapHint}>
          <Text style={styles.tapHintText}>🔊 Tap</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    ...SHADOW.medium,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  learnedCard: {
    borderColor: COLORS.sunshineYellow,
    backgroundColor: COLORS.lightYellow,
  },
  starBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 16,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 6,
  },
  wordText: {
    // fontSize set inline with fontScale
    fontFamily: FONTS.extraBold,
    color: COLORS.darkText,
    textAlign: 'center',
  },
  subText: {
    // fontSize set inline with fontScale
    fontFamily: FONTS.regular,
    color: COLORS.lightText,
    marginTop: 2,
    textAlign: 'center',
  },
  tapHint: {
    marginTop: 6,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tapHintText: {
    fontSize: 11,
    fontFamily: FONTS.bold,
    color: COLORS.skyBlue,
  },
});
