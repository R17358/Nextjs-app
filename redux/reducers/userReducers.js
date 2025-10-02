import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL,
   USER_ENTRY_REQUEST, USER_ENTRY_SUCCESS, USER_ENTRY_FAIL } 
   from "../constants/userConstants";

const initialState = {
  user:{}
};

export const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ENTRY_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        loading: true,
        updated: false
      };
    case USER_ENTRY_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        user: action.payload
      };

    case USER_ENTRY_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        updated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
