import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const QuestionandOptions = ({ variable, setFunctions, mainState, indexNumber }) => {
    const handleInputChange = (index, propertyName, value, isOption) => {
        if (isOption === true) {
            if (variable._id === index) {
                var prevState = [...mainState]
                prevState[index].option[propertyName] = value

                setFunctions(prevState)
            }
        } else {
            if (variable._id === index) {
                var prevState = [...mainState]
                prevState[index][propertyName] = value

                setFunctions(prevState)
            }
        }
    }

    //States for Selected Option
    const [selectedOption, setselectedOption] = useState({
        option1: null,
        option2: null,
        option3: null,
        option4: null
    })
    const handleSelectedOption = (index, propertyName, value) => {
        const prevOptions = { ...selectedOption }
        if(propertyName == 'option1'){
            prevOptions.option1 = value
            prevOptions.option2 = null
            prevOptions.option3 = null
            prevOptions.option4 = null
        } else if (propertyName == 'option2'){
            prevOptions.option1 = null
            prevOptions.option2 = value
            prevOptions.option3 = null
            prevOptions.option4 = null
        } else if (propertyName == 'option3'){
            prevOptions.option1 = null
            prevOptions.option2 = null
            prevOptions.option3 = value
            prevOptions.option4 = null
        } else if (propertyName == 'option4') {
            prevOptions.option1 = null
            prevOptions.option2 = null
            prevOptions.option3 = null
            prevOptions.option4 = value
        }
        setselectedOption(prevOptions)
        console.log(selectedOption)
        handleInputChange(index, 'rightAnswer', value, false)
    }

    return (
        <>
            <View style={{ gap: 5 }}>
                <Text style={{ color: 'grey', fontSize: 14, fontWeight: '500' }}>Enter Question {indexNumber + 1}:</Text>
                <View>
                    <TextInput value={variable.question} onChangeText={(text) => handleInputChange(indexNumber, 'question', text, false)} style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', paddingHorizontal: 10, paddingVertical: 5, fontSize: 14, color: 'black', fontWeight: '900' }}></TextInput>
                </View>
            </View>
            <View style={{ marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', rowGap: 12 }}>
                <View style={{ gap: 5, width: '47%', height: 55, borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#4477BB', borderRadius: 8, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => handleSelectedOption(indexNumber, 'option1', variable.option.option1)} android_ripple={{ foreground: true, borderless: true }}
                        style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        {
                            selectedOption.option1 && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center', },]}></View>)
                        }
                    </Pressable>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: 'grey', fontSize: 14, paddingHorizontal: 8, }}>Enter Option 1:</Text>
                        <TextInput value={variable.option.option1} onChangeText={(text) => handleInputChange(indexNumber, 'option1', text, true)} style={{ flex: 1, paddingHorizontal: 8, backgroundColor: 'white', paddingVertical: 3, color: 'black', fontWeight: '500' }}></TextInput>
                    </View>
                </View>
                <View style={{ gap: 5, width: '47%', height: 55, borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#4477BB', borderRadius: 8, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => handleSelectedOption(indexNumber, 'option2', variable.option.option2)} android_ripple={{ foreground: true, borderless: true }}
                        style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        {
                            selectedOption.option2 && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center', },]}></View>)
                        }
                    </Pressable>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: 'grey', fontSize: 14, paddingHorizontal: 8, }}>Enter Option 2:</Text>
                        <TextInput value={variable.option.option2} onChangeText={(text) => handleInputChange(indexNumber, 'option2', text, true)} style={{ flex: 1, paddingHorizontal: 8, backgroundColor: 'white', paddingVertical: 3, color: 'black', fontWeight: '500' }}></TextInput>
                    </View>
                </View>
                <View style={{ gap: 5, width: '47%', height: 55, borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#4477BB', borderRadius: 8, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => handleSelectedOption(indexNumber, 'option3', variable.option.option3)} android_ripple={{ foreground: true, borderless: true }}
                        style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        {
                            selectedOption.option3 && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center', },]}></View>)
                        }
                    </Pressable>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: 'grey', fontSize: 14, paddingHorizontal: 8, }}>Enter Option 3:</Text>
                        <TextInput value={variable.option.option3} onChangeText={(text) => handleInputChange(indexNumber, 'option3', text, true)} style={{ flex: 1, paddingHorizontal: 8, backgroundColor: 'white', paddingVertical: 3, color: 'black', fontWeight: '500' }}></TextInput>
                    </View>
                </View>
                <View style={{ gap: 5, width: '47%', height: 55, borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#4477BB', borderRadius: 8, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => handleSelectedOption(indexNumber, 'option4', variable.option.option4)} android_ripple={{ foreground: true, borderless: true }}
                        style={{ width: 20, height: 20, borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', }}>
                        {
                            selectedOption.option4 && (<View style={[{ width: '80%', height: '80%', borderRadius: 50, borderWidth: 0.5, borderColor: 'grey', backgroundColor: '#79eb2d', justifyContent: 'center', alignItems: 'center', },]}></View>)
                        }
                    </Pressable>
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: 'grey', fontSize: 14, paddingHorizontal: 8, }}>Enter Option 4:</Text>
                        <TextInput value={variable.option.option4} onChangeText={(text) => handleInputChange(indexNumber, 'option4', text, true)} style={{ flex: 1, paddingHorizontal: 8, backgroundColor: 'white', paddingVertical: 3, color: 'black', fontWeight: '500' }}></TextInput>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{ color: 'grey', fontSize: 14 }}>Right Answer: <Text style={{ color: 'black', fontWeight: '900', fontSize: 18 }}>{variable.rightAnswer} ...</Text> </Text>
            </View>
            <View style={{ marginVertical: 10, backgroundColor: '#dbd9d9', height: 4, borderRadius: 50 }}></View>
        </>
    )
}

export default QuestionandOptions