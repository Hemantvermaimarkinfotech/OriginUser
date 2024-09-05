// CommonComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import ImagePaths from '../utils/ImagePaths';
import colors from '../utils/Colors';
import mStyle from '../../AppStyles';

const CommonHeader = ({ title, navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const navigateToShoppingCart = () => {
    navigation.navigate('ShoppingCart');
  };


  
  return (
    <>
    <SafeAreaView style={{backgroundColor: colors.white}} />

    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Image
          source={ImagePaths.back} // Replace with your back button icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={{flexDirection :'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.title, {fontWeight: '600'}]}>{title}</Text>
      </View>

      <TouchableOpacity style={styles.buttonCart} onPress={navigateToShoppingCart}>
        <Image
          source={ImagePaths.shopping} // Replace with your back button icon
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    // paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.white, // Header background color
    // borderColor: colors.lightT,
    // borderBottomWidth: 0.2,
  },
  button: {
    // padding: 10,
    position: 'absolute', 
    left: 10,
    padding: 10,
  },
  buttonCart: {
    // padding: 10,
    position: 'absolute', 
    right: 10,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
    // tintColor: colors.primary, // Icon color
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.black, // Title color
    letterSpacing: 1
  }
});

export default CommonHeader;

// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import ImagePaths from '../utils/ImagePaths';

// const CommonHeader = ({ title }) => {
//   const navigation = useNavigation();

//   const handleCartPress = () => {
//     // Handle cart icon press action here
//   };

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//         {/* Insert back button icon/image here */}
//         <Image
//           source={ImagePaths.back} // Replace with your back button icon
//           style={styles.icon}
//         />
//         <Text>Back</Text>
//       </TouchableOpacity>
//       <Text style={styles.title}>{title}</Text>
//       <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
//         {/* Insert cart icon/image here */}
//         {/* <Image source={require('./path_to_cart_icon.png')} style={styles.cartIcon} /> */}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = {
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     height: 50, // You can adjust the height as needed
//     backgroundColor: 'lightblue', // Example background color
//   },
//   backButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 50, // Adjust as needed
//     height: '100%',
//   },
//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   cartButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 50, // Adjust as needed
//     height: '100%',
//   },
//   cartIcon: {
//     width: 25, // Adjust as needed
//     height: 25, // Adjust as needed
//     resizeMode: 'contain',
//   },
// };

// export default CommonHeader;

