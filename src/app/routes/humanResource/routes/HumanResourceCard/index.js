import React from "react";
import HRCardManage from 'containers/humanResource/HRCardManage';
import ContainerHeader from "components/ContainerHeader";
import { Button } from "@material-ui/core";
import AddHRCard from 'components/humanResource/AddHRCard';


const HumanResourceCard = ({match}) => {
  
    return (
      <div>
        <ContainerHeader title={"인사관리"} match={match}/>
        <HRCardManage></HRCardManage>
        <div align="right">
          <AddHRCard></AddHRCard>
        </div>
      </div>
    );
  };
 
export default HumanResourceCard;