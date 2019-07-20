import {GET_BRANCH_LIST, CARRY_BRANCH_LIST, GET_BRANCH_DETAIL, CARRY_BRANCH_DETAIL} from '../actionTypes/ActionTypes';

export const getBranchList = (search) => {
    return {
        type: GET_BRANCH_LIST,
        payload: search
    }
}

export const carryBranchList = (data) => {
    return {
        type: CARRY_BRANCH_LIST,
        payload: data
    }
}

export const getBranchDetail = (data) => {
    return {
        type: GET_BRANCH_DETAIL,
        payload: data
    }
}

export const carryBranchDetail = (data) => {
    return {
        type: CARRY_BRANCH_DETAIL,
        payload: data
    }
}