import { GET_NOTICE_LIST, CARRY_NOTICE_LIST } from 'actionTypes/ActionTypes';

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
            return{
                ...state,
                noticeList: action.payload
            }
        }

        default : {
            return{
                ...state
            }
        }
    }
}