import * as Speech from 'expo-speech';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const speak = (text) => {
    Speech.speak(text, { language: 'en-US', rate: 0.6, pitch: 1.1 });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.greeting}>👋 Hi Jake Adam!</Text>
        <Text style={styles.subtitle}>Tap the card to hear the word</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => speak('Cat')}
          activeOpacity={0.8}
        >
          <Text style={styles.emoji}>🐱</Text>
          <Text style={styles.word}>Cat</Text>
          <Text style={styles.tapHint}>🔊 Tap to hear</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: '#87CEEB' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  greeting:  { fontSize: 38, fontWeight: '900', color: '#fff', marginBottom: 6 },
  subtitle:  { fontSize: 16, color: '#fff', marginBottom: 48, opacity: 0.9 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 36,
    alignItems: 'center',
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  emoji:   { fontSize: 90, marginBottom: 12 },
  word:    { fontSize: 36, fontWeight: 'bold', color: '#2D3748', marginBottom: 8 },
  tapHint: { fontSize: 15, color: '#87CEEB', fontWeight: '600' },
});
