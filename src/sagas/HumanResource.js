import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryHRCardList } from 'actions/HumanResource';
import { GET_HRCARD_LIST } from "actionTypes/ActionTypes";


const getHRCardListRequest = async (search) => {
    console.log("Request search : "+search)
    return await axios({
        method:"POST",
        url:"/hr/getHumanResourceCardList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

function* getHRCardListFn({payload}){
    console.log("getHRCardListFn payload : "+payload)
    const HRCardList = yield call(getHRCardListRequest, payload);
    yield put(carryHRCardList(HRCardList));
}

export function* getHRCardListSaga(){
    yield takeEvery(GET_HRCARD_LIST, getHRCardListFn);
}

export default function* rootSaga(){
    yield all([fork(getHRCardListSaga)]);
}