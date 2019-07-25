import { GET_APPROVAL_FORM_LIST, CARRY_APPROVAL_FORM_LIST, ADD_APPROVAL_FORM, DELETE_APPROVAL_FORM, GET_APPROVAL_FORM_DETAIL, CARRY_APPROVAL_FORM_DETAIL, ADD_APPROVAL, CARRY_APPROVAL_LIST, GET_APPROVAL_LIST, CARRY_APPROVAL_DETAIL, GET_APPROVAL_DETAIL } from "actionTypes/ActionTypes";

export const getApprovalFormList = () => {
    return{
        type: GET_APPROVAL_FORM_LIST
    }
}

export const carryApprovalFormList = (data) => {
    return{
        type: CARRY_APPROVAL_FORM_LIST,
        payload: data
    }
}

export const addApprovalForm = (data) => {
    return{
        type: ADD_APPROVAL_FORM,
        payload : data
    }
}

export const deleteApprovalForm = (data) => {
    return{
        type: DELETE_APPROVAL_FORM,
        payload : data
    }
}

export const getApprovalFormDetail = (data) => {
    return{
        type:GET_APPROVAL_FORM_DETAIL,
        payload: data
    }
}

export const carryApprovalFormDetail = (data) => {
    return{
        type: CARRY_APPROVAL_FORM_DETAIL,
        payload: data
    }
}

export const addApproval = (data) => {
    return{
        type: ADD_APPROVAL,
        payload: data
    }
}

export const getApprovalList = (data) => {
    return{
        type: GET_APPROVAL_LIST,
        payload: data
    }
}

export const carryApprovalList = (data) =>{
    return{
        type: CARRY_APPROVAL_LIST,
        payload: data
    }
}

export const getApprovalDetail = (data) => {
    return{
        type:GET_APPROVAL_DETAIL,
        payload : data
    }
}

export const carryApprovalDetail = (data) => {
    return{
        type: CARRY_APPROVAL_DETAIL,
        payload : data
    }
}