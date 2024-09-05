// CustomModal.js
import React,{useState} from 'react';
import { View, Text, StyleSheet, Modal, Button ,Image,TouchableOpacity} from 'react-native';


const CustomModal = ({ visible, modalText }) => {
    const [modalVisible, setModalVisible] = useState(false)
const closeModal=()=>{
    console.log("hello")
setModalVisible(false)
}
   
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={{position:"absolute",top:-12,right:0,zIndex:1}}  onPress={closeModal} >
           <Image source={require("../assets/images/close.png")} style={{height:15,width:18,tintColor:"#FFFFFF"}}/>
          </TouchableOpacity>
       
          <View style={{width:"95%"}}>
          <Text style={styles.modalText}>{modalText} </Text> 
          </View>
         
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    height:65,
    borderRadius: 10,
    elevation: 5, // shadow for Android
    width:"90%",
    backgroundColor:"#fff",
    justifyContent:"center",
   position:"absolute",
   bottom:40,
   alignSelf:"center"
    
  },
  modalView: {
    height:65,
    borderRadius: 10,
    padding: 20,
    elevation: 5, // shadow for Android
    width:"100%",
    backgroundColor:"#abe6c2",
    justifyContent:"center",
  
  },
  modalText: {
    textAlign: 'center',
    fontSize: 17,
    color:"#363636",
    
   
  },
});

export default CustomModal;
