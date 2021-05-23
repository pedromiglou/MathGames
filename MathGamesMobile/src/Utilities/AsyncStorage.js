import AsyncStorage from "@react-native-async-storage/async-storage";

const readData = async (key, setter) => {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value !== null) {
            setter(value);
        }
    } catch (e) {
        console.log('Failed to fetch the data from storage')
    }
}

const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('Failed to save the data to the storage')
    }
}

export {saveData, readData};