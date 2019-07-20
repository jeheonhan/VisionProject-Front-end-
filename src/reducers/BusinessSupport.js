import { GET_BRANCH_LIST, 
        CARRY_BRANCH_LIST, 
        GET_BRANCH_DETAIL, 
        CARRY_BRANCH_DETAIL } from 'actionTypes/ActionTypes';

const INIT_STATE = 
    {
        branchNo: "",
        branchName: "",
        zipCode: "",
        address: "",
        detailAdress: "",
        businessLicenseNo: "",
        branchTel: "",
        branchManagerPhone: "",
        branchManagerName: "",
        localCodeNo: "",
        localCodeName: "",
        branchStatusCodeNo: "",
        branchRegDate: ""
    };

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_BRANCH_LIST : {
            return {
                ...state
            }
        }

        case CARRY_BRANCH_LIST : {
            return{
                ...state,
                branchList: action.payload
            }
        }

        case GET_BRANCH_DETAIL : {
            return{
                ...state
            }
        }

        case CARRY_BRANCH_DETAIL : {
            return{
                ...state,
                Branch : action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}