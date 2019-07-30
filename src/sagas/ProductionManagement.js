import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryProductList, carryOrderToVendorList, 
    addProduct, getProductList, addProductAccount, 
    getInfoAccount,carryInfoAccount, carryOrderToVendorDetailList, 
    getOrderToVendorList, getOrderToVendorDetailList, caarryOrderBranch,
     carryOrderBranch, carryOrderBranchList, getOrderBranchList ,
     getProductListForOrder , carryProductListForOrder
    } from 'actions/index';
import {GET_PRODUCT_LIST, GET_ORDER_TO_VENDOR_LIST,
     ADD_PRODUCT, GET_INFO_ACCOUNT, GET_ORDER_TO_VENDOR_DETAIL_LIST
    , UPDATE_ORDER_TO_VENDOR_CODE , ADD_ORDER_TO_VENDOR, ADD_ORDER_BRANCH ,
     GET_ORDER_BRANCH, GET_ORDER_BRANCH_LIST, MODIFY_ORDER_BRANCH_STATUS,
    UPDATE_ORDER_TO_VEN_ITEM_CODE ,
    GET_PRODUCT_LIST_FOR_ORDER
} from "actionTypes/ActionTypes";

import {SEND_SHIPPING} from 'actionTypes/ActionTypes';
import {} from 'actions/index';


const sendShippingAxios = async (action) => {
    return await axios({
        method:"POST",
        url:"/pm/modifyOrderFromBranchProductStatus",
        data:action.payload
    })
    .catch(error => console.log(error))
}
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
    console.log("물픔등록할때 쓰는거 왓냐")
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


    return await axios({
        method : "GET" ,
        url : "/pm/modifyOrderToVenCode/"+data.statementNo+"/"+data.orderToVendorNo
    })
}

const addOrderToVendorRequest = async (data) => {
    console.log("addOrderToVendorRequest 데이터왓냐");

    return await axios({
        method : "POST" , 
        url : "/pm/addOrderToVendor",
        data : data
    })
    .catch(error => console.log(error))
}

const addOrderBranchAxios = async (action) => {
    return await axios({
        method:"POST",
        url:"/pm/addOrderFromBranch",
        data : action.payload
    })
}

const updateOrderToVenItemCodeRequest = async (data) => {
    console.log("updateCode")
    console.log(data)
    return await axios({
        method : "POST",
        url:"/pm/modifyOrderToVenItemCode",
        data : data
    })
    .catch(error => console.log(error))
}   
const getOrderBranchAxios = async(action) => {
    return await axios({
        method:"POST",
        url:"/pm/getOrderFromBranchList",
        data:action.payload
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const modifyOrderFromBranchAxios = async(action) => {
    return await axios({
        method:"POST",
        url:"/pm/modifyOrderFromBranchStatus",
        data:action.payload
    })
}

const getProductListForOrderRequest = async () => {
    return await axios({
        method : "GET",
        url : "/pm/selectProductList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}



function * sendShippingFn(action){
    yield call(sendShippingAxios, action)
    yield put(getOrderBranchList({}))
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
    yield call(updateOrderToVendorCodeRequest, payload);
    yield put(getOrderToVendorList(payload));
}

function* addOrderToVendorFn({payload}) {
    yield call(addOrderToVendorRequest, payload);
    yield put(getOrderToVendorList());
}

function* addOrderBranchFn(action){
    yield call(addOrderBranchAxios, action);
}

function* getOrderBranchFn(action){
    const result = yield call(getOrderBranchAxios, action)
    yield put(carryOrderBranchList(result));
    getProductListFn();
}

function* updateOrderToVenItemCodeFn({payload}){

    yield call (updateOrderToVenItemCodeRequest, payload);
    const orderToVendorListDetail = yield call(getOrderToVendorDetailListRequest);
    console.log("orderToVendorListDetail 값은??");
    console.log(orderToVendorListDetail);
    yield put(getOrderToVendorDetailList(payload));
}

function* modifyOrderBranchFn(action){
    yield call(modifyOrderFromBranchAxios, action);
    yield put(getOrderBranchList({searchKeyword:JSON.parse(localStorage.getItem("user")).branchNo}))
}

function* getProductListForOrderFn(){
   const productListForOrder = yield call(getProductListForOrderRequest);
   console.log("productListForOrder :: 값은???")
   console.log(productListForOrder);
    yield put(carryProductListForOrder(productListForOrder))
}



export function* getProductListSaga(){
    yield takeEvery(GET_PRODUCT_LIST, getProductListFn);
}

export function* sendShippingSaga(){
    yield takeEvery(SEND_SHIPPING, sendShippingFn)
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
    yield takeEvery(UPDATE_ORDER_TO_VENDOR_CODE, updateOrderToVendorCodeFn)
}

export function* addOrderToVendorSaga() {
    yield takeEvery(ADD_ORDER_TO_VENDOR, addOrderToVendorFn)
}

export function* addOrderBranchSaga(){
    yield takeEvery(ADD_ORDER_BRANCH, addOrderBranchFn)
}

export function* updateOrderToVenItemCodeSaga(){
    yield takeEvery(UPDATE_ORDER_TO_VEN_ITEM_CODE, updateOrderToVenItemCodeFn)
}

export function* getOrderBranchSaga(){
    yield takeEvery(GET_ORDER_BRANCH_LIST, getOrderBranchFn)
}

export function* modifyOrderBranchStatusSaga(){
    yield takeEvery(MODIFY_ORDER_BRANCH_STATUS, modifyOrderBranchFn)
}

export function* productListForOrderSaga(){
    yield takeEvery(GET_PRODUCT_LIST_FOR_ORDER, getProductListForOrderFn)
}

export default function* rootSaga(){
    yield all([
        fork(sendShippingSaga),
        fork(getProductListSaga),
        fork(getselectOrderToVendorListSaga),
        fork(addProductSaga),
        fork(getProductAccountSaga),
        fork(getOrderToVendorDetailListSaga),
        fork(updateOrderToVendorCOdeSaga),
        fork(addOrderToVendorSaga), 
        fork(addOrderBranchSaga),
        fork(updateOrderToVenItemCodeSaga),
        fork(getOrderBranchSaga),
        fork(modifyOrderBranchStatusSaga),
        fork(productListForOrderSaga)
    ]);
}

