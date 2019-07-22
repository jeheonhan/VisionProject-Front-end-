import axios from 'axios';
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import { carryDailySalesList} from 'actions/Branch';
import { GET_DAILY_SALES_LIST } from 'actionTypes/ActionTypes';

const getDailySalesListRequest = async (branchNo) => {
    return await axios({
        method : "GET",
        url:"/branch/getDailySalesList/"+branchNo,
    })
    .then(response => response.data)
    .catch(error => console.log(error))    
}

function* getDailySalesListFn ({ payload }) {
    const dailySalesList = yield call(getDailySalesListRequest, payload);
   yield put(carryDailySalesList(dailySalesList)); 
}

export function* getDailySalesListSaga(){
    yield takeEvery(GET_DAILY_SALES_LIST, getDailySalesListFn);
}

export default function* rootSaga(){
    yield all([fork(getDailySalesListSaga)
                ]);
}