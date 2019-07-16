import { GET_HRCARD_LIST,
         CARRY_HRCARD_LIST } from "actionTypes/ActionTypes";


const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('user_id'),
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_HRCARD_LIST : {
            return{
                ...state
            }
        }

        case CARRY_HRCARD_LIST : {
            return{
                ...state,
                HRCardList: action.payload
            }
        }

        default : {
            return{
                state
            }
        }
    }
}