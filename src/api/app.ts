import { api } from './index';
import { Version } from './types';

const devices = {
  android: 'androidApp',
  ios: 'iosApp',
  web: 'web',
  windows: 'windows',
  macos: 'macos',
};
export const getVersion = async (currentVersion: string, platform: 'android' | 'ios' | 'web' | 'windows' | 'macos') => {
  try {
    const { data } = await api.get<Version>(
      `update/getLastVersion?version=${currentVersion}&device=${devices[platform] || ''}`
    );
    return { data };
  } catch (e) {
    return { error: 'درخواست با خطا مواجه شد' };
  }
};
