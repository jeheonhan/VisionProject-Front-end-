import {
    GET_PRODUCT_LIST , CARRY_PRODUCT_LIST , CARRY_ORDER_TO_VENDOR_LIST ,
    GET_ORDER_TO_VENDOR_LIST ,ADD_PRODUCT , GET_ADD_PRODUCT_ACCOUNT ,
    CARRY_ADD_PRODUCT_ACCOUNT
} from '../actionTypes/ActionTypes';



export const getProductList = () => {
    console.log("리듀서가 잡아가는놈")
    return {
        type : GET_PRODUCT_LIST
    }
}
    
export const carryProductList = (data) => {
    console.log("put으로 디스패치하는놈")
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
    console.log("물품등록액션")
    console.log(data)
    return {
        type : ADD_PRODUCT,
        payload : data
    }
}

export const addProductAccount = () => {
    console.log("액션리턴 ")
    return {
        type : GET_ADD_PRODUCT_ACCOUNT
    }
}

export const carryAddProductAccount = (data) => {
    console.log("액션값들고 리턴 ")
    return {
        type : CARRY_ADD_PRODUCT_ACCOUNT,
        payload : data
    }
}