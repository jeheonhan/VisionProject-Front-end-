import React from "react";
import ContainerHeader from "components/ContainerHeader";
import BranchManage from 'containers/businessSupport/BranchManage';

const Branch = ({match}) => {
    return (
  
      <div>
          <ContainerHeader title={"지점관리"} match={match}/>  
          <BranchManage></BranchManage>
      </div>
    );
  };
  
  export default Branch;
  