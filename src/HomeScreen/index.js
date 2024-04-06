import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import { AuthContext } from '../context/AuthContext'

//Importing Components
import Attendance_FeesDue from '../components/HomeScreenComponents/Attendance_FeesDue'
import Options from '../components/HomeScreenComponents/Options'

//Importing Assets
import AVATAR from '../assets/images/avatar.jpg'

//Importing Assets
import AttendanceIcon from '../assets/images/HomeScreen/attendanceIcon.png'
import FeesDueIcon from '../assets/images/HomeScreen/feesdueIcon.png'
import TeachersIcon from '../assets/images/HomeScreen/teachersIcon.png'
import StudentsIcon from '../assets/images/HomeScreen/studentsIcon.png'
import PlayQuizIcon from '../assets/images/HomeScreen/playquizIcon.png'
import AssignmentIcon from '../assets/images/HomeScreen/assignmentIcon.png'
import HolidayIcon from '../assets/images/HomeScreen/holidayIcon.png'
import TimeTableIcon from '../assets/images/HomeScreen/timetableIcon.png'
import ResultIcon from '../assets/images/HomeScreen/resultIcon.png'
import DateSheetIcon from '../assets/images/HomeScreen/datesheetIcon.png'
import LeaveIcon from '../assets/images/HomeScreen/leaveIcon.png'
import ChangePasswordIcon from '../assets/images/HomeScreen/changepasswordIcon.png'
import EventIcon from '../assets/images/HomeScreen/eventIcon.png'
import LogoutIcon from '../assets/images/HomeScreen/logoutIcon.png'
import SupportIcon from '../assets/images/SupportScreen/support.png'


const Home = () => {
  const { Logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);

  const navigation = useNavigation()
  const tapProfile = () => {
    navigation.navigate("Profile")
  }

  const tapNotifications = () => {
    navigation.navigate('Notifications')
  }

  const studentId = userInfo != null ? userInfo.studentId : 'SV202401'
  const [data, setData] = useState({
    name: '',
    profilePhoto: '',
    aadharNo: '',
    admissionYear: '',
    class: '',
    dateofAdmission: '',
    dateofBirth: '',
    motherName: '',
    fatherName: '',
    permanentAddress: ''
  })

  return (
    <>
      <StatusBar
        backgroundColor="#4477BB"
        barStyle="light-content"></StatusBar>
      <View style={styles.mainContainer}>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewContainer}>
        <View style={styles.greetingContainer}>
          <View style={styles.userInfoContainer}>
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 700, marginBottom: 10 }}>Hi Admin Name</Text>
            <View style={{ width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ width: '80%', backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 7, borderRadius: 50, textAlign: 'center', color: '#4477BB', fontSize: 15, fontWeight: 700 }}>COACHING NAME</Text>
            </View>
          </View>

          {/* <View style={{ width: 90, height: 90, }}>
            <View style={{position: 'absolute', top: -35, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Pressable onPress={() => console.log('Pressed')} android_ripple={{ foreground: true, borderless: true }} style={styles.scanner}>
                <MaterialIcons name="qr-code-scanner" size={30} color="white" />
              </Pressable>
              <Pressable onPress={tapNotifications} android_ripple={{ foreground: true, borderless: true }} style={styles.notification}>
                <Ionicons name='notifications' size={30} color="white" />
              </Pressable>
            </View>
            <TouchableOpacity onPress={tapProfile} activeOpacity={0.7} style={styles.userImageContainer}>
              <View style={styles.userImage}>
                {
                  data.profilePhoto != "" ? <Image source={{ uri: data.profilePhoto }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Image source={AVATAR} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                }
              </View>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.statContainer}>
          <View style={{ width: '48%' }}>
            <Attendance_FeesDue icon={AttendanceIcon} title='Attendance' desc='Check / Update' bgColor='#FCF3E2'></Attendance_FeesDue>
          </View>
          <View style={{ width: '48%' }}>
            <Attendance_FeesDue icon={FeesDueIcon} title='Fees' desc='Check / Update' bgColor='#FFD8FF'></Attendance_FeesDue>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={StudentsIcon} desc={'Student Details'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={TeachersIcon} desc={'Teacher Details'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={PlayQuizIcon} desc={'Update Quiz'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={AssignmentIcon} desc={'Give Assignment'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={HolidayIcon} desc={'Update Holidays'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={TimeTableIcon} desc={'Time Table'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={ResultIcon} desc={'Post Result'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={DateSheetIcon} desc={'Update Date Sheet'}></Options>
          </View>
          {/* <View style={{ width: '48%' }}>
            <Options icon={DoubtsIcon} desc={'Ask Doubts'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={GalleryIcon} desc={'Coaching Gallery'}></Options>
          </View> */}
          <View style={{ width: '48%' }}>
            <Options icon={LeaveIcon} desc={'Leave Applications'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={EventIcon} desc={'Update Events'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={ChangePasswordIcon} desc={'Change Password'}></Options>
          </View>
          <View style={{ width: '48%' }}>
            <Options icon={LogoutIcon} desc={'Logout'}></Options>
          </View>
          <View style={{ width: '100%' }}>
            <Options icon={SupportIcon} desc={'Support'}></Options>
          </View>
        </View>
      </ScrollView>
      {/* <View>
        <Text style={{ color: 'red', fontSize: 24, alignSelf: 'center' }}>Home! {userInfo.data.name}</Text>
        <CustomButton
          text="Logout"
          onPress={() => { Logout() }}
        />
      </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 255,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  scrollViewContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 15,
  },
  greetingContainer: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userInfoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 90,
    height: 90,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50,
    overflow: 'hidden'
  },
  statContainer: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    rowGap: 14,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Home