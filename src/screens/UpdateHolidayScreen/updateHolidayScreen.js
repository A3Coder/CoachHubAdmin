import React, {useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';

import {useNavigation} from '@react-navigation/native';

//FontAwesome Icons
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLessThan} from '@fortawesome/free-solid-svg-icons/faLessThan';

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png';


const UpdateHolidayScreen = () => {
  const navigation = useNavigation();

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  //States for Date Inputs
  const [date, setdate] = useState(new Date());
  const [datePicker, setdatePicker] = useState(false);
  const [modal, setmodal] = useState(false);

  
  return (
    <SafeAreaView style={{flex: 1}}>
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
            <Text style={styles.headerText}>Post Holiday</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <StatusBar
            backgroundColor="#4477BB"
            barStyle="light-content"></StatusBar>
          <View style={styles.Section3_container}>
            <View
              style={{
                // backgroundColor: 'white',
                padding: 20,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
             
              
              <View style={{marginTop: 30, marginLeft: 8}}>
                <Text style={{fontSize: 16}}>Holiday Year</Text>
                {/* <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: 10,
                  }}>
                  Factoring a sum or difference of two cubes
                </Text> */}
                <TextInput
            
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: 1,
                  }}
                  keyboardType='numeric'
                  >

                  </TextInput>
                <View
                  style={{
                    width: '97%',
                    borderBottomWidth: 0.5,
                    backgroundColor: 'grey',
                    marginTop: 5,
                  }}></View>
              </View>

              

              <View style={{marginTop: 30, marginLeft: 8}}>
                <Text style={{fontSize: 16}}>Holiday Date</Text>
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
                    weekDaysTextStyle={{color: 'black'}}
                    headerTextStyle={{color: 'black'}}
                    calendarTextStyle={{color: 'black'}}
                    selectedItemColor="#4477BB"
                    mode="single"
                    date={date}
                    onChange={params => {
                      setdate(new Date(params.date));
                    }}
                  />
                )}
                
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
                      weekDaysTextStyle={{color: 'black'}}
                      headerTextStyle={{color: 'black'}}
                      calendarTextStyle={{color: 'black'}}
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

              <View style={{marginTop: 30, marginLeft: 8}}>
                <Text style={{fontSize: 16}}>Holiday Name</Text>
                <TextInput
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

              <TouchableOpacity onPress={() => Alert.alert('ok')}>
                <View>
                  <Text style={styles.btn}>POST</Text>
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
    // borderColor: 'blue',
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
export default UpdateHolidayScreen;
