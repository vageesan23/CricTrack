import AsyncStorage from '@react-native-async-storage/async-storage';

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const AUTH_TOKEN = 'AUTH_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';


export async function removePersist() {
  return AsyncStorage.removeItem('persist:root');
}

export async function isAuthenticated() {
  return AsyncStorage.getItem(IS_AUTHENTICATED);
}

export async function setIsAuthenticated(value) {
  return AsyncStorage.setItem("IS_AUTHENTICATED", value);
}

export async function removeIsAuthenticated() {
  return AsyncStorage.removeItem(IS_AUTHENTICATED);
}

export async function getAuthenticatedToken() {
  return AsyncStorage.getItem(AUTH_TOKEN);
}

export async function setAuthenticatedToken(value) {
  return AsyncStorage.setItem(AUTH_TOKEN, value);
}

export async function removeAuthenticatedToken() {
  return AsyncStorage.removeItem(AUTH_TOKEN);
}

export async function getRefreshToken() {
  return AsyncStorage.getItem(REFRESH_TOKEN);
}

export async function setRefreshToken(value) {
  return AsyncStorage.setItem(REFRESH_TOKEN, value);
}

export async function removeRefreshToken() {
  return AsyncStorage.removeItem(REFRESH_TOKEN);
}

