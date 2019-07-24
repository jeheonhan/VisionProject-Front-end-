import {
    GET_VENDOR_LIST, 
    CARRY_VENDOR_LIST, 
    ADD_VENDOR, 
    GET_VENDOR, 
    CARRY_VENDOR, 
    UPDATE_VENDOR, 
    GET_CARD_LIST, 
    CARRY_CARD_LIST,
    ADD_CARD,
    GET_CARD,
    CARRY_CARD,
    GET_ACCOUNT_LIST,
    CARRY_ACCOUNT_LIST,
    ADD_ACCOUNT,
    GET_VENDOR_BANK,
    GET_VENDOR_ADDRESS,
    CARRY_VENDOR_BANK,
    CARRY_VENDOR_ADDRESS,
    UPDATE_CARD,
    GET_CHECK_ACCOUNT_LIST,
    CARRY_CHECK_ACCOUNT_LIST,
    GET_ACCOUNT,
    CARRY_ACCOUNT,
    UPDATE_ACCOUNT,
    GET_STATEMENT_LIST,
    CARRY_STATEMENT_LIST,
    ADD_STATEMENT,
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

export const addCard = (data) => {
    return{
        type: ADD_CARD,
        payload: data
    }
}

export const getCard = (cardNo) => {
    return{
        type: GET_CARD,
        payload: cardNo
    }
}

export const carryCard = (card) => {
    return{
        type: CARRY_CARD,
        payload: card
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

export const addAccount = (data) => {
    return{
        type: ADD_ACCOUNT,
        payload: data
    }
}

export const getVendorBank = (vendorNo) => {
    return{
        type: GET_VENDOR_BANK,
        payload: vendorNo
    }
}
export const getVendorAddress = (vendorNo) => {
    return{
        type: GET_VENDOR_ADDRESS,
        payload: vendorNo
    }
}

export const carryVendorBank = (vendorBank) => {
    return{
        type: CARRY_VENDOR_BANK,
        payload: vendorBank
    }
}

export const carryVendorAddress = (vendorAddress) => {
    return{
        type: CARRY_VENDOR_ADDRESS,
        payload: vendorAddress
    }
}

export const updateCard = (card) => {
    return{
        type: UPDATE_CARD,
        payload: card
    }
}

export const getCheckAccountList = (search) => {
    return{
        type: GET_CHECK_ACCOUNT_LIST,
        payload: search
    }
}

export const carryCheckAccountList = (data) => {
    return{
        type: CARRY_CHECK_ACCOUNT_LIST,
        payload: data
    }
}

export const getAccount = (accountRegNo) => {
    return{
        type: GET_ACCOUNT,
        payload: accountRegNo
    }
}

export const carryAccount = (account) => {
    return{
        type: CARRY_ACCOUNT,
        payload: account
    }
}

export const updateAccount = (account) => {
    return{
        type: UPDATE_ACCOUNT,
        payload: account
    }
}

export const getStatementList = (search) => {
    return{
        type: GET_STATEMENT_LIST,
        payload: search
    }
}

export const carryStatementList = (data) => {
    return{
        type: CARRY_STATEMENT_LIST,
        payload: data
    }
}

export const addStatement = (data) => {
    return{
        type: ADD_STATEMENT,
        payload: data
    }
}