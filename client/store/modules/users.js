import axios from "axios";
import BASE_URL from "../../config/url"



axios.defaults.baseURL = "http://127.0.0.1:8000/api"

import {
  ACCESS_KEY,
  SECRET_KEY_S3,
  REGION,
  BUCKET_NAME,
} from "@env";
import { RNS3 } from 'react-native-aws3';
import {
  getAuthenticatedToken,
  removeAuthenticatedToken,
  setAuthenticatedToken,
  setUserId
} from '../../cacheStore';

/*** TYPES ***/
const POST_USER_REGISTER = "POST_USER_REGISTER";
const POST_USER_REGISTER_LOADING = "POST_USER_REGISTER_LOADING";
const POST_USER_LOGIN = "POST_USER_LOGIN";
const POST_USER_LOGIN_LOADING = "POST_USER_LOGIN_LOADING";
const GET_CURRENT_USER="GET_CURRENT_USER";
const GET_CURRENT_USER_LOADING="GET_CURRENT_USER_LOADING";
const GET_AUTHENTICATED="GET_AUTHENTICATED";
const GET_AUTHENTICATED_LOADING="GET_AUTHENTICATED_LOADING";
const UPLOADING_TO_S3_LOADING="UPLOADING_TO_S3_LOADING";
const UPLOADING_TO_S3="UPLOADING_TO_S3"

/*** REDUCERS ***/

const initialState = {
registerUser:{},
registerUserLoading:false,
loginedUser:{},
loginLoading:false,
currentUser:{},
currentUserLoading:false,
authenticatedLoading:false,
authenticatedUser:false,
s3Upload:{},
s3UploadLoading:false
};

const requestOptions = {
  headers: { "Content-Type": "application/json" },
};



export default function reducer(state = initialState, action) {
  switch (action.type) {

    case POST_USER_REGISTER:
      return { ...state, registerUser: action.payload };
    case POST_USER_REGISTER_LOADING:
      return { ...state, registerUserLoading: action.payload };

      case POST_USER_LOGIN:
        return { ...state, loginedUser: action.payload };
      case POST_USER_LOGIN_LOADING:
        return { ...state, loginLoading: action.payload };

        case GET_CURRENT_USER:
          return { ...state, currentUser: action.payload };
        case GET_CURRENT_USER_LOADING:
          return { ...state, currentUserLoading: action.payload };


          case GET_AUTHENTICATED:
            return { ...state, authenticatedUser: action.payload };
          case GET_AUTHENTICATED_LOADING:
            return { ...state, authenticatedLoading: action.payload };

            case UPLOADING_TO_S3_LOADING:
              return { ...state, s3UploadLoading: action.payload };
            
              case UPLOADING_TO_S3:
                return { ...state, s3Upload: action.payload };

    default:
      return state;
  }
}

export function PostRegisterUser(values) {
  return dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: POST_USER_REGISTER_LOADING, payload: true });
      const response = await axios.post(`/auth/register`,values);
      dispatch({ type: POST_USER_REGISTER, payload: response.data });
      dispatch({ type: POST_USER_REGISTER_LOADING, payload: false });
      resolve();
    } catch (error) {
      dispatch({ type: POST_USER_REGISTER_LOADING, payload: false });
      console.log("error :", error);
      reject();
      // authMsg('error', getCommonError(error));
    }
  });
}
}



export function PostLoginUser(values) {
  return dispatch => {
  return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: POST_USER_LOGIN_LOADING, payload: true });
        const response = await axios.post(
          `http://127.0.0.1:8000/api/auth/login`,
          values
          );
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.user.token}`;
        await setAuthenticatedToken(response.data.user.token);
        dispatch(userAuthenticated());

        dispatch({ type: POST_USER_LOGIN, payload: response.data });
        dispatch({ type: POST_USER_LOGIN_LOADING, payload: false });

        //TODO REMOVE THE CONSOLE AFTER TEST
        resolve();
      } catch (error) {
        dispatch({ type: POST_USER_LOGIN_LOADING, payload: false });
        console.log("error :", error);

        // reject();
        // authMsg('error', getCommonError(error));
      }
    });
  }
  }


export function getCurrentUser(userId) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CURRENT_USER_LOADING, payload: true });
      const response = await axios.get(`/user/${userId}`);
      dispatch({ type: GET_CURRENT_USER, payload: response.data });
      dispatch({ type: GET_CURRENT_USER_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_CURRENT_USER_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}


export function userAuthenticated() {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_AUTHENTICATED_LOADING, payload: true });      
      let token= await getAuthenticatedToken();
      let response=false;
      if(token!==null){
        response=true;
      }else{
        response=false;
      }

      dispatch({ type: GET_AUTHENTICATED, payload: response });
      dispatch({ type: GET_AUTHENTICATED_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_AUTHENTICATED_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}

export function userSignout() {
  return async (dispatch) => {
    try {
      await removeAuthenticatedToken();
      dispatch(userAuthenticated());
    } catch (error) {
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}


