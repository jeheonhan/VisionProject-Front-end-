import React from "react";
import ContainerHeader from "components/ContainerHeader";
import NoticeManage from 'containers/notice/NoticeManage';

const Notice = ({match}) => {
    return (
  
      <div>
        <ContainerHeader title={"공지사항"} match={match}/>  
        <NoticeManage></NoticeManage>

  
      </div>
    );
  };
  
  export default Notice;
  