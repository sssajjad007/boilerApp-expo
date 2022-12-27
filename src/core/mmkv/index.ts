import { MMKV } from 'react-native-mmkv';
import type { tStorageType, tStorageResult } from './type';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
const storage = new MMKV();
if (__DEV__) {
  initializeMMKVFlipper({ default: storage });
}
export function remove(key: string) {
  try {
    storage.delete(key);
  } catch (error) {
    // send error to sentry
  }
}

export function retrieve<T extends tStorageType>(key: string, type: T): tStorageResult<T> {
  try {
    if (type === 'string') {
      return storage.getString(key) as tStorageResult<T>;
    }
    if (type === 'number') {
      return storage.getNumber(key) as tStorageResult<T>;
    }
    if (type === 'boolean') {
      return storage.getBoolean(key) as tStorageResult<T>;
    }
    return undefined as tStorageResult<T>;
  } catch (error) {
    return undefined as tStorageResult<T>;
    // send error to sentry
    // return undefined;
  }
}

export function add(key: string, value: string | number | boolean) {
  try {
    storage.set(key, value);
  } catch (error) {
    // send error to sentry
  }
}

export function has(key: string) {
  try {
    return storage.contains(key);
  } catch (error) {
    return false;
  }
}
