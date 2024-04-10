import React from 'react';
import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

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

const LeaveApplication = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
              <View style={[styles.parent]}>
                <View>
                  <Text style={[styles.text]}>Studentd ID</Text>
                  <Text style={{marginTop: 9, fontSize: 19}}>SV202401</Text>
                </View>
                <View>
                  <Text style={{marginBottom: 8, color: 'blue', fontSize: 18}}>
                    Class
                  </Text>
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
                </View>
              </View>
              <View style={[styles.parent2]}>
                <View>
                  <Text style={[styles.text]}>Studentd ID</Text>
                  <Text style={{marginTop: 9, fontSize: 19}}>SV202401</Text>
                </View>
                <View>
                  <Text style={{marginBottom: 8, color: 'blue', fontSize: 18}}>
                    Class
                  </Text>
                  <Dropdown
                    style={[styles.dropdown2]}
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
                </View>
              </View>

              <View style={[styles.all]}>
                <View style={[styles.parent3]}>
                  <View>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Studentd ID
                    </Text>
                    <Text style={{marginTop: 9, fontSize: 19, color: 'white'}}>
                      SV202401
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{marginBottom: 8, color: 'white', fontSize: 18}}>
                      Class
                    </Text>
                    <Dropdown
                      style={[styles.dropdown2]}
                      placeholderStyle={styles.placeholderStyle2}
                      selectedTextStyle={styles.selectedTextStyle2}
                      iconStyle={styles.iconStyle2}
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
                  </View>
                </View>

                <View style={[styles.box]}>
                  <View>
                    <Text style={{fontSize: 16}}>Application Title</Text>
                    <Text
                      style={{
                        fontSize: 16.5,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 7,
                      }}>
                      Leave Application
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Accept
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 1,
                        borderRadius: 80,
                        marginTop: 6,
                        marginLeft: 15,
                      }}></View>
                  </View>
                </View>
                <View style={[styles.box]}>
                  <View>
                    <Text style={{fontSize: 16}}>Description</Text>
                    <Text
                      style={{
                        fontSize: 16.5,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 7,
                      }}>
                      Dear sir,Iam suffering...
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Reject
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 1,
                        borderRadius: 80,
                        marginTop: 6,
                        marginLeft: 11,
                      }}></View>
                  </View>
                </View>
              </View>
              <View style={[styles.all]}>
                <View style={[styles.parent3]}>
                  <View>
                    <Text style={{color: 'white', fontSize: 18}}>
                      Studentd ID
                    </Text>
                    <Text style={{marginTop: 9, fontSize: 19, color: 'white'}}>
                      SV202401
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{marginBottom: 8, color: 'white', fontSize: 18}}>
                      Class
                    </Text>
                    <Dropdown
                      style={[styles.dropdown2]}
                      placeholderStyle={styles.placeholderStyle2}
                      selectedTextStyle={styles.selectedTextStyle2}
                      iconStyle={styles.iconStyle2}
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
                  </View>
                </View>

                <View style={[styles.box]}>
                  <View>
                    <Text style={{fontSize: 16}}>Application Title</Text>
                    <Text
                      style={{
                        fontSize: 16.5,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 7,
                      }}>
                      Leave Application
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Accept
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 1,
                        borderRadius: 80,
                        marginTop: 6,
                        marginLeft: 15,
                      }}></View>
                  </View>
                </View>
                <View style={[styles.box]}>
                  <View>
                    <Text style={{fontSize: 16}}>Description</Text>
                    <Text
                      style={{
                        fontSize: 16.5,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 7,
                      }}>
                      Dear sir,Iam suffering...
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Reject
                    </Text>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 1,
                        borderRadius: 80,
                        marginTop: 6,
                        marginLeft: 11,
                      }}></View>
                  </View>
                </View>
              </View>
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
    borderBottomWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    // marginLeft: 100,
    width: 190,
    marginTop: -10,
  },
  dropdown2: {
    height: 50,
    borderBottomWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    // marginLeft: 100,
    width: 190,
    marginTop: -10,
  },

  placeholderStyle: {
    fontSize: 18,
    // color: 'black',
  },
  selectedTextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 45,
    height: 45,
  },
  placeholderStyle2: {
    fontSize: 18,
    color: 'white',
  },
  selectedTextStyle2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  iconStyle2: {
    width: 45,
    height: 45,
    // color: 'white',
  },
  parent: {
    borderColor: 'gray',
    width: 345,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 7,
    borderRadius: 6,
  },
  parent3: {
    borderColor: 'gray',
    // width: 345,
    borderWidth: 1,
    backgroundColor: '#4477BB',
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    borderRadius: 10,
  },
  parent2: {
    borderColor: 'gray',
    width: 345,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,
    borderRadius: 6,
    marginTop: 20,
  },
  text: {
    color: 'blue',
    fontSize: 18,
  },
  all: {
    width: 345,
    borderWidth: 0.5,
    marginTop: 20,
    borderRadius: 10,
    paddingBottom: 20,
  },
  box: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default LeaveApplication;
