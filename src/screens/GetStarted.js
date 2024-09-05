import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import mStyle from '../../AppStyles';
import colors from '../utils/Colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to Origin App',
    description: 'Explore the amazing features of your app with these quick slides.',
  },
  {
    title: 'It’s Time To Upgrade Your Sleep',
    description: 'Find interesting content and enjoy a personalized experience.',
  },
  {
    title: 'Get Started Now',
    description: 'Join millions of users who already love our app.',
  },
];

const GetStartedScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleContinue = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.replace('Login'); // Navigate to the login screen when slides end
    }
  };

  return (    
    <View style={styles.container}>
      <Image
        source={require('../assets/images/getStarted.png')}
        style={styles.image}
        resizeMode="cover"
      />

      <Swiper
        showsButtons={false}
        loop={false} // Disable looping to prevent looping back to the first slide after the last one
        index={activeIndex}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={[styles.dot, styles.activeDot]} />}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.slideContent}>
              <Text style={styles.title}>{slide.title}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity style={[mStyle.button, styles.button]} onPress={handleContinue}>
        <Text style={mStyle.buttonText}>
          {activeIndex === slides.length - 1 ? 'Log In' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
    position: 'absolute',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.2, // Adjust top padding based on screen height
  },
  slideContent: {
    alignItems: 'center',
    // paddingHorizontal: 20,
    position: 'absolute',
    bottom: height * 0.20, 
    width:"90%"
  },
  title: {
    fontSize: 30, // Adjust font size based on screen width
    marginBottom: 12,
    textAlign: 'center',
    color: "#000000",
    fontFamily:"Montserrat-Bold"// Ensure text color contrasts with the background
  },
  dot: {
    backgroundColor: colors.white,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    position: 'relative',
    bottom: height * 0.13, 
   
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  button: {
    position: 'absolute',
    bottom: height * 0.05, // Adjust button position based on screen height
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    width:150
  },
});

export default GetStartedScreen;
