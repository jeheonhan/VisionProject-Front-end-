import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { carryVendorList, getVendorList, carryVendor } from 'actions/index';
import { GET_VENDOR_LIST, ADD_VENDOR, GET_VENDOR} from "actionTypes/ActionTypes";

const getVendorListRequest = async (search) => {
    console.log("Request search : "+search);
    return await axios({
        method:"POST",
        url:"/accounting/getVendorList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertVendorRequest = async (_vendor) =>{
    console.log("Request _data"+_vendor);
    return await axios({
        method:"POST",
        url:"/accounting/addVendor",
        data:_vendor
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

//async는 비동기 통신
//요청이 성공하든 실패하든 await 무조건 답을 받겠다. promise와 같음. 
const getVendorRequest = async (_vendorNo) =>{
    console.log("Request _data"+_vendorNo);
    return await axios({
        method:"GET",
        url:"/accounting/getVendorDetail/"+_vendorNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

//여기서 payload는 search 도메인을 의미한다.
function* getVendorListFn({payload}){
    console.log("getVendorListFn payload : "+payload);
    const VendorList = yield call(getVendorListRequest, payload);
    yield put(carryVendorList(VendorList));
}

function* addVendorFn({payload}){
    console.log("addVendorFn payload : "+payload);
    yield call(insertVendorRequest, payload);
    //getVendorList 보낼때 search 값이 필요하다. 하지만 add 후에는 모든 list를 다 불러오므로 search 값이 의미가 없다.
    //그리고 Request시 json으로 날라가기 때문에 내가 직접 searckKeyword의 값을 아무 값이나 json 형태로 부르면 될듯.
    yield put(getVendorList({searchKeyword:""}));
}

function* getVendorFn({payload}){
    console.log("getVendorFn payload : "+payload);
    const Vendor = yield call(getVendorRequest, payload);
    yield put(carryVendor(Vendor));
}

export function* getVendorListSaga(){
    console.log("getVendorListSaga 입니다");
    yield takeEvery(GET_VENDOR_LIST, getVendorListFn);
}

export function* addVendorSaga(){
    console.log("addVendorSaga 입니다");
    yield takeEvery(ADD_VENDOR, addVendorFn);
}

export function* getVendorSaga(){
    console.log("getVendorSaga 입니다");
    yield takeEvery(GET_VENDOR, getVendorFn);
}

export default function* rootSaga(){
    yield all([
        fork(getVendorListSaga),
        fork(addVendorSaga),
        fork(getVendorSaga),
    ]);
}