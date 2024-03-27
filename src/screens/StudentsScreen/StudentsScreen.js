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

const studentsData = [
    {
        profilePhoto: '',
        studentId: 'SV202401',
        studentName: 'Md. Aasif Ali Aadil'
    },
    {
        profilePhoto: '',
        studentId: 'SV202402',
        studentName: 'Md. Abdul Rab'
    },
    {
        profilePhoto: '',
        studentId: 'SV202403',
        studentName: 'Nitesh Kumar'
    },
    {
        profilePhoto: '',
        studentId: 'SV202404',
        studentName: 'Md. Amir'
    },
]

const QueryDataComponent = ({ item, index, data, navigate }) => {
    if (data === true) {
        return (
            <Pressable key={index} onPress={navigate} android_ripple={{ foreground: true, borderless: false, color: '#4477BB' }} style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4477BB', borderStyle: 'dashed' }}>
                <View style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 1, borderColor: 'grey', overflow: 'hidden', backgroundColor: 'white' }}>
                    <Image source={AVATAR} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image>
                </View>
                <View style={{ flex: 1, height: '100%', backgroundColor: 'white', }}>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text style={{ fontSize: 18, fontWeight: 500, color: 'grey' }}>{item.studentId}</Text>
                        <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>{item.studentName}</Text>
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
                        <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>No Students Found</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const StudentsScreen = () => {
    const navigation = useNavigation()

    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);

    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);

    //States for Query Data
    const [queryData, setqueryData] = useState([])
    const [queryValue, setqueryValue] = useState('')
    const handleQueryInput = (e) => {
        setqueryValue(e)
        let input = e
        const queryData = studentsData.filter((item) => {
            const pattern = new RegExp(input, "gi")
            if (pattern.exec(item.studentName) != null) {
                return true
            } else if (pattern.exec(item.studentId) != null) {
                return true
            } else {
                return false
            }
        })

        setqueryData(queryData)
    }

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
                        <Text style={styles.headerText}>Students</Text>
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
                                placeholder={!isFocus ? 'Select item' : '....'}
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            />

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

                            {
                                queryValue != '' ? queryData.length != 0 ? queryData.map((item, index) => (
                                    <QueryDataComponent key={index} data={true} item={item} index={index} navigate={handleNavigation}></QueryDataComponent>
                                )) : <QueryDataComponent data={false}></QueryDataComponent> : 
                                studentsData.map((item, index) => (
                                    <Pressable key={index} onPress={handleNavigation} android_ripple={{ foreground: true, borderless: false, color: '#4477BB' }} style={{ marginTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, overflow: 'hidden', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4477BB', borderStyle: 'dashed' }}>
                                        <View style={{ width: 80, height: 80, borderRadius: 50, borderWidth: 1, borderColor: 'grey', overflow: 'hidden', backgroundColor: 'white' }}>
                                            <Image source={AVATAR} style={{ width: '100%', height: '100%' }} resizeMode='contain'></Image>
                                        </View>
                                        <View style={{ flex: 1, height: '100%', backgroundColor: 'white', }}>
                                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                                <Text style={{ fontSize: 18, fontWeight: 500, color: 'grey' }}>{item.studentId}</Text>
                                                <Text style={{ fontSize: 25, fontWeight: 900, color: 'black', }}>{item.studentName}</Text>
                                            </View>
                                        </View>
                                        <View style={{}}>
                                            <FontAwesomeIcon icon={faGreaterThan} size={20} color='#4477BB'></FontAwesomeIcon>
                                        </View>
                                    </Pressable>
                                ))
                            }
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

export default StudentsScreen