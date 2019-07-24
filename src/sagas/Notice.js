import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_NOTICE_LIST, CARRY_NOTICE_DETAIL } from 'actionTypes/ActionTypes';
import { carryNoticeList, carryNoticeDetail } from 'actions/Notice';

const getNoticeListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/notice/getNoticeList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getNoticeDetailRequest = async (noticeNo) => {
    return await axios({
        method:"GET",
        url:"/notice/getNoticeDetail/"+noticeNo,
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* getNoticeListFn({payload}){
    const noticeList = yield call(getNoticeListRequest, payload);
    yield put(carryNoticeList(noticeList));
}

function* getNoticeDetailFn({payload}){
    const noticeDetail = yield call(getNoticeDetailRequest, payload);
    yield put(carryNoticeDetail(noticeDetail));
}

export function* getNoticeListSaga(){
    yield takeEvery(GET_NOTICE_LIST, getNoticeListFn)
}

export function* getNoticeDetailSaga(){
    yield takeEvery(CARRY_NOTICE_DETAIL, getNoticeDetailFn)
}

export default function* rootSaga(){
    yield all([fork(getNoticeListSaga)]);
}