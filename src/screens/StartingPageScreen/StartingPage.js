import { View, Text, Image, Dimensions, StyleSheet, TextInput, Alert, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

//importing Assets
// import StartPageImage from '../../assets/images/start_page.jpg'
import StartPageImage2 from '../../assets/images/start_page2.jpg'

export default function StartingPage(props) {
  const navigation = useNavigation()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 2000); // 3000 milliseconds = 3 seconds

    // Clear the timeout if the component is unmounted before the delay
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"></StatusBar>
      <View>
        {/* <Text>StartingPage</Text> */}
        <Image source={StartPageImage2} style={{ width: Dimensions.get('window').width, height: Dimensions.get('screen').height }}
          resizeMode="cover"></Image>
      </View>
    </>
  )
}