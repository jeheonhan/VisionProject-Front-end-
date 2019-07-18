import { GET_FOR_CODE_DETAIL, CARRY_FOR_CODE_DETAIL, GET_GROUP_CODE_LIST, CARRY_GROUP_CODE_LIST, GET_CODE_LIST, CARRY_CODE_LIST} from '../actionTypes/ActionTypes';


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