import {GET_NOTICE_LIST, CARRY_NOTICE_LIST, GET_NOTICE_DETAIL, CARRY_NOTICE_DETAIL} from '../actionTypes/ActionTypes';

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

export const getNoticeDetail = (noticeNo) => {
    return {
        type: GET_NOTICE_DETAIL,
        payload: noticeNo
    }
}

export const carryNoticeDetail = (data) => {
    return {
        type: CARRY_NOTICE_DETAIL,
        payload: data
    }
}