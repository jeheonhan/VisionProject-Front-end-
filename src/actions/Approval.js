import { GET_APPROVAL_FORM_LIST, CARRY_APPROVAL_FORM_LIST } from "actionTypes/ActionTypes";

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