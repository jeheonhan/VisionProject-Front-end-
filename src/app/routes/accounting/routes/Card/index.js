import React from "react";
import ContainerHeader from "components/ContainerHeader";
import CardManage from "containers/accounting/CardManage";


const Card = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <CardManage></CardManage>
      </div>
    );
  };
  
  export default Card;
  