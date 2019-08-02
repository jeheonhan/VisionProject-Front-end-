import { GET_BRANCH_LIST, 
        CARRY_BRANCH_LIST, 
        GET_BRANCH_DETAIL, 
        CARRY_BRANCH_DETAIL, 
        ADD_BRANCH,
        GET_LOCAL_LIST,
        CARRY_LOCAL_LIST,
        DELETE_BRANCH,
        UPDATE_BRANCH,
        CLEAN_STORE_STATE} from 'actionTypes/ActionTypes';

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
                branch : action.payload
            }
        }

        case ADD_BRANCH : {
            return {
                ...state
            }
        }

        case GET_LOCAL_LIST : {
            return {
                ...state
            }
        }

        case CARRY_LOCAL_LIST : {
            return {
                ...state,
                localList : action.payload
            }
        }

        case DELETE_BRANCH : {
            return {
                ...state
            }
        }

        case UPDATE_BRANCH : {
            return {
                ...state
            }
        }

        case CLEAN_STORE_STATE : {
            return{
                ...state,
                [action.payload]:null
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}