import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, TextInput, StatusBar, Pressable, Modal } from 'react-native';
import { Svg, Circle, G } from 'react-native-svg'

import { useNavigation, useRoute } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan';
import { faGreaterThan, faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';

//Importing Assets
import DIVIDER from '../../assets/images/divider.png';
import ipAddress from '../../url';

// const feesData = [
//     {
//         amount: 1500,
//         month: 'January',
//         isPaid: false,
//     },
//     {
//         amount: 1500,
//         month: 'February',
//         isPaid: true,
//     },
//     {
//         amount: 1500,
//         month: 'March',
//         isPaid: false,
//     },
//     {
//         amount: 1500,
//         month: 'April',
//         isPaid: true,
//     },
// ];

const FeesStatusScreen = () => {
    const navigation = useNavigation();
    const route = useRoute()

    //States for Date Inputs
    const [date, setdate] = useState(new Date());

    //States for Fees Data
    const [data, setdata] = useState([]);

    //States for Query Data
    const [queryData, setqueryData] = useState([]);
    const [queryValue, setqueryValue] = useState('');
    const handleQueryInput = e => {
        setqueryValue(e);
        let input = e;
        const queryData = data.filter(item => {
            const pattern = new RegExp(input, 'gi');
            if (pattern.exec(item.month) != null) {
                return true;
            } else {
                return false;
            }
        });

        setqueryData(queryData);
    };

    //States for Data Overview
    const [totalMonths, settotalMonths] = useState(0)
    const [totalPaidMonths, settotalPaidMonths] = useState(0)
    const [totalDue, settotalDue] = useState(0)

    //Variables for SVG component
    const CIRCUMFERENCE = 2 * Math.PI * ((150 / 2) - (8 / 2))
    const [lessCircumference, setlessCircumference] = useState((CIRCUMFERENCE * 50) / 100)
    const calculateData = (DATA) => {
        //First Calculate the Percentage of total Due Fees
        var tPMs = 0
        var tMs = 0
        DATA.forEach((item) => {
            if (item.isPaid === true) {
                tPMs = tPMs + 1
                settotalPaidMonths((prev) => prev + 1)
            } else {
                settotalDue((prev) => prev + item.amount)
            }
            tMs = tMs + 1
            settotalMonths((prev) => prev + 1)
        })

        var percentage = Math.floor((tPMs / tMs) * 100)
        setlessCircumference((CIRCUMFERENCE * percentage) / 100)
        return

    }
    const fetchData = async () => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/fees/search/query?studentId=${route.params.studentId}`).then((res) => res.json())

        //Formatiing Data
        var data = []
        if (response.success === false) {
            return []
        }
        response.result[0].feesDetails.forEach((item) => {
            var temp = {
                amount: item.amount,
                month: item.monthName,
                isPaid: item.isPaid,
            }

            data.push(temp)
        })
        setdata(data)
        return data
    }
    useEffect(() => {
        fetchData().then((data) => calculateData(data))
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
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
                        <Text style={styles.headerText}>Fees Status</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}>
                    <StatusBar
                        backgroundColor="#4477BB"
                        barStyle="light-content"></StatusBar>
                    <View style={styles.Section3_container}>
                        <View
                            style={{
                                padding: 18,
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
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
                                    <Text style={{ fontSize: 16 }}>Year</Text>
                                    <TextInput
                                        value={date.toLocaleDateString('en-GB').split('/')[2]}
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
                            </View>

                            <View style={{ width: '100%' }}>
                                <Image
                                    source={DIVIDER}
                                    resizeMode="contain"
                                    style={{ width: '100%' }}></Image>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    color="#4477BB"
                                    size={16}
                                    style={{ position: 'absolute', left: 8 }}
                                />
                                <TextInput
                                    style={{
                                        width: '100%',
                                        fontSize: 17,
                                        paddingLeft: 30,
                                        paddingVertical: 3,
                                        fontWeight: 'bold',
                                        color: 'black',
                                        borderWidth: 0.5,
                                        borderColor: 'grey',
                                        borderStyle: 'dashed',
                                        borderRadius: 10,
                                    }}
                                    placeholder="Search Month"
                                    value={queryValue}
                                    onChangeText={e => handleQueryInput(e)}></TextInput>
                            </View>

                            <View
                                style={{
                                    marginTop: 15,
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 8,
                                    paddingVertical: 5,
                                    backgroundColor: '#4477BB',
                                }}>
                                <View style={{ width: '25%' }}>
                                    <Text style={{ textAlign: 'center', color: 'white' }}>
                                        Month
                                    </Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={{ textAlign: 'center', color: 'white' }}>
                                        Amount
                                    </Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ textAlign: 'center', color: 'white' }}>
                                        Paid
                                    </Text>
                                </View>
                                <View style={{ width: '18%' }}>
                                    <Text style={{ textAlign: 'center', color: 'white' }}>
                                        Due
                                    </Text>
                                </View>
                            </View>

                            {queryValue != ''
                                ? queryData.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: 'grey',
                                            paddingHorizontal: 8,
                                            paddingVertical: 10,
                                            backgroundColor: 'white',
                                        }}>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>
                                                {item.month}
                                            </Text>
                                        </View>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>
                                                {item.amount}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '18%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
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
                                                {item.isPaid === true && (
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
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width: '18%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
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
                                                {item.isPaid === false && (
                                                    <View
                                                        style={{
                                                            width: '80%',
                                                            height: '80%',
                                                            borderRadius: 50,
                                                            borderWidth: 0.5,
                                                            borderColor: 'grey',
                                                            backgroundColor: '#f75843',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}></View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))
                                : data.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: 'grey',
                                            paddingHorizontal: 8,
                                            paddingVertical: 10,
                                            backgroundColor: 'white',
                                        }}>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>
                                                {item.month}
                                            </Text>
                                        </View>
                                        <View style={{ width: '25%' }}>
                                            <Text style={{ textAlign: 'center', color: 'black' }}>
                                                {item.amount}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '18%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
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
                                                {item.isPaid === true && (
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
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width: '18%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
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
                                                {item.isPaid === false && (
                                                    <View
                                                        style={{
                                                            width: '80%',
                                                            height: '80%',
                                                            borderRadius: 50,
                                                            borderWidth: 0.5,
                                                            borderColor: 'grey',
                                                            backgroundColor: '#f75843',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }}></View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                        </View>
                        <View style={{ marginVertical: 15, padding: 8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <View style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: '#4477BB', justifyContent: 'center', alignItems: 'center', elevation: 8 }}>
                                <View style={{ width: '88%', height: '88%', backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: '600' }}>Rs. {totalDue}/-</Text>
                                    <Text style={{ color: 'grey', fontSize: 15, fontWeight: '600' }}>Total Due Fees</Text>
                                </View>
                            </View>

                            <View style={{ width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center', elevation: 8 }}>
                                <Svg width={150} height={150} fill={'white'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <G rotation={"-90"} origin={150 / 2}>
                                        <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={2} r={(150 / 2) - (2 / 2)}></Circle>
                                        <Circle stroke={'#4477BB'} cx={150 / 2} cy={150 / 2} strokeWidth={8} r={(150 / 2) - (8 / 2)} strokeLinecap='round' strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE - lessCircumference}></Circle>
                                    </G>
                                </Svg>
                                <View style={{ position: 'absolute', zIndex: 1, width: '88%', height: '88%', backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: '600' }}>{totalPaidMonths} / {totalMonths}</Text>
                                    <Text style={{ color: 'grey', fontSize: 15, fontWeight: '600' }}>Total Paid Month</Text>
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

export default FeesStatusScreen;
