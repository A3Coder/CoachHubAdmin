import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

//FontAwesome Icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLessThan} from '@fortawesome/free-solid-svg-icons/faLessThan';

import {Dropdown} from 'react-native-element-dropdown';

//Assets
import Logo from '../../assets/images/bottomvector.png';
import divider from '../../assets/images/divider.png';
import BOTTOMVECTOR from '../../assets/images/bottomvector.png';

const TimetableScreen = () => {
  const navigation = useNavigation();
  const selectClass = [
    {label: 'Class V', value: 'V'},
    {label: 'Class VI', value: 'VI'},
    {label: 'Class VII', value: 'VII'},
    {label: 'Class VIII', value: 'VIII'},
    {label: 'Class IX', value: 'IX'},
    {label: 'Class X', value: 'X'},
  ];

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  //Variables
  const [active, setActive] = useState('MON');

  //dummyData (Should be fetched from Backend)
  const timeTable = {
    MON: [
      {
        period: 1,
        subject: 'Computer Science',
        time: '08:15am - 09:00am',
        teacher: 'Cherise James',
      },
      {
        period: 2,
        subject: 'Mathematics',
        time: '09:00am - 09:45am',
        teacher: 'Rivka Steadman',
      },
      {
        period: 3,
        subject: 'English',
        time: '09:45am - 10:30am',
        teacher: 'Marta Magana',
      },
      {
        period: 4,
        subject: 'Science',
        time: '11:00am - 11:45am',
        teacher: 'Danica Partridge',
      },
    ],
    TUE: [
      {
        period: 1,
        subject: 'Mathematics',
        time: '09:00am - 09:45am',
        teacher: 'Rivka Steadman',
      },
      {
        period: 2,
        subject: 'English',
        time: '09:45am - 10:30am',
        teacher: 'Marta Magana',
      },
      {
        period: 3,
        subject: 'Science',
        time: '11:00am - 11:45am',
        teacher: 'Danica Partridge',
      },
    ],
    WED: [
      {
        period: 1,
        subject: 'English',
        time: '09:45am - 10:30am',
        teacher: 'Marta Magana',
      },
      {
        period: 2,
        subject: 'Science',
        time: '11:00am - 11:45am',
        teacher: 'Danica Partridge',
      },
      {
        period: 3,
        subject: 'Computer Science',
        time: '11:45am - 12:30am',
        teacher: 'Cherise James',
      },
      {
        period: 4,
        subject: 'Mathematics',
        time: '12:30am - 01:15am',
        teacher: 'Rivka Steadman',
      },
    ],
    THU: [
      {
        period: 1,
        subject: 'Mathematics',
        time: '08:15am - 09:00am',
        teacher: 'Cherise James',
      },
      {
        period: 2,
        subject: 'English',
        time: '09:00am - 09:45am',
        teacher: 'Rivka Steadman',
      },
      {
        period: 3,
        subject: 'Computer Science',
        time: '09:45am - 10:30am',
        teacher: 'Marta Magana',
      },
    ],
    FRI: [
      {
        period: 1,
        subject: 'Biology',
        time: '08:15am - 09:00am',
        teacher: 'Cherise James',
      },
      {
        period: 2,
        subject: 'Physics',
        time: '09:00am - 09:45am',
        teacher: 'Rivka Steadman',
      },
    ],
    SAT: [
      {
        period: 1,
        subject: 'Computer Lab',
        time: '08:15am - 09:00am',
        teacher: 'Cherise James',
      },
      {
        period: 2,
        subject: 'Chemistry Lab',
        time: '09:00am - 09:45am',
        teacher: 'Rivka Steadman',
      },
      {
        period: 3,
        subject: 'Biology Lab',
        time: '09:45am - 10:30am',
        teacher: 'Marta Magana',
      },
    ],
  };

  const [data, setData] = useState(timeTable.MON);

  return (
    <>
      <StatusBar backgroundColor="#4477BB" barStyle="light-content"></StatusBar>
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
          <Text style={styles.headerText}>Timetable</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{padding: 15}}>
          <View style={{marginTop: 30, marginLeft: 8}}>
            <Text style={{fontSize: 16}}>Select Class</Text>
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
          <View style={{width: '100%'}}>
            <Image
              source={divider}
              resizeMode="contain"
              style={{width: '100%'}}
            />
          </View>
          <View
            style={{
              borderRadius: 50,
              width: '100%',
              alignItems: 'center',
              overflow: 'hidden',
              marginBottom: 13,
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'grey',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setActive('MON');
                  setData(timeTable.MON);
                }}
                activeOpacity={0.5}
                style={
                  active == 'MON'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {paddingLeft: 15}
                }>
                <Text
                  style={
                    active == 'MON'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  MON
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive('TUE');
                  setData(timeTable.TUE);
                }}
                activeOpacity={0.5}
                style={
                  active == 'TUE'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {width: '10%', alignItems: 'center'}
                }>
                <Text
                  style={
                    active == 'TUE'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  TUE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive('WED');
                  setData(timeTable.WED);
                }}
                activeOpacity={0.5}
                style={
                  active == 'WED'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {width: '10%', alignItems: 'center'}
                }>
                <Text
                  style={
                    active == 'WED'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  WED
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive('THU');
                  setData(timeTable.THU);
                }}
                activeOpacity={0.5}
                style={
                  active == 'THU'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {width: '10%', alignItems: 'center'}
                }>
                <Text
                  style={
                    active == 'THU'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  THU
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive('FRI');
                  setData(timeTable.FRI);
                }}
                activeOpacity={0.5}
                style={
                  active == 'FRI'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {width: '10%', alignItems: 'center'}
                }>
                <Text
                  style={
                    active == 'FRI'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  FRI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive('SAT');
                  setData(timeTable.SAT);
                }}
                activeOpacity={0.5}
                style={
                  active == 'SAT'
                    ? {
                        backgroundColor: '#4477BB',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        borderRadius: 50,
                      }
                    : {paddingRight: 15}
                }>
                <Text
                  style={
                    active == 'SAT'
                      ? {fontWeight: 900, color: 'white'}
                      : {fontWeight: 900, color: 'black'}
                  }>
                  SAT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  opacity: 0.8,
                  width: '100%',
                  padding: 13,
                  borderWidth: 1,
                  borderColor: '#C3D0EA',
                  borderRadius: 20,
                  gap: 10,
                  marginBottom: 12,
                }}>
                <Text style={{fontSize: 18, fontWeight: 900, color: 'black'}}>
                  {item.subject}
                </Text>
                <Text style={{fontSize: 16, fontWeight: 500, color: '#4477BB'}}>
                  {item.time}
                </Text>
                <View
                  style={{
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#4477BB',
                  }}></View>
                <View
                  style={{
                    width: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 500, color: '#4477BB'}}>
                    {item.teacher}
                  </Text>
                  <Text style={{fontSize: 16, fontWeight: 900, color: 'black'}}>
                    Period {item.period}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => Alert.alert('ok')}>
                <View>
                  <Text style={styles.btn}>UPDATE TIMETABLE</Text>
                </View>
              </TouchableOpacity>
        </View>
        {/* <View style={styles.logoContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode='contain'></Image>
                </View> */}
        <Image style={styles.img} source={BOTTOMVECTOR} />
      </ScrollView>
    </>
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
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
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
  contentContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // padding: 15,
  },
  scrollView: {
    flexGrow: 1,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: -1,
  },
  logo: {
    width: '100%', // Adjust the width as needed
    maxHeight: 150, // Set a maximum height
  },
  img: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 90,
    width: '100%',
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
});

export default TimetableScreen;
