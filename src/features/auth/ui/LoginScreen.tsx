import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

function LoginScreen() {

  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput
        placeholder="PasswordSS"
        secureTextEntry
      />
      <Button title="Login" />
    </View>
  );
}

export default LoginScreen;
