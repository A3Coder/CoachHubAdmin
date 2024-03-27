import React, { useState } from 'react'
import { 
    View,
     Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Alert,
    ActivityIndicator
    
} from 'react-native'


import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Logo from '../../assets/images/bottomvector.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPasswordScreen = () => {
  
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const [showPassword, setShowPassword] = useState(false);
  const {control, handleSubmit,watch} = useForm();
  const Navigation=useNavigation();

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  const onSubmitPressed = async (data)=>{
    
    setLoading(true);
    try {
      const apiUrl = await 'http://192.168.1.11:3000/api/v1/auth/forgot-password';
      // const apiUrl = await 'http://localhost:3000/api/v1/auth/login';

     
    fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ ...data }),
        }).then((res) => res.json())
          .then((resData) => {
            setLoading(false);
            if (resData.error) {
              setErrormsg(resData.error);
            } else {
              Alert.alert(
                'OTP Sent Successfully 🚀',
                'We have sent a one-time password (OTP) to your registered email id. Please check your messages and enter the OTP to proceed.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Handle any additional actions after sending OTP
                      Navigation.navigate('NewPassword')
                      setErrormsg(null);
                      AsyncStorage.setItem('email', JSON.stringify(data))
                    },
                  },
                ]
              );
            }
          }).catch((error) => {
            console.log('Error: ', error);
            setErrormsg('Error occurred while processing your request');
            setLoading(false);

          });
      
    } catch (error) {
      console.log('Error: ', error);
    }
    
   
  };
  const onSignInpress=()=>{
    Navigation.navigate('SignIn')
  };
 
  if(loading){
    return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} color="#00ff00"/>
    </View>

    )}

  return (
    <SafeAreaView style={ { flex: 1 } }>

    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   {/* <View style={styles.container}> */}
    <View style={styles.section1_Container}>
    <View style={styles.section1}>
    <Text style={styles.title}>Reset your password</Text>

    {errormsg ? <Text style={styles.errormsg} >{errormsg}</Text> : null}

    <CustomInput
              name="email"
              placeholder='Enter your Email'
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: { value: EMAIL_REGEX, message: 'Email is invalid' }, 
                }}
              
            />
     <CustomButton 
     text={loading ? 'Sent OTP...' : 'Submit'}
     onPress={handleSubmit(onSubmitPressed)}
     onPress2={() => setErrormsg(null)}
     disabled={loading}
     />  
     
     <CustomButton
      text2='Back to Sign in'
      onPress={onSignInpress}
      type='TERTIARY2'
     />
     </View>
     <View style={styles.logoContainer}>
         <Image source={Logo} style={styles.logo} resizeMode='contain'/>
       </View>
    </View>
    {/* </View> */}
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
     
   container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:'red'
  },
  section1_Container: {
    
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    marginTop:40,
  },
  // blackSection: {
  //   flex: 1,
  //   backgroundColor: 'black',
  // },

  section1:{
    padding:20,
    flex:1,
    // justifyContent:'center',
    // alignItems:'center'
  },
 
logoContainer:{
   width:'100%',    
   flex:1, 
   justifyContent:'flex-end',
   alignItems:'flex-end',
  
},
logo:{
  width:'100%',
 
},
title:{
  fontSize: 24,
  fontWeight:'bold',
  color:'#051C60',
  margin:10,
},
errormsg: {
  color: 'red',
  fontSize: 15,
  textAlign: 'center',
  backgroundColor: 'yellow',
  paddingVertical: 5,
  borderRadius: 5,
  fontWeight: '500'
}
   
})
export default ForgotPasswordScreen