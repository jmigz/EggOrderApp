import React from 'react';
import { TextInput } from 'react-native';
import styles from '../../theme/styles';

const Input = ({ placeholder, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#003f5c"
      onChangeText={onChangeText}
    />
  );
};

const SecureInput = ({ placeholder, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#003f5c"
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export { Input, SecureInput };
