import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import TitleHeader from '../components/TitleHeader';
import CreateUserInput from '../components/CreateUserInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';

const ChatMessage = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const validateForm = () => {
    if (
      firstName.trim() === '' ||
      email.trim() === '' ||
      subject.trim() === '' ||
      message.trim() === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    } else if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', {
        firstName,
        email,
        subject,
        message
      });
      toggleModal();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TitleHeader title={'Chat'} navigation={navigation} />
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center' }}>
        <Image source={require('../assets/images/Chaticon.png')} style={{ height: 45, width: 45, resizeMode: 'contain' }} />
        <View style={{ width: '80%', marginTop: 2 }}>
          <Text numberOfLines={2} style={{ color: '#23233C', fontSize: 13, marginTop: 10, fontWeight: '300', textAlign: 'center' }}>
            If you’re enquiring regarding an existing order, please fill up the following:
          </Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardShouldPersistTaps={'handled'}
        extraHeight={140}
        style={{ width: '85%', alignSelf: 'center' }}
      >
        <View style={styles.marginHorizontal}>
          <CreateUserInput
            inputHeader={'Your Name'}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            placeholder={'Write'}
          />

          <CreateUserInput
            inputHeader={'Email'}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder={'Write'}
          />

          <CreateUserInput
            inputHeader={'Subject'}
            onChangeText={text => setSubject(text)}
            value={subject}
            placeholder={'Write'}
          />

          <CreateUserInput
            inputHeader={'Message'}
            onChangeText={text => setMessage(text)}
            value={message}
            placeholder={'Write'}
          />

          <TouchableOpacity style={styles.continueButton} 
        //   onPress={handleSubmit}
        onPress={toggleModal} 
          >
            <Text style={styles.continueButtonText}>Leave Message</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/images/Chaticon.png')} style={{ height: 45, width: 45 }} />
            <Text style={styles.modalTitle}>Thank You</Text>
            <Text style={styles.modalText}>We have received your message. We will get back to you soon.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 10,
  },
  continueButton: {
    backgroundColor: '#30B0C9',
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  continueButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height:250,
    width:300,
    justifyContent:"center",
    alignItems:"center"
  },
  modalTitle: {
    color: '#30B0C9',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  modalText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#30B0C9',
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
});

export default ChatMessage;
