// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

import MainHeader from '../components/MainHeader';
import ImagePaths from '../utils/ImagePaths';
import mStyle from '../../AppStyles';
import colors from '../utils/Colors';
import CommonHeader from '../components/CommonHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontName } from '../utils/globalFonts';
import { scale } from '../utils/Scale';
import TitleHeader from '../components/TitleHeader';
const {Bold, Medium, SemiBold, Regular} = FontName;

const ChatScreen = ({navigation}) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'KingSize', value: 'KingSize'},
    {label: 'QueenSize', value: 'QueenSize'},
    {label: 'NormalSize', value: 'NormalSize'},
  ]);
 

  

  return (
    <View style={{ flex: 1 }}>
        <TitleHeader title={'Chat'} navigation={navigation} />
        <View style={{justifyContent:"center",alignItems:"center",width:"80%",alignSelf:"center"}}>
          <Image source={require("../assets/images/Chat.png")} style={{height:100,width:100,resizeMode:"contain"}}/>
          <View style={{marginTop:2}}>
          <Text style={{textAlign:"center",color:"#23233C",fontSize:15,fontWeight:700}}>Jade</Text>
          <Text style={{textAlign:"center",color:"#23233C",fontSize:13,fontWeight:400}}> Support Agent</Text>
          </View>
          <View style={{marginTop:50}}>
            <Text numberOfLines={2} style={{color:"#000000",fontSize:18,fontWeight:600}}>Have you already bought an Origin product? *</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={'--choose--'}
              dropDownDirection={'BOTTOM'}
              showTickIcon={false}
              style={styles.firstDropDown}
              arrowIconStyle={styles.placeHolderIcon}
              placeholderStyle={styles.placeHolderDropDown}
              dropDownContainerStyle={styles.firstDropDownOption}
            />
             <TouchableOpacity
                style={styles.continueButton}
                // onPress={handleSubmit}
                onPress={() => navigation.navigate('ChatMessage')}>
                <Text style={styles.continueButtonText}>{'Start a chat'}</Text>
              </TouchableOpacity>
          </View>
        </View>
     
    </View>
  );
};


const styles = StyleSheet.create({
  firstDropDown: {
    borderColor: "gray",
    borderWidth: 1,
    zIndex: 2,
    marginTop:20
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
    borderColor: "gray",
    borderWidth: 1,
  },
  placeHolderDropDown: {
    color: "gray",
    fontSize: scale(14),
    fontFamily: Medium,
  },
  placeHolderIcon: {tintColor: "gray"},
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
    color: "#fff",
    fontWeight:'700'
  },
});

export default ChatScreen;
