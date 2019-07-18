import {GET_VENDOR_LIST, CARRY_VENDOR_LIST, ADD_VENDOR, GET_VENDOR, CARRY_VENDOR } from'../actionTypes/ActionTypes';

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