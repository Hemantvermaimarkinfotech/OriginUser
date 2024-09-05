import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  
} from 'react-native';
import {scale, scaleVertical} from '../utils/Scale';
import colors from '../utils/Colors';
import {FontName} from '../utils/globalFonts';
import ImagePaths from '../utils/ImagePaths';
import {ErrorMessages, ProductDetails} from '../utils/HelperFile';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TitleHeader from '../components/TitleHeader';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {AuthContext} from '../components/AuthProvider';
import axios from 'react-native-axios';
import Loader from '../components/Loader';

const ReviewScreen = ({route, navigation}) => {
  const {productDetails} = route.params;
  console.log('productDetailsparams', productDetails);
  const [review, setReview] = useState('');
  const [loading,setLoading]=useState(false)
  const {userToken} = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  const [items, setItems] = useState([
    {
      label: (
        <View style={styles.direction}>
          <Text style={styles.headerText}>{'1'}</Text>
          <Text style={styles.headerText}>{' Star'}</Text>
          <StarRatingDisplay
            maxStars={1}
            rating={1}
            color={colors.yellow}
            starSize={20}
            style={{marginVertical: 5}}
          />
        </View>
      ),
      value: '1',
    },
    {
      label: (
        <View style={styles.direction}>
          <Text style={styles.headerText}>{'2'}</Text>
          <Text style={styles.headerText}>{' Star'}</Text>
          <StarRatingDisplay
            maxStars={2}
            rating={2}
            color={colors.yellow}
            starSize={20}
            style={{marginVertical: 5}}
          />
        </View>
      ),
      value: '2',
    },
    {
      label: (
        <View style={styles.direction}>
          <Text style={styles.headerText}>{'3'}</Text>
          <Text style={styles.headerText}>{' Star'}</Text>
          <StarRatingDisplay
            maxStars={3}
            rating={3}
            color={colors.yellow}
            starSize={20}
            style={{marginVertical: 5}}
          />
        </View>
      ),
      value: '3',
    },
    {
      label: (
        <View style={styles.direction}>
          <Text style={styles.headerText}>{'4'}</Text>
          <Text style={styles.headerText}>{' Star '}</Text>
          <StarRatingDisplay
            maxStars={4}
            rating={4}
            color={colors.yellow}
            starSize={20}
            style={{marginVertical: 5}}
          />
        </View>
      ),
      value: '4',
    },
    {
      label: (
        <View style={styles.direction}>
          <Text style={styles.headerText}>{'5'}</Text>
          <Text style={styles.headerText}>{' Star '}</Text>
          <StarRatingDisplay
            maxStars={5}
            rating={5}
            color={colors.yellow}
            starSize={20}
            style={{marginVertical: 5}}
          />
        </View>
      ),
      value: '5',
    },
  ]);

  const handleChangeText = txt => {
    if (!txt?.length) {
      setReview('');
      return;
    }
    setReview(txt);
    return;
  };

  const handleSubmit = () => {
    setLoading(true);
  
    // Validate review and rating
    if (!review.trim().length || !value) {
      setLoading(false); // Reset loading state
      Alert.alert(ErrorMessages.Warning, ErrorMessages.Review);
      return;
    }
  
    const productIddd = productDetails?.id;
  
    let data = JSON.stringify({
      "review": review,
      "rating": value
    });
  
    let config = {
      method: 'post',
      url: `https://staging11.originmattress.com.sg/wp-json/woocommerce/v1/products/${productIddd}/reviews`,
      headers: {
        Authorization: `${userToken?.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
  
    axios
      .request(config)
      .then(response => {
        console.log("Review submitted successfully:", response.data);
        setLoading(false); // Reset loading state
        Alert.alert("Success", "Review submitted successfully!");
        // Optionally, navigate to another screen or perform additional actions
      })
      .catch(error => {
        setLoading(false); // Reset loading state
        console.log("Error submitting review:", error);
        Alert.alert("Error", "Failed to submit review. Please try again later.");
      });
  };
  

  useEffect(() => {
    // if(!value?.length){
    // return;
    // }
    // if(items?.){
    // }
  }, [value]);

  return (
    <>
      <View style={styles.container}>
        <TitleHeader title={'Write a Review'} navigation={navigation} />
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={[styles.primaryView]}
          extraHeight={scale(100)}>
          <View style={styles.titleView}>
            <View style={styles.flexRow}>
              <Image
                source={{uri: productDetails?.thumbnail || 'default_image_uri'}}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.titleText}>{productDetails?.name}</Text>
              <View style={styles.productRating}>
                <Text style={styles.productPrice}>
                  {'$'}
                  {productDetails?.sale_price}
                </Text>
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
          </View>

          <View style={styles.dropDownView}>
            <Text style={styles.headerText}>{'Rating'}</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue} // Update the value state when an item is selected
              setItems={setItems}
              placeholder={'Please select'}
              dropDownDirection={'BOTTOM'}
              showTickIcon={false}
              style={styles.dropDownStyle}
              arrowIconStyle={styles.placeHolderIcon}
              placeholderStyle={styles.placeHolderDropDown}
              dropDownContainerStyle={styles.firstDropDownOption}
            />
          </View>

          <View style={styles.reviewMessageView}>
            <Text style={styles.reviewMessageTitle}>{'Message'}</Text>
            <TextInput
              style={styles.reviewMessageText}
              multiline={true}
              onChangeText={txt => handleChangeText(txt)}
              value={review}
              placeholder="Write"
              placeholderTextColor={placholderColor}
              onSubmitEditing={handleSubmit}
            />
          {loading ? 
          (     <View
            style={{  marginTop: 20,
              height: scale(54),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scale(8)}}
            >
           <Loader/>
          </View>):(
            <TouchableOpacity
            style={styles.reviewSubmitButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{'Submit'}</Text>
          </TouchableOpacity>
          )}
         {/* <View style={{marginTop:20}}>
         <Loader/>
         </View> */}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const {
  black,
  skyBlue,
  warning,
  dullGrey,
  placeholderGrey,
  primary,
  borderGrey,
  placholderColor,
} = colors;
const {SemiBold, Medium, Bold} = FontName;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  supremeView: {flex: 1, backgroundColor: 'red'},
  flex: {flex: 1},
  direction: {flexDirection: 'row', alignItems: 'center'},
  primaryView: {marginHorizontal: scale(23)},
  subView: {flexDirection: 'row'},
  headerText: {
    fontFamily: Medium,
    fontSize: scale(16),
    marginVertical: scaleVertical(6),
  },
  placeHolderIcon: {tintColor: skyBlue},
  placeHolderDropDown: {
    color: placeholderGrey,
    fontSize: scale(14),
    fontFamily: Medium,
  },
  dropDownStyle: {
    borderColor: borderGrey,
    borderWidth: 1,
  },
  firstDropDownOption: {
    borderWidth: 0,
    borderRadius: scale(8),
    borderStartStartRadius: scale(8),
    borderStartEndRadius: scale(8),
    borderColor: 'transparent',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
    justifyContent: 'center',
  },
  reviewMessageView: {
    flex: 1,
  },
  reviewMessageTitle: {
    fontSize: scale(16),
    fontFamily: Medium,
    marginVertical: scaleVertical(6),
  },
  reviewMessageText: {
    height: scale(98),
    borderWidth: 1,
    borderRadius: scale(8),
    borderColor: borderGrey,
    paddingHorizontal: scale(18),
    paddingVertical: scale(12),
    marginBottom: scale(20),
  },
  reviewSubmitButton: {
    marginTop: 20,
    height: scale(54),
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  submitButtonText: {color: 'white', fontSize: scale(20), fontFamily: Bold},
  dropDownView: {
    zIndex: 1,
    marginVertical: scaleVertical(26),
  },
  flexRow: {
    height: scale(53),
    width: scale(61),
    overflow: 'hidden',
    borderRadius: scale(8),
  },
  imageStyle: {height: scale(50), width: scale(90)},
  productRating: {flexDirection: 'row', alignItems: 'center', flex: 1},
  productPrice: {
    fontFamily: SemiBold,
    flex: 0.2,
    fontSize: scale(13),
    marginLeft: scale(17),
  },
  titleText: {
    fontFamily: SemiBold,
    fontSize: scale(16),
    marginLeft: scale(17),
  },
  titleView: {
    flexDirection: 'row',
    marginTop: scale(32),
  },
  backIcon: {alignSelf: 'flex-start'},
  headingTitle: {
    color: black,
    fontSize: scale(20),
    alignSelf: 'center',
    marginLeft: scale(60),
    fontFamily: SemiBold,
  },
  reviewCount: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(15),
    color: placeholderGrey,
    marginVertical: scaleVertical(6),
    flex: 1,
  },
  rating: {
    fontFamily: Medium,
    color: black,
    fontSize: scale(13),
  },
  productRatingView: {
    marginHorizontal: scale(20),
    borderRadius: scale(3),
    backgroundColor: dullGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(38),
    height: scale(23),
    flex: 0.3,
  },
});

export default ReviewScreen;
