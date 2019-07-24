import React from "react";
import DepartManage from 'containers/humanResource/DepartManage';
import ContainerHeader from "components/ContainerHeader";

const Department = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"부서관리"} match={match}/>
        <DepartManage/>
      </div>
    );
  };
  
  export default Department;
  