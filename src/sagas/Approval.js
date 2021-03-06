import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { GET_APPROVAL_FORM_LIST, ADD_APPROVAL_FORM, DELETE_APPROVAL_FORM, GET_APPROVAL_FORM_DETAIL, ADD_APPROVAL, GET_APPROVAL_LIST, GET_APPROVAL_DETAIL, MODIFY_APPROVAL_STATUS } from "actionTypes/ActionTypes";
import axios from "axios";
import { getApprovalFormList, carryApprovalFormList, carryApprovalFormDetail, carryApprovalList, carryApprovalDetail, getApprovalList } from "actions";

const getApprovalFormListAxios = async() =>{
    return await axios({
        method:"POST",
        url:"http://localhost:8080/approval/getApprovalFormList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addApprovalFormAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "http://localhost:8080/approval/addApprovalForm",
        data: action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const deleteApprovalFormAxios = async(action) =>{
    return await axios({
        method:"POST",
        url: "http://localhost:8080/approval/convertApprovalFormUsageStatus",
        data: action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getApprovalFormDetailAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "http://localhost:8080/approval/getApprovalFormDetail/"+action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addApprovalAxios = async(action) => {
    return await axios({
        method:"POST",
        url: "http://localhost:8080/approval/addApproval",
        data : action.payload
    })
    .then(response => response)
    .catch(error => console.log(error))
}

const getApprovalListAxios = async(action) => {
    return await axios({
        method:"POST",
        url:"http://localhost:8080/approval/getApprovalList",
        data: action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getApprovalDetailAxios = async(action) => {
    return await axios({
        method: "POST",
        url: "http://localhost:8080/approval/getApprovalDetail/"+action.payload,
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const modifyApprovalStatusAxios = async(action) => {
    return await axios({
        method:"POST",
        url:"http://localhost:8080/approval/modifyApprovalStatus/"+action.url
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

function* modifyApproval(action){
    yield call(modifyApprovalStatusAxios, action);
    const _searchKeyword = action.searchKeyword
    yield put(getApprovalList({"searchCondition":"1", "searchKeyword":_searchKeyword}));
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
    yield call(addApprovalAxios, action);
}

function* _getApprovalList(action){
    const approvalList = yield call(getApprovalListAxios, action);
    yield put(carryApprovalList(approvalList));
}

function* getApprovalDetail(action){
    const approvalDetail = yield call(getApprovalDetailAxios, action);
    yield put(carryApprovalDetail(approvalDetail))
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

export function* getApprovalListSaga(){
    yield takeEvery(GET_APPROVAL_LIST, _getApprovalList)
}

export function* getApprovalDetailSaga(){
    yield takeEvery(GET_APPROVAL_DETAIL, getApprovalDetail)
}

export function* modifyApprovalStatusSaga(){
    yield takeEvery(MODIFY_APPROVAL_STATUS, modifyApproval)
}

export default function* rootSaga(){
    yield all([fork(getApprovalFormListSaga),
               fork(addApprovalFormSaga),
               fork(deleteApprovalFormSaga),
               fork(getApprovalFormDetailSaga),
               fork(addApprovalSaga),
               fork(getApprovalListSaga),
               fork(getApprovalDetailSaga),
               fork(modifyApprovalStatusSaga)
            ]);
}