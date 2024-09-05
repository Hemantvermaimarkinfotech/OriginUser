// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import CommonHeader from '../components/CommonHeader';


const ProductListScreen = ({navigation}) => {

  const [selectedItems, setSelectedItems] = useState([]);

  const productData = [
    {
      id: '1',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: 'Accepted',
    },
    {
      id: '2',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: 'Best Value',
      status: 'Picked up',
    },
    {
      id: '3',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: 'Best Value',
      status: '',
    },
    {
      id: '4',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },
    {
      id: '5',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },
    {
      id: '6',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: 'Best Value',
      status: '',
    },

    {
      id: '7',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },
    {
      id: '8',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },
    {
      id: '9',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },
    {
      id: '10',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },    {
      id: '11',
      productName: 'LumbarCloud™ Hybrid',
      productType: 'Hougang',
      imageUrl: ImagePaths.productImage,
      price: '$4.5',
      orderNo: 'Order No. SE422654',
      tag: '',
      status: '',
    },

    // Add more orders as needed
  ];



  const productItems = ({ item }) => (
    <View style={[styles.orderOuter]}>
      <TouchableOpacity style={[styles.orderItem, mStyle.shadow]}  onPress={ () => navigation.navigate('ProductDetails', item)}>
      <View style={[styles.productContainer, mStyle.shadow]}>

        {item.tag && (
         <View style={styles.View1}>
           <Text style={{ fontSize: 10, fontWeight: '600', color: '#fff' }}>{item.tag }</Text>
         </View>
        )}

        <View style={styles.View2}>
          <Image source={item.imageUrl} style={styles.productImage} />
        </View>
        <View style={styles.View3}>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.View4}>
          <Text style={{ fontSize: 16, color: '#fff' }}>+</Text>
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </View>
  );


  return (
    <>
    <CommonHeader title={'New Arrivals'} navigation={navigation}/>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={productData}
        renderItem={productItems}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display two columns
        columnWrapperStyle={{flexDirection: 'row'}} // Apply styling to wrap content to next line
        vertical
      />
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  orderOuter: {
    width: '50%',
    alignItems: 'center',
    // borderWidth: 1, 
  },
  orderItem: {
    margin: 20,
  },
  productContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    width: 160,
  },
  View1: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00C39C', // Set your desired background color
    padding: 5,
    borderRadius: 5,
  },
  View2: {
    marginTop: 18,
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    // width: 80,
    // height: 80,
    width: 120,
    height: 100,
    borderRadius: 8,
    objectFit: 'contain'
  },
  View3: {
    // flex: 2,
    marginTop: -10,
    marginHorizontal: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    color: '#363636',
  },
  View4: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#30B0C9', // Set your desired background color
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopStartRadius: 10,
    borderBottomEndRadius: 10,
  },
});
export default ProductListScreen;
