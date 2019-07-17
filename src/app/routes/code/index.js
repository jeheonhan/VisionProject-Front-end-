import React from "react";
import ContainerHeader from "components/ContainerHeader";
import CodeManage from 'containers/code/CodeManage'

const Code = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"그룹코드목록"} match={match}/>
        <CodeManage></CodeManage>
        <div align="right">
        </div>
  
      </div>
    );
  };
  
  export default Code;
  