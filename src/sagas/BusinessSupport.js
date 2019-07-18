import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_BRANCH_LIST } from 'actionTypes/ActionTypes';
import { carryBranchList } from 'actions/BusinessSupport';

const getBranchListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/bs/getBranchList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* getBranchListFn({payload}){
   const brachList = yield call(getBranchListRequest, payload);
   yield put(carryBranchList(brachList));
}

export function* getBranchListSaga(){
    yield takeEvery(GET_BRANCH_LIST, getBranchListFn)
}

export default function* rootSaga(){
    yield all([fork(getBranchListSaga)]);
}