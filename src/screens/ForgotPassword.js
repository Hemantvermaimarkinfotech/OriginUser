// src/screens/LoginScreen.js
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import Loader from '../components/Loader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');

const [data,setdata]=useState()

  const handleEmailChange = text => {
    setEmail(text);
    // Validate email using regular expression
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
    // Set error message if email is invalid
    if (!text.trim()) {
      setEmailError('Please enter your email.');
    } else if (!isValidEmail) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const handleForgotPassword = async () => {
    let valid = true;
  
    if (!email.trim()) {
      setEmailError('Please enter your email.');
      valid = false;
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }
  
    if (!valid) {
      return;
    }
  
    setLoading(true);
  
    const Data = JSON.stringify({
      email: email,
    });
  
    try {
      const response = await axios.post(
        'https://staging11.originmattress.com.sg/wp-json/customer/v1/user/reset-password',
        Data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
  
      console.log('Forgot response:', response.data);
  
      if (response.data && response.data.token) {
        setdata(response.data);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        setLoading(false);
        navigation.navigate('Login');
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Error response data:', error.response?.data?.data?.errors?.email);
        Alert.alert(error.response?.data?.data?.errors?.email)
      } 
   
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Title and Logo */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Forgot password</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={ImagePaths.logoImage}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Email and Password Input */}
      <View style={styles.inputContainer}>
        <View style={{height: 90}}>
         
          <View
            style={[
              mStyle.input,
              styles.shadow,
              {
                backgroundColor: colors.white,
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              },
            ]}>
            <TextInput
              placeholderTextColor={'#23233C'}
              placeholder="Email"
              color={'#23233C'}
              style={{
                width: '80%',
                opacity: 0.6,
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 12,
              }}
              onChangeText={handleEmailChange}
            />
            <TouchableOpacity>
              {isEmailValid ? (
                <AntDesign name="checkcircle" size={20} color="#6CC57C" />
              ) : null}
            </TouchableOpacity>
          </View>
          {emailError ? (
            <Text style={{color: 'red', marginLeft: 20, fontSize: 13}}>
              {emailError}
            </Text>
          ) : null}
        </View>

        

        <View style={{marginVertical: 10}} />
      </View>

      <View style={{marginVertical: '3%'}} />
      {/* Submit Button */}
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity
          style={[mStyle.button, styles.shadow]}
          onPress={() => handleForgotPassword()}
          >
          <Text style={mStyle.buttonText}>Send Code</Text>
        </TouchableOpacity>
       

       
      )}

      <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row",marginTop:20}}>
        <Text style={{color:"#23233C",fontFamily:"Montserrat-Medium",fontSize:15}}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <Text style={{color:"#30B0C9",fontFamily:"Montserrat-Bold",fontSize:15,marginLeft:5}}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    // justifyContent: 'center',
    backgroundColor: '#F4F5FA',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '25%',
  },
  logoContainer: {
    alignItems: 'center',
    width: 220,
    height: 55,
    alignSelf: 'center',
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: colors.secondary,
    fontFamily: 'Montserrat-Bold',
  },
  logo: {
    width: 220,
    height: 55,
  },
  inputContainer: {
    marginTop: '20%',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  forgotPassword: {
    marginTop: 2,
    textAlign: 'right',
    color: colors.black,
    fontWeight: '500',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signupLink: {
    color: '#007bff',
  },
  socialButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
