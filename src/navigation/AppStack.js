import { View, Text, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing Assets
import screenBG from '../assets/images/screenBG.png';
import homescreenBG from '../assets/images/homescreenBG.png';

import Home from '../HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import StudentsScreen from '../screens/StudentsScreen/StudentsScreen';
import StudentDetailsScreen from '../screens/StudentsScreen/StudentDetailsScreen';
import TeachersScreen from '../screens/TeachersScreen/TeachersScreen';
import TeacherDetailsScreen from '../screens/TeachersScreen/TeacherDetailsScreen';
import TeacherEnroll from '../screens/TeachersScreen/TeacherEnroll';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import GiveAssignmentScreen from '../screens/GiveAssignmentScreen';
import UpdateHolidayScreen from '../screens/UpdateHolidayScreen';
import UpdateEventsScreen from '../screens/UpdateEventsScreen';
import TimeTable from '../screens/TimeTable';
import AdminquizScreen from '../screens/AdminquizScreen/AdminquizScreen';
import PostQuiz from '../screens/AdminquizScreen/PostquizScreen';
import FeesScreen from '../screens/FeesScreen/Feesscreen';
import PostfeesScreen from '../screens/FeesScreen/PostfeesScreen';

import FeesStatusScreen from '../screens/StatusScreen/FeesStatusScreen';
import AttendanceStatusScreen from '../screens/StatusScreen/AttendanceStatusScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <Home />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Attendance">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <AttendanceScreen />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Students">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <StudentsScreen />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Student Details">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <StudentDetailsScreen />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Teachers">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <TeachersScreen />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Teacher Details">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <TeacherDetailsScreen />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Teacher Enroll">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <TeacherEnroll />
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="Change Password">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <ChangePasswordScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Give Assignment">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <GiveAssignmentScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Update Holidays">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <UpdateHolidayScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Update Events">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <UpdateEventsScreen />
          </View>
        )}
      </Stack.Screen>

      <Stack.Screen name="Time Table">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <TimeTable />
          </View >
        )}
      </Stack.Screen >

      <Stack.Screen name="Admin Quiz">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <AdminquizScreen />
          </View >
        )}
      </Stack.Screen >

      <Stack.Screen name="Post Quiz">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <PostQuiz />
          </View >
        )}
      </Stack.Screen >

      <Stack.Screen name="Fees">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <FeesScreen />
          </View >
        )}
      </Stack.Screen >

      <Stack.Screen name="Post Fees">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <PostfeesScreen />
          </View >
        )}
      </Stack.Screen >

      <Stack.Screen name="Fees Status">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <FeesStatusScreen />
          </View >
        )}
      </Stack.Screen >
      <Stack.Screen name="Attendance Status">
        {() => (
          <View style={{ flex: 1, backgroundColor: '#4477BB' }}>
            <ImageBackground
              resizeMode="contain"
              source={screenBG}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height - 650,
                position: 'absolute',
                top: 8,
              }}></ImageBackground>
            <AttendanceStatusScreen />
          </View >
        )}
      </Stack.Screen >
    </Stack.Navigator >
  );
};

export default AppStack;
