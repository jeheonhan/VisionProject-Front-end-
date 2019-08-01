import {GET_BRANCH_LIST, 
        CARRY_BRANCH_LIST, 
        GET_BRANCH_DETAIL, 
        CARRY_BRANCH_DETAIL, 
        ADD_BRANCH, 
        ADD_BRANCH_RESULT,
        GET_LOCAL_LIST,
        CARRY_LOCAL_LIST,
        DELETE_BRANCH,
        UPDATE_BRANCH} from '../actionTypes/ActionTypes';

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

export const getBranchDetail = (branchNo) => {
    return {
        type: GET_BRANCH_DETAIL,
        payload: branchNo
    }
}

export const carryBranchDetail = (data) => {
    return {
        type: CARRY_BRANCH_DETAIL,
        payload: data
    }
}

export const addBranch = (data) => {
    return {
        type: ADD_BRANCH,
        payload: data
    }
}

export const addBranchResult = (data) => {
    return {
        type: ADD_BRANCH_RESULT,
        payload: data
    }
}

export const getLocalList = () => {
    return {
        type: GET_LOCAL_LIST
        
    }

}

export const carryLocalList = (data) => {
    return {
        type: CARRY_LOCAL_LIST,
        payload: data
    }
}

export const convertBranchStatusCode = ( branch ) => {
    return {
        type: DELETE_BRANCH,
        payload: branch
    }
}

export const updateBranch = ( branch ) => {
    return {
        type: UPDATE_BRANCH,
        payload: branch
    }
}