import React from "react";
import WorkAttitudeManage from 'containers/humanResource/WorkAttitudeManage';
import ContainerHeader from "components/ContainerHeader";
import AddWorkAttitude from 'components/humanResource/AddWorkAttitude';

const WorkAttitude = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"근태관리"} match={match}/>
        <WorkAttitudeManage/>
        <div align="right">
         <AddWorkAttitude></AddWorkAttitude>
        </div>
      </div>
    );
  };
  
  export default WorkAttitude;
  