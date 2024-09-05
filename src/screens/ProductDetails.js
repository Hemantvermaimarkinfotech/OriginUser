import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Inset_Bottom, scale, scaleVertical} from '../utils/Scale';
import {BackIcon, Star} from '../utils/IconPaths';
import Colors from '../utils/Colors';
import {useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ProductDetails, ProductReviews} from '../utils/HelperFile';
import ImagePaths from '../utils/ImagePaths';
import {FontName} from '../utils/globalFonts';
import TitleHeader from '../components/TitleHeader';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import colors from '../utils/Colors';
import RadioGroup from 'react-native-radio-buttons-group';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/AuthProvider';
import axios from 'react-native-axios';
import {useToast, ToastProvider} from 'react-native-toast-notifications';
import Loader from '../components/Loader';
import { useIsFocused } from '@react-navigation/native'; 
// import { getProductDetails } from '../components/ApiService';

const {
  black,
  light,
  lightGrey,
  dullGrey,
  skyBlue,
  placeholderGrey,
  borderGrey,
  primary,
  white,
  warning,
  darkGrey,
} = Colors;

const {Bold, Medium, SemiBold, Regular} = FontName;

// Product Details and Add-ons (DummyData => Helper.js)
const HeadingWithDescription = () => {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const toggleAddon = index => {
    if (selectedAddons?.includes(index)) {
      setSelectedAddons(selectedAddons?.filter(item => item !== index));
    } else {
      setSelectedAddons([...selectedAddons, index]);
    }
  };

  useEffect(() => {}, [selectedAddons]);
};

const ProductReview = ({name, content, rating, date, image}) => {
  const placeholderImage = require('../assets/images/ReviewUser1.png');
  // Render star icons based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars?.push(
        // <Star height={15} width={15} fill={warning} />
        <StarRatingDisplay
          maxStars={1}
          rating={1}
          color={colors.yellow}
          starSize={20}
          // style={{marginVertical: 5}}
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.productReviewView}>
     <Image source={image || placeholderImage} style={styles.userImage} />
      <View style={styles.flex}>
        <View style={styles.flexDirection}>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.starRating}>{renderStars()}</View>
          <Text style={styles.dateTxt}>{date}</Text>
        </View>
        <Text style={styles.marginTop}>{content}</Text>
      </View>
    </View>
  );
};

const ProductDetailScreen = ({navigation, route}) => {
  const {productId} = route.params;
  console.log('producridddd', productId);

  const [selectedVariations, setSelectedVariations] = useState('');
  console.log('selectedVariations', selectedVariations);
  const [selectedQuantity, setSelectedQuantity] = useState('1');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'KingSize', value: 'KingSize'},
    {label: 'QueenSize', value: 'QueenSize'},
    {label: 'NormalSize', value: 'NormalSize'},
  ]);
  const [loading, setLoading] = useState(false);
  const [openQty, setOpenQty] = useState(false);
  const [valueQty, setValueQty] = useState(null);
  const [itemsQty, setItemsQty] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const {params} = useRoute();
  const [productDetails, setProductDetails] = useState([]);
  const {userToken} = useContext(AuthContext);
  console.log('userTokennnnn', userToken);
  const {imageUrl, productName, price} = params;
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const {toast} = useToast();
  const [addcartloading, setCartLaoding] = useState(false);
  const [review, setReview] = useState([]);
  const isFocused = useIsFocused(); // useIsFocused hook to track screen focus

  // const toggleSelection = itemId => {
  //   setSelectedItem(selectedItem === itemId ? null : itemId);
  // };

  const toggleSelection = name => {
    if (selectedVariations.includes(name)) {
      // Item is already selected, remove it from the array
      setSelectedVariations(
        selectedVariations.filter(itemName => itemName !== name),
      );
    } else {
      // Item is not selected, add it to the array
      setSelectedVariations([...selectedVariations, name]);
    }
  };

  const handleSizeSelect = size => {
    setSelectedSize(size);
  };

  const handleQuantitySelect = quantity => {
    setSelectedQuantity(quantity);
  };

  const fetchProductDetails = async productId => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(
        `https://staging11.originmattress.com.sg/wp-json/wc-product-api/v1/products/?product_id=${productId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      setProductDetails(data);
      console.log('Product Details:', data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProductDetails([]); // Set product details to empty array if there's an error
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    // Fetch product details when the component mounts
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductReview = () => {
    let config = {
      method: 'get',
      url: `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/products/${productId}/reviews`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setReview(response.data); // Update state with fetched reviews
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isFocused) {
      fetchProductReview();
    }
  },[isFocused]);

  const MAX_RETRIES = 3;
  let retryCount = 0;

  const addToCart = async () => {
    const selectedVariationId = 72591;
    let data = JSON.stringify({
      product_id: productId,
      quantity: selectedQuantity,
      variations: [
        {
          variation_id: selectedVariationId,
        },
      ],
    });

    let config = {
      method: 'post',
      url: 'https://staging11.originmattress.com.sg/wp-json/custom-cart-api/v1/add-to-cart',
      headers: {
        Authorization: `${userToken?.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    setCartLaoding(true);
    try {
      const response = await axios.request(config);
      console.log('Cart added successfully', response.data);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    } catch (error) {
      console.log('Error adding to cart', error);
    } finally {
      setCartLaoding(false);
    }
  };

  const reviews = ProductReviews ?? [];

  return (
    <>
      <TitleHeader navigation={navigation} title={''} />
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <ActivityIndicator size="large" color="#30B0C9" />
        </View>
      ) : (
        <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
          <View style={styles.primaryView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: Inset_Bottom() ? scale(20) : scale(10)}}>
              <View style={styles.imageView}>
                {productDetails?.thumbnail ? (
                  <Image
                    source={{uri: productDetails.thumbnail}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Text style={{color: '#000000', fontSize: 16}}>
                    No Image Available
                  </Text>
                )}
              </View>
              <Text style={styles.textName}>{productDetails?.name}</Text>
              {/* <Text style={styles.textPrice}>$ {productDetails?.sale_price}</Text> */}
              {productDetails?.sale_price ? (
                <Text style={styles.textPrice}>
                  $ {productDetails?.sale_price}
                </Text>
              ) : (
                <Text style={styles.textPrice}>$ 500</Text>
              )}
              <View style={styles.dropDownView}>
                <Text style={styles.headerText}>{'Size'}</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={handleSizeSelect}
                  setItems={setItems}
                  placeholder={'Choose an option'}
                  dropDownDirection={'BOTTOM'}
                  showTickIcon={false}
                  style={styles.firstDropDown}
                  arrowIconStyle={styles.placeHolderIcon}
                  placeholderStyle={styles.placeHolderDropDown}
                  dropDownContainerStyle={styles.firstDropDownOption}
                />
              </View>
              <View style={styles.dropDownView1}>
                <Text style={styles.headerText}>{'Quantity'}</Text>
                <View style={styles.dropDownView2}>
                  <View style={styles.width}>
                    <DropDownPicker
                      open={openQty}
                      value={valueQty}
                      items={itemsQty}
                      setOpen={setOpenQty}
                      setValue={handleQuantitySelect}
                      setItems={setItemsQty}
                      placeholder={'1'}
                      showTickIcon={false}
                      dropDownDirection={'BOTTOM'}
                      style={styles.secondDropDown}
                      arrowIconStyle={styles.placeHolderIcon}
                      placeholderStyle={styles.placeHolderDropDown}
                      dropDownContainerStyle={styles.firstDropDownOption}
                    />
                  </View>
                  <View style={styles.productRatingView}>
                    <Text style={styles.rating}>{'4'}</Text>
                    <StarRatingDisplay
                      maxStars={1}
                      rating={1}
                      color={colors.yellow}
                      starSize={20}
                      style={{marginVertical: 5}}
                    />
                  </View>
                  <Text style={styles.reviewCount}>{'443K'}</Text>
                </View>
              </View>
              {/* {ProductDetails?.length > 0 && <HeadingWithDescription />} */}

              {/* {productDetails?.variations?.map((item, index) => (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSelection(item.id)}>
                    {selectedItem === item.id ? (
                      <Feather name="check" size={18} color={colors.primary} />
                    ) : null}
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000000',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    {item?.name}
                  </Text>
                </View>
              ))} */}

              {productDetails?.variations?.map((item, index) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSelection(item.name)}>
                    {selectedVariations.includes(item.name) ? (
                      <Feather name="check" size={18} color={colors.primary} />
                    ) : null}
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#000000',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    {item.name}
                  </Text>
                </View>
              ))}

              {addcartloading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: primary,
                    borderRadius: scale(10),
                    paddingVertical: scaleVertical(11),
                    marginVertical: scaleVertical(17),
                  }}>
                  <ActivityIndicator size={'large'} color={'white'} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addToCrtBtn}
                  onPress={addToCart}>
                  <Text style={styles.addToCartTxt}>{'ADD TO CART'}</Text>
                </TouchableOpacity>
              )}
              <View style={{marginVertical: 10}} />
              <View style={styles.flex}>
                <View style={styles.productReview}>
                  <Text style={styles.productReviewTitle}>
                    {'Product Reviews'}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ReviewScreen', {productDetails})
                    }>
                    <Text style={styles.writeRevie}>{'Write a Review'}</Text>
                  </TouchableOpacity>
                </View>

                {review
                  ?.slice(0, showAllReviews ? review?.length : 3)
                  ?.map((review, index) => (
                    <View key={index}>
                      <ProductReview {...review} />
                      {showAllReviews
                        ? index !== review?.length - 1 && (
                            <View style={styles.emptyView} />
                          )
                        : index !== 2 && <View style={styles.emptyView} />}
                    </View>
                  ))}

                {review?.length > 3 && !showAllReviews ? (
                  <TouchableOpacity onPress={() => setShowAllReviews(true)}>
                    <Text style={styles.viewAll}>{'View All'}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setShowAllReviews(false)}>
                    <Text style={styles.viewAll}>{'Show Less'}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
          {toastVisible && (
            <View style={styles.toast}>
              <Text style={styles.toastText}>Added Cart Succesfuly!</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  supremeView: {flex: 1},
  primaryView: {marginHorizontal: scale(24)},
  backIcon: {alignSelf: 'flex-start'},
  imageView: {
    backgroundColor: light,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleVertical(21),
    borderRadius: scale(18),
    height: scale(240),
    width: scale(340),
    overflow: 'hidden',
  },
  imageStyle: {
    height: scale(240),
    width: scale(340),
  },
  textName: {
    fontFamily: SemiBold,
    color: black,
    fontSize: scale(20),
  },
  textPrice: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(20),
    marginTop: scale(6),
  },
  headerText: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(16),
    marginVertical: scaleVertical(6),
  },
  firstDropDown: {
    borderColor: borderGrey,
    borderWidth: 1,
    zIndex: 2,
  },
  firstDropDownOption: {
    borderWidth: 0,
    borderRadius: scale(8),
    borderStartStartRadius: scale(8),
    borderStartEndRadius: scale(8),
    borderColor: 'transparent',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
  },
  dropDownView: {zIndex: 2, marginTop: scale(26)},
  dropDownView1: {zIndex: 1, marginTop: scale(22), marginBottom: scale(26)},
  dropDownView2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {width: scale(133)},
  secondDropDown: {
    borderColor: borderGrey,
    borderWidth: 1,
  },
  placeHolderDropDown: {
    color: placeholderGrey,
    fontSize: scale(14),
    fontFamily: Medium,
  },
  placeHolderIcon: {tintColor: skyBlue},
  productRatingView: {
    marginHorizontal: scale(20),
    backgroundColor: dullGrey,
    flexDirection: 'row',
    width: scale(49),
    height: scale(32),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rating: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(16),
    marginVertical: scaleVertical(6),
  },
  reviewCount: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(15),
    color: placeholderGrey,
    marginVertical: scaleVertical(6),
    flex: 1,
  },
  descriptionText: {
    padding: scale(10),
    marginRight: scale(5),
    border: 2,
  },
  descriptionText1: {
    fontWeight: '400',
    color: black,
    fontSize: scale(14),
    color: 'grey',
    flex: 1,
  },
  productDescription: {
    flex: 1,
    fontFamily: Regular,
    color: black,
    fontSize: scale(13),
    marginVertical: scale(6),
  },
  productTitle: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(15),
    marginVertical: 6,
  },
  productDescriptionList: {flexDirection: 'row', alignItems: 'center'},
  bulletin: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: primary,
    marginRight: scale(10),
  },
  productDesc: {
    flex: 1,
    fontFamily: Regular,
    color: black,
    fontSize: scale(13),
    marginVertical: 6,
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
  addToCartTxt: {
    color: white,
    fontFamily: Bold,
    fontSize: scale(20),
  },
  addToCrtBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    borderRadius: scale(10),
    paddingVertical: scaleVertical(14),
    marginVertical: scaleVertical(17),
  },
  flex: {flex: 1},
  productReview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(24),
  },
  productReviewTitle: {
    fontSize: scale(16),
    color: black,
    fontFamily: SemiBold,
  },
  writeRevie: {
    fontSize: scale(15),
    color: primary,
    fontFamily: Medium,
    textDecorationLine: 'underline',
  },
  emptyView: {
    borderBottomWidth: 0.2,
    borderColor: lightGrey,
    marginBottom: scale(16),
  },
  viewAll: {
    fontSize: scale(15),
    color: black,
    textDecorationLine: 'underline',
  },
  dateTxt: {
    color: darkGrey,
    fontSize: scale(10),
    fontFamily: Regular,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productReviewView: {flexDirection: 'row', marginBottom: scale(10)},
  userImage: {width: scale(39), height: scale(39), marginRight: scale(10)},
  flexDirection: {flexDirection: 'row'},
  userName: {
    color: black,
    fontSize: scale(16),
    fontFamily: Medium,
    flex: 0.34,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.2,
    borderColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginTop: {marginTop: scaleVertical(15)},
  starRating: {flexDirection: 'row', alignItems: 'center', flex: 0.6},
  toast: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#D5FFC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Montserrat, SemiBold',
  },
});

export default ProductDetailScreen;
