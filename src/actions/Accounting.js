import {
    GET_VENDOR_LIST, 
    CARRY_VENDOR_LIST, 
    ADD_VENDOR, 
    GET_VENDOR, 
    CARRY_VENDOR, 
    UPDATE_VENDOR, 
    GET_CARD_LIST, 
    CARRY_CARD_LIST,
    GET_ACCOUNT_LIST,
    CARRY_ACCOUNT_LIST
} from'../actionTypes/ActionTypes';

export const getVendorList = (search) => {
    return{
        type: GET_VENDOR_LIST,
        payload: search
    }
}

export const carryVendorList = (data) => {
    return{
        type: CARRY_VENDOR_LIST,
        payload: data
    }
}

export const addVendor = (data) => {
    return{
        type: ADD_VENDOR,
        payload: data
    }
}

export const getVendor = (vendorNo) => {
    return{
        type: GET_VENDOR,
        payload: vendorNo
    }
}

export const carryVendor = (vendor) => {
    return{
        type: CARRY_VENDOR,
        payload: vendor
    }
}

export const updateVendor = (vendor) => {
    return{
        type: UPDATE_VENDOR,
        payload: vendor
    }
}

export const getCardList = (search) => {
    return{
        type: GET_CARD_LIST,
        payload: search
    }
}

export const carryCardList = (data) => {
    return{
        type: CARRY_CARD_LIST,
        payload: data
    }
}

export const getAccountList = (search) => {
    return{
        type: GET_ACCOUNT_LIST,
        payload: search
    }
}

export const carryAccountList = (data) => {
    return{
        type: CARRY_ACCOUNT_LIST,
        payload: data
    }
}

