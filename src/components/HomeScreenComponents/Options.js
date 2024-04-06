import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native'

export default function Options({ icon, desc }) {
    const { Logout } = useContext(AuthContext);
    const navigation = useNavigation()

    const onTap = () => {
        if (desc == 'Logout') {
            console.log(desc)
            Logout()
        } else {
            console.log(desc)
        }
        if (desc == 'Student Details'){
            navigation.navigate('Students')
        }
        if (desc == 'Teacher Details'){
            navigation.navigate('Teachers')
        }
        if (desc == 'Change Password'){
            navigation.navigate('Change Password')
        }
        if (desc == 'Update Quiz'){
            navigation.navigate('Admin Quiz')
        }

    }

    return (
        <TouchableHighlight
            style={[[styles.container], desc == "Support" ? {justifyContent: 'center', alignItems: 'center'} : {}, desc == 'Student Details' || desc == 'Teacher Details' ? {borderWidth: 1, borderColor: '#4477BB'}:{}]}
            activeOpacity={0.8}
            underlayColor={'white'}
            onPress={onTap}
        >
            <View style={styles.touchableHighlight}>
                <View style={styles.circleContainer}>
                    <Image source={icon} style={styles.icon} />
                </View>
                <Text style={styles.text}>{desc}</Text>
            </View>
        </TouchableHighlight>
    );
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6FC',
        padding: 13,
        borderRadius: 13,
    },
    touchableHighlight: {
        flex: 1,
        gap: 7,
    },
    circleContainer: {
        flex: 1,
        marginBottom: 7,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
    },
});