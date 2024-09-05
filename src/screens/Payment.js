// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import CommonHeader from '../components/CommonHeader';
import { scale } from '../utils/Scale';
import CreateUserInput from '../components/CreateUserInput';
import { FontName } from '../utils/globalFonts';
import DropDownPicker from 'react-native-dropdown-picker';

const PaymentScreen = ({ navigation, inputHeader }) => {
  // const {
  //   black,
  //   light,
  //   lightGrey,
  //   dullGrey,
  //   skyBlue,
  //   placeholderGrey,
  //   borderGrey,
  //   primary,
  //   white,
  //   warning,
  //   darkGrey,
  // } = colors;

  const { Bold, Medium, SemiBold, Regular } = FontName;

  const [isSelected, setIsSelected] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [openQty, setOpenQty] = useState(false);
  const [valueQty, setValueQty] = useState(null);
  const [itemsQty, setItemsQty] = useState([
    { label: 'Jan', value: '1' },
    { label: 'Feb', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '3' },
  ]);
  const [openYearQty, setOpenYearQty] = useState(false);
  const [valueYearQty, setValueYearQty] = useState(null);
  const [itemsYearQty, setItemsYearQty] = useState([
    { label: '2001', value: '1' },
    { label: '2002', value: '2' },
    { label: '2003', value: '3' },
    { label: '2004', value: '3' },
  ]);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={'Payment'} navigation={navigation} />
      <View style={{ marginTop: 10 }}>
        <View style={{ marginHorizontal: scale(28) }}>
          <Text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>
            Credit / Debit Card VisaMastercard
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
              fontWeight: 430,
              marginTop: 10,
            }}>
            Please enter your card details to make payment.
          </Text>
          <Text></Text>
        </View>
      </View>

      <View style={{ marginHorizontal: scale(28) }}>
        <CreateUserInput
          inputHeader={'Card Number '}
          onChangeText={text => setCardNumber(text)}
          value={cardNumber}
          placeholder={'Write'}
          style={styles.input}
        />
        <Text style={styles.label}>
          {(inputHeader = 'Expiry Date')}

          <Text style={styles.mandatoryField}>{' *'}</Text>
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.input}>
            <DropDownPicker
              open={openQty}
              value={valueQty}
              items={itemsQty}
              setOpen={setOpenQty}
              setValue={setValueQty}
              setItems={setItemsQty}
              placeholder={'Month'}
              showTickIcon={false}
              dropDownDirection={'BOTTOM'}
              style={styles.secondDropDown}
              arrowIconStyle={styles.placeHolderIcon}
              placeholderStyle={styles.placeHolderDropDown}
              dropDownContainerStyle={styles.firstDropDownOption}
            />
          </View>
          <View style={styles.input}>
            <DropDownPicker
              open={openYearQty}
              value={valueYearQty}
              items={itemsYearQty}
              setOpen={setOpenYearQty}
              setValue={setValueYearQty}
              setItems={setItemsYearQty}
              placeholder={'Year'}
              showTickIcon={false}
              dropDownDirection={'BOTTOM'}
              style={styles.secondDropDown}
              arrowIconStyle={styles.placeHolderIcon}
              placeholderStyle={styles.placeHolderDropDown}
              dropDownContainerStyle={styles.firstDropDownOption}
            />
          </View>
        </View>

        <CreateUserInput
          inputHeader={'Card Code (CVC) '}
          onChangeText={text => setCardCode(text)}
          value={cardCode}
          placeholder={'Write'}
        />
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={handlePress}
              style={[
                styles.radioButton,
                isSelected && styles.radioButtonSelected,
              ]}>
              {isSelected && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
            <Text
              style={{
                color: '#23233C',
                fontSize: 12,
                fontWeight: 400,
                marginLeft: 10,
              }}>
              Would you like to be invited to review your order? Check here to
              receive a message from CusRev (an independent reviews service)
              with a review form.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={handlePress}
              style={[
                styles.radioButton,
                isSelected && styles.radioButtonSelected,
              ]}>
              {isSelected && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
            <Text
              style={{
                color: '#23233C',
                fontSize: 12,
                fontWeight: 400,
                marginLeft: 10,
              }}>
              I have read and agree to the website terms and conditions *
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
        // onPress={handleSubmit}
        >
          <Text style={styles.continueButtonText}>{'Place Order'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { Regular } = FontName;
const { black, white, primary, borderGrey } = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  radioButtonSelected: {
    backgroundColor: '#fff', // Outer color changes to blue when selected
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#30B0C9', // Inner color fills with black when selected
  },
  continueButton: {
    backgroundColor: '#30B0C9',
    minHeight: scale(50),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(26),
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
    fontWeight: '700',
  },

  mandatoryField: { color: colors.red },
  label: {
    fontSize: scale(16),
    fontFamily: FontName.SemiBold,
    marginBottom: scale(6),
  },
  secondDropDown: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: scale(5),
    fontSize: scale(16),
    fontFamily: FontName.Regular,
    color: '#000',
    padding: scale(10),
    minHeight: scale(54),
    width: 150,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeHolderDropDown: {
    color: 'gray',
    fontSize: scale(14),
    // fontFamily: Medium,
  },
  placeHolderIcon: { tintColor: 'skyblue' },
  firstDropDownOption: {
    borderWidth: 0,
    borderRadius: scale(8),
    borderStartStartRadius: scale(8),
    borderStartEndRadius: scale(8),
    borderColor: 'transparent',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: 'whitesmoke',
  },
});

export default PaymentScreen;
