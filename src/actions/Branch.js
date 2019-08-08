import { GET_DAILY_SALES_LIST, 
        CARRY_DAILY_SALES_LIST, 
        CARRY_DAILY_SALES_DETAIL, 
        GET_DAILY_SALES_DETAIL, 
        ADD_DAILY_SALES,
        GET_SALES_MENU_LIST,
        CARRY_SALES_MENU_LIST,
        MODIFY_DAILY_SALES} from "actionTypes/ActionTypes";

export const modifyDailySales = (data) => {
    return{
        type: MODIFY_DAILY_SALES,
        payload:data
    }
}

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

export const addDailySales = ( salesProductList) => {
    return {
        type: ADD_DAILY_SALES,
        payload: salesProductList
    }
}

export const getSalesMenuList = () => {
    return {
        type: GET_SALES_MENU_LIST
    }
}

export const carrySalesMenuList = ( data ) => {
    return {
        type: CARRY_SALES_MENU_LIST,
        payload: data
    }
}
