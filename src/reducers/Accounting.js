import {GET_VENDOR_LIST, CARRY_VENDOR_LIST, ADD_VENDOR} from'../actionTypes/ActionTypes';

const INIT_STATE = {
    loader: false,
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_VENDOR_LIST : {
            return{
                ...state
            }
        }

        case CARRY_VENDOR_LIST : {
            return{
                ...state,
                VendorList: action.payload
            }
        }

        case ADD_VENDOR : {
            return{
                ...state
            }
        }

        default : {
            return{
                state
            }
        }
    }
}