import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_BRANCH_LIST, GET_BRANCH_DETAIL } from 'actionTypes/ActionTypes';
import { carryBranchList, carryBranchDetail } from 'actions/BusinessSupport';

const getBranchListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/bs/getBranchList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getBranchDetailRequest = async (branchNo) => {
    return await axios({
         method:"GET",
         url:"/bs/getBranch/"+branchNo,
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* getBranchListFn({payload}){
   const brachList = yield call(getBranchListRequest, payload);
   yield put(carryBranchList(brachList));
}

function* getBranchDetailFn({payload}){
    const branch = yield call(getBranchDetailRequest, payload);
    yield put(carryBranchDetail(branch));
}

export function* getBranchListSaga(){
    yield takeEvery(GET_BRANCH_LIST, getBranchListFn);
}

export function* getBranchDetailSaga(){
    yield takeEvery(GET_BRANCH_DETAIL, getBranchDetailFn);

}

export default function* rootSaga(){
    yield all([fork(getBranchListSaga),
                fork(getBranchDetailSaga)]);
}