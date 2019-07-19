import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryHRCardList, carryAppointList, getAppointList, carrySimpleHRCard } from 'actions/index';
import { GET_HRCARD_LIST, GET_APPOINT_LIST, ADD_APPOINTMENT, GET_SIMPLE_HRCARD_BY_EMPLOYEENO } from "actionTypes/ActionTypes";



const getSimpleHRCardDetailRequest = async (employeeNo) => {
    return await axios({
        method: "GET",
        url: "/hr/getSimpleHumanResourceCardDetail/"+employeeNo
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getHRCardListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/hr/getHumanResourceCardList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error));
}

const addAppointmentRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addAppointment",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

const getAppointListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/hr/getAppointmentList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error));
}

function* getSimpleHRCardDetailFn({payload}){
    const SimpleHRCard = yield call(getSimpleHRCardDetailRequest, payload);
    yield put(carrySimpleHRCard(SimpleHRCard))
}

function* getHRCardListFn({payload}){
    const HRCardList = yield call(getHRCardListRequest, payload);
    yield put(carryHRCardList(HRCardList));
}

function* addAppointmentFn({payload}){
    yield call(addAppointmentRequest, payload);
    yield put(getAppointList({searchKeyword:null}))
    
    //yield put(getAppointList({searchKeyword:null}));
}

function* getAppointListFn({payload}){
    console.log(payload);
    const appointList = yield call(getAppointListRequest, payload);
    yield put(carryAppointList(appointList));
}

export function* getSimpleHRCardDetailSaga(){
    yield takeEvery(GET_SIMPLE_HRCARD_BY_EMPLOYEENO, getSimpleHRCardDetailFn);
}

export function* getHRCardListSaga(){
    yield takeEvery(GET_HRCARD_LIST, getHRCardListFn);
}

export function* addAppointmentSaga(){
    yield takeEvery(ADD_APPOINTMENT, addAppointmentFn);
}

export function* getAppointListSaga(){
    yield takeEvery(GET_APPOINT_LIST, getAppointListFn)
}

export default function* rootSaga(){
    yield all([
            fork(getHRCardListSaga),
            fork(addAppointmentSaga),
            fork(getAppointListSaga),
            fork(getSimpleHRCardDetailSaga)]);
}