import { SEND_EMAIL, CLEAN_STORE_STATE } from '../actionTypes/ActionTypes';

export const sendEmail = (data) => {
    return{
        type: SEND_EMAIL,
        payload: data
    }
}

//원하는 store의 값 지우기
export const cleanStoreState = (target) => {
    return{
        type: CLEAN_STORE_STATE,
        payload: target
    }
}