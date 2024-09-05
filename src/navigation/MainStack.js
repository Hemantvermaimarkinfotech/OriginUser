// src/navigation/MainStack.js
import React,{useContext} from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView,Alert } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import MainHeader from '../components/MainHeader';

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import PayoutScreen from '../screens/Payout';
import TrackingScreen from '../screens/Tracking';
import SettingScreen from '../screens/Setting';
import UserProfileScreen from '../screens/UserProfile';
import colors from '../utils/Colors';
import TrackingStatusScreen from '../screens/TrackingStatus';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import MapRouteScreen from '../screens/MapRoute';
import TitleHeader from '../components/TitleHeader';
import ProductListScreen from '../screens/ProductList';
import ProductDetailScreen from '../screens/ProductDetails';
import WriteReviewScreen from '../screens/WriteReview';
import ReviewScreen from '../screens/ReviewScreen';
import ShoppingCartScreen from '../screens/ShoppingCart';
import CheckoutDetailScreen from '../screens/CheckoutDetails';
import CheckoutDetails1 from '../screens/CheckoutDetails1';
import PaymentScreen from '../screens/Payment';
import EditProfileScreen from '../screens/EditProfile';
import OrderScreen from '../screens/Order';
import RefundOrderScreen from '../screens/RefundOrder';
import ChatScreen from '../screens/Chat';
import ChatMessage from '../screens/ChatMessage';
import { AuthContext } from '../components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from '../components/Modal';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
    {/* <Stack.Screen name="Subpage1" component={Subpage1Screen} />
    <Stack.Screen name="Subpage2" component={Subpage2Screen} /> */}
  </Stack.Navigator>
);

const OrderStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrderStack" component={OrderScreen} options={{ headerShown: false }} />
    {/* Add more screens for Orders subpages if needed */}
    <Stack.Screen name="RefundOrder" component={RefundOrderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
    {/* <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{ headerShown: false }} /> */}
    <Stack.Screen name="WriteReview" component={WriteReviewScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CheckoutDetails" component={CheckoutDetailScreen}  options={{ headerShown: false }} />
    <Stack.Screen name="CheckoutDetails1" component={CheckoutDetails1}  options={{ headerShown: false }} />
    <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const HistoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tracking" component={TrackingScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="TrackingStatus" component={TrackingStatusScreen} options={{ headerShown: false }}/>
    {/* Add more screens for Tracking subpages if needed */}
    <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChatMessage" component={ChatMessage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
    {/* Add more screens for Setting subpages if needed */}
  </Stack.Navigator>
);



const BottomTabsNavigator = ({ navigation }) => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarStyle: {
          backgroundColor: 'white', // Set background color here
          borderWidth: 0,
          shadowColor: colors.shadowColor, // Add shadow color
          shadowOpacity: 0.25, // Adjust shadow opacity as needed
          shadowRadius: 2, // Adjust shadow radius as needed
          elevation: 5, // Android only, adjust elevation as needed
        },
      }}>

      <Tab.Screen name="Home" component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/home.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Home</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          header: () => <MainHeader title="Payout" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="Orders" component={OrderStack} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/shoppingBag.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Orders</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          headerShown: false
          // headerTitle: (props) => <TopHeader />
          // header: () => <TitleHeader title="Orders" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="History" component={HistoryStack}
        options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../assets/images/iconImages/history.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor: focused ? colors.primary : colors.black,
                  }}
                />
                <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>History</Text>
              </View>
            ),
            tabBarLabel: () => null,
            headerStyle: {
              height: 120, // Set the desired height value
              shadowColor: '#fff',
            },
            headerShown: false,
            // headerTitle: (props) => <TopHeader />
            // header: () => <TitleHeader title="Tracking" navigation={navigation} />, // Custom header component
        }}/>

      <Tab.Screen name="Settings" component={SettingsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/iconImages/setting.png')}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  tintColor: focused ? colors.primary : colors.black,
                }}
              />
              <Text style={{fontSize: 14, fontWeight: 500, marginTop: 5, color: focused ? colors.primary : colors.black}}>Settings</Text>
            </View>
          ),
          tabBarLabel: () => null,
          headerStyle: {
            height: 120, // Set the desired height value
            shadowColor: '#fff',
          },
          // headerTitle: (props) => <TopHeader />
          header: () => <TitleHeader title="Settings" navigation={navigation} />, // Custom header component
        }}/>
        
    </Tab.Navigator>
);



const CustomDrawerContent = ({ navigation }) => {
  const { userToken, setUserToken } = useContext(AuthContext);
// console.log("userTokenddddd",userToken)
  const logout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setUserToken(null);
            await AsyncStorage.removeItem('userData');
            navigation.navigate('GetStarted'); 
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  
  return (
    <>
    <SafeAreaView style={{backgroundColor: colors.white}} />
    <View style={{ flex: 1, marginHorizontal: 15, marginTop:20}}>
      {/* Drawer Header */}
      <View style={mStyle.drawerHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Image source={ImagePaths.menuIcon} style={[mStyle.drawerIcon, {marginTop: 10}]} />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('UserProfile')}>        
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.userAvatarIcon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Profile</Text>
      </TouchableOpacity>
  

      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Tracking')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.orderIcon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Tracking')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.orderTracking2Icon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Tracking</Text>
      </TouchableOpacity>
 
      <TouchableOpacity style={mStyle.drawerButton} onPress={() => navigation.navigate('Payout')}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.income2Icon} style={mStyle.drawerIcon} /></View>
        <Text style={[mStyle.drawerText]}>Payout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={mStyle.drawerButton} onPress={logout}>
        <View style={mStyle.drawerIconView}><Image source={ImagePaths.logoutIcon} style={[mStyle.drawerIcon,{height:22,width:22}]} /></View>
        <Text style={[mStyle.drawerText]}>Logout</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="DrawerBottomTabs"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      width: '80%', // Adjust the width of the drawer as needed
    }}
    >
    <Drawer.Screen name="DrawerBottomTabs" component={BottomTabsNavigator} options={{ headerShown: false }}/>
      {/* Add more screens for Drawer if needed */}

      {/* <Drawer.Screen  name="Homee" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen  name="Homeee" component={HomeScreen} options={{ headerShown: false }} /> */}
  </Drawer.Navigator>
);



const MainStack = () => {

  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="DrawerNavigator">

      {/* <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CheckoutDetails" component={CheckoutDetailScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="WriteReview" component={WriteReviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CheckoutDetails1" component={CheckoutDetails1}  options={{ headerShown: false }} />
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Tracking" component={TrackingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Modal" component={Modal} options={{ headerShown: false }} />
      <Stack.Screen name="MapRoute" component={MapRouteScreen} 
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent', // Change the background color
          },
          headerTitleStyle: {
            color: '#fff', // Change the text color
          },
          // headerLeft: () => (
          //   <TouchableOpacity
          //     style={{ marginLeft: 10 }}
          //     onPress={() => navigation.goBack()}
          //   >
          //     <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>Back</Text>
          //   </TouchableOpacity>
          // ),
        }} />

      {/* <Stack.Screen name="BottomTabs" component={BottomTabsNavigator} options={{ headerShown: false }} />  */}
     

    </Stack.Navigator>
  );

};

export default MainStack;






