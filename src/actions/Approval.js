import { GET_APPROVAL_FORM_LIST, CARRY_APPROVAL_FORM_LIST, ADD_APPROVAL_FORM, DELETE_APPROVAL_FORM } from "actionTypes/ActionTypes";

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