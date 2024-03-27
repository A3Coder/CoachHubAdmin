import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, TextInput, StatusBar, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { CircleSnail } from 'react-native-progress'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'

//Importing Assets
import BOTTOMVECTOR from '../../assets/images/bottomvector.png'
import AVATAR from '../../assets/images/avatar.jpg'

const TeacherEnroll = () => {
    const navigation = useNavigation()
    const route = useRoute()

    //Fetch Data from Database or using Route
    const teacherDetails = {
        profilePhoto: '',
        teacherId: 'TV01',
        emailId: 'md.aasifaliaadil786@gmail.com',
        name: 'Md. Aasif Ali Aadil',
        class: 'V',
        subject: 'Science',
        mobileNo: '9330852282',
        salary: '500',
        gender: 'Male',
        aadharNo: '485313343995',
        admissionYear: '2024',
        admissionDate: '26/03/2024',
        birthDate: '07/03/2002',
        motherName: 'Jahan Ara Bano',
        fatherName: 'Md. Shahabuddin',
        permanentAddress: '22B, G. J. Khan Road, Kolkata - 700039'
    }

    const [profilePhoto, setprofilePhoto] = useState('');
    const [photoLoader, setphotoLoader] = useState(false)

    const handleImagePicker = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else {
                    //Upload in Cloudinary
                    setphotoLoader(true)
                    const data = new FormData()
                    data.append('file', { uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName })
                    data.append('upload_preset', 'rtyykkwo')
                    data.append('cloud_name', 'dvirrnppm')
                    const res = await fetch(`https://api.cloudinary.com/v1_1/dvirrnppm/image/upload`,
                        {
                            method: 'POST',
                            body: data,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => res.json()).catch(err => console.log(err))
                    //Now get the Response from Cloudinary and update the Profile Photo State
                    setphotoLoader(false)
                    setprofilePhoto({ uri: res.url });
                }
            },
        );
    };

    //State for Required Fields
    const [error, setError] = useState({
        emailId: false,
        name: false,
        mobileNo: false,
        salary: false
    })

    const [inputs, setInputs] = useState({
        emailId: '',
        name: '',
        mobileNo: '',
        salary: ''
    })

    const handleInputs = (inputIdentfier, text) => {
        if (inputIdentfier === 'salary' || inputIdentfier === 'mobileNo') {
            var textInput = text.replace(/[^0-9]/g, '')
            setInputs(prevValue => (
                {
                    ...prevValue,
                    [inputIdentfier]: textInput
                }
            ))
        } else if (inputIdentfier === 'name') {
            var textInput = text.replace(/[^a-zA-Z\s]/g, '')
            setInputs(prevValue => (
                {
                    ...prevValue,
                    [inputIdentfier]: textInput
                }
            ))
        } else if (inputIdentfier === 'emailId') {
            setInputs(prevValue => (
                {
                    ...prevValue,
                    [inputIdentfier]: text
                }
            ))
        }

        setError(prevValue => (
            {
                ...prevValue,
                [inputIdentfier]: false
            }
        ))
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
                    <Text style={styles.headerText}>Add Teacher</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.Section3_container}>
                    <View style={{ padding: 15, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
                        <View style={styles.profileImageContainer}>
                            <View style={{ height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#C3D0EA', height: 100, width: 100, borderRadius: 50, overflow: 'hidden' }}>
                                    {
                                        photoLoader == true ? (<CircleSnail color={['#4477BB']} />) : profilePhoto != '' ? <Image source={profilePhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Image source={AVATAR} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    }
                                </View>
                                <View style={{ height: '100%', width: '65%', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                                    <Text style={{ fontSize: 16, color: 'black' }}>Profile Photo</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 900, color: 'red' }}>Recommended Size: Passport</Text>
                                    <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7} style={{ backgroundColor: '#4477BB', justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: 8, borderRadius: 10 }}>
                                        <Text style={{ fontSize: 22, color: 'white', fontWeight: 700 }}>Select Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Teacher Id</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={teacherDetails.teacherId}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View> */}

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Teacher Email Id</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={inputs.emailId}
                                    onChangeText={(e) => handleInputs('emailId', e)}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Class</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={teacherDetails.class}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 15, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Teacher Name</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={inputs.name}
                                    maxLength={30}
                                    onChangeText={(e) => handleInputs('name', e)}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Mobile No.</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={inputs.mobileNo}
                                    keyboardType='numeric'
                                    maxLength={10}
                                    onChangeText={(e) => handleInputs('mobileNo', e)}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Subject</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={teacherDetails.subject}
                                    editable={false}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, marginBottom: 20 }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Salary</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <TextInput
                                    value={inputs.salary}
                                    keyboardType='numeric'
                                    maxLength={6}
                                    onChangeText={(e) => handleInputs('salary', e)}
                                    style={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: 'black', marginTop: 3, paddingVertical: 3, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'grey' }}>
                                </TextInput>
                                <FontAwesomeIcon color='#C3D0EA' size={20} icon={faLock} style={{ position: 'absolute', right: 0, zIndex: 1 }}></FontAwesomeIcon>
                            </View>
                        </View>
                    </View>
                </View>
                <Image style={styles.img} source={BOTTOMVECTOR} />
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
        borderRadius: 20,
        padding: 10,
        marginTop: 15
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

export default TeacherEnroll