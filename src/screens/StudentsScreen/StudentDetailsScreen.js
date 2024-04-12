import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, TextInput, StatusBar, Pressable, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png'
import AVATAR from '../../assets/images/avatar.jpg'
import ipAddress from '../../url';

const StudentDetailsScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()

    console.log(route.params)

    //Fetch Data from Database or using Route
    const [studentDetails, setstudentDetails] = useState({
        profilePhoto: '',
        emailId: '',
        class: '',
        name: '',
        mobileNo: '',
        gender: '',
        aadharNo: '',
        admissionYear: '',
        admissionDate: '',
        birthDate: '',
        motherName: '',
        fatherName: '',
        permanentAddress: ''
    })

    //Fetch Student Details
    const fetchDetails = async () => {
        const response = await fetch(`http://${ipAddress}:3000/api/v1/students/${route.params.studentId}`).then((res) => res.json())

        var temp = {
            profilePhoto: response.student[0].studentDetails.profilePhoto,
            emailId: response.student[0].emailId,
            class: response.student[0].studentDetails.class,
            name: response.student[0].studentDetails.name,
            mobileNo: String(response.student[0].studentDetails.mobileNo),
            gender: response.student[0].studentDetails.gender,
            aadharNo: String(response.student[0].studentDetails.aadharNo),
            admissionYear: String(response.student[0].studentDetails.admissionYear),
            admissionDate: response.student[0].studentDetails.dateofAdmission,
            birthDate: response.student[0].studentDetails.dateofBirth,
            motherName: response.student[0].studentDetails.motherName,
            fatherName: response.student[0].studentDetails.fatherName,
            permanentAddress: response.student[0].studentDetails.permanentAddress
        }
        console.log(response)
        setstudentDetails(temp)
        console.log(studentDetails)
    }
    useEffect(() => {
        fetchDetails()
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.root}>
            <StatusBar backgroundColor="#4477BB" barStyle="light-content"></StatusBar>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                        <View>
                            <FontAwesomeIcon size={20} style={styles.headerIcon} icon={faLessThan}></FontAwesomeIcon>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.headerText}>Student Details</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.Section3_container}>
                    <View style={{ padding: 15, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                        <View style={styles.profileImageContainer}>
                            <View style={{ height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#C3D0EA', height: 100, width: 100, borderRadius: 50, overflow: 'hidden' }}>
                                    {
                                        studentDetails.profilePhoto != null && studentDetails.profilePhoto != '' ? <Image source={{ uri: studentDetails.profilePhoto }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Image source={AVATAR} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Email Id</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.emailId}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Class</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.class}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Full Name</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.name}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Mobile No.</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.mobileNo}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Gender</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.gender}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Aadhar No.</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.aadharNo}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Admission Year</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.admissionYear}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Date of Admission</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.admissionDate}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Date of Birth</Text>
                            <View style={{ marginTop: 3, borderBottomWidth: 1, borderColor: 'grey', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.birthDate}
                                    editable={false}
                                    style={{
                                        flex: 1, fontSize: 15, fontWeight: 'bold', color: 'black', paddingHorizontal: 10, paddingVertical: 3,
                                    }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Mother Name</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.motherName}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Father Name</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.fatherName}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 30, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Permanent Address</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={studentDetails.permanentAddress}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('Attendance Status')}
                        android_ripple={{ foreground: true, borderless: false, }}
                        style={{
                            width: '90%',
                            marginBottom: 20,
                            alignSelf: 'center',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#4477BB',
                            borderStyle: 'dashed',
                            borderRadius: 10,
                        }}>
                        <View style={{justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={styles.btn}>Attendance Status</Text>
                            <FontAwesomeIcon icon={faArrowRight} size={20} color='#4477BB' style={{ position: 'absolute', right: 15}}></FontAwesomeIcon>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Fees Status')}
                        android_ripple={{ foreground: true, borderless: false, }}
                        style={{
                            width: '90%',
                            marginBottom: 20,
                            alignSelf: 'center',
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#4477BB',
                            borderStyle: 'dashed',
                            borderRadius: 10,
                        }}>
                        <View style={{justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={styles.btn}>Fees Status</Text>
                            <FontAwesomeIcon icon={faArrowRight} size={20} color='#4477BB' style={{ position: 'absolute', right: 15}}></FontAwesomeIcon>
                        </View>
                    </Pressable>
                </View>
                <Image
                    style={styles.img}
                    source={BOTTOMVECTOR}
                />
            </ScrollView>
        </KeyboardAvoidingView>
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
    },
    profileImageContainer: {
        borderWidth: 2,
        borderColor: '#4477BB',
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    Section3_container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 80,
        paddingBottom: 90
    },
    dropdown: {
        height: 50,
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
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: 'center',
        color: '#4477BB',
        fontSize: 20,
        // marginBottom: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    img: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        justifyContent: 'flex-end',
        marginTop: 15,
        width: '100%',
    },
});

export default StudentDetailsScreen