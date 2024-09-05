// src/screens/HomeScreen.js
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {Dimensions} from 'react-native';
import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../components/AuthProvider';
import {getArrivals} from '../components/ApiService';
import {getCategory} from '../components/ApiService';
import {getPopular} from '../components/ApiService';
import {useFocusEffect} from '@react-navigation/native';
import SkeletonLoader from '../components/SkeltonLoader';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const inputRef = useRef(null);
  const {userToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedChip, setSelectedChip] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [category, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [popular, setPopular] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when starting data fetch
      console.log('Loading state:', loading); // Log current loading state
      const categoryResponse = await getCategory();
      setCategories(categoryResponse);

      // Fetch Popular
      const popularResponse = await getPopular();
      setPopular(popularResponse);

      setLoading(false);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchArrivals = async (category_slug) => {
  //   try {
  //     setLoading(true);
  //     const productsResponse = await getArrivals(category_slug);
  //     setArrivals(productsResponse);
  //   } catch (error) {
  //     console.log('Error fetching products by category:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchArrivals();
  // }, []);

  // const fetchDataAndUpdatePopular = async () => {
  //   setLoading(true)
  //   try {
  //     // Fetch categories
  //     const categoryResponse = await getCategory();
  //     setCategories(categoryResponse);

  //     // Fetch Popular
  //     const PopularResponse = await getPopular();
  //     setPopular(PopularResponse);
  //     // console.log("PopularResponse",PopularResponse)
  //   } catch (error) {
  //     console.log('Error fetching categories:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDataAndUpdatePopular();
  // }, []);

  const dataSlider = [
    {id: 1, text: 'Slide 1', image: require('../assets/images/slider1.png')},
    {id: 2, text: 'Slide 2', image: require('../assets/images/slider1.png')},
    {id: 3, text: 'Slide 3', image: require('../assets/images/slider1.png')},
    // Add more slides as needed
  ];

  const SliderItem = ({image, text}) => (
    <ImageBackground source={image} style={styles.slideImage}>
      <View style={styles.textContainer}>
        <Text style={styles.textSlide}>{text}</Text>
      </View>
    </ImageBackground>
  );

  const renderChipItem = ({item}) => (
    <>
      {/* All Products Button */}
      {/* Category Chips */}
      {category.map(item => (
        <TouchableOpacity
          key={item.slug}
          style={{
            backgroundColor:
              selectedChip?.slug === item.slug ? 'black' : 'white',
            paddingVertical: 10,
            paddingHorizontal: 25,
            marginHorizontal: 5,
            marginVertical: 5,
            borderRadius: 25,
            borderColor: 'grey',
            borderWidth: 1,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // onPress={() => {
          //   // console.log("Clicked item slug:", item.slug);
          //   fetchArrivals(item.slug);
          //   // Any other logic you want to execute when the chip is pressed
          // }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: selectedChip?.slug === item.slug ? 'white' : 'black',
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );

  // const handleChipPress = (chip) => {
  //   setSelectedChip(chip === selectedChip ? null : chip);
  //   fetchArrivals(chip === selectedChip ? null : chip.slug);
  // };

  const toggleSelection = itemId => {
    const updatedSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(item => item !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelection);
  };

  const renderOrderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.orderItem, mStyle.shadow]}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.id,
        })
      }>
      <View style={[styles.productContainer, mStyle.shadow]}>
        <View style={styles.View1}>
          <Text style={{fontSize: 10, fontWeight: '500', color: '#fff'}}>
            Best Value
          </Text>
        </View>

        <View style={styles.View2}>
          {item.thumbnail && typeof item.thumbnail === 'string' ? (
            <Image source={{uri: item.thumbnail}} style={styles.productImage} />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Text style={styles.productPrice}>No Image Available</Text>
            </View>
          )}
        </View>
        <View style={styles.View3}>
          <Text style={styles.productName}>{item?.name}</Text>
          {item.regular_price ? (
            <Text style={styles.productPrice}>$ {item.regular_price}</Text>
          ) : (
            <Text style={styles.productPrice}>$ 500</Text>
          )}
        </View>
        <TouchableOpacity style={styles.View4}>
          <Text style={{fontSize: 16, color: '#fff'}}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.orderItem, mStyle.shadow]}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      {loading ? (
        <SkeletonLoader />
      ) : (
        <View style={[styles.productContainer, mStyle.shadow]}>
          <View style={styles.View1}>
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#fff' }}>Best value</Text>
          </View>
          <View style={styles.View2}>
            {item.thumbnail && typeof item.thumbnail === 'string' ? (
              <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
            ) : (
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <Text style={styles.productPrice}>No Image Available</Text>
              </View>
            )}
          </View>
          <View style={styles.View3}>
            <Text style={styles.productName}>{item?.name}</Text>
            <Text style={styles.productPrice}>{item.regular_price ? `$ ${item.regular_price}` : '$ 500'}</Text>
          </View>
          <TouchableOpacity style={styles.View4}>
            <Text style={{ fontSize: 16, color: '#fff' }}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{marginVertical: 5}} />
        <Carousel
          data={dataSlider}
          renderItem={({item}) => (
            <SliderItem image={item.image} text={item.text} />
          )}
          width={width}
          height={200}
          autoPlay={true}
          scrollAnimationDuration={1500}
          autoPlayInterval={2000}
        />
        <View style={{marginVertical: 5}} />

        <FlatList
          data={category}
          keyExtractor={item => item.slug}
          renderItem={renderChipItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          style={{minHeight: 50, maxHeight: 50}}
        />

        <View style={{marginVertical: 5}} />

        <View
          style={{
            marginHorizontal: 15,
            marginBottom: 5,
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[mStyle.h5, {fontWeight: '600'}]}>New Arrivals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* <FlatList
        data={arrivals}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        horizontal
        showsHorizontalScrollIndicator={false} 
      /> */}

        <FlatList
          data={popular}
          keyExtractor={item => item.id}
          renderItem={renderPopularItem}
          horizontal
          // style={{ minHeight: 220, maxHeight: 220 }}
          showsHorizontalScrollIndicator={false}
        />

        <View style={{marginVertical: 5}} />

        <View
          style={{
            marginHorizontal: 15,
            marginBottom: 5,
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[mStyle.h5, {fontWeight: '600'}]}>Popular</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={popular}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPopularItem}
        />

        <View style={{marginVertical: 25}} />
        <Carousel
          data={dataSlider}
          renderItem={({item}) => (
            <SliderItem image={item.image} text={item.text} />
          )}
          width={width}
          height={200}
          autoPlay={true}
          scrollAnimationDuration={1500}
          autoPlayInterval={2000}
        />

        <View style={{marginVertical: 10}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  slideImage: {
    flex: 1,
    height: 200,
    objectFit: 'cover',
    // alignItems: 'flex-start',
    position: 'relative',
  },
  slideImage2: {
    flex: 1,
    height: 200,
    width: 'auto',
    objectFit: 'cover',
    overflow: 'hidden',
    // alignItems: 'flex-start',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    left: 20, // Adjust as needed
    bottom: 20, // Adjust as needed
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  textSlide: {
    color: '#fff',
    fontSize: 16,
  },
  chipButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedChip: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  selectedText: {
    color: '#fff',
  },

  orderItem: {
    margin: 10,
  },
  productContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    width: 150,
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
    width: 100,
    height: 80,
    borderRadius: 8,
    objectFit: 'contain',
    marginTop: 10,
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

  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1.2,
    borderColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: colors.primary,
  },
  uncheckedBox: {
    width: 18,
    height: 18,
  },
  shadow: {
    // Shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // Shadow properties for Android
    elevation: 2,
  },
});

export default HomeScreen;
