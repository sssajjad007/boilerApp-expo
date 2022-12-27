import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeValue(key, value) {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));

    console.log(key + ' value stored');
  } catch (e) {
    console.log('Unable to stored ' + key);
  }
}

export async function retriveValue(key) {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(key + ' not  found!');
  }
}
export async function hasKey(key) {
  try {
    const keys = await AsyncStorage.getAllKeys();
    for (let index = 0; index < keys.length; index++) {
      if (keys[index] === key) {
        return true;
      }
    }
    return false;
  } catch (e) {}
}

export async function removeValue(key) {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    // remove error
  }
  console.log('Successfully removed ' + key);
}
