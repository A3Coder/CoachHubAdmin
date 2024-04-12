import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TextInput,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';

import DateTimePicker from 'react-native-ui-datepicker';
import TimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CircleSnail } from 'react-native-progress';

import AVATAR from '../../assets/images/avatar.jpg';

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png';

const UpdateEventesScreen = () => {
  const navigation = useNavigation();

  //States for Date Inputs
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [modal, setModal] = useState(false);

  //States for Time Inputs
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setTimePickerVisible(Platform.OS === 'ios');
    setSelectedTime(currentTime);
  };

  const [profilePhoto, setProfilePhoto] = useState('');
  const [photoLoader, setPhotoLoader] = useState(false);

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          //Upload in Cloudinary
          setPhotoLoader(true);
          const data = new FormData();
          data.append('file', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });
          data.append('upload_preset', 'rtyykkwo');
          data.append('cloud_name', 'dvirrnppm');
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/dvirrnppm/image/upload`,
            {
              method: 'POST',
              body: data,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            },
          )
            .then(res => res.json())
            .catch(err => console.log(err));
          //Now get the Response from Cloudinary and update the Profile Photo State
          setPhotoLoader(false);
          setProfilePhoto({ uri: res.url });
        }
      },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.goBack();
              }}>
              <View>
                <FontAwesomeIcon
                  size={20}
                  style={styles.headerIcon}
                  icon={faLessThan}></FontAwesomeIcon>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.headerText}>Add Event</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <StatusBar
            backgroundColor="#4477BB"
            barStyle="light-content"></StatusBar>
          <View style={styles.Section3_container}>
            <View
              style={{
                padding: 20,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <View style={{ marginTop: 30, marginLeft: 8 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>
                  Event Heading
                </Text>

                <TextInput
                  placeholder="Enter event heading"
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: 1,
                  }}></TextInput>
                <View
                  style={{
                    width: '97%',
                    borderBottomWidth: 0.5,
                    backgroundColor: 'grey',
                    marginTop: 5,
                  }}></View>
              </View>

              <View style={{ marginTop: 30, marginLeft: 8 }}>
                <Text style={{ fontSize: 16, color: 'black' }}>
                  Event Description
                </Text>
                <TextInput
                  placeholder="Enter event description"
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: 3,
                  }}></TextInput>
                <View
                  style={{
                    width: '97%',
                    borderBottomWidth: 0.5,
                    backgroundColor: 'black',
                    marginTop: 10,
                  }}></View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ width: '48%', marginTop: 30, marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>Date</Text>
                  <TextInput
                    value={date.toLocaleDateString('en-GB')}
                    onFocus={() => setModal(!modal)}
                    onChange={() => setModal(!modal)}
                    placeholder="Select date"
                    style={{
                      flex: 1,
                      height: 50,
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'black',
                      paddingHorizontal: 8,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'grey',
                    }}></TextInput>
                  {datePicker && (
                    <DateTimePicker
                      weekDaysTextStyle={{ color: 'black' }}
                      headerTextStyle={{ color: 'black' }}
                      calendarTextStyle={{ color: 'black' }}
                      selectedItemColor="#4477BB"
                      mode="single"
                      date={date}
                      onChange={params => {
                        setDate(new Date(params.date));
                      }}
                    />
                  )}
                </View>
                <View style={{ width: '48%', marginTop: 30, marginLeft: 8 }}>
                  <Text style={{ fontSize: 16, color: 'black' }}>
                    Set Timing
                  </Text>
                  <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                    <TextInput
                      editable={false}
                      value={selectedTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      placeholder="Select time"
                      style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: 3,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: '97%',
                      borderBottomWidth: 0.5,
                      backgroundColor: 'black',
                      marginTop: 10,
                    }}></View>
                  {timePickerVisible && (
                    <TimePicker
                      testID="timePicker"
                      value={selectedTime}
                      mode="time"
                      is24Hour={false}
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )}
                </View>
              </View>

              <Modal visible={modal} transparent={true} animationType="slide">
                <Pressable
                  onPress={() => setModal(false)}
                  style={{
                    flex: 1,
                    padding: 15,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#4477BB',
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: 900,
                        color: 'white',
                      }}>
                      Select Date
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 15,
                    }}>
                    <DateTimePicker
                      weekDaysTextStyle={{ color: 'black' }}
                      headerTextStyle={{ color: 'black' }}
                      calendarTextStyle={{ color: 'black' }}
                      selectedItemColor="#4477BB"
                      mode="single"
                      date={date}
                      onChange={params => {
                        setDate(new Date(params.date));
                        setModal(false);
                      }}
                    />
                  </View>
                </Pressable>
              </Modal>

              <View
                style={{
                  width: 'auto',
                  height: '25%',
                  backgroundColor: 'black',
                  borderColor: 'black',
                  borderWidth: 0.4,

                  marginTop: 30,
                  marginLeft: 8,
                }}>
                <View>
                  {photoLoader == true ? (
                    <CircleSnail color={['#4477BB']} />
                  ) : profilePhoto != '' ? (
                    <Image
                      source={profilePhoto}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <Image
                      source={AVATAR}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={handleImagePicker}
                  activeOpacity={0.7}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60%',
                    borderRadius: 10,
                    borderColor: '#4477BB',
                    borderWidth: 2,
                  }}>
                  <Text style={{ fontSize: 18, color: '#4477BB', fontWeight: 700 }}>
                    Upload <FontAwesome name='plus-square' size={18} color='#4477BB' /> Banner
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => Alert.alert('ok')}>
                <View>
                  <Text style={styles.btn}>ADD EVENT</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <Image style={styles.img} source={BOTTOMVECTOR} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
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
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#4477BB',
  },

  Section3_container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 80,
  },
  dropdown: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: 'cyan-blue',
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 17,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  btn: {
    padding: 15,
    backgroundColor: '#4477BB',
    textAlign: 'center',
    color: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 16,
    marginLeft: 4,
    marginRight: 4,
    fontWeight: 'bold',
    marginTop: 40,
    textTransform: 'uppercase',
  },

  img: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 90,
    width: '100%',


  },

});
export default UpdateEventesScreen;
