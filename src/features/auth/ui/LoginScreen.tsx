import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BaseScreen from '../../../components/containers/BaseScreen';
import { LoginService } from '../service/LoginService';
import FullScreenLoader from '../../../components/loading/FullScreenLoader';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa los campos');
      return;
    }

    try {
      setLoading(true);
      const result = await LoginService.login(email, password);

      if (result.success) {
        console.log('LOGIN OK:', result.data);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen
      barStyle="dark-content"
      safeArea={{ top: false, bottom: false }}
    >
      <ImageBackground
        source={require('../../../assets/images/background_login.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={
                Platform.OS === 'ios' ? 'interactive' : 'none'
              }
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.card}>
                {/* Header icon */}
                <View style={styles.iconWrapper}>
                  <View style={styles.iconCircle}>
                    <Image
                      source={require('../../../assets/images/salad.png')}
                      style={styles.circleLogo}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <Text style={styles.title}>Iniciar sesión</Text>
                <Text style={styles.subtitle}>
                  Ingresa tu correo y contraseña.
                </Text>

                {/* Email */}
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Correo"
                    placeholderTextColor="#8E8E93"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    editable={!loading}
                  />
                  <Icon name="email-outline" size={20} color="#9E9E9E" />
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#8E8E93"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    editable={!loading}
                  />

                  <Pressable
                    onPress={() => setShowPassword(prev => !prev)}
                    hitSlop={10}
                    disabled={loading}
                  >
                    <Icon
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={22}
                      color={showPassword ? '#2B6EF2' : '#9E9E9E'}
                    />
                  </Pressable>
                </View>

                {/* Login button */}
                <Pressable
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.createAccount}
                  onPress={() => {}}
                  disabled={loading}
                >
                  <Text style={styles.createText}>Crear una cuenta</Text>
                  <Icon name="arrow-right-bold-box" size={28} color="#7AAAF2" />
                </Pressable>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

        <FullScreenLoader visible={loading} />
      </ImageBackground>
    </BaseScreen>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  background: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
    elevation: 6,
  },

  iconWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },

  iconCircle: {
    width: 124,
    height: 124,
    borderRadius: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  circleLogo: {
    width: 90,
    height: 90,
  },

  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#2B6EF2',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 4,
    marginBottom: 18,
    lineHeight: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    paddingVertical: 18,
    color: '#111111',
  },

  button: {
    backgroundColor: '#2B6EF2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: 'white',
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  createAccount: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 6,
  },

  createText: {
    fontSize: 16,
    color: '#2B6EF2',
    fontWeight: '600',
  },
});
