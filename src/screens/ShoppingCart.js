import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';

import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import {scale} from '../utils/Scale';
import CommonHeader from '../components/CommonHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import {FontName} from '../utils/globalFonts';
import {Dropdown} from 'react-native-element-dropdown';
import {AuthContext} from '../components/AuthProvider';
import axios from 'react-native-axios';
import CustomModal from '../components/Modal';
import {useToast, ToastProvider} from 'react-native-toast-notifications';

const ShoppingCartScreen = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {userToken} = useContext(AuthContext);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const {toast} = useToast();

  // const showToast = () => {
  //   setToastVisible(true);
  //   setTimeout(() => {
  //     setToastVisible(false);
  //   }, 3000); // Hide toast after 3 seconds
  // };
  const dropdownOptions = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  const data = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const [cart, setCart] = useState(null);
  console.log("carttt",cart)
  console.log(typeof cart);
  const [loading, setLoading] = useState(true);
  const cartItemsArray = cart?.cart_items;
  const openModal = () => {
    console.log('openmodal');
    setModalVisible(true);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://staging11.originmattress.com.sg/wp-json/custom-cart-api/v1/get-cart-products`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userToken?.token}`,
          },
        },
      );

      setCart(response?.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error.response.data);
      setLoading(false);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('hello');
    fetchData();
  }, []);

  const handleValueChange = item => {
    setSelectedValue(item.value);
  };

  const deleteCart = product_id => {
    let data = JSON.stringify({
      product_id: product_id,
    });
  
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'https://staging11.originmattress.com.sg/wp-json/remove-product-from-cart/v1/remove',
      headers: {
        Authorization: `${userToken?.token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
  
    axios
      .request(config)
      .then(response => {
        console.log('Product removed:', response.data.message);
        
     

        // Fetch updated cart data after successful deletion
        fetchData();
      })
      .catch(error => {
        console.log('Error removing product:', error);
      });
  };
  
  

  const renderOrderItem = ({item}) => {
    return (
      <View style={styles.productContainer}>
        <View style={{width: '40%', height: 100, justifyContent: 'center'}}>
          {item.product_image ? (
            <Image
              source={{uri: item?.product_image}}
              style={styles.productImage}
            />
          ) : (
            <Text>No image available</Text>
          )}
        </View>
        <View style={styles.rightproduct}>
          <Text style={{color: '#000000', fontSize: 18, fontWeight: 600}}>
            {item?.product_name}
          </Text>
          <Text style={{color: '#000000', fontSize: 15}}>${item?.price}</Text>
          <View style={styles.quantityline}>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: '#DEDEDE'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={[styles.iconStyle]}
              data={data}
              search
              maxHeight={500}
              minHeight={20}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Qty' : ''}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />

            <ToastProvider>
              <TouchableOpacity
                onPress={() => {
                 
                  console.log(
                    'Pressed button for product_id:',
                    item.product_id,
                  );
                  deleteCart(item.product_id);
                }}>
                <Text
                  style={{
                    color: '#363636',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </ToastProvider>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CommonHeader title={'Shopping Cart'} navigation={navigation} />
        {/* 
        <FlatList
      data={cartItemsArray}
      keyExtractor={(item, index) => index.toString()} 
      renderItem={renderOrderItem}
    /> */}

        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#30B0C9"
            />
          </View>
        ) : (
          <FlatList
            data={cartItemsArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderOrderItem}
          />
        )}
        <View style={styles.carttotals}>
          <View
            style={{
              height: 60,
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: scale(16),
                fontWeight: 700,
              }}>
              Cart Totals
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: 700,
              }}>
              $180
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CheckoutDetails')}
            style={{
              height: 60,
              width: '50%',
              backgroundColor: '#30B0C9',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: scale(16), fontWeight: 700}}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>

        <CustomModal
          style={styles.customModal}
          visible={modalVisible}
          modalText="Removed cart Succesfuly"
        />
        {toastVisible && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>Removed cart Succesfuly!</Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  productContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 130,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    elevation: 5,
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
    marginTop: 30,
    marginBottom: 60,
    flexDirection: 'row',
    height: 90,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },

  mydropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    flex: 1,
    height: 40,
  },
  picker: {
    backgroundColor: '#fafafa',
    width: 150, // Specify the width here
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
  subtitle: {
    fontSize: 18,
    color: '#23233C',
    // fontWeight: '700',
    marginVertical: 5,
    width: 105,
    // fontFamily:"Arial-Medium",
    opacity: 0.6,
    fontFamily: 'Montserrat-Medium',
  },
  dropdown: {
    height: 26,
    borderColor: '#CECECE',
    borderWidth: 1.2,
    borderRadius: 5,
    paddingHorizontal: 8,
    width: 70,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#888888',
    fontFamily: 'Montserrat-Medium',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 27,
    height: 27,
    tintColor: '#1E84B3',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  quantityContainer: {
    marginRight: 10,
    width: 50, // Adjust width as needed
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
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

export default ShoppingCartScreen;
