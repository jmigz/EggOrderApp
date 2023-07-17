// RegisterScreen.js
import React, { useState } from 'react';
import {TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../theme/styles';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      // Make a POST request to the register API endpoint
      const response = await fetch('http://www.brystal.co.za/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      // Check if the response was successful (status code 200)
      if (response.ok) {
        // Registration successful
        navigation.navigate('Login'); // Navigate to the 'Login' screen
      } else {
        // Registration failed
        // Get the error message from the response body, if available
        const responseBody = await response.json();
        const errorMessage = responseBody.error || 'Unknown error';

        console.log('Registration failed:', errorMessage);
      }
    } catch (error) {
      // Error occurred during the registration request
      console.error('Error registering:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DFF Eggs</Text>
      <Text style={styles.title}>Signup</Text>

      <View style={styles.inputView}>
        <Input
          placeholder="Username..."
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <Input
          secureTextEntry={!showPassword}
          placeholder="Password..."
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPasswordText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <Input
          placeholder="Email..."
          onChangeText={text => setEmail(text)}
        />
      </View>
      <Button style={styles.loginBtn} onPress={handleRegister} title="REGISTER" />
    </View>
  );
};

RegisterScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  ),
});

export default RegisterScreen;
