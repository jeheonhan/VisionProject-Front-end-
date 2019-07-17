import React from "react";
import AppointManage from 'containers/humanResource/AppointManage';
import ContainerHeader from "components/ContainerHeader";
import AddAppoint from 'components/humanResource/AddAppoint';

const Appointment = ({match}) => {
    return (
      <div>
        <ContainerHeader title={"인사발령관리"} match={match}/>
        <AppointManage></AppointManage>
        <div align="right">
         <AddAppoint></AddAppoint>
        </div>
      </div>
      
    );
  };
  
  export default Appointment;
  