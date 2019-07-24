import React from "react";
import ContainerHeader from "components/ContainerHeader";
import WorkAttitudeCodeManage from 'containers/humanResource/WorkAttitudeCodeManage';
import AddWorkAttitudeCode from 'components/humanResource/AddWorkAttitudeCode';

const WorkAttitudeCode = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"근태코드 관리"} match={match}/>
        <WorkAttitudeCodeManage></WorkAttitudeCodeManage>
        <div align="right">
          <AddWorkAttitudeCode></AddWorkAttitudeCode>
        </div>
      </div>
    );
  };
  
  export default WorkAttitudeCode;
  