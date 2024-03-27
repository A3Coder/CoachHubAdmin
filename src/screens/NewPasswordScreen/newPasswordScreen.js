import React, { useEffect, useState } from 'react'
import { 
    View,
     Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    ActivityIndicator
    
} from 'react-native'

import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Logo from '../../assets/images/bottomvector.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewPasswordScreen = () => {
  
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const {control, handleSubmit,watch} = useForm();
  const Navigation=useNavigation();
  const pwd = watch('password');
  
  const onSubmitPressed = async (data)=>{
    
    setLoading(true);
    try {
      const apiUrl = await 'http://192.168.1.11:3000/api/v1/auth/reset-password';
      // const apiUrl = await 'http://localhost:3000/api/v1/auth/login';

      setTimeout(() => {
   const res =     fetch(apiUrl, {
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
                'Password Reset Successful 🎉',
                'Your password has been successfully reset. You can now use your new password to log in securely.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      
                      AsyncStorage.removeItem('email');
                      
                      Navigation.navigate('SignIn')
                      setErrormsg(null);
                    },
                  },
                ]
              );
            }
          }).catch((error) => {
            console.error('Error: ', error);
            setErrormsg('Error occurred while processing your request');
            setLoading(false);

          });
      }, 2000);
    } catch (error) {
      console.error('Error: ', error);
    }
  };
  const onSignInpress=async ()=>{
    
    Navigation.navigate('SignIn')
  };
  const onResendOtp = async () => {
    setSeconds(59)
    setMinutes(1)
    try {
      let email = await AsyncStorage.getItem('email');
       
      if (!email) {
        // Handle the case when email is not available
        setErrormsg('Email not found');
        return;
      }
  
      email = JSON.parse(email);
        
      const apiUrl = 'http://192.168.1.11:3000/api/v1/auth/resend-otp';
  
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...email }),
      });
  
      const resData = await res.json();
  
       
      setLoading(false);
  
      if (resData.error) {
        setErrormsg(resData.error);
      } else {
        
        setErrormsg(null);

      }
    } catch (error) {
      console.error('Error: ', error);
      setErrormsg('Error occurred while processing your request');
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    const Interval = setInterval(()=>{
      //Decrease Second if Greater than 0
      if(seconds>0){
        setSeconds(seconds-1);
      }
      //When second reached 0, decrease minutes if greater than 0
      if(seconds===0){
         if(minutes===0){
          //Stop the countdown when both minutes and seconds are 0
          clearInterval(Interval);
         }else{
            //Reset seconds to 59 and decrease minutes by 1
            setSeconds(59);
            setMinutes(minutes-1);
         }
      }
    },1000);
    return ()=>{
      //Cleanup: the Interval when the component unmounts
      clearInterval(Interval);
    }

  },[seconds]);//Re-run this effect whenever 'seconds' changes
 
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
  <ScrollView contentContainerStyle={{flexGrow:1}}>
   {/* <View style={styles.container}> */}
    <View style={styles.section1_Container}>
    <View style={styles.section1}>
    <Text style={styles.title}>Reset your password</Text>

    {errormsg ? <Text style={styles.errormsg} >{errormsg}</Text> : null}
     
    <CustomInput 
    placeholder='Enter OTP' 
    name='otp'
    control={control}
    rules={{
      required:'OTP is required',
      numPattern:true
    }}
    maxLength={6}
    />
   <CustomInput
          name="password"
          placeholder="Enter a new password"
          control={control}
          securityTextEntry={!showPassword}
          rules={{
            required: 'New password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
            maxLength: {
              value: 16,
              message: 'Password should be max 16 characters long',
            },
            
          
          }}
          maxLength={16}
        />
         <CustomInput
              name="ConfirmPassword"
              control={control}
              placeholder="Confirm Password"
              securityTextEntry={!showPassword}
              rules={{
                validate: value => value === pwd || 'Password do not match',
              }}
              maxLength={16}
              isPasswordConfirm={true}
            />
        <View style={{paddingVertical:20}}>
        <Text style={{color:'black'}}>
            Didn't Receive OTP?
           </Text>
        <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:10}}>
        
        <TouchableOpacity
            disabled = {seconds > 0 ||minutes > 0}
            onPress={onResendOtp}
            onPressOut={()=>setErrormsg(null)}
          >
           
            <Text
            style={{
              color:seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630"
            }}
            >Resend OTP</Text>
          </TouchableOpacity>
         

          <Text style={{color:'black'}}>{minutes < 10 ?`0${minutes}`:minutes}:{seconds < 10 ? `0${seconds}`:seconds}</Text>
          

         
        </View>
        </View>
     <CustomButton 
     text={loading ? 'Please wait...' : 'Submit'}
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
  //  height:'100%',    
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
export default NewPasswordScreen