import React from "react";
import ContainerHeader from "components/ContainerHeader";
import NoticeManage from 'containers/notice/NoticeManage';
import AddNotice from "components/notice/AddNotice";

const Notice = ({match}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
  
      <div class="app-wrapper">
          <ContainerHeader title={"공지사항"} match={match}/>
          <NoticeManage></NoticeManage>
          {/* 지점이 로그인시 보여주지 않을 것 */}
          {user.employeeNo != null ? (
            <div align="right">
             <AddNotice></AddNotice>
            </div>
          )
          :(
            null
          )}
          
      </div>
    );
  };
  
  export default Notice;
  