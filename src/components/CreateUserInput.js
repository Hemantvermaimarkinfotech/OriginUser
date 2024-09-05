import React, {memo} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {scale} from '../utils/Scale';
import colors from '../utils/Colors';
import {FontName} from '../utils/globalFonts';
const CreateUserInput = props => {
  const {inputHeader, multiline, onChangeText, value, placeholder, height} = props;

  return (
    <View style={styles.verticalStyle}>
      <Text style={styles.label}>
        {inputHeader}
        <Text style={styles.mandatoryField}>{' *'}</Text>
      </Text>
      <TextInput
        style={[styles.input, height && {minHeight : scale(120)}]}
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
        placeholder={placeholder}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  verticalStyle: {marginVertical: scale(14)},
  mandatoryField: {color: colors.red},
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: scale(6),
    color:"#23233C"
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: scale(5),
    fontSize: scale(16),
    fontFamily: FontName.Regular,
    color: colors.black,
    padding: scale(10),
    minHeight: scale(54),
  },
});

export default memo(CreateUserInput);
