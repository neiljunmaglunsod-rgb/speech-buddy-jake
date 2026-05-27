import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SHADOW } from '../theme';

export default function QuizCard({ word, onPress }) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  // Entrance bounce every time word changes
  useEffect(() => {
    scaleAnim.setValue(0.5);
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 80,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [word?.id]);

  return (
    <TouchableOpacity onPress={() => onPress?.(word)} activeOpacity={0.9}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.emoji}>{word?.emoji}</Text>
        <Text style={styles.hint}>🔊 Tap to hear</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.large,
    borderWidth: 3,
    borderColor: COLORS.lightBlue,
  },
  emoji: {
    fontSize: 100,
  },
  hint: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: COLORS.skyBlue,
    marginTop: 4,
  },
});
