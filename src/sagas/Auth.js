import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SIGNIN_USER,
    SIGNOUT_USER
} from "actionTypes/ActionTypes";
import { showAuthMessage, userSignInSuccess, userSignOutSuccess, convertLoader } from "actions/Auth";

import axios from 'axios';


const signInUserWithEmailPasswordRequest = async (id, pwd) => {
 
    return await  axios({
        method:'POST',
        url:'/login',
        dataType:'json',
        data: {"id":id, "pwd":pwd}
    }).then(authUser => authUser.data)
      .catch(error => error);

    }
    
    

const signOutRequest = async () =>{
    console.log("sagas\Auth.js : signOutRequest() ")
};



function* signInUserWithEmailPassword({payload}) {
    
    const {id, password} = payload;

    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, id, password);

        // if (signInUser === '') {
        //     //yield put(showAuthMessage(signInUser.message));
        //     alert("로그인 실패");
        //     yield put(convertLoader());
        // } else 
        {
            localStorage.setItem('user', signInUser);
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


export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signOutUser)]);
}