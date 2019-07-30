import {
    GET_PRODUCT_LIST , CARRY_PRODUCT_LIST , CARRY_ORDER_TO_VENDOR_LIST ,
    GET_ORDER_TO_VENDOR_LIST ,ADD_PRODUCT , GET_INFO_ACCOUNT ,
    CARRY_INFO_ACCOUNT , GET_ORDER_TO_VENDOR_DETAIL_LIST , CARRY_ORDER_TO_VENDOR_DETAIL_LIST ,
    UPDATE_ORDER_TO_VENDOR_CODE , ADD_ORDER_TO_VENDOR, ADD_ORDER_BRANCH, UPDATE_ORDER_TO_VEN_ITEM_CODE,
     CARRY_ORDER_BRANCH, GET_ORDER_BRANCH_LIST, CARRY_ORDER_BRANCH_LIST, MODIFY_ORDER_BRANCH_STATUS , 
     CARRY_PRODUCT_LIST_FOR_ORDER , GET_PRODUCT_LIST_FOR_ORDER
} from '../actionTypes/ActionTypes';
import {SEND_SHIPPING} from '../actionTypes/ActionTypes';

export const sendShipping = (data) => {
    return{
        type: SEND_SHIPPING,
        payload: data
    }
}

export const getProductList = () => {
    return {
        type : GET_PRODUCT_LIST
    }
}
    
export const carryProductList = (data) => {
    return{
        type : CARRY_PRODUCT_LIST,
        payload : data
    }
}

export const getOrderToVendorList = () => {
    return {
        type : GET_ORDER_TO_VENDOR_LIST
    }
}

export const carryOrderToVendorList = (data) => {
    return {
        type : CARRY_ORDER_TO_VENDOR_LIST,
        payload : data
    }
}

export const addProduct = (data) => {
    return {
        type : ADD_PRODUCT,
        payload : data
    }
}

export const getInfoAccount = () => {
    return {
        type : GET_INFO_ACCOUNT
    }
}

export const carryInfoAccount = (data) => {
    return {
        type : CARRY_INFO_ACCOUNT,
        payload : data
    }
}

export const getOrderToVendorDetailList = (data) => {
    return{
        type : GET_ORDER_TO_VENDOR_DETAIL_LIST,
        payload : data
    }
}

export const carryOrderToVendorDetailList = (data) => {
    return{
        type : CARRY_ORDER_TO_VENDOR_DETAIL_LIST,
        payload : data
    }
}

export const updateOrderToVendorCode = (data) => {
    return {
        type : UPDATE_ORDER_TO_VENDOR_CODE,
        payload : data
    }
}

export const addOrderToVendor = (data) => {
    return {
        type : ADD_ORDER_TO_VENDOR , 
        payload : data
    }
}

export const addOrderBranch = (data) => {
    return{
        type:ADD_ORDER_BRANCH,
        payload : data
    }
}

export const updateOrderToVenItemCode = (data) => {
    return {
        type : UPDATE_ORDER_TO_VEN_ITEM_CODE,
        payload : data
    }
}

export const getOrderBranchList = (data) => {
    return{
        type:GET_ORDER_BRANCH_LIST,
        payload: data
    }
}

export const carryOrderBranchList = (data) => {
    return{
        type:CARRY_ORDER_BRANCH_LIST,
        payload:data
    }
}

export const modifyOrderBranchStatus = (data) => {
    return{
        type:MODIFY_ORDER_BRANCH_STATUS,
        payload:data
    }
}

export const getProductListForOrder = () => {
    return {
        type : GET_PRODUCT_LIST_FOR_ORDER
    }
} 

export const carryProductListForOrder = (data) => {
    return {
        type:CARRY_PRODUCT_LIST_FOR_ORDER,
        payload:data
    }
}