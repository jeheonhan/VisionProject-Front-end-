import axios from 'axios';
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { carryDailySalesList, carryDailySalesDetail, getDailySalesList, carrySalesMenuList} from 'actions/Branch';
import { GET_DAILY_SALES_LIST, GET_DAILY_SALES_DETAIL, ADD_DAILY_SALES, GET_SALES_MENU_LIST } from 'actionTypes/ActionTypes';

const getDailySalesListRequest = async (branchNo) => {
    return await axios({
        method : "GET",
        url:"/branch/getDailySalesList/"+branchNo,
    })
    .then(response => response.data)
    .catch(error => console.log(error))    
}

const getDailySalesDetailRequest = async (branchDailySales) => {
    return await axios({
        method : "POST",
        url:"/branch/getDailySalesDetail",
        data: branchDailySales
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const addDailySalesRequest = async ( salesProductList ) => {
    return await axios({
        method : "POST",
        url:"/branch/addDailySales",
        data: salesProductList
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const getSalesMenuListRequest = async () => {
    console.log("getSalesMenu :::::");
    return await axios({
        method : "GET",
        url: "/branch/getSalesMenuList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}




function* getDailySalesListFn ({ payload }) {
    const dailySalesList = yield call(getDailySalesListRequest, payload);
   yield put(carryDailySalesList(dailySalesList)); 
}

function* getDailySalesDetailFn ({ payload }) {
    const salesProduct = yield call(getDailySalesDetailRequest, payload);
    yield put(carryDailySalesDetail(salesProduct));
}

function* addDailySalesFn ({payload}) {
    yield call(addDailySalesRequest, payload);
    yield put(getDailySalesList());
}

function* getSalesMenuListFn () {
    const salesMenuList = yield call(getSalesMenuListRequest);
    yield put(carrySalesMenuList(salesMenuList));
}






export function* getDailySalesListSaga(){
    yield takeEvery(GET_DAILY_SALES_LIST, getDailySalesListFn);
}

export function* getDailySalesDetailSaga(){
    yield takeEvery(GET_DAILY_SALES_DETAIL, getDailySalesDetailFn);
}

export function* addDailySalesSaga() {
    yield takeEvery(ADD_DAILY_SALES, addDailySalesFn);
}

export function* getSalesMenuListSaga() {
    yield takeEvery(GET_SALES_MENU_LIST, getSalesMenuListFn)
}

export default function* rootSaga(){
    yield all([fork(getDailySalesListSaga),
                fork(getDailySalesDetailSaga),
                fork(addDailySalesSaga),
                fork(getSalesMenuListSaga)]);
}