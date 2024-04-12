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

import { useNavigation } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faGreaterThan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//Importing Assets
import DIVIDER from '../../assets/images/divider.png'
import ipAddress from '../../url';

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

const FeesScreen = () => {
    const navigation = useNavigation()

    const [classValue, setclassValue] = useState(null);
    const [monthValue, setmonthValue] = useState(null);

    const [isFocusClass, setisFocusClass] = useState(false);
    const [isFocusMonth, setisFocusMonth] = useState(false);

    //States for Class DropDown
    const [selectClass, setselectClass] = useState([])

    //States for Fees Data
    const [data, setdata] = useState([])
    const [selectedOption, setselectedOption] = useState(null)
    const handleStateChange = (index, value) => {
        const updatedData = [...data]
        updatedData[index] = { ...updatedData[index], isPaid: value }
        setdata(updatedData)
        setselectedOption(index)
    }

    //States for Query Data
    const [queryData, setqueryData] = useState([])
    const [queryValue, setqueryValue] = useState('')
    const handleQueryInput = (e) => {
        setqueryValue(e)
        let input = e
        const queryData = data.filter((item) => {
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
    const fetchClasses = async () => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/classes`).then((res) => res.json())

        var classes = []
        response.forEach((item) => {
            var temp = { label: `Class ${item.class}`, value: item.class }

            classes.push(temp)
        })

        setselectClass(classes)
    }
    //Fetch Fees Status from Backend
    const fetchFeesStatus = async () => {
        if (classValue && monthValue) {
            const response = await fetch(`http://${ipAddress}:3000/api/v1/fees/search/${classValue}/${monthValue}`).then((res) => res.json())

            if (response.success === false) {
                setdata([
                    {
                        studentId: 'Not Found',
                        name: 'Not Found',
                        isPaid: null
                    }
                ])
                return
            } else {
                var data = []
                response[0].data.forEach((item) => {
                    var status = null
                    item.feesDetails.forEach((item) => {
                        if (item.monthName === monthValue) {
                            status = item.isPaid
                        }
                    })
                    var temp = {
                        studentId: item.studentId,
                        name: item.name,
                        isPaid: status
                    }

                    data.push(temp)
                })
                setdata(data)
            }
        } else {
            return
        }
    }
    useEffect(() => {
        fetchClasses()
        fetchFeesStatus()
    }, [classValue, monthValue])

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
                        <Text style={styles.headerText}>Fees</Text>
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
                                        placeholder={!isFocusClass ? 'Select item' : '....'}
                                        value={classValue}
                                        onFocus={() => setisFocusClass(true)}
                                        onBlur={() => setisFocusClass(false)}
                                        onChange={item => {
                                            setclassValue(item.value);
                                            setisFocusClass(false);
                                        }}
                                    />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={{ fontSize: 16 }}>Select Month</Text>
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        data={SelectMonth}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocusMonth ? 'Select item' : '....'}
                                        value={monthValue}
                                        onFocus={() => setisFocusMonth(true)}
                                        onBlur={() => setisFocusMonth(false)}
                                        onChange={item => {
                                            setmonthValue(item.value);
                                            setisFocusMonth(false);
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
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Paid</Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>Due</Text>
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
                                            <Pressable onPress={() => { handleStateChange(index, true) }} android_ripple={{ foreground: true, borderless: true }} style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    item.isPaid === true && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center' }]}></View>)
                                                }
                                            </Pressable>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Pressable onPress={() => { handleStateChange(index, false) }} android_ripple={{ foreground: true, borderless: true }} style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    item.isPaid === false && (<View style={{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#f75843', justifyContent: 'center', alignItems: 'center' }}></View>)
                                                }
                                            </Pressable>
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
                                            <Pressable onPress={() => { handleStateChange(index, true) }} android_ripple={{ foreground: true, borderless: true }} style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    item.isPaid === true && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center' }]}></View>)
                                                }
                                            </Pressable>
                                        </View>
                                        <View style={{ width: '18%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Pressable onPress={() => { handleStateChange(index, false) }} android_ripple={{ foreground: true, borderless: true }} style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    item.isPaid === false && (<View style={{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#f75843', justifyContent: 'center', alignItems: 'center' }}></View>)
                                                }
                                            </Pressable>
                                        </View>
                                    </View>
                                ))
                            }


                        </View>
                        {/* <Image style={styles.img} source={BOTTOMVECTOR}/> */}
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Post Fees')} activeOpacity={0.7} style={{ width: '90%', position: 'absolute', bottom: 0, marginVertical: 15, alignSelf: 'center' }}>
                    <View>
                        <Text style={styles.btn}>POST DUE FEES</Text>
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
        paddingBottom: 55,
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

export default FeesScreen