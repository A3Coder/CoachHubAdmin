import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const data = [
  {label: 'I', value: 'I'},
  {label: 'II', value: 'II'},
  {label: 'III', value: 'III'},
  {label: 'IV', value: 'IV'},
  {label: 'V', value: 'V'},
  {label: 'VI', value: 'VI'},
  {label: 'VII', value: 'VII'},
  {label: 'VIII', value: 'VIII'},
];
const data2 = [
  {label: 'Monday', value: 'Monday'},
  {label: 'Tuesday', value: 'Tuesday'},
  {label: 'Wednesday', value: 'Wednesday'},
  {label: 'Thursday', value: 'Thursday'},
  {label: 'Friday', value: 'Friday'},
  {label: 'Saturday', value: 'Saturday'},
  {label: 'Sunday', value: 'Sunday'},
];
const data3 = [
  {label: 'Math', value: 'Math'},
  {label: 'Science', value: 'Science'},
  {label: 'English', value: 'English'},
];
const UpdateTimeTable = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  const [value3, setValue3] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);
  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}>
        {/* <View>
                <FontAwesomeIcon
                  size={20}
                  style={styles.headerIcon}
                  icon={faLessThan}></FontAwesomeIcon>
              </View> */}

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <StatusBar
            backgroundColor="#4477BB"
            barStyle="light-content"></StatusBar>
          <View style={styles.Section3_container}>
            <View
              style={{
                padding: 35,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                // marginLeft: -10,
              }}>
              <View>
                <Text style={{fontSize: 17, marginLeft: -4}}>Select Class</Text>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                <Text style={{fontSize: 17, marginLeft: -4, marginTop: 40}}>
                  Select Day
                </Text>
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data2}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus2 ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value2}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                    setValue2(item.value);
                    setIsFocus2(false);
                  }}
                />
              </View>
              <View style={{marginBottom: 20}}>
                <Image
                  source={require('./assets/divider.png')}
                  style={{width: '100%'}}
                />
              </View>
              <View style={styles.next}>
                <View>
                  <Text style={{fontSize: 16.3, marginLeft: -4}}>
                    Select Subject
                  </Text>
                  <Dropdown
                    style={[styles.dropdown2]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={data3}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus3 ? 'Select item' : '...'}
                    searchPlaceholder="Search..."
                    value={value3}
                    onFocus={() => setIsFocus3(true)}
                    onBlur={() => setIsFocus3(false)}
                    onChange={item => {
                      setValue3(item.value);
                      setIsFocus3(false);
                    }}
                  />
                </View>
                <View style={{marginLeft: 20}}>
                  <Text style={{fontSize: 16.3, marginLeft: -4}}>
                    Set Timing
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 16.3,
                      width: 160,
                      borderBottomWidth: 1,
                      fontWeight: 'bold',
                      borderBottomColor: 'gray',
                    }}></TextInput>
                </View>
              </View>
              <View style={styles.parent}>
                <View style={styles.line}></View>
                <View style={styles.child}>
                  <Text
                    style={{
                      color: 'blue',
                      marginRight: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Add
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#4477BB',
                      // width: 200,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        color: 'white',
                      }}>
                      <AntDesign name="plus" color={'white'} size={18} />
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'blue',
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Subject
                  </Text>
                </View>
                <View style={styles.line}></View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: '#4477BB',
                  // width: 200,
                  borderRadius: 10,
                  marginTop: 240,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                    padding: 15,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: -10,
  },

  icon: {
    marginRight: 5,
  },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    fontSize: 17,
    color: 'black',
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  dropdown2: {
    width: 170,
    height: 50,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: -10,
  },
  next: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 20,
    width: 60,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  child: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default UpdateTimeTable;
