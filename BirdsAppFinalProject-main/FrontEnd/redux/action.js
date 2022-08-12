export const SIGN_IN = "SIGN_IN";

export const LOG_OUT = "LOG_OUT";

export const signIn = (username, user_type) => ({
  type: SIGN_IN,
  payload: { username: username, user_type: user_type },
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: { username: null, role: null },
});
