import * as Font from 'expo-font';

import jwt_decode from "jwt-decode";
import { getAuthenticatedToken } from './cacheStore';
import NetInfo from '@react-native-community/netinfo';

export async function loadFonts() {
    await Font.loadAsync({
      Poppins: require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Light': {
        uri: require('./assets/fonts/Poppins-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },      
    });
}


export async function getUserId(){
  let token = await getAuthenticatedToken();
  var userInfo = jwt_decode(token);

  return userInfo.id
}



export const checkConnected = ()=>{
    return NetInfo.fetch().then(state => {
        return state.isConnected;
      });
}



export const SHOTS = [
  "Cover Drive",
  "Straight Drive",
  "Pull Shot",
  "Leg Glance Shot",
  "Cut Shot",
  "Scoop Shot",
];