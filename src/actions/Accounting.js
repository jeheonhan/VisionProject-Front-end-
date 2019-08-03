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
    GET_STATEMENT,
    CARRY_STATEMENT,
    UPDATE_STATEMENT,
    GET_SALARY_LIST,
    CARRY_SALARY_LIST,
    CHECK_DUPLICATE_SALARYDATE,
    CARRY_DUPLICATE_SALARYDATE,
    ADD_SALARY,
    UPDATE_SALARY,
    GET_SALARY,
    CARRY_SALARY,
    GET_SALARY_BOOK_LIST,
    CARRY_SALARY_BOOK_LIST,
    GET_ANALYZE_SALARY_BOOK_LIST,
    CARRY_ANALYZE_SALARY_BOOK_LIST,
    DELETE_VENDOR,
    DELETE_CARD,
    DELETE_ACCOUNT,
    DELETE_STATEMENT,
    UPDATE_SALARY_STATUS,
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

export const getStatement = (statementNo) => {
    return{
        type: GET_STATEMENT,
        payload: statementNo
    }
}

export const carryStatement = (statement) => {
    return{
        type: CARRY_STATEMENT,
        payload: statement
    }
}

export const updateStatement = (statement) => {
    return{
        type: UPDATE_STATEMENT,
        payload: statement
    }
}

export const getSalaryList = (search) => {
    return{
        type: GET_SALARY_LIST,
        payload: search
    }
}

export const carrySalaryList = (data) => {
    return{
        type: CARRY_SALARY_LIST,
        payload: data
    }
}

export const checkDuplicateSalaryDate = (salaryDate) => {
    return {
        type: CHECK_DUPLICATE_SALARYDATE,
        payload: salaryDate
    }
}

export const carryDuplicateSalaryDate = (salaryDateResult) => {
    return {
        type: CARRY_DUPLICATE_SALARYDATE,
        payload: salaryDateResult
    }
}

export const addSalary = (salaryDate) => {
    return {
        type: ADD_SALARY,
        payload: salaryDate
    }
}

export const updateSalary = (salary) => {
    return{
        type: UPDATE_SALARY,
        payload: salary
    }
}

export const getSalary = (salaryNumbering) => {
    return{
        type: GET_SALARY,
        payload: salaryNumbering
    }
}

export const carrySalary = (salary) => {
    return{
        type: CARRY_SALARY,
        payload: salary
    }
}

export const getSalaryBookList = (search) => {
    return{
        type: GET_SALARY_BOOK_LIST,
        payload: search
    }
}

export const carrySalaryBookList = (data) => {
    return{
        type: CARRY_SALARY_BOOK_LIST,
        payload: data
    }
}

export const getAnalyzeSalaryBookList = (salaryDate) => {
    return{
        type: GET_ANALYZE_SALARY_BOOK_LIST,
        payload: salaryDate
    }
}

export const carryAnalyzeSalaryBookList = (data) => {
    return{
        type: CARRY_ANALYZE_SALARY_BOOK_LIST,
        payload: data
    }
}

export const deleteVendor = (vendorNoList) => {
    return{
        type: DELETE_VENDOR,
        payload: vendorNoList
    }
}

export const deleteCard = (cardRegNoList) => {
    return{
        type: DELETE_CARD,
        payload: cardRegNoList
    }
}

export const deleteAccount = (accountRegNoList) => {
    return{
        type: DELETE_ACCOUNT,
        payload: accountRegNoList
    }
}

export const deleteStatement = (statementNoList) => {
    return{
        type: DELETE_STATEMENT,
        payload: statementNoList
    }
}

export const updateSalaryStatus = (salaryStatus) => {
    return{
        type: UPDATE_SALARY_STATUS,
        payload: salaryStatus
    }
}