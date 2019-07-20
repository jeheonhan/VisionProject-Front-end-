import { CARRY_APPROVAL_FORM_LIST, GET_APPROVAL_FORM_LIST } from "actionTypes/ActionTypes";


const INIT_STATE = {
};

export default (state = INIT_STATE, action) => {
switch(action.type){
   case GET_APPROVAL_FORM_LIST : {
       return{
           ...state
       }
   }

   case CARRY_APPROVAL_FORM_LIST : {
       return{
           ...state,
           approvalFormList : action.payload
       }
   }

   default : {
       return{
           ...state
       }
   }
}
}