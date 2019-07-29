import React from "react";
import ContainerHeader from "components/ContainerHeader";
import NoticeManage from 'containers/notice/NoticeManage';
import AddNotice from "components/notice/AddNotice";

const Notice = ({match}) => {
    return (
  
      <div>
          <ContainerHeader title={"공지사항"} match={match}/>
          <NoticeManage></NoticeManage>
          <div align="right">
            <AddNotice></AddNotice>
          </div>  
      </div>
    );
  };
  
  export default Notice;
  