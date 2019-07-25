import { GET_DAILY_SALES_LIST, CARRY_DAILY_SALES_LIST, CARRY_DAILY_SALES_DETAIL, GET_DAILY_SALES_DETAIL } from "actionTypes/ActionTypes";



export const getDailySalesList = ( branchNo ) => {
    return {
        type: GET_DAILY_SALES_LIST,
        payload: branchNo
    }
}

export const carryDailySalesList = ( data ) => {
    return {
        type: CARRY_DAILY_SALES_LIST,
        payload: data
    }
}

export const getDailySalesDetail = ( branchDailySales) => {
    return {
        type: GET_DAILY_SALES_DETAIL,
        payload: branchDailySales
    }
}

export const carryDailySalesDetail = ( data ) => {
    return {
        type: CARRY_DAILY_SALES_DETAIL,
        payload: data
    }
}