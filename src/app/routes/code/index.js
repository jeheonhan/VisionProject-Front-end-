import React from "react";
import ContainerHeader from "components/ContainerHeader";
import CodeManage from 'containers/code/CodeManage'

const Code = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"그룹코드목록"} match={match} description={"코드로 사용되는 정보를 관리할 수 있습니다"}/>
        <CodeManage></CodeManage>
        <div align="right">
        </div>
  
      </div>
    );
  };
  
  export default Code;
  