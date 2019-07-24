import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import axios from 'axios';
import { 
    carryVendorList, 
    getVendorList, 
    carryVendor, 
    carryCardList, 
    carryAccountList, 
    getCardList, 
    carryCard,
    getAccountList,
    carryVendorBank,
    carryVendorAddress,
    carryCheckAccountList,
    carryAccount,
} from 'actions/index';
import { 
    GET_VENDOR_LIST, 
    ADD_VENDOR, 
    GET_VENDOR, 
    UPDATE_VENDOR, 
    GET_CARD_LIST, 
    GET_ACCOUNT_LIST, 
    ADD_CARD,
    GET_CARD,
    ADD_ACCOUNT,
    GET_VENDOR_BANK,
    GET_VENDOR_ADDRESS,
    UPDATE_CARD,
    GET_CHECK_ACCOUNT_LIST,
    GET_ACCOUNT,
} from "actionTypes/ActionTypes";

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

const insertVendorRequest = async (_vendor) => {
    console.log("Request _vendor"+_vendor);
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

const updateVendorRequest = async (_vendor) => {
    console.log("Request _vendor"+_vendor);
    return await axios({
        method:"POST",
        url:"/accounting/modifyVendor",
        data:_vendor
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getCardListRequest = async (search) => {
    console.log("Request search : "+search);
    return await axios({
        method:"POST",
        url:"/accounting/getCardList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getAccountListRequest = async (search) => {
    console.log("Request search : "+search);
    return await axios({
        method:"POST",
        url:"/accounting/getAccountList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertCardRequest = async (_card) => {
    console.log("Request _card"+_card);
    return await axios({
        method:"POST",
        url:"/accounting/addCard",
        data:_card
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getCardRequest = async (_cardNo) =>{
    console.log("Request _data"+_cardNo);
    return await axios({
        method:"GET",
        url:"/accounting/getCardDetail/"+_cardNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertAccountRequest = async (_account) => {
    console.log("Request _account"+_account);
    return await axios({
        method:"POST",
        url:"/accounting/addAccount",
        data:_account
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateCardRequest = async (_card) => {
    console.log("Request _card"+_card);
    return await axios({
        method:"POST",
        url:"/accounting/modifyCard",
        data:_card
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getAccountRequest = async (_accountRegNo) =>{
    console.log("Request _data"+_accountRegNo);
    return await axios({
        method:"GET",
        url:"/accounting/getAccountDetail/"+_accountRegNo
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
    yield put(getVendorList({ searchKeyword : "" }));
}

function* getVendorFn({payload}){
    console.log("getVendorFn payload : "+payload);
    const vendorInfo = yield call(getVendorRequest, payload);
    yield put(carryVendor(vendorInfo));
}

function* updateVendorFn({payload}){
    console.log("updateVendorFn payload : "+payload);
    yield call(updateVendorRequest, payload);
    yield put(getVendorList({ searchKeyword : "" }))
}

function* getCardListFn({payload}){
    console.log("getCardListFn payload : "+payload);
    const CardList = yield call(getCardListRequest, payload);
    yield put(carryCardList(CardList));
}

function* getAccountListFn({payload}){
    console.log("getAccountListFn payload : "+payload);
    const accountList = yield call(getAccountListRequest, payload);
    yield put(carryAccountList(accountList));
}

function* addCardFn({payload}){
    console.log("addCardFn payload : "+payload);
    yield call(insertCardRequest, payload);
    yield put(getCardList({ searchKeyword : "", usageCondition : "01" }));
}

function* getCardFn({payload}){
    console.log("getCardFn payload : "+payload);
    const Card = yield call(getCardRequest, payload);
    yield put(carryCard(Card));
}

function* addAccountFn({payload}){
    console.log("addAccountFn payload : "+payload);
    yield call(insertAccountRequest, payload);
    yield put(getAccountList({ searchKeyword : "", usageCondition : "01" }));
}

function* getVendorBankFn({payload}){
    console.log("getVendorBankFn payload : "+payload);
    const vendorBank = yield call(getVendorRequest, payload);
    yield put(carryVendorBank(vendorBank));
}

function* getVendorAddressFn({payload}){
    console.log("getVendorAddressFn payload : "+payload);
    const vendorAddress = yield call(getVendorRequest, payload);
    yield put(carryVendorAddress(vendorAddress));
}

function* updateCardFn({payload}){
    console.log("updateCardFn payload : "+payload);
    yield call(updateCardRequest, payload);
    yield put(getCardList({ searchKeyword : "", usageCondition : "01" }))
}

function* getCheckAccountListFn({payload}){
    console.log("getCheckAccountListFn payload : "+payload);
    const checkAccountList = yield call(getAccountListRequest, payload);
    yield put(carryCheckAccountList(checkAccountList));
}

function* getAccountFn({payload}){
    console.log("getAccountFn payload : "+payload);
    const accountInfo = yield call(getAccountRequest, payload);
    yield put(carryAccount(accountInfo));
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

export function* updateVendorSaga(){
    console.log("updateVendorSaga 입니다");
    yield takeEvery(UPDATE_VENDOR, updateVendorFn);
}

export function* getCardListSaga(){
    console.log("getCardListSaga 입니다");
    yield takeEvery(GET_CARD_LIST, getCardListFn);
}

export function* getAccountListSaga(){
    console.log("getAccountListSaga 입니다");
    yield takeEvery(GET_ACCOUNT_LIST, getAccountListFn);
}

export function* addCardSaga(){
    console.log("addCardSaga 입니다");
    yield takeEvery(ADD_CARD, addCardFn);
}

export function* getCardSaga(){
    console.log("getCardSaga 입니다");
    yield takeEvery(GET_CARD, getCardFn);
}

export function* addAccountSaga(){
    console.log("addAccountSaga 입니다");
    yield takeEvery(ADD_ACCOUNT, addAccountFn);
}

export function* getVendorBankSaga(){
    console.log("getVendorBankSaga 입니다");
    yield takeEvery(GET_VENDOR_BANK, getVendorBankFn);
}

export function* getVendorAddressSaga(){
    console.log("getVendorAddressSaga 입니다");
    yield takeEvery(GET_VENDOR_ADDRESS, getVendorAddressFn);
}

export function* updateCardSaga(){
    console.log("updateCardSaga 입니다");
    yield takeEvery(UPDATE_CARD, updateCardFn);
}

export function* getCheckAccountListSaga(){
    console.log("getCheckAccountListSaga 입니다");
    yield takeEvery(GET_CHECK_ACCOUNT_LIST, getCheckAccountListFn);
}

export function* getAccountSaga(){
    console.log("getAccountSaga 입니다");
    yield takeEvery(GET_ACCOUNT, getAccountFn);
}

export default function* rootSaga(){
    yield all([
        fork(getVendorListSaga),
        fork(addVendorSaga),
        fork(getVendorSaga),
        fork(updateVendorSaga),
        fork(getCardListSaga),
        fork(getAccountListSaga),
        fork(addCardSaga),
        fork(getCardSaga),
        fork(addAccountSaga),
        fork(getVendorBankSaga),
        fork(getVendorAddressSaga),
        fork(updateCardSaga),
        fork(getCheckAccountListSaga),
        fork(getAccountSaga),
    ]);
}