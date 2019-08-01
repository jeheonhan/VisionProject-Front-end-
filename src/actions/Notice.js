import {GET_NOTICE_LIST, 
        CARRY_NOTICE_LIST, 
        GET_NOTICE_DETAIL, 
        CARRY_NOTICE_DETAIL, 
        ADD_NOTICE, 
        ADD_NOTICE_RESULT,
        GET_NOTICE_HEADER_LIST,
        CARRY_NOTICE_HEADER_LIST,
        DELETE_NOTICE} from '../actionTypes/ActionTypes';

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

export const addNotice = (notice) => {
    return {
        type: ADD_NOTICE,
        payload: notice
    }
}

export const addNoticeResult = (data) => {
    return {
        type: ADD_NOTICE_RESULT,
        payload: data
    }
}

export const getNoticeHeaderList = () => {
    //console.log("getNoticeHeaderList Action :::::::")
    return {
        type: GET_NOTICE_HEADER_LIST
    }
}

export const carryNoticeHeaderList = (data) => {
    return {
        type: CARRY_NOTICE_HEADER_LIST,
        payload: data
    }
}

export const convertNoticeStatusCode = (notice) => {
    return{
        type: DELETE_NOTICE,
        payload : notice
    }
}