import SInfo from "react-native-sensitive-info";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataInStorage = async (key, value) => {
    return await AsyncStorage.setItem(key, value)
    // return await SInfo.setItem(key, value, {
    //     sharedPreferencesName: "surguCalendarPrefs",
    //     keychainService: "surguCalendarKeyChain"
    // });
}

export const getDataFromStorage = async (key) => {
    return await AsyncStorage.getItem(key)
    // return await SInfo.getItem(key,{
    //     sharedPreferencesName: "surguCalendarPrefs",
    //     keychainService: "surguCalendarKeyChain"
    // });
}