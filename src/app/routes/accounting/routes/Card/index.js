import React from "react";
import ContainerHeader from "components/ContainerHeader";

const Card = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"회계관리"} match={match}/>
  
      </div>
    );
  };
  
  export default Card;
  