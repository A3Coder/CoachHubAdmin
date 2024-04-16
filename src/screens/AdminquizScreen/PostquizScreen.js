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
    FlatList
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { useNavigation } from '@react-navigation/native';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons/faLessThan'
import { faGreaterThan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

//Importing Components
import QuestionandOptions from '../../components/PostQuizComponents/QuestionandOptions';

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

    //States for Questions and Options Input
    const [Q$A, setQ$A] = useState([])

    //State for Data to Post on Backend
    const [questions, setquestions] = useState([])
    const [options, setoptions] = useState([])
    const [rightAnswer, setrightAnswer] = useState([])
    const [postButton, setpostButton] = useState(false)

    const handleNoofQuestions = (noOfQuestions) => {
        if (!Q$A.length) {
            var arrayofQuestions = []
            for (i = 0; i < noOfQuestions; i++) {
                var temp = {
                    question: "",
                    option: {
                        questionIdx: i,
                        option1: "",
                        option2: "",
                        option3: "",
                        option4: ""
                    },
                    rightAnswer: {
                        questionIdx: i,
                        answer: ""
                    },
                    _id: i
                }
                arrayofQuestions.push(temp)
            }
            setQ$A(arrayofQuestions)
        }
        else {
            if (noOfQuestions > Q$A.length) {
                var length = noOfQuestions - Q$A.length
                var prevArray = [...Q$A]
                for (i = 0; i < length; i++) {
                    var temp = {
                        question: "",
                        option: {
                            questionIdx: i,
                            option1: "",
                            option2: "",
                            option3: "",
                            option4: ""
                        },
                        rightAnswer: {
                            questionIdx: i,
                            answer: ""
                        },
                        _id: i
                    }
                    prevArray.push(temp)
                }
                setQ$A(prevArray)
            } else {
                // var index = Q$A.length - noOfQuestions
                var prevArray = [...Q$A]

                var newArray = prevArray.slice(0, noOfQuestions)

                setQ$A(newArray)
            }
        }
    }

    const formatData = () => {
        const data = [...Q$A]

        if (!data.length) {
            return
        }
        var questions = []
        var options = []
        var rightAnswers = []

        data.forEach((item) => {
            questions.push(item.question)
            options.push(item.option)
            rightAnswers.push(item.rightAnswer)
        })

        setquestions(questions)
        setoptions(options)
        setrightAnswer(rightAnswers)
    }

    const enablePostButton = () => {
        var ques = [...questions]
        var opt = [...options]
        var rA = [...rightAnswer]

        if (!ques.length && !opt.length && !rA.length) {
            return
        }

        //Validation
        var validator = true
        ques.forEach((item) => {
            if (item === "") {
                validator = false
            }
        })
        opt.forEach((item) => {
            if (item.option1 == "" || item.option2 == "" || item.option3 == "" || item.option4 == "") {
                validator = false
            }
        })
        rA.forEach((item) => {
            if (item.answer == "") {
                validator = false
            }
        })

        if (validator) {
            setpostButton(true)
        }
    }

    const handlePost = () => {
        console.log("POST")
    }

    useEffect(() => {
        formatData()
    }, [Q$A])
    useEffect(() => {
        enablePostButton()
    }, [questions, rightAnswer, options])
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
                        <View style={{ paddingHorizontal: 18, paddingVertical: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
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

                        <View style={{ paddingHorizontal: 18, paddingVertical: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
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

                        <View style={{ paddingHorizontal: 18, paddingVertical: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, }}>
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
                                    handleNoofQuestions(parseInt(item.value))
                                }}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 5, paddingVertical: 3, }}>
                            <View style={{ width: '100%', }}>
                                <Image source={DIVIDER} resizeMode='contain' style={{ width: '100%' }}></Image>
                            </View>
                        </View>


                        <View style={{ paddingHorizontal: 18, paddingVertical: 5, paddingBottom: 75 }}>
                            {
                                Q$A.map((item, index) => (<QuestionandOptions key={index} variable={item} setFunctions={setQ$A} mainState={Q$A} indexNumber={index}></QuestionandOptions>))
                            }
                            {/* <Pressable android_ripple={{ foreground: true, borderless: true }}
                                style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                                {
                                    (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center', },]}></View>)
                                }
                            </Pressable> */}
                            <View style={{ gap: 3, marginVertical: 10 }}>
                                <Text style={{ color: 'grey', fontSize: 14, fontWeight: '500' }}>Timing:</Text>
                                <View>
                                    <TextInput value={'30 secs'} editable={false} style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: 'black', fontWeight: '900' }}></TextInput>
                                </View>
                            </View>
                        </View>

                        {/* <Image
                            style={styles.img}
                            source={BOTTOMVECTOR}
                        /> */}
                    </View>
                </ScrollView>
                {
                    postButton == true ? (
                        <TouchableOpacity onPress={() => handlePost()} activeOpacity={0.7} style={{ width: '90%', position: 'absolute', bottom: 0, marginVertical: 15, alignSelf: 'center' }}>
                            <View>
                                <Text style={styles.btn}>Post</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: '90%', position: 'absolute', bottom: 0, marginVertical: 15, alignSelf: 'center', }}>
                            <View>
                                <Text style={[styles.btn, { color: 'white', backgroundColor: '#a1d1ff' }]}>Post</Text>
                            </View>
                        </View>
                    )
                }
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
        fontSize: 22,
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