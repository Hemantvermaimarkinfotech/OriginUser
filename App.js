// app.js
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { Text,StyleSheet,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import Provider from './src/components/Provider';

import { FontName, GLOBAL_FONT_FAMILY } from './src/utils/globalFonts'

const App = () => {

  useEffect(() => {
    // Set the global font family
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.style = FontName;
  }, []);


  return (

    <View style={styles.container}>
    <Provider />
  </View>
    );
  };
  
  export default App;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });

