import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNav />
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;
