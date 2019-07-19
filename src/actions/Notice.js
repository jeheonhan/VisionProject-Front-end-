import {GET_NOTICE_LIST, CARRY_NOTICE_LIST} from '../actionTypes/ActionTypes';

export const getNoticeList = (search) => {
    return {
        type: GET_NOTICE_LIST,
        payload: search
    }
}

export const carryNoticeList = (data) => {
    return {
        type: CARRY_NOTICE_LIST,
        payload: data
    }
}