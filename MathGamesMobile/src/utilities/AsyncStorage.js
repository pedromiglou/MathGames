import AsyncStorage from "@react-native-async-storage/async-storage";

const readData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.log('Failed to fetch ' + key + ' from storage')
    }
}

const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log('Failed to save ' + key + ' to the storage');
        console.log(e);
    }
}

export {saveData, readData};