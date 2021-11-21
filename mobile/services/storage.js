import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataInStorage = async (key, value) => {
    return await AsyncStorage.setItem(key, value)
}

export const getDataFromStorage = async (key) => {
    return await AsyncStorage.getItem(key)
}