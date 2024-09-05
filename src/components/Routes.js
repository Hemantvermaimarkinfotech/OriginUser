import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import MainStack from '../navigation/MainStack';
import AuthStack from "../navigation/AuthStack"
import {ActivityIndicator, View} from 'react-native';

const Routes = () => {
  const {userToken} = useContext(AuthContext);

 

  return (
    <NavigationContainer>
      {userToken ? <MainStack /> : <AuthStack />}
      {/* <MainStack /> */}
     
    </NavigationContainer>
  );
};

export default Routes;
