import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_NOTICE_LIST } from 'actionTypes/ActionTypes';
import { carryNoticeList } from 'actions/Notice';

const getNoticeListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/notice/getNoticeList",
        data:search
    })
    .then(reponse => Response.data)
    .catch(error => console.log(error))
}

function* getNoticeListFn({payload}){
    const noticeList = yield call(getNoticeListRequest, payload);
    yield put(carryNoticeList(noticeList));
}

export function* getNoticeListSaga(){
    yield takeEvery(GET_NOTICE_LIST, getNoticeListFn)
}

export default function* rootSaga(){
    yield all([fork(getNoticeListSaga)]);
}