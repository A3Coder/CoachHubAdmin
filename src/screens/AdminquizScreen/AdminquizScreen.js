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
    Modal
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';

import { useNavigation } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faGreaterThan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png'
import DIVIDER from '../../assets/images/divider.png'
import AVATAR from '../../assets/images/avatar.jpg'
import ipAddress from '../../url';

const quizData = [
    {
        studentId: 'SX202401',
        name: 'Md. Aasif Ali Aadil',
        timing: '15 Secs',
        accuracy: '80%',
    },
    {
        studentId: 'SX202402',
        name: 'Md. Abdul Rab',
        timing: '18 Secs',
        accuracy: '76%',
    },
    {
        studentId: 'SX202403',
        name: 'Md. Amir',
        timing: '20 Secs',
        accuracy: '75%',
    },
    {
        studentId: 'SX202404',
        name: 'Nitesh Kumar',
        timing: '19 Secs',
        accuracy: '80%',
    },
    {
        studentId: 'SX202405',
        name: 'Md. Ashfaque',
        timing: '22 Secs',
        accuracy: '70%',
    },
    {
        studentId: 'SX202406',
        name: 'Hari Narayan Mishra',
        timing: '28 Secs',
        accuracy: '40%',
    },
]

const AdminquizScreen = () => {
    const navigation = useNavigation()

    const [classValue, setClassValue] = useState(null);
    const [subjectValue, setSubjectValue] = useState(null);

    const [isClassFocus, setClassFocus] = useState(false);
    const [isSubjectFocus, setSubjectFocus] = useState(false);

    //States for Class and Subject Dropdown
    const [selectClass, setselectClass] = useState([])
    const [selectSubject, setselectSubject] = useState([])

    //States for Quiz Data
    const [data, setdata] = useState(quizData)

    //States for Query Data
    const [queryData, setqueryData] = useState([])
    const [queryValue, setqueryValue] = useState('')
    const handleQueryInput = (e) => {
        setqueryValue(e)
        let input = e
        const queryData = quizData.filter((item) => {
            const pattern = new RegExp(input, "gi")
            if (pattern.exec(item.name) != null) {
                return true
            } else if (pattern.exec(item.studentId) != null) {
                return true
            } else {
                return false
            }
        })

        setqueryData(queryData)
    }

    //Fetch Data from Backend
    const fetchSubjects = async (classId) => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/classes/${classId}`).then((res) => res.json())

        var subjects = []
        response.subjects.forEach((item) => {
            var temp = { label: item.name, value: item.name }

            subjects.push(temp)
        })
        
        setselectSubject(subjects)
    }

    const fetchClasses = async () => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/classes`).then((res) => res.json())

        var classes = []
        response.forEach((item) => {
            var temp = { label: `Class ${item.class}`, value: item.class }

            classes.push(temp)
        })

        setselectClass(classes)
    }

    useState(() => {
        fetchClasses()
    }, [])

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
                        <Text style={styles.headerText}>Adminquiz Screen</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <StatusBar backgroundColor="#4477BB" barStyle="light-content"></StatusBar>
                    <View style={styles.Section3_container}>
                        <View style={{ padding: 18, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                        placeholder={!isClassFocus ? 'Select Class' : '....'}
                                        value={classValue}
                                        onFocus={() => setClassFocus(true)}
                                        onBlur={() => setClassFocus(false)}
                                        onChange={item => {
                                            setClassValue(item.value);
                                            setClassFocus(false);
                                            fetchSubjects(item.value)
                                        }}
                                    />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={{ fontSize: 16 }}>Select Subject</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        data={selectSubject}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isSubjectFocus ? 'Select Subject' : '....'}
                                        value={subjectValue}
                                        onFocus={() => setSubjectFocus(true)}
                                        onBlur={() => setSubjectFocus(false)}
                                        onChange={item => {
                                            setSubjectValue(item.value);
                                            setSubjectFocus(false);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={{ width: '100%', }}>
                                <Image source={DIVIDER} resizeMode='contain' style={{ width: '100%' }}></Image>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color='#4477BB' size={16} style={{ position: 'absolute', left: 8 }} />
                                <TextInput
                                    style={{ width: '100%', fontSize: 17, paddingLeft: 30, paddingVertical: 3, fontWeight: 'bold', color: 'black', borderWidth: 0.5, borderColor: 'grey', borderStyle: 'dashed', borderRadius: 10, }}
                                    placeholder='Search Student'
                                    value={queryValue}
                                    onChangeText={(e) => handleQueryInput(e)}>
                                </TextInput>
                            </View>

                            <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 5, backgroundColor: '#4477BB' }}>
                                <View style={{ width: '25%' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Student Name</Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Student Id</Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Timing</Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Accuracy</Text>
                                </View>
                            </View>

                            {
                                queryValue != '' ? queryData.map((item, index) => (
                                    <View key={index} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 8, paddingVertical: 10, backgroundColor: 'white' }}>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.name}</Text>
                                        </View>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.studentId}</Text>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.timing}</Text>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.accuracy}</Text>
                                        </View>
                                    </View>
                                )) : data.map((item, index) => (
                                    <View key={index} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 8, paddingVertical: 10, backgroundColor: 'white' }}>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.name}</Text>
                                        </View>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.studentId}</Text>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.timing}</Text>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 13, textAlign: 'center', color: 'black' }}>{item.accuracy}</Text>
                                        </View>
                                    </View>
                                ))
                            }

                        </View>
                        {/* <Image style={styles.img} source={BOTTOMVECTOR}/> */}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Post Quiz')} activeOpacity={0.7} style={{ width: '90%', position: 'absolute', bottom: 0, marginVertical: 15, alignSelf: 'center' }}>
                    <View>
                        <Text style={styles.btn}>Post Quiz</Text>
                    </View>
                </TouchableOpacity>
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

export default AdminquizScreen