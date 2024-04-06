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
    FlatList
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { useNavigation } from '@react-navigation/native';

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
const selectSubject = [
    { label: 'Math', value: 'Math' },
    { label: 'English', value: 'English' },
    { label: 'Urdu', value: 'Urdu' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Bengali', value: 'Bengali' },
];

const selectnoofquestion = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    { label: '25', value: 25 },
];




const postquizScreen = () => {
    const navigation = useNavigation()

    const [classes, setClasses] = useState(null);
    const [subject, setSubject] = useState(null);
    const [noOfQuestion, setNoOfQuestion] = useState(null);


    const [isFocusClass, setIsFocusClass] = useState(false);
    const [isFocusSubject, setIsFocusSubject] = useState(false);
    const [isFocusNoOfQuestion, setIsFocusNoOfQuestion] = useState(false);



    //Handle Navigation
    const handleNavigation = () => {
        navigation.navigate('Student Details')
    }

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
                        <Text style={styles.headerText}>Post Quiz</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <StatusBar backgroundColor="#4477BB" barStyle="light-content"></StatusBar>
                    <View style={styles.Section3_container}>
                        <View style={{ padding: 18, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                            <View>
                                <Text style={{ fontSize: 16 }}>Select Class</Text>
                            </View>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={selectClass}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusClass ? 'Select Class' : '....'}
                                value={setClasses}
                                onFocus={() => setIsFocusClass(true)}
                                onBlur={() => setIsFocusClass(false)}
                                onChange={item => {
                                    setClasses(item.value);
                                    setIsFocusClass(false);
                                }}
                            />

          

                           

                           </View>
                           <View style={{ padding: 18, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                            <View>
                                <Text style={{ fontSize: 16 }}>Select Subject</Text>
                            </View>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={selectSubject}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusSubject ? 'Select Subject' : '....'}
                                value={setSubject}
                                onFocus={() => setIsFocusSubject(true)}
                                onBlur={() => setIsFocusSubject(false)}
                                onChange={item => {
                                    setSubject(item.value);
                                    setIsFocusSubject(false);
                                }}
                            />

                          

                           

                           </View>
                           <View style={{ padding: 18, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                            <View>
                                <Text style={{ fontSize: 16 }}>Select Total Number of question</Text>
                            </View>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={selectnoofquestion}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusNoOfQuestion ? 'Select Total Number of question' : '....'}
                                value={setNoOfQuestion}
                                onFocus={() => setIsFocusNoOfQuestion(true)}
                                onBlur={() => setIsFocusNoOfQuestion(false)}
                                onChange={item => {
                                    setNoOfQuestion(item.value);
                                    setIsFocusNoOfQuestion(false);
                                }}
                            />

                            <View style={{ width: '100%', }}>
                                <Image source={DIVIDER} resizeMode='contain' style={{ width: '100%' }}></Image>
                            </View>

                            <Pressable
                          onPress={() => {
                            handleStateChange(index, true);
                          }}
                          android_ripple={{foreground: true, borderless: true}}
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
                          {(
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
                        <Image
                            style={styles.img}
                            source={BOTTOMVECTOR}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
        backgroundColor: 'transparent',
    },

    Section3_container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 40,
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

export default postquizScreen