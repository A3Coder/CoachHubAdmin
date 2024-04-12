import React, { useState, useEffect } from 'react';
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
import ipAddress from '../../url';

const QueryDataComponent = ({ item, index, data, navigate }) => {
    if (data === true) {
        return (
            <Pressable key={index} onPress={() => navigate(item.teacherId)} android_ripple={{ foreground: true, borderless: false, color: '#4477BB' }} style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4477BB', borderStyle: 'dashed' }}>
                <View style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 1, borderColor: 'grey', overflow: 'hidden', backgroundColor: 'white' }}>
                    {
                        item.profilePhoto != "" ? <Image source={{ uri: item.profilePhoto }} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image> : <Image source={AVATAR} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image>
                    }
                </View>
                <View style={{ flex: 1, height: '100%', backgroundColor: 'white', }}>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: 'grey' }}>{item.teacherId}</Text>
                        <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>{item.teacherName}</Text>
                    </View>
                </View>
                <View style={{}}>
                    <FontAwesomeIcon icon={faGreaterThan} size={20} color='#4477BB'></FontAwesomeIcon>
                </View>
            </Pressable>
        )
    } else {
        return (
            <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4477BB', borderStyle: 'dashed' }}>
                <View style={{ flex: 1, height: '100%', backgroundColor: 'white', }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: 'grey' }}>Error</Text>
                        <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>No Teachers Found</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const TeachersScreen = () => {
    const navigation = useNavigation()

    //States for Classes DropDown
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [selectClass, setselectClass] = useState([])

    const [teachersData, setteachersData] = useState([])

    //States for Query Data
    const [queryData, setqueryData] = useState([])
    const [queryValue, setqueryValue] = useState('')
    const handleQueryInput = (e) => {
        setqueryValue(e)
        let input = e
        const queryData = teachersData.filter((item) => {
            const pattern = new RegExp(input, "gi")
            if (pattern.exec(item.teacherName) != null) {
                return true
            } else if (pattern.exec(item.teacherId) != null) {
                return true
            } else {
                return false
            }
        })

        setqueryData(queryData)
    }

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
    const fetchTeachers = async (className) => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/teachers/search/${className}`).then((res) => res.json())

        var teachers = []
        if (response.success === false) {
            setteachersData([])
            return
        }
        response.forEach((item) => {
            var temp = {
                profilePhoto: item.profilePhoto,
                teacherId: item.teacherId,
                teacherName: item.name
            }

            teachers.push(temp)
        })
        setteachersData(teachers)
    }

    useEffect(() => {
        fetchClasses()
    }, [])

    //Handle Navigation
    const handleNavigation = (teacherId) => {
        navigation.navigate('Teacher Details', {teacherId : teacherId})
    }

    //Handle Button Press
    const [isPressed, setisPressed] = useState(false)

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
                        <Text style={styles.headerText}>Teachers</Text>
                    </View>
                </View>

                <Pressable onPress={() => navigation.navigate('Teacher Enroll')} onPressIn={() => { setisPressed(true); }} onPressOut={() => setisPressed(false)} style={({ pressed }) => [pressed ? { backgroundColor: 'white', borderWidth: 0.5, borderColor: '#4477BB' } : { backgroundColor: '#4477BB', }, { zIndex: 1, position: 'absolute', right: 15, bottom: 15, width: 60, height: 60, elevation: 5, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={[isPressed ? { color: '#4477BB' } : { color: 'white', }, { fontSize: 40, fontWeight: 700 }]}>+</Text>
                </Pressable>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                                placeholder={!isFocus ? 'Select Class' : '....'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                    fetchTeachers(item.value)
                                }}
                            />

                            <View style={{ width: '100%', }}>
                                <Image source={DIVIDER} resizeMode='contain' style={{ width: '100%' }}></Image>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color='#4477BB' size={16} style={{ position: 'absolute', left: 8 }} />
                                <TextInput
                                    style={{ width: '100%', fontSize: 17, paddingLeft: 30, paddingVertical: 3, fontWeight: 'bold', color: 'black', borderWidth: 0.5, borderColor: 'grey', borderStyle: 'dashed', borderRadius: 10, }}
                                    placeholder='Search Teachers'
                                    value={queryValue}
                                    onChangeText={(e) => handleQueryInput(e)}>
                                </TextInput>
                            </View>

                            {
                                queryValue != '' ? queryData.length != 0 ? queryData.map((item, index) => (
                                    <QueryDataComponent key={index} data={true} item={item} index={index} navigate={handleNavigation}></QueryDataComponent>
                                )) : <QueryDataComponent data={false}></QueryDataComponent> :
                                    teachersData.map((item, index) => (
                                        <Pressable key={index} onPress={() => handleNavigation(item.teacherId)} android_ripple={{ foreground: true, borderless: false, color: '#4477BB' }} style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4477BB', borderStyle: 'dashed' }}>
                                            <View style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 1, borderColor: 'grey', overflow: 'hidden', backgroundColor: 'white' }}>
                                                {
                                                    item.profilePhoto != "" ? <Image source={{ uri: item.profilePhoto }} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image> : <Image source={AVATAR} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image>
                                                }
                                            </View>
                                            <View style={{ flex: 1, height: '100%', backgroundColor: 'white', }}>
                                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                                    <Text style={{ fontSize: 18, fontWeight: 500, color: 'grey' }}>{item.teacherId}</Text>
                                                    <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>{item.teacherName}</Text>
                                                </View>
                                            </View>
                                            <View style={{}}>
                                                <FontAwesomeIcon icon={faGreaterThan} size={20} color='#4477BB'></FontAwesomeIcon>
                                            </View>
                                        </Pressable>
                                    ))
                            }
                        </View>
                        <Image style={styles.img} source={BOTTOMVECTOR} />
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

export default TeachersScreen