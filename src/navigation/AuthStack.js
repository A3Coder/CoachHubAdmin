import { View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import StartingPageScreen from '../screens/StartingPageScreen/StartingPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (

    <Stack.Navigator initialRouteName='StartingPage' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='StartingPage'>
        {() => (
          <View style={{ flex: 1 }}>
            <StartingPageScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name='SignIn'>
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <SignInScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name='ForgotPassword'
        options={{
          headerShown: true,
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#4477BB'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ForgotPasswordScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name='NewPassword'>
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <NewPasswordScreen />
          </View>
        )}
      </Stack.Screen>


    </Stack.Navigator>

  );
}

export default AuthStack;
