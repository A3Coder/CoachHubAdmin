// SignInScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Logo from '../../assets/images/bgvector.png';
import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const SignInScreen = () => {
  const { login, } = useContext(AuthContext);

  const { height } = useWindowDimensions();
  const [showPassword, setShowPassword] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {
    setLoading(true);
    try {
      const apiUrl = await 'http://http://192.168.167.182:3000/api/v1/auth/login';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...data }),
      })
        .then(res => res.json())
        .then(resData => {
          setLoading(false);
          if (resData.error) {
            setErrormsg(resData.error);
          } else {
            Alert.alert(
              'Welcome Back! 🎉',
              'You have successfully logged in. Explore and enjoy the features of our app!',
            );
            login(resData);
            // navigation.navigate('home');
            setErrormsg(null);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
          setErrormsg('Error occurred while processing your request');
          setLoading(false);
        });
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
    setErrormsg(null);
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
    setErrormsg(null);
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#00ff00" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.Section1_conatainer}>
            <View style={styles.logoContainer}>
              <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.section2_container}>
            <Text style={styles.title}>Hi Admin</Text>
            <Text style={styles.content}>Sign in to continue</Text>
          </View>
          <View style={styles.Section3_container}>
            <View style={styles.section3}>
              {errormsg ? (
                <Text style={styles.errormsg}>{errormsg}</Text>
              ) : null}
              <CustomInput
                name="email"
                placeholder="Enter your Email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                }}
                onChange2={() => {
                  setErrormsg(null);
                }}
              />

              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                securityTextEntry={!showPassword}
                rules={{ required: 'Password is required' }}
                onChange2={() => setErrormsg(null)}
                maxLength={16}
              />
              <CustomButton
                text={loading ? 'Login...' : 'Sign In'}
                onPress={handleSubmit(onSignInPressed)}
                // onPress={()=>{login()}}
                onPress2={() => setErrormsg(null)}
                disabled={loading}
              />
              <CustomButton
                text="Forgot Password?"
                onPress={onForgotPasswordPressed}
                type="TERTIARY"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  section2_container: {
    paddingHorizontal: 20,
  },
  Section1_conatainer: {},
  Section3_container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 200,
  },
  logoContainer: {
    width: '80%',
    maxWidth: 300,
    maxHeight: 300,
    marginLeft: 64,
    marginTop: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '600',
    paddingBottom: 5,
  },
  content: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  section3: {
    flex: 1,
    padding: 25,
  },
  errormsg: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    // backgroundColor: 'yellow',
    paddingVertical: 5,
    borderRadius: 5,
    fontWeight: '500',
  },
});

export default SignInScreen;
