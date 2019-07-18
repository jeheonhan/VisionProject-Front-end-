import { GET_HRCARD_LIST,
         CARRY_HRCARD_LIST, 
         GET_APPOINT_LIST,
         CARRY_APPOINT_LIST,
         CHECKED_EMPLOYEE,
         CHECKED_DEPARTMENT,
         CHECKED_RANK,
         GET_SIMPLE_HRCARD_BY_EMPLOYEENO,
         CARRY_SIMPLE_HRCARD} from "actionTypes/ActionTypes";


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

        case GET_APPOINT_LIST : {
            return{
                ...state
            }
        }

        case CARRY_APPOINT_LIST : {
            return{
                ...state,
                appointList: action.payload
            }
        }

        case CHECKED_EMPLOYEE : {
            return{
                ...state,
                checkedEmployeeData: action.payload
            }
        }

        case CHECKED_DEPARTMENT : {
            return{
                ...state,
                checkedDepartData: action.payload
            }
        }

        case CHECKED_RANK : {
            return{
                ...state,
                checkedRankData: action.payload
            }
        }

        case GET_SIMPLE_HRCARD_BY_EMPLOYEENO : {
            return{
                ...state,
            }
        }

        case CARRY_SIMPLE_HRCARD : {
            return{
                ...state,
                simpleHRCardDetail: action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}