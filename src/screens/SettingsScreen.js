import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { COLORS, FONTS, SHADOW } from '../theme';

const SPEED_OPTIONS = [
  { id: 'slow',   label: 'Slow',   icon: '🐢', value: 0.4 },
  { id: 'normal', label: 'Normal', icon: '🐸', value: 0.6 },
  { id: 'fast',   label: 'Fast',   icon: '🐇', value: 0.8 },
];

const LANG_OPTIONS = [
  { id: 'english',  label: 'English',  flag: '🇺🇸', note: 'Cat, Dog, Rice…'    },
  { id: 'filipino', label: 'Filipino', flag: '🇵🇭', note: 'Pusa, Aso, Kanin…'  },
  { id: 'bisaya',   label: 'Bisaya',   flag: '🏝️', note: 'Milo, Iro, Kan-on…' },
];

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const { settings, updateSettings } = useApp();
  const { speakWord } = useSpeech(settings);

  const [nameInput, setNameInput] = useState(settings.childName);

  useEffect(() => {
    setNameInput(settings.childName);
  }, [settings.childName]);

  const saveName = async () => {
    const trimmed = nameInput.trim() || 'Jake Adam';
    await updateSettings({ childName: trimmed });
    Keyboard.dismiss();
    Alert.alert('Saved! 🌟', `Name updated to "${trimmed}"`);
  };

  const currentSpeedId =
    SPEED_OPTIONS.find((s) => s.value === settings.speechRate)?.id || 'normal';

  const setSpeed = async (opt) => {
    await updateSettings({ speechRate: opt.value });
    // Demo the new speed
    speakWord({ english: 'Hello', filipino: 'Kumusta', bisaya: 'Kumusta' });
  };

  const setLanguage = async (langId) => {
    await updateSettings({ language: langId });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings ⚙️</Text>
          <Text style={styles.headerSub}>Customize for Jake Adam</Text>
        </View>

        {/* Child name */}
        <Section title="👦 Child Name">
          <View style={styles.nameRow}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Jake Adam"
              placeholderTextColor={COLORS.mediumGray}
              returnKeyType="done"
              onSubmitEditing={saveName}
              maxLength={30}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={saveName}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.hint}>
            This name appears on the home screen greeting.
          </Text>
        </Section>

        {/* Language */}
        <Section title="🌐 Language">
          <Text style={styles.subNote}>
            Words will be spoken and shown in the selected language.
          </Text>
          <View style={styles.optionGrid}>
            {LANG_OPTIONS.map((lang) => {
              const active = settings.language === lang.id;
              return (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    styles.optionBtn,
                    active && styles.optionBtnActive,
                  ]}
                  onPress={() => setLanguage(lang.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionFlag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: active ? COLORS.white : COLORS.darkText },
                    ]}
                  >
                    {lang.label}
                  </Text>
                  <Text
                    style={[
                      styles.optionNote,
                      { color: active ? 'rgba(255,255,255,0.8)' : COLORS.lightText },
                    ]}
                  >
                    {lang.note}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Note: Bisaya uses Filipino pronunciation (Cebuano TTS not yet widely supported).
          </Text>
        </Section>

        {/* Speech speed */}
        <Section title="🔊 Speech Speed">
          <Text style={styles.subNote}>
            Slower speed is recommended for learning. Tap to preview.
          </Text>
          <View style={styles.speedRow}>
            {SPEED_OPTIONS.map((opt) => {
              const active = currentSpeedId === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[
                    styles.speedBtn,
                    active && styles.speedBtnActive,
                  ]}
                  onPress={() => setSpeed(opt)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.speedIcon}>{opt.icon}</Text>
                  <Text
                    style={[
                      styles.speedLabel,
                      { color: active ? COLORS.white : COLORS.darkText },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.hint}>
            Recommended: Slow 🐢 — gives Jake Adam time to hear and repeat each word.
          </Text>
        </Section>

        {/* About */}
        <Section title="ℹ️ About">
          <View style={styles.aboutRow}>
            <Text style={styles.aboutEmoji}>🌟</Text>
            <View style={styles.aboutText}>
              <Text style={styles.aboutTitle}>Speech Buddy</Text>
              <Text style={styles.aboutVersion}>Version 1.0.0</Text>
              <Text style={styles.aboutDesc}>
                Built with love by Jake Adam's Papa in Surigao, Philippines.{'\n'}
                No ads. No data collected. Works offline. 100% safe for children.
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.aboutSmall}>
            🧬 Designed for children with Cri du Chat syndrome.{'\n'}
            📖 50 words across 6 categories: Family, Food, Animals, Body, Actions, Feelings.{'\n'}
            🗣️ 3 languages: English, Filipino (Tagalog), Bisaya (Cebuano).
          </Text>
        </Section>

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

  section:      { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontFamily: FONTS.extraBold, color: COLORS.darkText, marginBottom: 8 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius:    18,
    padding:         16,
    ...SHADOW.small,
  },

  nameRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nameInput: {
    flex:          1,
    fontSize:      20,
    fontFamily:    FONTS.bold,
    color:         COLORS.darkText,
    backgroundColor: COLORS.offWhite,
    borderRadius:  12,
    paddingHorizontal: 14,
    paddingVertical:   10,
    borderWidth:   1,
    borderColor:   COLORS.lightGray,
  },
  saveBtn: {
    backgroundColor: COLORS.coral,
    borderRadius:    12,
    paddingHorizontal: 18,
    paddingVertical:   11,
    ...SHADOW.small,
  },
  saveBtnText: { fontSize: 16, fontFamily: FONTS.extraBold, color: COLORS.white },

  subNote: { fontSize: 13, fontFamily: FONTS.regular, color: COLORS.mediumText, marginBottom: 12 },
  hint:    { fontSize: 12, fontFamily: FONTS.regular, color: COLORS.lightText,  marginTop: 10, lineHeight: 18 },

  optionGrid: { gap: 8 },
  optionBtn: {
    flexDirection: 'row',
    alignItems:    'center',
    borderRadius:  14,
    padding:       14,
    borderWidth:   2,
    borderColor:   COLORS.lightGray,
    backgroundColor: COLORS.offWhite,
  },
  optionBtnActive: {
    backgroundColor: COLORS.skyBlue,
    borderColor:     COLORS.skyBlue,
  },
  optionFlag:  { fontSize: 28, marginRight: 12 },
  optionLabel: { fontSize: 18, fontFamily: FONTS.extraBold },
  optionNote:  { fontSize: 13, fontFamily: FONTS.regular, marginLeft: 8, flex: 1 },

  speedRow: { flexDirection: 'row', gap: 10 },
  speedBtn: {
    flex:           1,
    alignItems:     'center',
    borderRadius:   14,
    paddingVertical: 14,
    borderWidth:    2,
    borderColor:    COLORS.lightGray,
    backgroundColor: COLORS.offWhite,
  },
  speedBtnActive: {
    backgroundColor: COLORS.grassGreen,
    borderColor:     COLORS.grassGreen,
  },
  speedIcon:  { fontSize: 28 },
  speedLabel: { fontSize: 15, fontFamily: FONTS.extraBold, marginTop: 4 },

  aboutRow:    { flexDirection: 'row', alignItems: 'flex-start' },
  aboutEmoji:  { fontSize: 40, marginRight: 14, marginTop: 4 },
  aboutText:   { flex: 1 },
  aboutTitle:  { fontSize: 20, fontFamily: FONTS.black,   color: COLORS.darkText },
  aboutVersion:{ fontSize: 13, fontFamily: FONTS.regular, color: COLORS.lightText },
  aboutDesc:   { fontSize: 14, fontFamily: FONTS.regular, color: COLORS.mediumText, marginTop: 6, lineHeight: 20 },
  divider:     { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 14 },
  aboutSmall:  { fontSize: 13, fontFamily: FONTS.regular, color: COLORS.mediumText, lineHeight: 22 },
});
