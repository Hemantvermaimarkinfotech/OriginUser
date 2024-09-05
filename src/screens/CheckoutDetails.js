// src/screens/HomeScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

import colors from '../utils/Colors';
import {BackIcon, ShopBag} from '../utils/IconPaths';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorMessages} from '../utils/HelperFile';
import CreateUserInput from '../components/CreateUserInput';
import {scale} from '../utils/Scale';
import {FontName} from '../utils/globalFonts';
import CommonHeader from '../components/CommonHeader';

const CheckoutDetailScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');

  const validateForm = () => {
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      companyName.trim() === '' ||
      country.trim() === '' ||
      streetAddress.trim() === '' ||
      city.trim() === '' ||
      zipcode.trim() === '' ||
      phone.trim() === '' ||
      email.trim() === ''
    ) {
      Alert.alert(ErrorMessages.Error, ErrorMessages.FillAllFields);
      return false;
    } else if (!email?.includes('@') || !email?.includes('.')) {
      Alert.alert(ErrorMessages.Error, ErrorMessages.EmailAddress);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you can submit your form data
      console.log('Form submitted:', {
        firstName,
        lastName,
        companyName,
        country,
        streetAddress,
        city,
        zipcode,
        phone,
        email,
        subscribe,
        shipToDifferentAddress,
        orderNotes,
      });
    }
  };

  const goToPrev = () => {
    navigation.goBack();
    return;
  };
  const goToCart = () => {
    // User Cart Api
    return;
  };

  return (
    <>
   <SafeAreaView style={{flex:1,backgroundColor:"#FFFFFF"}}>
   <CommonHeader title={'Checkout Details'} navigation={navigation}/>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          keyboardShouldPersistTaps={'handled'}
          extraHeight={scale(140)}>
          <View style={styles.marginHorizontal}>
            <CreateUserInput
              inputHeader={'First name'}
              onChangeText={text => setFirstName(text)}
              value={firstName}
              placeholder={'Enter your first name'}
            />

            <CreateUserInput
              inputHeader={'Last name'}
              onChangeText={text => setLastName(text)}
              value={lastName}
              placeholder={'Enter your last name'}
            />

            <CreateUserInput
              inputHeader={'Company name'}
              onChangeText={text => setCompanyName(text)}
              value={companyName}
              placeholder={'Enter your company name'}
            />

            <CreateUserInput
              inputHeader={'Country/Region'}
              onChangeText={text => setCountry(text)}
              value={country}
              placeholder={'Enter your country/region'}
            />

            <CreateUserInput
              inputHeader={'Street address'}
              onChangeText={text => setStreetAddress(text)}
              value={streetAddress}
              placeholder={'Enter your street address'}
            />

            <CreateUserInput
              inputHeader={'Town/City'}
              onChangeText={text => setCity(text)}
              value={city}
              placeholder={'Enter your town/city'}
            />

            <CreateUserInput
              inputHeader={'Postcode/ZIP'}
              onChangeText={text => setZipcode(text)}
              value={zipcode}
              placeholder={'Enter your postcode/ZIP'}
            />

            <CreateUserInput
              inputHeader={'Phone'}
              onChangeText={text => setPhone(text)}
              value={phone}
              placeholder={'Enter your phone number'}
            />

            <CreateUserInput
              inputHeader={'Email address'}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder={'Enter your email address'}
            />

            <TouchableOpacity
              onPress={() => setSubscribe(!subscribe)}
              style={styles.flexDirection}>
              <View style={styles.checkBox}>
                <View
                  style={[
                    styles.checkBoxSelected,
                    {
                      backgroundColor: subscribe ? primary : 'transparent',
                    },
                  ]}
                />
              </View>
              <Text style={styles.checkboxText}>
                {'Subscribe for exclusive updates and Discounts'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setShipToDifferentAddress(!shipToDifferentAddress)
              }
              style={styles.flexDirection}>
              <View style={styles.checkBox}>
                <View
                  style={[
                    styles.checkBoxSelected,
                    {
                      backgroundColor: shipToDifferentAddress
                        ? primary
                        : 'transparent',
                    },
                  ]}
                />
              </View>
              <Text style={styles.checkboxText}>
                {'Ship to a different address?'}
              </Text>
            </TouchableOpacity>

            <CreateUserInput
              inputHeader={'Order notes'}
              onChangeText={text => setOrderNotes(text)}
              value={orderNotes}
              height
              multiline={true}
              placeholder={'Enter any additional notes'}
            />
            <TouchableOpacity
              style={styles.continueButton}
              // onPress={handleSubmit}
              onPress={()=>navigation.navigate("CheckoutDetails1")}
              >
              <Text style={styles.continueButtonText}>{'Continue'}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
   </SafeAreaView>
    </>
  );
};

const {black, white, primary, borderGrey} = colors;
const {Regular} = FontName;
const styles = StyleSheet.create({
  supremeView: {
    flex: 1,
  },
  primaryView: {
    flex: 1,
  },
  flexDirection:{
    flexDirection: 'row'
  },
  label: {
    fontSize: scale(16),
    fontFamily: Regular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: scale(5),
    fontSize: scale(16),
    fontFamily: Regular,
    padding: scale(10),
    minHeight: scale(54),
  },
  checkboxText: {
    fontSize: scale(14),
    fontFamily: Regular,
    marginBottom: scale(28),
  },
  continueButton: {
    backgroundColor: '#30B0C9',
    minHeight: scale(50),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(26),
  },
  continueButtonText: {
    fontSize: scale(16),
    fontFamily: Regular,
    color: white,
    fontWeight:'700'
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: scale(4),
    width: scale(21),
    height: scale(19),
    borderColor: borderGrey,
    padding: scale(5),
    marginRight: scale(6),
  },
  checkBoxSelected: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
  },
  marginHorizontal:{marginHorizontal: scale(28),}
});

export default CheckoutDetailScreen;
