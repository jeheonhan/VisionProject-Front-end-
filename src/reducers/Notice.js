import { GET_NOTICE_LIST, 
        CARRY_NOTICE_LIST, 
        GET_NOTICE_DETAIL, 
        CARRY_NOTICE_DETAIL, 
        ADD_NOTICE,
        GET_NOTICE_HEADER_LIST,
        CARRY_NOTICE_HEADER_LIST} from 'actionTypes/ActionTypes';

const INIT_STATE = 
    {
        noticeNo: "",
        noticeRegDate: "",
        noticeTitle: "",
        employeeNo: "",
        employeeName: "",
        readAuthority: "",
        viewCount: "",
        noticeStatusCodeNo: "",
        noticeStatusCodeName: ""
    };

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_NOTICE_LIST : {
            return {
                ...state
            }
        }

        case CARRY_NOTICE_LIST : {
            console.log(action.payload)
            return{
                ...state,
                noticeList: action.payload
            }
        }

        case GET_NOTICE_DETAIL : {
            return{
                ...state
            }
        }

        case CARRY_NOTICE_DETAIL : {
            return{
                ...state,
                noticeDetail: action.payload
            }
        }

        case ADD_NOTICE : {
            return {
                ...state
            }
        }

        case GET_NOTICE_HEADER_LIST : {
            return {
                ...state
            }
        }

        case CARRY_NOTICE_HEADER_LIST : {
            return {
                ...state,
                noticeHeaderList : action.payload

            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}