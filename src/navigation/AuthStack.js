// src/navigation/MainStack.js
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/Splash';
import GetStartedScreen from '../screens/GetStarted';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import ForgotPasswordScreen from '../screens/ForgotPassword';

const Stack = createStackNavigator();

const AuthStack= () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {backgroundColor: '#30B0C9'}, // Set your desired header background color
        headerTintColor: 'white', // Set the text color in the header
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{headerShown: false}}
      />
         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack
