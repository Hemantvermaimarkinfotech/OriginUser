// src/screens/SplashScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../utils/Colors';
import {BackIcon, ShopBag} from '../utils/IconPaths';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ErrorMessages} from '../utils/HelperFile';
import CreateUserInput from '../components/CreateUserInput';
import {scale} from '../utils/Scale';
import {FontName} from '../utils/globalFonts';
import CommonHeader from '../components/CommonHeader';
import ImagePaths from '../utils/ImagePaths';
import {ScrollView} from 'react-native-gesture-handler';

const ordersData = [
  {
    id: '1',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: 'Accepted',
  },
  {
    id: '2',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: 'Picked up',
  },
  {
    id: '3',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: '',
  },
  {
    id: '4',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: '',
  },
  {
    id: '5',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: '',
  },
  {
    id: '6',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: '',
  },
  {
    id: '7',
    productName: 'LumbarCloud™ Hybrid',
    productType: 'Hougang',
    imageUrl: ImagePaths.productImage,
    price: '$4.5',
    orderNo: 'Order No. SE422654',
    status: '',
  },
  // Add more orders as needed
];

const toggleSelection = itemId => {
  const updatedSelection = selectedItems.includes(itemId)
    ? selectedItems.filter(item => item !== itemId)
    : [...selectedItems, itemId];

  setSelectedItems(updatedSelection);
};

const renderOrderItem = ({item}) => (
  <View style={styles.productContainer}>
    <View style={{width: '40%', height: 100, justifyContent: 'center'}}>
      <Image source={item.imageUrl} style={styles.productImage} />
    </View>
    <View style={styles.rightproduct}>
      <Text style={{color: '#000000', fontSize: 18, fontWeight: 600}}>
        LumbarCloud™ Hybrid
      </Text>
      <Text style={{color: '#000000', fontSize: 15}}>$45</Text>
      <View style={styles.quantityline}>
        <View
          style={{
            height: 20,
            width: 70,
            borderColor: '#CECECE',
            borderWidth: 1,
            borderRadius: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <Text style={{color: '#363636', fontSize: 12}}> Qty:</Text>
          <Text style={{color: '#363636', fontSize: 12}}>1</Text>
          {/* <Text style={{color: '#363636', fontSize: 12}}>2</Text> */}
        </View>
        <Text
          style={{
            color: '#363636',
            fontSize: 14,
            textDecorationLine: 'underline',
          }}>
          Remove
        </Text>
      </View>
    </View>
  </View>
);

const CheckoutDetails1 = () => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardCode, setCardCode] = useState('');
  const handlePress = () => {
    setIsSelected(!isSelected);
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
      <View style={{flex: 1,backgroundColor:"#FFFFFF"}}>
        <CommonHeader title={'Checkout'} navigation={navigation} />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: scale(28),
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{color: '#000000', fontSize: 16, fontWeight: 400,fontFamily:"Montserrat-Medium"}}>
            Adam Gillchrist
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              fontWeight: 400,
              textDecorationLine: 'underline',
            }}>
            Edit
          </Text>
        </View>
        <View style={{marginHorizontal: scale(28), marginTop: 10}}>
          <Text style={{color: '#000000', fontSize: 16, fontWeight: 400}}>
            Phone: 65337-37362
          </Text>
          <Text
            style={{
              color: '#838383',
              fontSize: 16,
              fontWeight: 400,
              marginTop: 10,
            }}>
            1, Jurong West Central 2, #02-24, Jurong Point Shopping Centre,
            Singapore 648886
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#23233C',
            marginHorizontal: scale(28),
            marginTop: 30,
          }}>
          Your Order
        </Text>
        <ScrollView style={{}}>
          <View style={{paddingBottom:30}}>
            <FlatList
              data={ordersData}
              keyExtractor={item => item.id}
              renderItem={renderOrderItem}

            />
          </View>
          <View style={{marginHorizontal: scale(28)}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 17,
                fontWeight: 600,
                marginTop: 20,
              }}>
              Shipping
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
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
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 400,
                  marginLeft: 10,
                }}>
                Free shipping (Same Day)
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
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
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 400,
                  marginLeft: 10,
                }}>
                Express Delivery (2-Hour Delivery): $20.00
              </Text>
            </View>

            <View
              style={[
                styles.productContainer,
                {
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 20,
                  width: '100%',
                },
              ]}>
              <View>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: 600,
                    marginTop: 5,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    fontWeight: 600,
                    marginTop: 5,
                  }}>
                  $180
                </Text>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: 600,
                    marginTop: 5,
                  }}>
                  (includes $29.56 GST 8%)
                </Text>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={{color: '#000000', fontSize: 18, fontWeight: 600}}>
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

            <View>
              <CreateUserInput
                inputHeader={'Card Number *'}
                onChangeText={text => setCardNumber(text)}
                value={cardNumber}
                placeholder={'Write'}
              />

              <CreateUserInput
                inputHeader={'Expiry Date *'}
                onChangeText={text => setExpiryDate(text)}
                value={expiryDate}
                placeholder={'Write'}
              />

              <CreateUserInput
                inputHeader={'Card Code (CVC) *'}
                onChangeText={text => setCardCode(text)}
                value={cardCode}
                placeholder={'Write'}
              />

              <TouchableOpacity
                style={styles.continueButton}
                // onPress={handleSubmit}
                onPress={() => navigation.navigate('Payment')}>
                <Text style={styles.continueButtonText}>{'Checkout'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const {Regular} = FontName;
const {black, white, primary, borderGrey} = colors;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginHorizontal: {
    marginHorizontal: scale(28),
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 100,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom:10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    elevation:3
  },
  productImage: {
    height: 50,
    width: 100,
  },
  rightproduct: {
    width: '60%',
    height: 100,
    justifyContent: 'center',
  },
  quantityline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  carttotals: {
    marginTop: 15,
    marginBottom: 20,
    flexDirection: 'row',
    height: 60,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#30B0C9',
    alignItems: 'center',
    justifyContent: 'center',
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
  continueButtonText: {
    fontSize: scale(16),
    fontFamily: Regular,
    color: white,
    fontWeight:'700'
  },
});

export default CheckoutDetails1;
