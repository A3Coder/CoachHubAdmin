import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (resData) => {
        setIsLoading(true);
        let userInfo = resData;

        if (userInfo) {
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.token);
            userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo)
            setUserInfo(userInfo);
            setUserToken(userInfo.token);
        }
        // console.log("User Token: " +userInfo.token);
        // console.log(userInfo)
        setIsLoading(false);
    }
    const Logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')

        setIsLoading(false);
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');
            // console.log(userToken);
            // console.log(userInfo);             
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(`isLogged in error ${error}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (

        <AuthContext.Provider value={{ login, Logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    )

}