import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { GET_APPROVAL_FORM_LIST } from "actionTypes/ActionTypes";
import axios from "axios";
import { carryApprovalFormList } from "actions";

const getApprovalFormListAxios = async() =>{
    return await axios({
        method:"POST",
        url:"/approval/getApprovalFormList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* getApprovalFormList(action){
    const approvalFormList = yield call(getApprovalFormListAxios)
    yield put(carryApprovalFormList(approvalFormList));
}

export function* getApprovalFormListSaga(){
    yield takeEvery(GET_APPROVAL_FORM_LIST, getApprovalFormList)
}

export default function* rootSaga(){
    yield all([fork(getApprovalFormListSaga)]);
}