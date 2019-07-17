import {  GET_HRCARD_LIST
        , CARRY_HRCARD_LIST
        , GET_APPOINT_LIST
        , CARRY_APPOINT_LIST
        , CHECKED_EMPLOYEE} from '../actionTypes/ActionTypes';


export const getHRCardList = (search) => {
    return {
        type: GET_HRCARD_LIST,
        payload: search
    }
}

export const carryHRCardList = (data) => {
    return{
        type: CARRY_HRCARD_LIST,
        payload: data
    }
}

export const getAppointList = (search) => {
    return{
        type: GET_APPOINT_LIST,
        payload: search
    }
}

export const carryAppointList = (data) => {
    return{
        type: CARRY_APPOINT_LIST,
        payload: data
    }
}

export const checkedEmployee = (data) => {
    return{
        type: CHECKED_EMPLOYEE,
        payload: data
    }
}