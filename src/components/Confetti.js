import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const PARTICLE_COLORS = [
  '#FF6B6B', '#FFD700', '#7BC67E', '#87CEEB',
  '#C9B1FF', '#FFA500', '#FF69B4', '#00CED1',
];
const SIZES   = [8, 10, 12, 8, 10, 12];
const COUNT   = 24;

export default function Confetti({ visible, onComplete }) {
  const particles = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      x:       new Animated.Value(0),
      y:       new Animated.Value(0),
      opacity: new Animated.Value(0),
      color:   PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      size:    SIZES[i % SIZES.length],
    })),
  ).current;

  useEffect(() => {
    if (!visible) return;

    const anims = particles.map((p, i) => {
      const angle    = (i / COUNT) * 2 * Math.PI;
      const distance = 110 + Math.random() * 90;
      const dx       = Math.cos(angle) * distance;
      const dy       = Math.sin(angle) * distance - 70; // bias upward

      p.x.setValue(0);
      p.y.setValue(0);
      p.opacity.setValue(1);

      return Animated.parallel([
        Animated.timing(p.x, {
          toValue:  dx,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(p.y, {
          toValue:  dy,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(p.opacity, {
          toValue:  0,
          duration: 900,
          delay:    300,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.parallel(anims).start(() => onComplete?.());
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: p.color,
              width:           p.size,
              height:          p.size,
              borderRadius:    p.size / 2,
              transform:       [{ translateX: p.x }, { translateY: p.y }],
              opacity:         p.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          999,
    pointerEvents:   'none',
  },
  particle: {
    position: 'absolute',
  },
});
