import {  GET_HRCARD_LIST
        , CARRY_HRCARD_LIST
        , GET_APPOINT_LIST
        , CARRY_APPOINT_LIST
        , CHECKED_EMPLOYEE,
        CHECKED_DEPARTMENT,
        CHECKED_RANK,
        ADD_APPOINTMENT,
        GET_SIMPLE_HRCARD_BY_EMPLOYEENO,
        CARRY_SIMPLE_HRCARD} from '../actionTypes/ActionTypes';


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

export const checkedDepartment = (data) => {
    return{
        type: CHECKED_DEPARTMENT,
        payload: data
    }
}

export const checkedRank = (data) => {
    return{
        type: CHECKED_RANK,
        payload: data
    }
}

export const addAppointment = (data) => {
    return{
        type: ADD_APPOINTMENT,
        payload: data
    }
}

export const getSimpleHRCardByEmployeeNo = (employeeNo) => {
    return{
        type: GET_SIMPLE_HRCARD_BY_EMPLOYEENO,
        payload: employeeNo
    }
}

export const carrySimpleHRCard = (data) => {
    return{
        type: CARRY_SIMPLE_HRCARD,
        payload: data
    }
}