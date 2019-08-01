import {
    HIDE_MESSAGE,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    CONVERT_LOADER,
    CARRY_FORGOT_USER_ID,
    CLEAN_STORE_STATE,
    CARRY_PASSWORD_BOOLEAN,
    CARRY_IDENTIFY_CODE
} from "actionTypes/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('user'),
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload
            }
        }
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload
            }
        }
        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }
        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                authUser: null,
                initURL: '/signin',
                loader: false
            }
        }

        //로그인 실패 시
        case SHOW_MESSAGE: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                loader: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        case CONVERT_LOADER: {
            if(state.loader === true){
                return{
                    ...state,
                    loader:false
                }
            }else{
                return{
                    ...state,
                    loader:true
                }
            }
        }

        case CARRY_FORGOT_USER_ID : {
            return{
                ...state,
                forgotId: action.payload
            }
        }

        //원하는 store의 state값 날리기
        case CLEAN_STORE_STATE : {
            return{
                ...state,
                [action.payload]:null
            }
        }

        case CARRY_PASSWORD_BOOLEAN : {
            return{
                ...state,
                resultBoolean: action.payload
            }
        }

        case CARRY_IDENTIFY_CODE : {
            return{
                ...state,
                identyCode: action.payload
            }
        }

        default:
            return state;
    }
}
