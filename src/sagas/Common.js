import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import axios from 'axios';
import { SEND_EMAIL } from 'actionTypes/ActionTypes';

const sendEmailRequest = async (_data) => {
    await axios({
        method:"POST",
        url:"/common/sendEmail",
        data:_data
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

function* sendEmailFn({payload}){
    yield call(sendEmailRequest, payload)
}

export function* sendEmailSaga(){
    yield takeEvery(SEND_EMAIL, sendEmailFn)
}

export default function* rootSaga(){
    yield all([
        fork(sendEmailSaga)
    ])
}