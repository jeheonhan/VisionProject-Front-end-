import {  GET_HRCARD_LIST
        , CARRY_HRCARD_LIST
        , GET_APPOINT_LIST
        , CARRY_APPOINT_LIST
        , CHECKED_EMPLOYEE,
        CHECKED_DEPARTMENT,
        CHECKED_RANK,
        ADD_APPOINTMENT,
        GET_SIMPLE_HRCARD_BY_EMPLOYEENO,
        CARRY_SIMPLE_HRCARD,
        ADD_HRCARD,
        GET_WORKATTITUDE_LIST,
        CARRY_WORKATTITUDE_LIST,
        GET_WORKATTITUDE_CODE_LIST,
        CARRY_WORKATTITUDE_CODE_LIST,
        CHECKED_WORKATTITUDE_CODE,
        ADD_WORKATTITUDE,
        CHECKED_APPOINTMENT_ROW_DATA,
        UPDATE_APPOINTMENT,
        ADD_WORKATTITUDE_CODE,
        GET_DEPARTMENT_LIST,
        CARRY_DEPARTMENT_LIST,
        ADD_DEPARTMENT,
        CONVERT_DEPART_USAGE_STATUS,
        CHECKED_WORKATTITUDE,
        UPDATE_WORK_ATTITUDE,
        UPDATE_WORK_ATTITUDE_CODE,
        GET_HRCARD_DETAIL,
        CARRY_HRCARD_DETAIL,
        UPDATE_HRCARD,
        } from '../actionTypes/ActionTypes';


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

export const checkedWorkAttitudeCode = (data) => {
    return{
        type: CHECKED_WORKATTITUDE_CODE,
        payload: data
    }
}

export const checkedApointmentRowData = (data) => {
    return{
        type: CHECKED_APPOINTMENT_ROW_DATA,
        payload: data
    }
}

export const checkedWorkAttitude = (data) => {
    return{
        type: CHECKED_WORKATTITUDE,
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

export const addHRCard = (data) => {
    return{
        type: ADD_HRCARD,
        payload: data
    }
}

export const getWorkAttitudeList = (search) => {
    return{
        type: GET_WORKATTITUDE_LIST,
        payload: search
    }
}

export const carryWorkAttitudeList = (data) => {
    return{
        type: CARRY_WORKATTITUDE_LIST,
        payload: data
    }
}

export const getWorkAttitudeCodeList = (search) => {
    return{
        type: GET_WORKATTITUDE_CODE_LIST,
        payload: search
    }
}

export const carryWorkAttitudeCodeList = (data) => {
    return{
        type: CARRY_WORKATTITUDE_CODE_LIST,
        payload: data
    }
}

export const addWorkAttitude = (data) => {
    return{
        type: ADD_WORKATTITUDE,
        payload: data
    }
}

export const updateAppointment = (data) => {
    return{
        type: UPDATE_APPOINTMENT,
        payload: data
    }
}

export const addWorkAttitudeCode = (data) => {
    return{
        type: ADD_WORKATTITUDE_CODE,
        payload: data
    }
}

export const getDepartmentList = (search) => {
    return{
        type: GET_DEPARTMENT_LIST,
        payload: search
    }
}

export const carryDepartmentList = (data) => {
    return{
        type: CARRY_DEPARTMENT_LIST,
        payload: data
    }
}

export const addDepartment = (data) => {
    return{
        type: ADD_DEPARTMENT,
        payload: data
    }
}

export const convertDepartUsageStatus = (data) => {
    return{
        type: CONVERT_DEPART_USAGE_STATUS,
        payload: data
    }
}

export const updateWorkAttitude = (data) => {
    return{
        type: UPDATE_WORK_ATTITUDE,
        payload: data
    }
}

export const updateWorkAttitudeCode = (data) => {
    return{
        type: UPDATE_WORK_ATTITUDE_CODE,
        payload: data
    }
}

export const getHRCardDetail = (data) => {
    return{
        type: GET_HRCARD_DETAIL,
        payload: data
    }
}

export const carryHRCardDetail = (data) => {
    return{
        type: CARRY_HRCARD_DETAIL,
        payload: data
    }
}

export const updateHRCard = (data) => {
    return{
        type: UPDATE_HRCARD,
        payload: data
    }
}