import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import {scale} from '../utils/Scale';
import CommonHeader from '../components/CommonHeader';


const OrderScreen = ({navigation}) => {

  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmission = () => {
    // Handle the submission logic here
    console.log('Order Number submitted:', orderNumber);
  };


const [selectedItems, setSelectedItems] = useState([]);
const goToPrev = () => {
  navigation.goBack();
  return;
};
const goToCart = () => {
  // User Cart Api
  return;
};

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
      <TouchableOpacity onPress={()=>navigation.navigate("RefundOrder")}
        style={{
          height: 34,
          width: '50%',
          backgroundColor: '#30B0C9',
          borderRadius: 8,
          justifyContent:"center",
          alignItems:"center"
        }}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: 500}}>Refund</Text>
      </TouchableOpacity>

      </View>
    </View>
  </View>
);

return (
  <>
  <CommonHeader title={'Orders'} navigation={navigation}/>
    <FlatList
      data={ordersData}
      keyExtractor={item => item.id}
      renderItem={renderOrderItem}
    />
  </>
);
};

const styles = StyleSheet.create({
orderItem: {
  // flexDirection: 'row',
  // alignItems: 'center',
  // marginHorizontal: 20,
  // marginBottom: 15,
},
productContainer: {
  backgroundColor: '#fff',
  width: '90%',
  height: 100,
  borderRadius: 6,
  alignSelf: 'center',
  marginTop: 10,
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
  marginTop:15,
  marginBottom:20,
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

marginHorizontal:{marginHorizontal: scale(28),marginTop:20}
});


export default OrderScreen;
