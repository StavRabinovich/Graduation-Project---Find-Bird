const SIGN_IN = "SIGN_IN";

const LOG_OUT = "LOG_OUT";

export function signIn(username){
    console.log(`Redux -> user : ${username}`);
    return {type: SIGN_IN,
    payload: username}
};

export function logOut(){
    return {type: LOG_OUT}
};