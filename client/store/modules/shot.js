import axios from "axios";
import BASE_URL from "../../config/url"

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
/*** TYPES ***/
const GET_CALL = "GET_CALL";
const GET_PREDICTED_SHOT = "GET_PREDICTED_SHOT";
const GET_PREDICTED_SHOT_LOADING = "GET_PREDICTED_SHOT_LOADING";
const POST_SAVED_SHOT='POST_SAVED_SHOT';
const POST_SAVED_SHOT_LOADING='POST_SAVED_SHOT_LOADING';
const GET_BATTING_STATS_LOADING="GET_BATTING_STATS_LOADING";
const GET_USER_BATTING_STATS="GET_USER_BATTING_STATS"
const GET_LATEST_STATS_LOADING='GET_LATEST_STATS_LOADING';
const GET_LATEST_STATS='GET_LATEST_STATS';
const GET_STANCE_LOADING ="GET_STANCE_LOADING";
const GET_STANCE ="GET_STANCE";
const GET_AVERAGE_LOADING="GET_AVERAGE_LOADING";
const GET_AVERAGE="GET_AVERAGE";

/*** REDUCERS ***/

const initialState = {
  message: {},
  shotType: {},
  shotPredictLoading: false,
  saveShotLoading: false,
  saveShot: {},
  userBattingStatsLoading:false,
  userBattingStats:{},
  latestStats:{},
  latestStatsLoading:false,
  stanceLoading:false,
  stance:{},
  average:{},
  avgLoading:false
};



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CALL:
      return { ...state, message: action.payload };
    case GET_PREDICTED_SHOT:
      return { ...state, shotType: action.payload };
    case GET_PREDICTED_SHOT_LOADING:
      return { ...state, shotPredictLoading: action.payload };
    case POST_SAVED_SHOT:
      return { ...state, saveShot: action.payload };
    case POST_SAVED_SHOT_LOADING:
      return { ...state, saveShotLoading: action.payload };
    case GET_BATTING_STATS_LOADING:
      return { ...state, userBattingStatsLoading: action.payload };
    case GET_USER_BATTING_STATS:
      return { ...state, userBattingStats: action.payload };
    case GET_LATEST_STATS_LOADING:
      return { ...state, latestStatsLoading: action.payload };
    case GET_LATEST_STATS:
      return { ...state, latestStats: action.payload };

    case GET_STANCE_LOADING:
      return { ...state, stanceLoading: action.payload };
    case GET_STANCE:
      return { ...state, stance: action.payload };
    case GET_AVERAGE_LOADING:
      return { ...state, avgLoading: action.payload };
    case GET_AVERAGE:
      return { ...state, average: action.payload };

    default:
      return state;
  }
}

export function getUserBattingStats(userId,shotType) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BATTING_STATS_LOADING, payload: true });
      const response = await axios.get(`/batting/users/${userId}/batting-stats`, {
        params: {
          shotType
        }
      });
      dispatch({ type: GET_USER_BATTING_STATS, payload: response.data });
      dispatch({ type: GET_BATTING_STATS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_BATTING_STATS_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}

export function postCricketShot(filename) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: true });
      const response = await axios.get(
        `/batting/get-shot`,{
          params: {
            filename
          }
        }
      );
      console.log('response :', response);
      dispatch({ type: GET_PREDICTED_SHOT, payload: response.data });
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}

export function getTypeShotUsingImage(fileLocation) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: true });
      const response = await axios.get(
        `/batting/shot-type/image`,{
          params: {
            fileLocation
          }
        }
      );
      dispatch({ type: GET_PREDICTED_SHOT, payload: response.data });
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_PREDICTED_SHOT_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}




export function SaveUserShot(values) {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_SAVED_SHOT_LOADING, payload: true });
      const response = await axios.post(
        `/batting/save-user-shotDetails`,
        values
      );
      dispatch({ type: POST_SAVED_SHOT, payload: response.data });
      dispatch(getLatestStats(values.user_id))
      dispatch({ type: POST_SAVED_SHOT_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: POST_SAVED_SHOT_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}


export function getLatestStats(userId) {

  return async (dispatch) => {
    try {
      dispatch({ type: GET_LATEST_STATS_LOADING, payload: true });
      const response = await axios.get(`/batting/latest-batting-stats/${userId}`);
      dispatch({ type: GET_LATEST_STATS, payload: response.data });
      dispatch({ type: GET_LATEST_STATS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_LATEST_STATS_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}


export function getStanceSimilariy(fileLocation) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_STANCE_LOADING, payload: true });
      const response = await axios.get(`/batting/stance`,{
        params: {
          fileLocation
        }
      }
      );
      console.log('response :', response);
      dispatch({ type: GET_STANCE, payload: response.data });
      dispatch({ type: GET_STANCE_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_STANCE_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}
export function getAverageShot(userId) {

  return async (dispatch) => {
    try {
      dispatch({ type: GET_AVERAGE_LOADING, payload: true });
      const response = await axios.get(`/batting/average-all-shots/${userId}`);
      dispatch({ type: GET_AVERAGE, payload: response.data });
      dispatch({ type: GET_AVERAGE_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: GET_AVERAGE_LOADING, payload: false });
      console.log("error :", error);
      // authMsg('error', getCommonError(error));
    }
  };
}
