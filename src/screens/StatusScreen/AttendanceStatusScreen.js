import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, TextInput, StatusBar, Pressable, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars'
import { Svg, Circle, G, fetchText } from 'react-native-svg';

import { useNavigation, useRoute } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faGreaterThan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//Importing Assets
import DIVIDER from '../../assets/images/divider.png'
import ipAddress from '../../url';

const selectMonth = [
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

const AttendanceStatusScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()

    //States for Dropdown Month
    const [monthValue, setmonthValue] = useState(null);
    const [isFocusMonth, setisFocusMonth] = useState(false);
    const [SelectMonth, setSelectMonth] = useState(selectMonth)

    //State for Calendar Month
    const date = new Date().toLocaleDateString('en-GB').split('/')
    const [currentMonth, setcurrentMonth] = useState(`${date[2]}-${date[1]}-01`)
    const changeCurrentMonth = (monthName) => {
        const item = SelectMonth.find((item, index) => item.label === monthName)
        const index = SelectMonth.indexOf(item)

        setcurrentMonth(`${date[2]}-${String(index + 1).padStart(2, 0)}-01`)
    }

    //State for Attendance Data
    const [attendanceData, setattendanceData] = useState([])

    //Absent Data - Populate via Backend
    const [absentData, setabsentData] = useState({
        '2024-04-05': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-08': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-09': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-15': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-16': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-23': { selected: true, selectedColor: 'red', disableTouchEvent: true },
        '2024-04-24': { selected: true, selectedColor: 'red', disableTouchEvent: true },
    })

    //Present Data - Populate via Backend
    const [presentData, setpresentData] = useState({
        '2024-04-01': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-02': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-03': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-06': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-07': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-10': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-12': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-13': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-14': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-17': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-21': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-22': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-26': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-27': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-28': { selected: true, selectedColor: 'green', disableTouchEvent: true },
        '2024-04-30': { selected: true, selectedColor: 'green', disableTouchEvent: true }
    })

    //States for Data Overview
    const [monthPercentage, setmonthPercentage] = useState(null)
    const [overallPercentage, setoverallPercentage] = useState(null)

    const [workingDays, setworkingDays] = useState(0)
    const [totalAbsent, settotalAbsent] = useState(0)
    const [totalPresent, settotalPresent] = useState(0)

    //Variables for SVG component
    const CIRCUMFERENCE = 2 * Math.PI * ((150 / 2) - (8 / 2))
    const [lessCircumference, setlessCircumference] = useState({
        thisMonth: (CIRCUMFERENCE * 66.66) / 100,
        overall: (CIRCUMFERENCE * 90) / 100
    })

    //Month Dropdown Logic
    const fetchMonths = () => {
        var currentMonthIndex = new Date().toLocaleDateString('en-GB').split('/')[1]
        setSelectMonth(selectMonth.slice(0, parseInt(currentMonthIndex)))
    }
    //Fetch Data from Backend
    const fetchAttendanceData = async () => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/attendances/search/${route.params.studentId}`).then((res) => res.json())

        if (response.success == false) {
            return
        }

        setattendanceData(response)
        const presentDates = response.filter((item) => item.attendanceDetails.isPresent === true)
        const absentDates = response.filter((item) => item.attendanceDetails.isPresent === false)

        var presentData = {}
        presentDates.forEach((item) => {
            var date = item.dateofMonth.split('/')
            presentData[`${date[2]}-${date[1]}-${date[0]}`] = { selected: true, selectedColor: 'green', disableTouchEvent: true }
        })
        setpresentData(presentData)

        var absentData = {}
        absentDates.forEach((item) => {
            var date = item.dateofMonth.split('/')
            absentData[`${date[2]}-${date[1]}-${date[0]}`] = { selected: true, selectedColor: 'red', disableTouchEvent: true }
        })
        setabsentData(absentData)
    }
    //Caculate and Visualize Data
    const calculateData = () => {
        if (!attendanceData.length) {
            return
        }
        const presentDates = attendanceData.filter((item) => item.attendanceDetails.isPresent === true)
        const absentDates = attendanceData.filter((item) => item.attendanceDetails.isPresent === false)

        var tP = 0
        var wDs = 0
        var overallTP = 0
        var overallWDs = 0
        settotalPresent(0)
        setworkingDays(0)
        presentDates.forEach((item) => {
            var date = item.dateofMonth.split('/')
            if (date[1] === currentMonth.slice(5, 7)) {
                tP = tP + 1
                wDs = wDs + 1
                settotalPresent((prev) => prev + 1)
                setworkingDays((prev) => prev + 1)
            }
            overallTP = overallTP + 1
            overallWDs = overallWDs + 1
        })

        settotalAbsent(0)
        absentDates.forEach((item) => {
            var date = item.dateofMonth.split('/')
            if (date[1] === currentMonth.slice(5, 7)) {
                wDs = wDs + 1
                settotalAbsent((prev) => prev + 1)
                setworkingDays((prev) => prev + 1)
            }
            overallWDs = overallWDs + 1
        })

        //Calcuting for SVG Element Data Visualization
        var percentage = Math.ceil((tP / wDs) * 100)
        var overallPercentage = Math.ceil((overallTP / overallWDs) * 100)
        setmonthPercentage(percentage)
        setoverallPercentage(overallPercentage)
        setlessCircumference({
            thisMonth: (CIRCUMFERENCE * percentage) / 100,
            overall: (CIRCUMFERENCE * overallPercentage) / 100
        })
    }

    useEffect(() => {
        fetchMonths()
        fetchAttendanceData()
    }, [])

    useEffect(() => {
        calculateData()
    }, [attendanceData, monthValue])

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
                        <Text style={styles.headerText}>Attendance Status</Text>
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
                                    <Text style={{ fontSize: 16 }}>Student ID</Text>
                                    <TextInput
                                        value={route.params.studentId}
                                        editable={false}
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
                                        placeholder={!isFocusMonth ? 'Select Month' : '....'}
                                        value={monthValue}
                                        onFocus={() => setisFocusMonth(true)}
                                        onBlur={() => setisFocusMonth(false)}
                                        onChange={item => {
                                            setmonthValue(item.value);
                                            setisFocusMonth(false);
                                            changeCurrentMonth(item.value)
                                        }}
                                    />

                                </View>
                            </View>

                            <View style={{ width: '100%', }}>
                                <Image source={DIVIDER} resizeMode='contain' style={{ width: '100%' }}></Image>
                            </View>

                            <Calendar
                                hideArrows={true}
                                current={currentMonth}
                                key={currentMonth}
                                onDayPress={day => {
                                    // setSelected(day.dateString);
                                }}
                                markedDates={
                                    {
                                        // [selected]: { selected: true, disableTouchEvent: true, selectedColor: 'orange'},
                                        [`${'2024'}-${'04'}-${'13'}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                        // [`${sundays[1].getFullYear()}-${String(sundays[1].getMonth() + 1).padStart(2, 0)}-${String(sundays[1].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                        // [`${sundays[2].getFullYear()}-${String(sundays[2].getMonth() + 1).padStart(2, 0)}-${String(sundays[2].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                        // [`${sundays[3].getFullYear()}-${String(sundays[3].getMonth() + 1).padStart(2, 0)}-${String(sundays[3].getUTCDate()).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },
                                        // [sundays[4] != undefined ? `${sundays[4].getFullYear()}-${String(sundays[4].getUTCMonth() + 1).padStart(2, 0)}-${String(sundays[4].getUTCDate()).padStart(2, 0)}` : `${sundays[3].getFullYear()}-${String(sundays[3].getMonth() + 1).padStart(2, 0)}-${String(sundays[3].getDate() - 1).padStart(2, 0)}`]: { selected: true, selectedColor: '#C3D0EA', disableTouchEvent: true },

                                        //Absents
                                        ...absentData,

                                        //Presents
                                        ...presentData
                                    }
                                }
                                firstDay={1}
                                // onMonthChange={(date) => { setMinMonth(new Date(date.dateString)); setMaxMonth(new Date(date.dateString)); setThisMonth(new Date(date.dateString)); calculateSunday(); totalHoliday(thisMonth); totalAbsent(thisMonth) }}
                                disableArrowLeft={true}
                                disableArrowRight={true}
                            />

                            <View style={{ marginTop: 20, backgroundColor: '#4A83DA', height: 60, borderRadius: 13, borderWidth: 2, borderColor: '#4A83DA', overflow: 'hidden' }}>
                                <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'flex-end', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Working Days</Text>
                                    <View style={{ width: 35, height: 35, backgroundColor: '#4A83DA', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>{workingDays}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, backgroundColor: '#E92020', height: 60, borderRadius: 13, borderWidth: 2, borderColor: '#E92020', overflow: 'hidden' }}>
                                <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'flex-end', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Total Absent</Text>
                                    <View style={{ width: 35, height: 35, backgroundColor: '#FFB1B1', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 900, color: '#E92020' }}>{totalAbsent}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, backgroundColor: '#0BAC00', height: 60, borderRadius: 13, borderWidth: 2, borderColor: '#0BAC00', overflow: 'hidden' }}>
                                <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'flex-end', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Total Present</Text>
                                    <View style={{ width: 35, height: 35, backgroundColor: '#A9F2A4', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 900, color: '#0BAC00' }}>{totalPresent}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginVertical: 15, padding: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center', elevation: 8 }}>
                                    <Svg width={150} height={150} fill={'white'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <G rotation={"-90"} origin={150 / 2}>
                                            <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={2} r={(150 / 2) - (2 / 2)}></Circle>
                                            <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={8} r={(150 / 2) - (8 / 2)} strokeLinecap='round' strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE - lessCircumference.thisMonth}></Circle>
                                        </G>
                                    </Svg>
                                    <View style={{ position: 'absolute', zIndex: 1, width: '88%', height: '88%', backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: '600' }}>{monthPercentage}%</Text>
                                        <Text style={{ color: 'grey', fontSize: 13, fontWeight: '600', textAlign: 'center' }}>Attendance Accuracy of This Month</Text>
                                    </View>
                                </View>

                                <View style={{ width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center', elevation: 8 }}>
                                    <Svg width={150} height={150} fill={'white'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <G rotation={"-90"} origin={150 / 2}>
                                            <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={2} r={(150 / 2) - (2 / 2)}></Circle>
                                            <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={8} r={(150 / 2) - (8 / 2)} strokeLinecap='round' strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE - lessCircumference.overall}></Circle>
                                        </G>
                                    </Svg>
                                    <View style={{ position: 'absolute', zIndex: 1, width: '88%', height: '88%', backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: '600' }}>{overallPercentage}%</Text>
                                        <Text style={{ color: 'grey', fontSize: 13, fontWeight: '600', textAlign: 'center' }}>Overall Attendance Accuracy</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
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

export default AttendanceStatusScreen