import React, {useEffect, useState} from 'react';
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
import {ErrorMessages} from '../utils/HelperFile';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import CommonHeader from '../components/CommonHeader';

const RefundOrderScreen = ({navigation}) => {
  const [review, setReview] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  const handleChangeText = txt => {
    if (!txt?.length) {
      setReview('');
      return;
    }
    setReview(txt);
    return;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const trim = review.trim();
    if (!trim?.length) {
      Alert.alert(ErrorMessages.Warning, ErrorMessages.Review);
      return;
    }
    // write review API
    return;
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
    <CommonHeader title={'Refund Order'} navigation={navigation}/>
       <KeyboardAwareScrollView
         enableOnAndroid={true}
         contentContainerStyle={[styles.primaryView]}
         extraHeight={scale(100)}>


        <View style={styles.reviewMessageView}>
          <Text style={styles.reviewMessageTitle}>{'Reason'}</Text>
          <TextInput
            style={styles.reviewMessageText}
            multiline={true}
            onChangeText={txt => handleChangeText(txt)}
            value={review}
            placeholder="Write"
            placeholderTextColor={placholderColor}
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity
            style={styles.reviewSubmitButton}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

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
  supremeView: {flex: 1},
  flex: {flex: 1},
  direction: {flexDirection: 'row', alignItems: 'center'},
  primaryView: {flex: 1, marginHorizontal: scale(23)},
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
    paddingHorizontal: scale(15),
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
  imageStyle: {height: scale(53), width: scale(61)},
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

export default RefundOrderScreen;
