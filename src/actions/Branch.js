import { GET_DAILY_SALES_LIST, CARRY_DAILY_SALES_LIST } from "actionTypes/ActionTypes";



export const getDailySalesList = ( branchNo ) => {
    return {
        type: GET_DAILY_SALES_LIST,
        payload: branchNo
    }
}

export const carryDailySalesList = ( data ) => {
    return {
        type:CARRY_DAILY_SALES_LIST,
        payload: data
    }
}