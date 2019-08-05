import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    CONVERT_LOADER,
    FORGOT_USER_ID,
    CARRY_FORGOT_USER_ID,
    FORGOT_PASSWORD,
    CARRY_PASSWORD_BOOLEAN,
    REQUEST_IDENTIFY_CODE,
    SEND_IDENTIFY_CODE,
    CARRY_IDENTIFY_CODE,
    MODIFY_PASSWORD,
    CARRY_LOGIN_FLAG
} from 'actionTypes/ActionTypes';

export const userSignIn = (user) => {
    return {
        type: SIGNIN_USER,
        payload: user
    };
};
export const userSignOut = () => {
    return {
        type: SIGNOUT_USER
    };
};
export const userSignUpSuccess = (authUser) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: authUser
    };
};

export const userSignInSuccess = (authUser) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: authUser
    }
};
export const userSignOutSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS,
    }
};

export const showAuthMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};


export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};
export const showAuthLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const convertLoader = () => {
    return{
        type: CONVERT_LOADER
    };
}

export const forgotUserId = (data) => {
    return{
        type: FORGOT_USER_ID,
        payload: data
    }
}

export const carryForgotUserId = (data) => {
    return{
        type: CARRY_FORGOT_USER_ID,
        payload: data
    }
}

export const forgotPassword = (data) => {
    return{
        type: FORGOT_PASSWORD,
        payload: data
    }
}

export const carryPasswordBoolean = (data) => {
    return{
        type: CARRY_PASSWORD_BOOLEAN,
        payload: data
    }
}

export const requestIdentifyCode = (data) => {
    return{
        type: REQUEST_IDENTIFY_CODE,
        payload: data
    }
}

export const sendIdentifyCode = (data) => {
    return{
        type: SEND_IDENTIFY_CODE,
        payload: data
    }
}

export const carryIdentifyCode = (data) => {
    return{
        type: CARRY_IDENTIFY_CODE,
        payload: data
    }
}

export const modifyPassword = (data) => {
    return{
        type: MODIFY_PASSWORD,
        payload: data
    }
}

export const carryLoginFlag = (data) => {
    return{
        type: CARRY_LOGIN_FLAG,
        payload: data
    }
}