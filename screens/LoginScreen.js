// LoginScreen.js
import React, { useState } from 'react';
import {TouchableOpacity,Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../theme/styles';
import Button from '../components/atoms/Button';
import { Input,SecureInput } from '../components/atoms/Input';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Make a POST request to the login API endpoint
      const response = await fetch('http://www.brystal.co.za/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Check if the response was successful (status code 200)
      if (response.ok) {
        // Login successful
        navigation.navigate('Home'); // Navigate to the 'Home' screen
      } else {
        // Login failed
        // Get the error message from the response body, if available
        const responseBody = await response.json();
        const errorMessage = responseBody.error || 'Unknown error';

        console.log('Login failed:', errorMessage);
      }
    } catch (error) {
      // Error occurred during the login request
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DFF Eggs</Text>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.inputView}>
        <Input
          placeholder="Username..."
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputView}>
        <SecureInput
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
      <Button style={styles.loginBtn} onPress={handleLogin} title="LOGIN" />
      <Button style={styles.loginBtn} onPress={() => navigation.navigate('Register')} title="Signup" />
    </View>
  );
};

export default LoginScreen;
