import { LOG_OUT, SIGN_IN } from "./action";

const initialState = {
  username: null,
  user_type: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { username, user_type } = action.payload;
      return { ...state, username: username, user_type: user_type };

    case LOG_OUT:
      console.log("log out");
      return { ...state, username: null, user_type: null };

    default:
      return state;
  }
};
export default userReducer;
