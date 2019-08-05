import React from "react";
import Avatar from '@material-ui/core/Avatar';

const ProfileHeader = (props) => {

  const { HRCardDetailData, branch } = props;

  if(HRCardDetailData != null){
    return (
      <div className="jr-profile-banner">
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                <Avatar className="size-90" alt="..." src={HRCardDetailData && HRCardDetailData.profileImage ? `/img/${HRCardDetailData.profileImage}`
                :require("assets/images/placeholder.jpg")}/>
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{HRCardDetailData.employeeName}</h2>
                <p className="mb-0 jr-fs-lg">{HRCardDetailData.departCodeName}, {HRCardDetailData.rankCodeName}</p>
              </div>
            </div>
            <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{HRCardDetailData.joinDate}</span>
                  <span className="jr-fs-sm">입사일자</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{HRCardDetailData.employeeNo}</span>
                  <span className="jr-fs-sm">사원번호</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{HRCardDetailData.rankCodeName}</span>
                  <span className="jr-fs-sm">직급</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }else if(branch != null){
    return (
      <div className="jr-profile-banner">
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                <Avatar className="size-90" alt="..." >{branch.branchNo && branch.branchName.charAt(0)}</Avatar>
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{branch.branchName}</h2>
                <p className="mb-0 jr-fs-lg">지점장 : {branch.branchManagerName}</p>
              </div>
            </div>
            <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{branch.branchRegDate}</span>
                  <span className="jr-fs-sm">지점등록일</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{branch.branchNo}</span>
                  <span className="jr-fs-sm">지점번호</span>
                </li>
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{branch.branchStatus}</span>
                  <span className="jr-fs-sm">영업상태</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default ProfileHeader;

