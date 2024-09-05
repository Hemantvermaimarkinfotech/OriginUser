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
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import Loader from '../components/Loader';
import {AuthContext} from '../components/AuthProvider';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  console.log("name",name)
  const [surname, setSurName] = useState('');
  console.log("surname",surname)
  const [phoneNumber,setPhoneNumber]=useState('');
  console.log("phone",phoneNumber)
  const [email, setEmail] = useState('');
  console.log("email",email)
  const [age, setAge] = useState('');
  console.log("age",age)

  const genderitems = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];
  

  const [password, setPassword] = useState();
  console.log("password", password);

  const [confirmpassword, setConfirmPassword] = useState('');
  console.log("confimpaswoerd",confirmpassword)
  const {setUserToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  



  const [opengender, setOpenGender] = useState(false);
  const [gendervalue, setGenderValue] = useState('');
  console.log("genderValue",gendervalue)


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

  const handlePasswordChange = text => {
    setPassword(text);
    // Set error message if password is empty
    if (!text.trim()) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }
  };
  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    // Set error message if password is empty
    if (!text.trim()) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }
  };
  const handleContinue = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignup = async () => {
    setLoading(true);
  
    const requestData = {
      first_name: name,
      surname:surname,
      phone:phoneNumber,
      email: email,
      Age:age,
      gender:gendervalue,
      password: password,
      confirm_password: confirmpassword,
    };
  
    try {
      const response = await axios.post(
        'https://staging11.originmattress.com.sg/wp-json/customer/v1/user/signup',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
  
      console.log('SignUp', response?.data);
      setUserToken(response?.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.error);
      alert(error?.response?.data?.code);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title and Logo */}
     
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 20}}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Sign Up</Text>
        </View>


        {/* Email and Password Input */}
        <View style={styles.inputContainer}>
          <View style={{height: 70}}>
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
                placeholder="Full Name"
                onChangeText={text => setName(text)}
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                // onChangeText={handleEmailChange}
              />
            
            </View>
          </View>


          <View style={{height: 70}}>
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
                placeholder="Surname"
                onChangeText={text => setSurName(text)}
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                // onChangeText={handleEmailChange}
              />
            
            </View>
          </View>




          <View style={{height: 70}}>
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
                placeholder="Phone Number"
                onChangeText={text => setPhoneNumber(text)}
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                // onChangeText={handleEmailChange}
              />
            
            </View>
          </View>


          <View style={{height: 70}}>
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
                onChangeText={text => setEmail(text)}
              />
         
            </View>
        
          </View>

          <View style={{height: 70}}>
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
                placeholder="Age"
                onChangeText={text => setAge(text)}
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                // onChangeText={handleEmailChange}
              />
            
            </View>
          </View>


          <DropDownPicker
  open={opengender}
  value={gendervalue}
  items={genderitems}
  setOpen={setOpenGender}
  setValue={setGenderValue}
  placeholder={'Gender'}
  dropDownDirection={'BOTTOM'}
  showTickIcon={false}
  onChangeItem={(item) => {
    console.log('Selected item:', item);
    setGenderValue(item.value);
  }}
  style={styles.firstDropDown}
  arrowIconStyle={styles.placeHolderIcon}
  textStyle={[styles.textStyle, { color: '#23233C' }]} // Change text color for selected item
  dropDownContainerStyle={{ borderColor: '#fff', color: "#23233C" }} // Change border color here
  placeholderStyle={[styles.placeholderStyle, { color: '#23233C' }]} // Change placeholder text color
  scrollViewProps={{
    nestedScrollEnabled: true, // Enable nested scrolling
  }}
/>


    <View style={{height: 70,marginTop:15}}>
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
                placeholder="Password"
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                onChangeText={text => setPassword(text)}
              />
            
            </View>
            {/* {emailError ? <Text style={{ color: 'red', marginLeft: 20,fontSize:13 }}>{emailError}</Text> : null} */}
          </View>

          <View style={{height: 70}}>
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
                placeholder="Confirm Password"
                color={'#23233C'}
                style={{
                  width: '80%',
                  opacity: 0.6,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 12,
                }}
                onChangeText={text => setConfirmPassword(text)}
              />
              <TouchableOpacity></TouchableOpacity>
            </View>
            {/* {emailError ? <Text style={{ color: 'red', marginLeft: 20,fontSize:13 }}>{emailError}</Text> : null} */}
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
            onPress={handleSignup}>
            <Text style={mStyle.buttonText}>SignUp</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.signupLink}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.signupLink, {fontWeight: '700'}]}>
              sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{marginVertical: 10}} />
        {/* Signup and Social Media Buttons */}
      </ScrollView>
      

  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 20,
    // justifyContent: 'center',
    backgroundColor: '#F4F5FA',
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: '10%',
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
    // marginTop: '10%',
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
    color: '#000000',
    fontSize: 16,
    // fontFamily:"Montserrat-Medium",
    marginTop: 10,
  },
  socialButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },

  datePickerText: {
    fontSize: 16,
    // fontFamily: FontName.Regular,
  },


  firstDropDown: {
    zIndex: 2,
    height: 55,
    borderColor:"#fff",
    elevation:20,
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
 


});

export default SignupScreen;
