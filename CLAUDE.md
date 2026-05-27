# Speech Buddy — Jake Adam's App

## About This Project
A speech therapy mobile app built for JAKE ADAM, a child with Cri du Chat syndrome.
His papa is building this because speech therapists are scarce and expensive in Surigao, Philippines.

## Jake Adam's Current Progress
- Can walk independently
- Can say "Mama" and "Papa"
- Age group: young child with developmental delay

## Goals of the App
- Help Jake Adam learn and practice common words
- Use pictures + audio so he can hear and repeat words
- Keep it simple, colorful, and fun — one word at a time
- Works OFFLINE (no internet needed in Surigao)
- No ads, no data collection, child-safe

## Language
- English words with Filipino (Tagalog) and Bisaya translations
- Example: Dog = Aso (Filipino) = Iro (Bisaya)

## Design Rules
- Very large buttons and text (easy for small hands)
- Bright cheerful colors: sky blue, yellow, green, coral
- Rounded fonts, no clutter
- Always greet: "Hi Jake Adam!" on home screen

## Tech Stack
- React Native + Expo
- expo-speech for text-to-speech
- AsyncStorage for saving progress offline
- React Navigation (bottom tabs)

## Folder Structure
/src
  /screens
  /components
  /data
  /hooks
  /utils

## Important Notes
- Always test that audio/speech works on Android
- Keep sessions short — 5 to 10 minutes ideal
- Positive reinforcement on every correct answer (stars, confetti)
- This app is made with love by Jake Adam's papa in Surigao