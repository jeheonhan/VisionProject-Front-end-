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
    carryStatementList,
    getStatementList,
    carryStatement,
    getStatement,
    carrySalaryList,
    carryDuplicateSalaryDate,
    getSalaryList,
    carrySalary,
    carrySalaryBookList,
    carryAnalyzeSalaryBookList,
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
    UPDATE_ACCOUNT,
    GET_STATEMENT_LIST,
    ADD_STATEMENT,
    GET_STATEMENT,
    UPDATE_STATEMENT,
    GET_SALARY_LIST,
    CHECK_DUPLICATE_SALARYDATE,
    ADD_SALARY,
    UPDATE_SALARY,
    GET_SALARY,
    GET_SALARY_BOOK_LIST,
    GET_ANALYZE_SALARY_BOOK_LIST,
    DELETE_VENDOR,
} from "actionTypes/ActionTypes";

const getVendorListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getVendorList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertVendorRequest = async (_vendor) => {
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
    return await axios({
        method:"GET",
        url:"/accounting/getVendorDetail/"+_vendorNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateVendorRequest = async (_vendor) => {
    return await axios({
        method:"POST",
        url:"/accounting/modifyVendor",
        data:_vendor
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getCardListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getCardList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getAccountListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getAccountList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertCardRequest = async (_card) => {
    return await axios({
        method:"POST",
        url:"/accounting/addCard",
        data:_card
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getCardRequest = async (_cardNo) =>{
    return await axios({
        method:"GET",
        url:"/accounting/getCardDetail/"+_cardNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertAccountRequest = async (_account) => {
    return await axios({
        method:"POST",
        url:"/accounting/addAccount",
        data:_account
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateCardRequest = async (_card) => {
    return await axios({
        method:"POST",
        url:"/accounting/modifyCard",
        data:_card
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getAccountRequest = async (_accountRegNo) =>{
    return await axios({
        method:"GET",
        url:"/accounting/getAccountDetail/"+_accountRegNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateAccountRequest = async (_account) => {
    return await axios({
        method:"POST",
        url:"/accounting/modifyAccount",
        data:_account
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getStatementListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getStatementList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertStatementRequest = async (statement) => {
    return await axios({
        method:"POST",
        url:"/accounting/addStatement",
        data:statement
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getStatementRequest = async (statementNo) =>{
    return await axios({
        method:"GET",
        url:"/accounting/getStatementDetail/"+statementNo
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateStatementRequest = async (_statement) => {
    return await axios({
        method:"POST",
        url:"/accounting/modifyStatement",
        data:_statement
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getSalaryListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getSalaryList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const checkDuplicateSalaryDateRequest = async (salaryDate) => {
    return await axios({
        method:"GET",
        url:"/accounting/checkDuplicateSalaryDate/"+salaryDate,
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const insertSalaryRequest = async (salaryDate) => {
    return await axios({
        method:"GET",
        url:"/accounting/addSalary/"+salaryDate,
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const updateSalaryRequest = async (salary) => {
    return await axios({
        method:"POST",
        url:"/accounting/modifySalary",
        data:salary
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getSalaryRequest = async (salaryNumbering) =>{
    return await axios({
        method:"GET",
        url:"/accounting/getSalaryDetail/"+salaryNumbering
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getSalaryBookListRequest = async (search) => {
    return await axios({
        method:"POST",
        url:"/accounting/getSalaryBookList",
        data:search
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

const getAnalyzeSalaryBookRequest = async (salaryDate) =>{
    return await axios({
        method:"GET",
        url:"/accounting/getAnalyzeSalaryBook/"+salaryDate
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

//사용상태 변경은 복수처리가 가능하도록 서버로 vendorNo를 String 형식의 배열로 보낸다.
const deleteVendorRequest = async (vendorNoList) => {
    return await axios({
        method:"POST",
        url:"/accounting/convertVendorUsageStatus",
        data: vendorNoList
    })
    .then(response => response.data)
    .catch(response => console.log(response));
}

//여기서 payload는 search 도메인을 의미한다.
function* getVendorListFn({payload}){
    const VendorList = yield call(getVendorListRequest, payload);
    yield put(carryVendorList(VendorList));
}

function* addVendorFn({payload}){
    yield call(insertVendorRequest, payload);
    //getVendorList 보낼때 search 값이 필요하다. 하지만 add 후에는 모든 list를 다 불러오므로 search 값이 의미가 없다.
    //그리고 Request시 json으로 날라가기 때문에 내가 직접 searckKeyword의 값을 아무 값이나 json 형태로 부르면 될듯.
    yield put(getVendorList({ searchKeyword : "" }));
}

function* getVendorFn({payload}){
    const vendorInfo = yield call(getVendorRequest, payload);
    yield put(carryVendor(vendorInfo));
}

function* updateVendorFn({payload}){
    yield call(updateVendorRequest, payload);
    yield put(getVendorList({ searchKeyword : "" }))
}

function* getCardListFn({payload}){
    const CardList = yield call(getCardListRequest, payload);
    yield put(carryCardList(CardList));
}

function* getAccountListFn({payload}){
    const accountList = yield call(getAccountListRequest, payload);
    yield put(carryAccountList(accountList));
}

function* addCardFn({payload}){
    yield call(insertCardRequest, payload);
    yield put(getCardList({ searchKeyword : "", usageCondition : "01" }));
}

function* getCardFn({payload}){
    const Card = yield call(getCardRequest, payload);
    yield put(carryCard(Card));
}

function* addAccountFn({payload}){
    yield call(insertAccountRequest, payload);
    yield put(getAccountList({ searchKeyword : "", usageCondition : "01" }));
}

function* getVendorBankFn({payload}){
    const vendorBank = yield call(getVendorRequest, payload);
    yield put(carryVendorBank(vendorBank));
}

function* getVendorAddressFn({payload}){
    const vendorAddress = yield call(getVendorRequest, payload);
    yield put(carryVendorAddress(vendorAddress));
}

function* updateCardFn({payload}){
    yield call(updateCardRequest, payload);
    yield put(getCardList({ searchKeyword : "", usageCondition : "01" }))
}

function* getCheckAccountListFn({payload}){
    const checkAccountList = yield call(getAccountListRequest, payload);
    yield put(carryCheckAccountList(checkAccountList));
}

function* getAccountFn({payload}){
    const accountInfo = yield call(getAccountRequest, payload);
    yield put(carryAccount(accountInfo));
}

function* updateAccountFn({payload}){
    yield call(updateAccountRequest, payload);
    yield put(getAccountList({ searchKeyword : "", usageCondition : "01" }))
}

function* getStatementListFn({payload}){
    const statementList = yield call(getStatementListRequest, payload);
    yield put(carryStatementList(statementList));
}

function* addStatementFn({payload}){
    yield call(insertStatementRequest, payload);
    yield put(getStatementList({ searchKeyword : "", usageCondition : "01"}));
}

function* getStatementFn({payload}){
    const statementInfo = yield call(getStatementRequest, payload);
    yield put(carryStatement(statementInfo));
}

function* updateStatementFn({payload}){
    yield call(updateStatementRequest, payload);
    yield put(getStatementList({ searchKeyword : "", usageCondition : "01" }));
    yield put(getStatement(payload.statementNo));
}

function* getSalaryListFn({payload}){
    const salaryList = yield call(getSalaryListRequest, payload);
    yield put(carrySalaryList(salaryList));
}

function* checkDuplicateSalaryDateFn({payload}){
    const salaryDateResult = yield call(checkDuplicateSalaryDateRequest, payload);
    yield put(carryDuplicateSalaryDate(salaryDateResult));
}

function* addSalaryFn({payload}){
    yield call(insertSalaryRequest, payload);
    yield put(getSalaryList({ searchKeyword : "" }));
}

function* updateSalaryFn({payload}){
    yield call(updateSalaryRequest, payload);
    yield put(getSalaryList({ searchKeyword : "" }));
}

function* getSalaryFn({payload}){
    const salaryInfo = yield call(getSalaryRequest, payload);
    yield put(carrySalary(salaryInfo));
}

function* getSalaryBookListFn({payload}){
    const salaryBookList = yield call(getSalaryBookListRequest, payload);
    yield put(carrySalaryBookList(salaryBookList));
}

function* getAnalyzeSalaryBookFn({payload}){
    const analyzeSalaryBookList = yield call(getAnalyzeSalaryBookRequest, payload);
    yield put(carryAnalyzeSalaryBookList(analyzeSalaryBookList));
}

function* deleteVendorFn({payload}){
    yield call(deleteVendorRequest, payload);
    yield put(getVendorList({ searchKeyword : "" }));
}

export function* getVendorListSaga(){
    yield takeEvery(GET_VENDOR_LIST, getVendorListFn);
}

export function* addVendorSaga(){
    yield takeEvery(ADD_VENDOR, addVendorFn);
}

export function* getVendorSaga(){
    yield takeEvery(GET_VENDOR, getVendorFn);
}

export function* updateVendorSaga(){
    yield takeEvery(UPDATE_VENDOR, updateVendorFn);
}

export function* getCardListSaga(){
    yield takeEvery(GET_CARD_LIST, getCardListFn);
}

export function* getAccountListSaga(){
    yield takeEvery(GET_ACCOUNT_LIST, getAccountListFn);
}

export function* addCardSaga(){
    yield takeEvery(ADD_CARD, addCardFn);
}

export function* getCardSaga(){
    yield takeEvery(GET_CARD, getCardFn);
}

export function* addAccountSaga(){
    yield takeEvery(ADD_ACCOUNT, addAccountFn);
}

export function* getVendorBankSaga(){
    yield takeEvery(GET_VENDOR_BANK, getVendorBankFn);
}

export function* getVendorAddressSaga(){
    yield takeEvery(GET_VENDOR_ADDRESS, getVendorAddressFn);
}

export function* updateCardSaga(){
    yield takeEvery(UPDATE_CARD, updateCardFn);
}

export function* getCheckAccountListSaga(){
    yield takeEvery(GET_CHECK_ACCOUNT_LIST, getCheckAccountListFn);
}

export function* getAccountSaga(){
    yield takeEvery(GET_ACCOUNT, getAccountFn);
}

export function* updateAccountSaga(){
    yield takeEvery(UPDATE_ACCOUNT, updateAccountFn);
}

export function* getStatementListSaga(){
    yield takeEvery(GET_STATEMENT_LIST, getStatementListFn);
}

export function* addStatementSaga(){
    yield takeEvery(ADD_STATEMENT, addStatementFn);
}

export function* getStatementSaga(){
    yield takeEvery(GET_STATEMENT, getStatementFn);
}

export function* updateStatementSaga(){
    yield takeEvery(UPDATE_STATEMENT, updateStatementFn);
}

export function* getSalaryListSaga(){
    yield takeEvery(GET_SALARY_LIST, getSalaryListFn);
}

export function* checkDuplicateSalaryDateSaga(){
    yield takeEvery(CHECK_DUPLICATE_SALARYDATE, checkDuplicateSalaryDateFn);
}

export function* addSalarySaga(){
    yield takeEvery(ADD_SALARY, addSalaryFn);
}

export function* updateSalarySaga(){
    yield takeEvery(UPDATE_SALARY, updateSalaryFn);
}

export function* getSalarySaga(){
    yield takeEvery(GET_SALARY, getSalaryFn);
}

export function* getSalaryBookListSaga(){
    yield takeEvery(GET_SALARY_BOOK_LIST, getSalaryBookListFn);
}

export function* getAnalyzeSalaryBookSaga(){
    yield takeEvery(GET_ANALYZE_SALARY_BOOK_LIST, getAnalyzeSalaryBookFn);
}

export function* deleteVendorSaga(){
    yield takeEvery(DELETE_VENDOR, deleteVendorFn);
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
        fork(updateAccountSaga),
        fork(getStatementListSaga),
        fork(addStatementSaga),
        fork(getStatementSaga),
        fork(updateStatementSaga),
        fork(getSalaryListSaga),
        fork(checkDuplicateSalaryDateSaga),
        fork(addSalarySaga),
        fork(updateSalarySaga),
        fork(getSalarySaga),
        fork(getSalaryBookListSaga),
        fork(getAnalyzeSalaryBookSaga),
        fork(deleteVendorSaga),
    ]);
}