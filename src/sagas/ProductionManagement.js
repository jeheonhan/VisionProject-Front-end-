import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryProductList, carryOrderToVendorList, addProduct, getProductList, addProductAccount} from 'actions/index';
import {GET_PRODUCT_LIST, GET_ORDER_TO_VENDOR_LIST, ADD_PRODUCT, GET_ADD_PRODUCT_ACCOUNT} from "actionTypes/ActionTypes";



const getProductListRequest = async () => {
    console.log("getProductListRequest() ");
    return await axios({
        method : "GET",
        url : "/pm/selectProductList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}  

const getOrderToVendorListRequest = async () => {
    console.log("getselectOrderToVendorListRequest() ");
    return await axios({
        method : "GET",
        url : "/pm/selectOrderToVendorList"
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}  

const addProductRequest = async (data) => {
    console.log("addProductRequest() 왓냐");
    console.log("data 왓냐 :: " + data);
    console.log(data);
    return await axios({
        method : "POST",
        url : "/pm/addProduct",
        data : data,
    })
    .then(response => response)
    .catch(error => console.log(error))
}  

const getProductAccountRequest = async () => {
    console.log("getProductAccountRequest 왓냐");
    return await axios({
       method : "POST",
       url : "/pm/addProductPreparing" 
    })
    .then(respones => respones)
    .catch(error => console.log(error))
}   






function* getselectOrderToVendorListFn(){
    console.log("getselectOrderToVendorList()1 ");
    const OrderToVendorList = yield call(getOrderToVendorListRequest);
    console.log("getselectOrderToVendorList()2 ");
    yield put(carryOrderToVendorList(OrderToVendorList));
}

function* getProductListFn(){
    console.log("getProductListFn()1 ");
    const ProductList = yield call(getProductListRequest);
    console.log("getProductListFn()2 ");
    yield put(carryProductList(ProductList));
}

function* addProductFn({payload}){
    
    console.log("addProductFn()1 ");
    console.log(payload);
    yield call(addProductRequest, payload);
    console.log("addProductFn()2 ");
    yield put(getProductList());
}

function* getProductAccountFn(){
    console.log("가자 Fn() 1");
    yield call(getProductAccountRequest);
    console.log("가자 Fn() 2");
    yield put(addProductAccount());
}







export function* getProductListSaga(){
    console.log("getProductListSaga()");
    yield takeEvery(GET_PRODUCT_LIST, getProductListFn);
}


export function* getselectOrderToVendorListSaga(){
    console.log("getselectOrderToVendorListSaga()");
    yield takeEvery(GET_ORDER_TO_VENDOR_LIST, getselectOrderToVendorListFn);
}

export function* addProductSaga(){
    console.log("addProduct()");
    yield takeEvery(ADD_PRODUCT, addProductFn);
}

export function* getProductAccountSaga() {
    console.log("getProductAccountSaga()");
    yield takeEvery(GET_ADD_PRODUCT_ACCOUNT, getProductAccountFn)
}



export default function* rootSaga(){
    console.log("rootSaga()");
    yield all([
        fork(getProductListSaga),
        fork(getselectOrderToVendorListSaga),
        fork(addProductSaga),
        fork(getProductAccountSaga),
    ]);
}

