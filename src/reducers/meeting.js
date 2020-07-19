import { GET_MEETINGS, CLEAR_MEETINGS, ADD_MEETINGS } from "../actions/type";

const initialState = {
  loading: true,
  meetingData: [],
  currentDate: null,
  newMeetingData: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEETINGS:
      return {
        ...state,
        meetingData: payload,
        currentDate: payload.curr_date,
        loading: false,
      };
    case CLEAR_MEETINGS:
      return {
        ...state,
        meetingData: [],
        loading: false,
      };
    case ADD_MEETINGS:
      return {
        ...state,
        newMeetingData: [payload, ...state.newMeetingData],
        loading: false,
      };
    default:
      return state;
  }
}
