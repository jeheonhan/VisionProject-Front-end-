import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { GET_APPROVAL_FORM_LIST, ADD_APPROVAL_FORM, DELETE_APPROVAL_FORM, GET_APPROVAL_FORM_DETAIL, ADD_APPROVAL } from "actionTypes/ActionTypes";
import axios from "axios";
import { getApprovalFormList, carryApprovalFormList, carryApprovalFormDetail } from "actions";

const getApprovalFormListAxios = async() =>{
    return await axios({
        method:"POST",
        url:"/approval/getApprovalFormList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addApprovalFormAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "/approval/addApprovalForm",
        data: action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const deleteApprovalFormAxios = async(action) =>{
    return await axios({
        method:"POST",
        url: "/approval/convertApprovalFormUsageStatus",
        data: action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getApprovalFormDetailAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "/approval/getApprovalFormDetail/"+action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addApprovalAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "/approval/addApproval",
        data : action.payload
    })
    .then(response => response)
    .catch(error => console.log(error))
}

function* _getApprovalFormList(action){
    const approvalFormList = yield call(getApprovalFormListAxios)
    yield put(carryApprovalFormList(approvalFormList));
}

function* addApprovalForm(action){
    const addApproval = yield call(addApprovalFormAxios, action)
    yield put(getApprovalFormList());
}

function* deleteApprovalForm(action){
    const result = yield call(deleteApprovalFormAxios, action);
    yield put(getApprovalFormList());
}

function* getApprovalFormDetail(action){
    const approvalForm = yield call(getApprovalFormDetailAxios, action);
    yield put(carryApprovalFormDetail(approvalForm));
}

function* addApproval(action){
    yield call(addApprovalAxios, action)
}

export function* getApprovalFormListSaga(){
    yield takeEvery(GET_APPROVAL_FORM_LIST, _getApprovalFormList)
}

export function* addApprovalFormSaga(){
    yield takeEvery(ADD_APPROVAL_FORM, addApprovalForm)
}

export function* deleteApprovalFormSaga(){
    yield takeEvery(DELETE_APPROVAL_FORM, deleteApprovalForm)
}

export function* getApprovalFormDetailSaga(){
    yield takeEvery(GET_APPROVAL_FORM_DETAIL, getApprovalFormDetail)
}

export function* addApprovalSaga(){
    yield takeEvery(ADD_APPROVAL, addApproval)
}

export default function* rootSaga(){
    yield all([fork(getApprovalFormListSaga),
               fork(addApprovalFormSaga),
               fork(deleteApprovalFormSaga),
               fork(getApprovalFormDetailSaga),
               fork(addApprovalSaga)
            ]);
}