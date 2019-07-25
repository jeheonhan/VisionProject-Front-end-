import axios from 'axios';
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { carryDailySalesList, carryDailySalesDetail} from 'actions/Branch';
import { GET_DAILY_SALES_LIST, GET_DAILY_SALES_DETAIL } from 'actionTypes/ActionTypes';

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

function* getDailySalesListFn ({ payload }) {
    const dailySalesList = yield call(getDailySalesListRequest, payload);
   yield put(carryDailySalesList(dailySalesList)); 
}

function* getDailySalesDetailFn ({ payload }) {
    const salesProduct = yield call(getDailySalesDetailRequest, payload);
    yield put(carryDailySalesDetail(salesProduct));
}

export function* getDailySalesListSaga(){
    yield takeEvery(GET_DAILY_SALES_LIST, getDailySalesListFn);
}

export function* getDailySalesDetailSaga(){
    yield takeEvery(GET_DAILY_SALES_DETAIL, getDailySalesDetailFn);
}

export default function* rootSaga(){
    yield all([fork(getDailySalesListSaga),
                fork(getDailySalesDetailSaga)
                ]);
}