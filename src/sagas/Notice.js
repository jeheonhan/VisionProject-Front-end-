import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_NOTICE_LIST, GET_NOTICE_DETAIL, ADD_NOTICE, GET_NOTICE_HEADER_LIST } from 'actionTypes/ActionTypes';
import { carryNoticeList, carryNoticeDetail, getNoticeList, carryNoticeHeaderList } from 'actions/index';

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
        url:"/notice/getNoticeDetail/"+noticeNo
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addNoticeRequest = async (notice) => {
    console.log(notice)
    return await axios({
        method:"POST",
        url:"/notice/addNotice",
        data:notice
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getNoticeHeaderListRequest = async () => {
    //console.log("getNoticeHeaderList saga :::::: ")
    return await axios({
        method:"GET",
        url:"/notice/getNoticeHeaderList"
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

function* addNoticeFn({payload}){
    yield call(addNoticeRequest, payload);
    yield put(getNoticeList());
}

function* getNoticeHeaderListFn(){
    const noticeHeaderList = yield call(getNoticeHeaderListRequest);
    yield put(carryNoticeHeaderList(noticeHeaderList));
}






export function* getNoticeListSaga(){
    yield takeEvery(GET_NOTICE_LIST, getNoticeListFn);
}

export function* getNoticeDetailSaga(){
    yield takeEvery(GET_NOTICE_DETAIL, getNoticeDetailFn);
}

export function* addNoticeSaga(){
    yield takeEvery(ADD_NOTICE, addNoticeFn);
}

export function* getNoticeHeaderListSaga(){
    yield takeEvery(GET_NOTICE_HEADER_LIST, getNoticeHeaderListFn);
}

export default function* rootSaga(){
    yield all([fork(getNoticeListSaga),
                fork(getNoticeDetailSaga),
                fork(addNoticeSaga),
                fork(getNoticeHeaderListSaga) ]);
}