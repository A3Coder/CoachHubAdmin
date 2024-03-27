import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, TextInput, StatusBar, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png'
import AVATAR from '../../assets/images/avatar.jpg'

const StudentDetailsScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()

    //Fetch Data from Database or using Route
    const studentDetails = {
        profilePhoto: '',
        emailId: 'md.aasifaliaadil786@gmail.com',
        class: 'V',
        name: 'Md. Aasif Ali Aadil',
        mobileNo: '9330852282',
        gender: 'Male',
        aadharNo: '485313343995',
        admissionYear: '2024',
        admissionDate: '26/03/2024',
        birthDate: '07/03/2002',
        motherName: 'Jahan Ara Bano',
        fatherName: 'Md. Shahabuddin',
        permanentAddress: '22B, G. J. Khan Road, Kolkata - 700039'
    }

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
                                        studentDetails.profilePhoto != '' ? <Image source={profilePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Image source={AVATAR} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

                        <View style={{ marginTop: 30, marginBottom: 30 }}>
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
        width: '90%',
        margin: 15,
        alignSelf: 'center',
        paddingVertical: 15,
        backgroundColor: '#4477BB',
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#4477BB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        marginTop: 15,
        width: '100%',
    },
});

export default StudentDetailsScreen