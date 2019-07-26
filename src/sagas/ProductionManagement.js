import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryProductList, carryOrderToVendorList, 
    addProduct, getProductList, addProductAccount, 
    getInfoAccount,carryInfoAccount, carryOrderToVendorDetailList, getOrderToVendorList } from 'actions/index';
import {GET_PRODUCT_LIST, GET_ORDER_TO_VENDOR_LIST,
     ADD_PRODUCT, GET_INFO_ACCOUNT, GET_ORDER_TO_VENDOR_DETAIL_LIST
    , UPDATE_ORDER_TO_VENDOR_CODE , ADD_ORDER_TO_VENDOR} from "actionTypes/ActionTypes";



const getProductListRequest = async () => {
    return await axios({
        method : "GET",
        url : "/pm/selectProductList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}  

const getOrderToVendorListRequest = async () => {
    return await axios({
        method : "GET",
        url : "/pm/selectOrderToVendorList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}  

const addProductRequest = async (data) => {
    return await axios({
        method : "POST",
        url : "/pm/addProduct",
        data : data,
    })
    .then(response => response)
    .catch(error => console.log(error))
}  

const getProductAccountRequest = async () => {
    return await axios({
       method : "GET",
       url : "/pm/addProductPreparing" 
    })
    .then(respones => respones.data)
    .catch(error => console.log(error))
}   

const getOrderToVendorDetailListRequest = async (data) => {
    return await axios({
        method : "POST",
        url : "/pm/orderToVendorDetailList",
        data : data
    })
    .then(respones => respones.data)
    .catch(error => console.log(error))
}


const updateOrderToVendorCodeRequest = async (data) => {

    console.log(data.statementNo);
    console.log(data.orderToVendorNo);
    return await axios({
        method : "GET" ,
        url : "/pm/modifyOrderToVenCode/"+data.statementNo+"/"+data.orderToVendorNo
    })
}

const addOrderToVendorRequest = async (data) => {
    console.log("addOrderToVendorRequest 데이터왓냐");
    console.log(data)
    return await axios({
        method : "POST" , 
        url : "/pm/addOrderToVendor",
        data : data
    })
}





function* getselectOrderToVendorListFn(){
    const OrderToVendorList = yield call(getOrderToVendorListRequest);
    yield put(carryOrderToVendorList(OrderToVendorList));
}

function* getProductListFn(){
    const ProductList = yield call(getProductListRequest);
    yield put(carryProductList(ProductList));
}

function* addProductFn({payload}){
    yield call(addProductRequest, payload);
    yield put(getProductList());
}

function* getProductAccountFn(){
   const accountIfo = yield call(getProductAccountRequest);
    yield put(carryInfoAccount(accountIfo));
}

function* getOrderTOVendorDetailListFn({payload}){
   const orderToVendorListDetail = yield call(getOrderToVendorDetailListRequest,payload);
    yield put(carryOrderToVendorDetailList(orderToVendorListDetail));
}

function* updateOrderToVendorCodeFn({payload}) {
    console.log("updateOrderToVendorCodeFn들어왓냐");
    yield call(updateOrderToVendorCodeRequest, payload);
    console.log("updateOrderToVendorCodeRequest수행다 끝냇냐");
    yield put(getOrderToVendorList());
}

function* addOrderToVendorFn({payload}) {
    console.log("addOrderToVendorFn들어왓냐");
    yield call(addOrderToVendorRequest, payload);
    yield put(getOrderToVendorList());
}





export function* getProductListSaga(){
    yield takeEvery(GET_PRODUCT_LIST, getProductListFn);
}


export function* getselectOrderToVendorListSaga(){
    yield takeEvery(GET_ORDER_TO_VENDOR_LIST, getselectOrderToVendorListFn);
}

export function* addProductSaga(){
    yield takeEvery(ADD_PRODUCT, addProductFn);
}

export function* getProductAccountSaga() {
    yield takeEvery(GET_INFO_ACCOUNT, getProductAccountFn)
}

export function* getOrderToVendorDetailListSaga() {
    yield takeEvery(GET_ORDER_TO_VENDOR_DETAIL_LIST, getOrderTOVendorDetailListFn)
}

export function* updateOrderToVendorCOdeSaga() {
    console.log("updateOrderToVendorCOdeSaga들어왓냐")
    yield takeEvery(UPDATE_ORDER_TO_VENDOR_CODE, updateOrderToVendorCodeFn)
}

export function* addOrderToVendorSaga() {
    console.log("addOrderToVendorSaga들어왓냐");
    yield takeEvery(ADD_ORDER_TO_VENDOR, addOrderToVendorFn)
}

export default function* rootSaga(){
    console.log("rootSaga()");
    yield all([
        fork(getProductListSaga),
        fork(getselectOrderToVendorListSaga),
        fork(addProductSaga),
        fork(getProductAccountSaga),
        fork(getOrderToVendorDetailListSaga),
        fork(updateOrderToVendorCOdeSaga),
        fork(addOrderToVendorSaga), 
    ]);
}

