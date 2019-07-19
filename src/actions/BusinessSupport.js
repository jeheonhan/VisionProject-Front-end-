import {GET_BRANCH_LIST, CARRY_BRANCH_LIST} from '../actionTypes/ActionTypes';

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