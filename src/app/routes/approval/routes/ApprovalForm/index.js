import React from "react";
import ContainerHeader from "components/ContainerHeader";
import ApprovalFormList from 'containers/approval/ApprovalFormList'

const ApprovalForm = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"결재양식 목록조회"} match={match} description={"결재양식을 조회할 수 있습니다."}/>
               <ApprovalFormList></ApprovalFormList>
       </div> 
    );
  };
  
  export default ApprovalForm;
  