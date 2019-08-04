import { ADD_CODE_RESULT, GET_FOR_CODE_DETAIL, CARRY_FOR_CODE_DETAIL, GET_GROUP_CODE_LIST, CARRY_GROUP_CODE_LIST, GET_CODE_LIST, CARRY_CODE_LIST, GET_NEW_CODE_NO, CARRY_NEW_CODE_NO, CHECK_DUPLICATE_CODE_NAME, CHECK_DUPLICATE_RESULT, ADD_CODE, CONVERT_CODE_USAGE_STATUS, UPDATE_CODE, CONVERT_CODE_USAGE_STATUS_LIST} from '../actionTypes/ActionTypes';


export const getGroupCodeList = () => {
    //console.log("/actions/Code.js getGroupCodeList action 발생")
    return {
        type: GET_GROUP_CODE_LIST
    }
}

export const carryGroupCodeList = (data) => {
    //console.log("/action/Code.js carryGroupCodeList action 발생")
    return{
        type: CARRY_GROUP_CODE_LIST,
        payload: data
    }
}

export const getCodeList = (search) => {
    console.log("/actions/Code.js getCodeList action 발생 : "+JSON.stringify(search))
    return {
        type: GET_CODE_LIST,
        payload : search
    }
}

export const carryCodeList = (data) => {
    console.log("/action/Code.js carryCodeList action 발생")
    return{
        type: CARRY_CODE_LIST,
        payload: data
    }
}

export const getForCodeDetail = (search) => {
    return{
        type: GET_FOR_CODE_DETAIL,
        payload: search
    }
}

export const carryForCodeDetail = (data) => {
    return{
        type: CARRY_FOR_CODE_DETAIL,
        payload: data
    }
}

export const getNewCodeNo = (data) => {
    return {
        type: GET_NEW_CODE_NO,
        payload: data
    }
}

export const carryNewCodeNo = (data) => {
    return{
        type: CARRY_NEW_CODE_NO,
        payload: data
    }
}

export const checkDuplicateCodeName = (data) => {
    return{
        type: CHECK_DUPLICATE_CODE_NAME,
        payload: data
    }
}

export const checkDuplicateResult = (data) => {
    return{
        type: CHECK_DUPLICATE_RESULT,
        payload: data
    }
}

export const addCode = (data) => {
    return{
        type: ADD_CODE,
        payload: data
    }
}

export const addCodeResult = (data) => {
    return{
        type: ADD_CODE_RESULT,
        payload : data
    }
}

export const convertCodeUsageStatus =(data) =>{
    return{
        type: CONVERT_CODE_USAGE_STATUS,
        payload: data
    }
}

export const convertCodeUsageStatusList = (data) => {
    return{
        type:CONVERT_CODE_USAGE_STATUS_LIST,
        payload: data
    }
}

export const updateCode = (data) => {
    return{
        type: UPDATE_CODE,
        payload : data
    }
}