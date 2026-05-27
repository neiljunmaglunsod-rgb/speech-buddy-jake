import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, SHADOW } from '../theme';

export default function StarCounter({ count, size = 'medium', label }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevCount  = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.5, useNativeDriver: true, tension: 400, friction: 4 }),
        Animated.spring(scaleAnim, { toValue: 1,   useNativeDriver: true, tension: 200, friction: 7 }),
      ]).start();
      prevCount.current = count;
    }
  }, [count]);

  const s = size === 'large' ? large : medium;

  return (
    <Animated.View style={[s.container, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={s.star}>⭐</Text>
      <Text style={s.count}>{count}</Text>
      {label && <Text style={s.label}>{label}</Text>}
    </Animated.View>
  );
}

const medium = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightYellow,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    ...SHADOW.small,
  },
  star:  { fontSize: 22 },
  count: { fontSize: 22, fontFamily: FONTS.extraBold, color: COLORS.darkText, marginLeft: 4 },
  label: { fontSize: 13, fontFamily: FONTS.regular, color: COLORS.mediumText, marginLeft: 4 },
});

const large = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightYellow,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 28,
    ...SHADOW.medium,
  },
  star:  { fontSize: 48 },
  count: { fontSize: 56, fontFamily: FONTS.black, color: COLORS.darkText, marginLeft: 8 },
  label: { fontSize: 16, fontFamily: FONTS.bold, color: COLORS.mediumText, marginLeft: 8 },
});
