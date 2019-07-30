import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryHRCardList,
         carryAppointList, 
         getAppointList, 
         carrySimpleHRCard, 
         getHRCardList,
         carryWorkAttitudeList,
         carryWorkAttitudeCodeList,
         getWorkAttitudeList,
         getWorkAttitudeCodeList,
         carryDepartmentList, 
         getDepartmentList,
         carryHRCardDetail,
         getCodeList,
         carryCommuteList,
         getCommuteList} from 'actions/index';
import { GET_HRCARD_LIST, 
         GET_APPOINT_LIST, 
         ADD_APPOINTMENT, 
         GET_SIMPLE_HRCARD_BY_EMPLOYEENO, 
         ADD_HRCARD,
         GET_WORKATTITUDE_LIST,
         GET_WORKATTITUDE_CODE_LIST,
         ADD_WORKATTITUDE,
         UPDATE_APPOINTMENT,
         ADD_WORKATTITUDE_CODE,
         GET_DEPARTMENT_LIST,
         ADD_DEPARTMENT,
         CONVERT_DEPART_USAGE_STATUS,
         UPDATE_WORK_ATTITUDE, 
         UPDATE_WORK_ATTITUDE_CODE,
         GET_HRCARD_DETAIL,
         UPDATE_HRCARD,
         UPDATE_APPOINT_STATUS,
         CONVERT_WORKATTITUDE_USE_STATUS,
         CONVERT_WORKATTITUDE_CODE_USE_STATUS,
         CONVERT_DEPARTMENT_DELETE,
         GET_COMMUTE_LIST,
         ADD_GO_TO_WORK,
         ADD_LEAVE_WORK,
        } from "actionTypes/ActionTypes";

const addLeaveWorkRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/updateLeaveWorkTime",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

const addGoToWorkRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addCommute",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const getCommuteListRequest = async (employeeNo) => {
    return await axios({
        method:"GET",
        url:"/hr/getCommuteList/"+employeeNo
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const convertDepartDeleteRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyDepartment",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const convertWorkAttitudeCodeUseStatusRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/convertWorkAttitudeCodeUsageStatus",
        data: _data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const convertWorkAttitudeUseStatusRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/convertWorkAttitudeUsageStatus",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const updateAppointStatusRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyAppointmentStatus",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const updateHRCardRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyHumanResourceCard",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const getHRCardDetailRequest = async (_data) => {
    return await axios({
        method:"GET",
        url:"/hr/getHumanResourceCardDetail/"+_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const updateWorkAttitudeCodeRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyWorkAttitudeCode",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const updateWorkAttitudeRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyWorkAttitude",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const convertDepartUsageRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/convertDepartmentUsageStatus",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const addDepartmentRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addDepartment",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const getDepartmentListRequest = async (_data) => {
    return await axios({
        method:"POST",
        url:"/hr/getDepartmentList",
        data:_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addWorkAttitudeCodeRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addWorkAttitudeCode",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

const updateAppointmentRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/modifyAppointment",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

const addWorkAttitudeRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addWorkAttitude",
        data:_data
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
}

const getWorkAttitudeCodeListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/hr/getWorkAttitudeCodeList",
        data: search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getWorkAttitude = async (search) => {
    return await axios({
        method:"POST",
        url:"/hr/getWorkAttitudeList",
        data:search
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addHRCardRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/hr/addHumanResourceCard",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

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

function* addLevaeWorkFn({payload}){
    yield call(addLeaveWorkRequest, payload);
    yield put(getCommuteList(payload.employeeNo));
}

function* addGoToWorkFn({payload}){
    yield call(addGoToWorkRequest, payload);
    yield put(getCommuteList(payload.employeeNo));
}

function* getCommuteListFn({payload}){
    const commuteList = yield call(getCommuteListRequest, payload);
    yield put(carryCommuteList(commuteList));
}

function* convertDepartmentDeleteFn({payload}){
    yield call(convertDepartDeleteRequest, payload);
    yield put(getDepartmentList({searchKeyword:null}));
    yield put(getCodeList({searchKeyword:'depart'}));
}

function* convertWorkAttitudeCodeUseStatusFn({payload}){
    yield call(convertWorkAttitudeCodeUseStatusRequest, payload);
    yield put(getWorkAttitudeCodeList({searchKeyword:null}));
}

function* convertWorkAttitudeUseStatusFn({payload}){
    yield call(convertWorkAttitudeUseStatusRequest, payload);
    yield put(getWorkAttitudeList({searchKeyword:null}));
}

function* updateAppointStatusFn({payload}){
    yield call(updateAppointStatusRequest, payload);
    yield put(getAppointList({searchKeyword:null}));
}

function* updateHRCardFn({payload}){
    yield call(updateHRCardRequest, payload);
    yield put(getHRCardList({searchKeyword:null}));
}

function* getHRCardDetailFn({payload}){
    const HRCardDetail = yield call(getHRCardDetailRequest, payload);
    yield put(carryHRCardDetail(HRCardDetail));
}

function* updateWorkAttitudeCode({payload}){
    yield call(updateWorkAttitudeCodeRequest, payload);
    yield put(getWorkAttitudeCodeList({searchKeyword:null}));
}

function* updateWorkAttitudeFn({payload}){
    yield call(updateWorkAttitudeRequest, payload);
    yield put(getWorkAttitudeList({searchKeyword:null}));
}

function* convertDepartUsageFn({payload}){
    yield call(convertDepartUsageRequest, payload);
    yield put(getDepartmentList({searchKeyword:null}));
}

function* addDepartmentFn({payload}){
    yield call(addDepartmentRequest, payload);
    yield put(getDepartmentList({searchKeyword:null}));
}

function* getDepartmentListFn({payload}){
    const departList = yield call(getDepartmentListRequest, payload);
    yield put(carryDepartmentList(departList));
}

function* addWorkAttitudeCodeFn({payload}){
    yield call(addWorkAttitudeCodeRequest, payload);
    yield put(getWorkAttitudeCodeList({searchKeyword:null}));
}

function* updateAppointmentFn({payload}){
    yield call(updateAppointmentRequest, payload);
    yield put(getAppointList({searchKeyword:null}));
}

function* addWorkAttitudeFn({payload}){
    yield call(addWorkAttitudeRequest, payload);
    yield put(getWorkAttitudeList({searchKeyword:null}));
}

function* getWorkAttitudeCodeListFn({payload}){
    const workAttitudeCodeList = yield call(getWorkAttitudeCodeListRequest, payload);
    yield put(carryWorkAttitudeCodeList(workAttitudeCodeList));
}

function* getWorkAttitudeListFn({payload}){
    const workAttitudeList = yield call(getWorkAttitude, payload);
    yield put(carryWorkAttitudeList(workAttitudeList));
}

function* addHRcardFn({payload}){
    yield call(addHRCardRequest, payload);
    yield put(getHRCardList({searchKeyword:null}))
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
}

function* getAppointListFn({payload}){
    const appointList = yield call(getAppointListRequest, payload);
    yield put(carryAppointList(appointList));
}

export function* addLeaveWorkSaga(){
    yield takeEvery(ADD_LEAVE_WORK, addLevaeWorkFn);
}

export function* addGoToWorkSaga(){
    yield takeEvery(ADD_GO_TO_WORK, addGoToWorkFn);
}

export function* getCommuteListSaga(){
    yield takeEvery(GET_COMMUTE_LIST, getCommuteListFn);
}

export function* convertDepartmentDeleteSaga(){
    yield takeEvery(CONVERT_DEPARTMENT_DELETE, convertDepartmentDeleteFn);
}

export function* convertWorkAttitudeCodeSaga(){
    yield takeEvery(CONVERT_WORKATTITUDE_CODE_USE_STATUS, convertWorkAttitudeCodeUseStatusFn);
}

export function* convertWorkAttitudeUseStatusSaga(){
    yield takeEvery(CONVERT_WORKATTITUDE_USE_STATUS, convertWorkAttitudeUseStatusFn);
}

export function* updateAppointStatusSaga(){
    yield takeEvery(UPDATE_APPOINT_STATUS, updateAppointStatusFn);
}

export function* updateHRCardSaga(){
    yield takeEvery(UPDATE_HRCARD, updateHRCardFn);
}

export function* getHRCardDetailSaga(){
    yield takeEvery(GET_HRCARD_DETAIL, getHRCardDetailFn);
}

export function* updateWorkAttitudeCodeSaga(){
    yield takeEvery(UPDATE_WORK_ATTITUDE_CODE, updateWorkAttitudeCode);
}

export function* updateWorkAttitudeSaga(){
    yield takeEvery(UPDATE_WORK_ATTITUDE, updateWorkAttitudeFn);
}

export function* convertDepartUsageSaga(){
    yield takeEvery(CONVERT_DEPART_USAGE_STATUS, convertDepartUsageFn);
}

export function* addDepartmentSaga(){
    yield takeEvery(ADD_DEPARTMENT, addDepartmentFn);
}

export function* getDepartmentListSaga(){
    yield takeEvery(GET_DEPARTMENT_LIST, getDepartmentListFn);
}

export function* addWorkAttitudeCodeSaga(){
    yield takeEvery(ADD_WORKATTITUDE_CODE, addWorkAttitudeCodeFn);
}

export function* updateAppointmentSaga(){
    yield takeEvery(UPDATE_APPOINTMENT, updateAppointmentFn);
}

export function* addWorkAttitudeSaga(){
    yield takeEvery(ADD_WORKATTITUDE, addWorkAttitudeFn);
}

export function* getWorkAttitudeCodeListSaga(){
    yield takeEvery(GET_WORKATTITUDE_CODE_LIST, getWorkAttitudeCodeListFn);
}

export function* getWorkAttitudeListSaga(){
    yield takeEvery(GET_WORKATTITUDE_LIST, getWorkAttitudeListFn);
}

export function* addHRCardSaga(){
    yield takeEvery(ADD_HRCARD, addHRcardFn);
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
            fork(getSimpleHRCardDetailSaga),
            fork(addHRCardSaga),
            fork(getWorkAttitudeListSaga),
            fork(getWorkAttitudeCodeListSaga),
            fork(addWorkAttitudeSaga),
            fork(updateAppointmentSaga),
            fork(addWorkAttitudeCodeSaga),
            fork(getDepartmentListSaga),
            fork(addDepartmentSaga),
            fork(convertDepartUsageSaga),
            fork(updateWorkAttitudeSaga),
            fork(updateWorkAttitudeCodeSaga),
            fork(getHRCardDetailSaga),
            fork(updateHRCardSaga),
            fork(updateAppointStatusSaga),
            fork(convertWorkAttitudeUseStatusSaga),
            fork(convertWorkAttitudeCodeSaga),
            fork(convertDepartmentDeleteSaga),
            fork(getCommuteListSaga),
            fork(addGoToWorkSaga),
            fork(addLeaveWorkSaga)]);
}