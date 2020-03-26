import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  StyleSheet
} from 'react-native';
//linear gradient
import { LinearGradient } from 'expo-linear-gradient';
//components
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

const AuthScreen = () => (
  <KeyboardAvoidingView
    behavior="padding"
    KeyboardAvoidingView={50}
    style={styles.screen}
  >
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onInputChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            minLength={5}
            secureTextEntry
            autoCapitalize="none"
            errorMessage="Please enter a valid password."
            onInputChange={() => {}}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" color={Colors.primary} onPress={() => {}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Switch to Sign Up"
              color={Colors.accent}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
  </KeyboardAvoidingView>
);

export default AuthScreen;
