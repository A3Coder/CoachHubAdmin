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
  Pressable,
  FlatList,
  Modal,
  Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Dropdown } from 'react-native-element-dropdown';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faGreaterThan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png'
import DIVIDER from '../../assets/images/divider.png'
import AVATAR from '../../assets/images/avatar.jpg'

const selectClass = [
  { label: 'Class V', value: 'V' },
  { label: 'Class VI', value: 'VI' },
  { label: 'Class VII', value: 'VII' },
  { label: 'Class VIII', value: 'VIII' },
  { label: 'Class IX', value: 'IX' },
  { label: 'Class X', value: 'X' },
];

const SelectMonth = [

  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },

];

const PostDueFees = () => {
  const [selectedClass, setSelectedClass] = useState('V');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [amount, setAmount] = useState('1200');

  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const [isFocus, setIsFocus] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);

  const handlePost = () => {
    // Logic to post data
    console.log(selectedClass, selectedMonth, amount);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
              <View>
                <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.headerText}>Post Due Fees</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <StatusBar backgroundColor="#4477BB" barStyle="light-content"></StatusBar>
          <View style={styles.Section3_container}>
            <View style={{ padding: 18, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
              <View>
                <Text style={{ color: 'black', fontSize: 16 }}>Select Class</Text>
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

              <View>
                <Text style={{ color: 'black', fontSize: 16 }}>Select Month</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={SelectMonth}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus2 ? 'Select item' : '....'}
                  value={value2}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                    setValue2(item.value);
                    setIsFocus2(false);
                  }}
                />
              </View>

              <View>
                <Text style={{ color: 'black', fontSize: 16 }}>Amount</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType='numeric'
                />
              </View>
            </View>
          </View>
          {/* <Image style={styles.img} source={BOTTOMVECTOR}/> */}
        </ScrollView>

        <TouchableOpacity onPress={() => console.log('Pressed Post')} activeOpacity={0.7} style={{ width: '90%', position: 'absolute', bottom: 0, marginVertical: 15, alignSelf: 'center' }}>
          <View>
            <Text style={styles.btn}>POST</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ SafeAreaView >
    //     <Button
    //   title="POST"
    //   onPress={handlePost}
    //   color="#007bff"
    // />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black'
  },
  picker: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 20,
    padding: 10,
  },

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
    backgroundColor: 'transparent',
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
    marginBottom: 20,
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
    fontSize: 25,
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

export default PostDueFees;
