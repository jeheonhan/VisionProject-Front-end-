import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { GET_NOTICE_LIST, GET_NOTICE_DETAIL, ADD_NOTICE, GET_NOTICE_HEADER_LIST, DELETE_NOTICE, UPDATE_NOTICE, GET_UPDATE_NOTICE_HEADER_LIST } from 'actionTypes/ActionTypes';
import { carryNoticeList, carryNoticeDetail, getNoticeList, carryNoticeHeaderList, caaryUpdateNoticeHeaderList } from 'actions/index';

const getNoticeListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"http://localhost:8080/notice/getNoticeList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getNoticeDetailRequest = async (noticeNo) => {
    return await axios({
        method:"GET",
        url:"http://localhost:8080/notice/getNoticeDetail/"+noticeNo
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addNoticeRequest = async (notice) => {
    console.log(notice)
    return await axios({
        method:"POST",
        url:"http://localhost:8080/notice/addNotice",
        data:notice
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getNoticeHeaderListRequest = async () => {
    return await axios({
        method:"GET",
        url:"http://localhost:8080/notice/getNoticeHeaderList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const converNoticeStatusCodeRequest = async (notice) => {
    return await axios({
        method: "POST",
        url: "http://localhost:8080/notice/convertNoticeUsageStatus",
        data: notice
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const updateNoticeRequest = async (notice) => {
    return await axios({
        method : "POST",
        url : "http://localhost:8080/notice/modifyNotice",
        data : notice
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getUpdateNoticeHeaderListRequest = async () => {
    return await axios({
        method:"GET",
        url:"http://localhost:8080/notice/getNoticeHeaderList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* getNoticeListFn({payload}){
    const noticeList = yield call(getNoticeListRequest, payload);
    console.log(noticeList)
    yield put(carryNoticeList(noticeList));
}

function* getNoticeDetailFn({payload}){
    const noticeDetail = yield call(getNoticeDetailRequest, payload);
    yield put(carryNoticeDetail(noticeDetail));
}

function* addNoticeFn({payload}){
    yield call(addNoticeRequest, payload);
    yield put(getNoticeList({searchCondition:'2', searchKeyword:'01'}));
}

function* getNoticeHeaderListFn(){
    const noticeHeaderList = yield call(getNoticeHeaderListRequest);
    yield put(carryNoticeHeaderList(noticeHeaderList));
}

function* convertNoticeStatusCodeFn({payload}){
    yield call(converNoticeStatusCodeRequest, payload);
    yield put(getNoticeList({searchCondition:'2', searchKeyword:'01'}));
}

function* updateNoticeFn({payload}){
    yield call(updateNoticeRequest, payload);
    yield put(getNoticeList({searchCondition:'2', searchKeyword:'01'}));
}

function* getUpdateNoticeHeaderListFn(){
    const forUpdateNoticeHeaderList = yield call(getUpdateNoticeHeaderListRequest);
    yield put(caaryUpdateNoticeHeaderList(forUpdateNoticeHeaderList))
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

export function* convertNoticeStatusCodeSaga(){
    yield takeEvery(DELETE_NOTICE, convertNoticeStatusCodeFn);
}

export function* updateNoticeSaga(){
    yield takeEvery(UPDATE_NOTICE, updateNoticeFn);
}

export function* getUpdateNoticeHeaderListSaga() {
    yield takeEvery(GET_UPDATE_NOTICE_HEADER_LIST, getUpdateNoticeHeaderListFn)
}

export default function* rootSaga(){
    yield all([fork(getNoticeListSaga),
                fork(getNoticeDetailSaga),
                fork(addNoticeSaga),
                fork(getNoticeHeaderListSaga),
                fork(convertNoticeStatusCodeSaga),
                fork(updateNoticeSaga),
                fork(getUpdateNoticeHeaderListSaga)]);
}