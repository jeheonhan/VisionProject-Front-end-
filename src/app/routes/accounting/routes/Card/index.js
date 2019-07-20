import React from "react";
import ContainerHeader from "components/ContainerHeader";
import CardManage from "containers/accounting/CardManage";
import AddCard from "components/accounting/AddCard";

const Card = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
        <CardManage></CardManage>
        <div align="right">
          <AddCard></AddCard>
        </div>
      </div>
    );
  };
  
  export default Card;
  