import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../../theme/styles';

const Button = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.loginText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
