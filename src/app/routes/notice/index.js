import React from "react";
import ContainerHeader from "components/ContainerHeader";
import NoticeManage from 'containers/notice/NoticeManage';
import AddNotice from "components/notice/AddNotice";

const Notice = ({match}) => {
    return (
  
      <div class="app-wrapper">
          <ContainerHeader title={"공지사항"} match={match}/>
          <NoticeManage></NoticeManage>
          {/* 지점이 로그인시 보여주지 않을 것 */}
          <div align="right">
          <AddNotice></AddNotice>
          </div>
      </div>
    );
  };
  
  export default Notice;
  