import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SIGNIN_USER,
    SIGNOUT_USER,
    FORGOT_USER_ID,
    FORGOT_PASSWORD,
    REQUEST_IDENTIFY_CODE,
    MODIFY_PASSWORD
} from "actionTypes/ActionTypes";
import { showAuthMessage
    , userSignInSuccess
    , userSignOutSuccess
    , convertLoader
    , carryForgotUserId
    , carryPasswordBoolean
    , carryIdentifyCode 
    , carryLoginFlag} from "actions/index";

import axios from 'axios';

const modifyPasswordRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/user/modifyPassword",
        data:_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const requestIdentifyCodeRequest = async (_data) => {
    return await axios({
        method:"POST",
        url:"/user/getIdentifyCode",
        data:_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const forgotPasswordRequest = async (_data) => {
    return await axios({
        method:"POST",
        url:"/user/forgotPassword",
        data:_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const forgotUserIdRequest = async (_data) => {
    return await axios({
        method:"POST",
        url:"/user/forgotId",
        data:_data
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}

const signInUserWithIdPasswordRequest = async (_data) => {
 
    return await  axios({
        method:'POST',
        url:'/user/loginUser',
        //dataType:'json',
        data: _data
    }).then(authUser => authUser.data)
      .catch(error => error);
    }

const signOutRequest = async () =>{
    console.log("sagas\Auth.js : signOutRequest() ")
};

function* modifyPasswordFn({payload}){
    yield call(modifyPasswordRequest, payload);
}

function* requestIdentifyCodeFn({payload}){
    const identyCode = yield call(requestIdentifyCodeRequest, payload);
    yield put(carryIdentifyCode(identyCode));
}

function* forgotPasswordFn({payload}){
    const resultBoolean = yield call(forgotPasswordRequest, payload);
    yield put(carryPasswordBoolean(resultBoolean));
}

function* forgotUserIdFn({payload}){
    const userVO = yield call(forgotUserIdRequest, payload);
    yield put(carryForgotUserId(userVO));
}

function* signInUserWithIdPassword({payload}) {
    
    //const {id, password} = payload;

    try {
        const signInUser = yield call(signInUserWithIdPasswordRequest, payload);
        if(signInUser.loginFlag == false){
            yield put(convertLoader());
            yield put(carryLoginFlag(signInUser));
        }
        else{
            localStorage.setItem('user', JSON.stringify(signInUser));
            yield put(userSignInSuccess(signInUser));
        }
    } catch (error) {
        //yield put(showAuthMessage(error));
            alert("Error");
    }
}

function* signOut() {
        const signOutUser = yield call(signOutRequest);
        localStorage.removeItem('user');
        yield put(userSignOutSuccess(signOutUser));
     
    
}

export function* modifyPasswordSaga(){
    yield takeEvery(MODIFY_PASSWORD, modifyPasswordFn);
}

export function* requestIdentifyCodeSaga(){
    yield takeEvery(REQUEST_IDENTIFY_CODE, requestIdentifyCodeFn);
}

export function* forgotPasswordSaga(){
    yield takeEvery(FORGOT_PASSWORD, forgotPasswordFn);
}

export function* forgotUserIdSaga(){
   yield takeEvery(FORGOT_USER_ID, forgotUserIdFn)
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithIdPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signOutUser),
        fork(forgotUserIdSaga),
        fork(forgotPasswordSaga),
        fork(requestIdentifyCodeSaga),
        fork(modifyPasswordSaga)]);
}