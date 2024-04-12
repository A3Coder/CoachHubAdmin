import React, { useEffect, useState } from 'react';
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
  Pressable,
  FlatList,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';

import { useNavigation } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import {
  faGreaterThan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png';
import DIVIDER from '../../assets/images/divider.png';
import AVATAR from '../../assets/images/avatar.jpg';
import ipAddress from '../../url';

const attendanceData = [
  {
    studentId: 'SV202401',
    name: 'Md. Aasif Ali Aadil',
    isPresent: true,
  },
  {
    studentId: 'SV202402',
    name: 'Md. Abdul Rab',
    isPresent: false,
  },
  {
    studentId: 'SV202403',
    name: 'Md. Amir',
    isPresent: true,
  },
  {
    studentId: 'SV202404',
    name: 'Nitesh Kumar',
    isPresent: true,
  },
  {
    studentId: 'SV202405',
    name: 'Md. Ashfaque',
    isPresent: false,
  },
  {
    studentId: 'SV202406',
    name: 'Hari Narayan Mishra',
    isPresent: '',
  },
];

const AttendanceScreen = () => {
  const navigation = useNavigation();

  //States for Class DropDown
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectClass, setselectClass] = useState([])

  //States for Date Inputs
  const [date, setdate] = useState(new Date());
  const [datePicker, setdatePicker] = useState(false);
  const [modal, setmodal] = useState(false);

  //States for Attendance Data
  const [data, setdata] = useState(attendanceData);
  const [selectedOption, setselectedOption] = useState(null);
  const handleStateChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], isPresent: value }
    setdata(updatedData);
    setselectedOption(index);
  };

  //States for Query Data
  const [queryData, setqueryData] = useState([]);
  const [queryValue, setqueryValue] = useState('');
  const handleQueryInput = e => {
    setqueryValue(e);
    let input = e;
    const queryData = data.filter(item => {
      const pattern = new RegExp(input, 'gi');
      if (pattern.exec(item.name) != null) {
        return true;
      } else if (pattern.exec(item.studentId) != null) {
        return true;
      } else {
        return false;
      }
    });

    setqueryData(queryData);
  };

  //Fetch Data from Backend
  const fetchClasses = async () => {
    const response = await fetch(`http://${ipAddress}:3000/api/v1/classes`).then((res) => res.json())

    var classes = []
    response.forEach((item) => {
      var temp = { label: `Class ${item.class}`, value: item.class }

      classes.push(temp)
    })

    setselectClass(classes)
  }
  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
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
            <Text style={styles.headerText}>Attendance</Text>
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
                padding: 18,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontSize: 16 }}>Select Class</Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={selectClass}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select item' : '....'}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontSize: 16 }}>Select Date</Text>
                  <TextInput
                    value={date.toLocaleDateString('en-GB')}
                    onFocus={() => setmodal(!modal)}
                    onChange={() => setmodal(!modal)}
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
                        setdate(new Date(params.date));
                      }}
                    />
                  )}
                </View>
              </View>

              <Modal visible={modal} transparent={true} animationType="slide">
                <Pressable
                  onPress={() => setmodal(false)}
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
                        setdate(new Date(params.date));
                        setmodal(false);
                      }}
                    />
                  </View>
                </Pressable>
              </Modal>

              <View style={{ width: '100%' }}>
                <Image
                  source={DIVIDER}
                  resizeMode="contain"
                  style={{ width: '100%' }}></Image>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  color="#4477BB"
                  size={16}
                  style={{ position: 'absolute', left: 8 }}
                />
                <TextInput
                  style={{
                    width: '100%',
                    fontSize: 17,
                    paddingLeft: 30,
                    paddingVertical: 3,
                    fontWeight: 'bold',
                    color: 'black',
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    borderStyle: 'dashed',
                    borderRadius: 10,
                  }}
                  placeholder="Search Student"
                  value={queryValue}
                  onChangeText={e => handleQueryInput(e)}></TextInput>
              </View>

              <View
                style={{
                  marginTop: 15,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  backgroundColor: '#4477BB',
                }}>
                <View style={{ width: '25%' }}>
                  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>
                    Student Name
                  </Text>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>
                    Student Id
                  </Text>
                </View>
                <View style={{ width: '18%' }}>
                  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>
                    Present
                  </Text>
                </View>
                <View style={{ width: '18%' }}>
                  <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>
                    Absent
                  </Text>
                </View>
              </View>

              {queryValue != ''
                ? queryData.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'grey',
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      backgroundColor: 'white',
                    }}>
                    <View style={{ width: '25%' }}>
                      <Text style={{fontSize: 12, textAlign: 'center', color: 'black' }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ width: '25%' }}>
                      <Text style={{fontSize: 12, textAlign: 'center', color: 'black' }}>
                        {item.studentId}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '18%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          handleStateChange(index, true);
                        }}
                        android_ripple={{ foreground: true, borderless: true }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          borderWidth: 0.5,
                          borderColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.isPresent === true && (
                          <View
                            style={[
                              {
                                width: '80%',
                                height: '80%',
                                borderRadius: 50,
                                borderWidth: 0.5,
                                borderColor: 'grey',
                                backgroundColor: '#79eb2d',
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}></View>
                        )}
                      </Pressable>
                    </View>
                    <View
                      style={{
                        width: '18%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          handleStateChange(index, false);
                        }}
                        android_ripple={{ foreground: true, borderless: true }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          borderWidth: 0.5,
                          borderColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.isPresent === false && (
                          <View
                            style={{
                              width: '80%',
                              height: '80%',
                              borderRadius: 50,
                              borderWidth: 0.5,
                              borderColor: 'grey',
                              backgroundColor: '#f75843',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}></View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                ))
                : data.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'grey',
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      backgroundColor: 'white',
                    }}>
                    <View style={{ width: '25%' }}>
                      <Text style={{fontSize: 12, textAlign: 'center', color: 'black' }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ width: '25%' }}>
                      <Text style={{fontSize: 12, textAlign: 'center', color: 'black' }}>
                        {item.studentId}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '18%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          handleStateChange(index, true);
                        }}
                        android_ripple={{ foreground: true, borderless: true }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          borderWidth: 0.5,
                          borderColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.isPresent === true && (
                          <View
                            style={[
                              {
                                width: '80%',
                                height: '80%',
                                borderRadius: 50,
                                borderWidth: 0.5,
                                borderColor: 'grey',
                                backgroundColor: '#79eb2d',
                                justifyContent: 'center',
                                alignItems: 'center',
                              },
                            ]}></View>
                        )}
                      </Pressable>
                    </View>
                    <View
                      style={{
                        width: '18%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          handleStateChange(index, false);
                        }}
                        android_ripple={{ foreground: true, borderless: true }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          borderWidth: 0.5,
                          borderColor: 'grey',
                          backgroundColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {item.isPresent === false && (
                          <View
                            style={{
                              width: '80%',
                              height: '80%',
                              borderRadius: 50,
                              borderWidth: 0.5,
                              borderColor: 'grey',
                              backgroundColor: '#f75843',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}></View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                ))}
            </View>
            {/* <Image style={styles.img} source={BOTTOMVECTOR}/> */}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => Alert.alert('ok')}
          activeOpacity={0.7}
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 0,
            marginVertical: 15,
            alignSelf: 'center',
          }}>
          <View>
            <Text style={styles.btn}>Update Attendance</Text>
          </View>
        </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },

  Section3_container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 80,
    paddingBottom: 60
  },
  dropdown: {
    height: 50,
    // borderColor: 'blue',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#4477BB',
    textAlign: 'center',
    color: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 20,
    marginHorizontal: 4,
    fontWeight: 'bold',
    marginTop: 20,
    textTransform: 'uppercase',
  },

  img: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 90,
    width: '100%',
  },
});

export default AttendanceScreen;
