import { GET_MEETINGS, CLEAR_MEETINGS, ADD_MEETINGS } from "./type";
import axios from "axios";

export const getMeetings = (today) => async (dispatch) => {
  const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
  const config = {
    headers: {
      "Access-Control-Allow-Origin": true,
    },
  };

  try {
    const res = await axios.get(
      PROXY_URL +
        `http://fathomless-shelf-5846.herokuapp.com/api/schedule?date=${today}`,
      config
    );

    res.data = res.data.sort((a, b) => {
      return a.start_time.split(":")[0] - b.start_time.split(":")[0];
    });

    console.log(res.data);

    res.data["curr_date"] = today;

    console.log(res.data);

    dispatch({
      type: GET_MEETINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLEAR_MEETINGS,
      payload: NaN,
    });
  }
};

export const addMeetings = (data) => async (dispatch) => {
  dispatch({
    type: ADD_MEETINGS,
    payload: data,
  });
};
