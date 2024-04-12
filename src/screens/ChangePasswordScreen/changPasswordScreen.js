import React, { useEffect, useState,useContext } from 'react'
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
    ActivityIndicator,
    TouchableWithoutFeedback
    
} from 'react-native'

import CustomInput from '../../components/CustomeInput/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Logo from '../../assets/images/bottomvector.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';


const ChangePasswordScreen = () => {
  
  const {userInfo} = useContext(AuthContext);
  const { Logout} = useContext(AuthContext);
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const {control, handleSubmit,watch} = useForm();
  const Navigation=useNavigation();
  const pwd = watch('newPassword');
  
  const onSubmitPressed = async (data)=>{
    const email = userInfo.data.email
    setLoading(true);
    try {
      const apiUrl = 'http://192.168.0.101:3000/api/v1/auth/change-password';
      // const apiUrl = await 'http://localhost:3000/api/v1/auth/login';

      setTimeout( () => {
   const res =  fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ ...data,email:email }),
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
                      
                      // AsyncStorage.removeItem('email');
                      
                      // Navigation.navigate('SignIn')
                      Logout()
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
  // const email = userInfo.data.email
  // console.log(data,email)
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
  <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback onPress={() => { Navigation.goBack() }}>
                    {/* <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 10, borderWidth: 1, borderColor: '#96B1E5', borderRadius: 15, overflow: 'hidden' }}>
                            <FontAwesomeIcon icon={faArrowLeft} size={20} color='#6688CA'></FontAwesomeIcon>
                        </View> */}
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>Change Password</Text>
                </View>
            </View>
  <ScrollView contentContainerStyle={{flexGrow:1}}>
   {/* <View style={styles.container}> */}
    <View style={styles.section1_Container}>
    <View style={styles.section1}>
    <Text style={styles.title}>Change your password</Text>

    {errormsg ? <Text style={styles.errormsg} >{errormsg}</Text> : null}
     
    <CustomInput 
    placeholder='Enter a old Password' 
    name='oldPassword'
    control={control}
    securityTextEntry={!showPassword}
    rules={{
      required:'Old password is required',
      
    }}
    isOldPassword={true}
    />
   <CustomInput
          name="newPassword"
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
          isNewPassword={true}
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
    
     <CustomButton 
     text={loading ? 'Please wait...' : 'Submit'}
     onPress={handleSubmit(onSubmitPressed)}
     onPress2={() => setErrormsg(null)}
     disabled={loading}
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

  headerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 40,
},
headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
headerIcon: {
    color: 'white',
    fontWeight: '600',
},
headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
},
     
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
export default ChangePasswordScreen