import { GET_BRANCH_LIST, CARRY_BRANCH_lIST } from 'actionTypes/ActionTypes';

const INIT_STATE = 
    {
        employeeNo: "",
        employeeName: "",
        departCodeNo: "",
        departCodeName: "",
        rankCodeNo: "",
        rankCodeName: "",
        employeePhone: "",
        profileImage: null,
        signatureImage: null,
        wage: "",
        joinDate: "",
        employeeEmail: ""
    };

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_BRANCH_LIST : {
            return {
                ...state
            }
        }

        case CARRY_BRANCH_lIST : {
            return{
                ...state,
                branchList: action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}