import 'react-native-gesture-handler';
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from '@expo-google-fonts/nunito';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import QuizScreen from './src/screens/QuizScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import TipsScreen from './src/screens/TipsScreen';
import { COLORS, FONTS } from './src/theme';

// Prevent the splash screen from auto-hiding before fonts are ready.
// The .catch prevents an unhandled rejection if called too late.
SplashScreen.preventAutoHideAsync().catch(() => {});

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: '#F8F9FA' }}>
          <Text style={{ fontSize: 48 }}>😅</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2D3748', marginTop: 16, textAlign: 'center' }}>
            Oops! Something went wrong.
          </Text>
          <Text style={{ fontSize: 14, color: '#718096', marginTop: 8, textAlign: 'center' }}>
            {__DEV__ ? String(this.state.error) : 'Please close and reopen the app.'}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
  Home:     { emoji: '🏠', label: 'Home'     },
  Learn:    { emoji: '📚', label: 'Learn'    },
  Quiz:     { emoji: '🌟', label: 'Quiz'     },
  Progress: { emoji: '📊', label: 'Progress' },
  Tips:     { emoji: '💡', label: 'Tips'     },
  Settings: { emoji: '⚙️', label: 'Settings' },
};

function TabIcon({ emoji, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: focused ? 26 : 22, opacity: focused ? 1 : 0.6, lineHeight: 30 }}>
        {emoji}
      </Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  // Hide the splash screen as soon as fonts are ready OR if they fail.
  // This guarantees hideAsync() is always called — the app never stays
  // stuck behind the splash screen regardless of network conditions.
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  // KEY FIX: render the app immediately without blocking.
  // The splash screen is still visible while fonts load (usually < 1 second
  // since the TTF files are bundled locally). Once hideAsync() is called
  // above, the app appears with Nunito loaded. If fonts fail, the app still
  // appears using system fonts as a silent fallback — no crash.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <TabIcon
                    emoji={TAB_CONFIG[route.name].emoji}
                    focused={focused}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontSize:     10,
                      fontFamily:   FONTS.bold,
                      color:        focused ? COLORS.coral : COLORS.mediumGray,
                      marginBottom: 2,
                    }}
                  >
                    {TAB_CONFIG[route.name].label}
                  </Text>
                ),
                tabBarStyle: {
                  backgroundColor: COLORS.white,
                  borderTopWidth:  0,
                  elevation:       12,
                  shadowColor:     '#000',
                  shadowOffset:    { width: 0, height: -3 },
                  shadowOpacity:   0.08,
                  shadowRadius:    8,
                  height:          68,
                  paddingTop:      6,
                  paddingBottom:   8,
                },
                headerShown: false,
              })}
            >
              <Tab.Screen name="Home"     component={HomeScreen}     />
              <Tab.Screen name="Learn"    component={LearnScreen}    />
              <Tab.Screen name="Quiz"     component={QuizScreen}     />
              <Tab.Screen name="Progress" component={ProgressScreen} />
              <Tab.Screen name="Tips"     component={TipsScreen}     />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
