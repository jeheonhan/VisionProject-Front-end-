import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';


export default function UserProfileCard(props){



  return(
    <div className="text-center" 
        style={{padding : "25px", maxWidth:"280px", minWidth:"280px"
                                , maxHeight:"450px", minHeight:"450px"
                                , overflowX:"hidden"}}>
      <div className={`jr-card-header-color bg-secondary`}>
        <div className="jr-card-header-top">
          <IconButton className="icon-btn p-1 text-white ml-auto">
            <i className="zmdi zmdi-close" onClick={props.handleSimpleHRCardClose}/>
          </IconButton>
        </div>

        <img className="rounded-circle size-90 avatar-shadow mb-3"
             src={props.simpleHRCardDetail.profileImage ? `http://localhost:8080/img/${props.simpleHRCardDetail.profileImage}`
              :require("assets/images/placeholder.jpg")} alt="Team Member" />
        

        <div className="hd-content" >
          <h5 className="mb-0 text-white">{props.simpleHRCardDetail.employeeName}</h5><br/>
          <p className="jr-fs-sm mb-0 text-grey text-lighten-2">{props.simpleHRCardDetail.departCodeName}</p>
        </div>
        <Fab className="jr-badge-up bg-success" onClick={props.handleOpenMailComponent}><i className="zmdi zmdi-mail-send"/></Fab>
      </div>
      <div className="jr-card-body pt-2" >
        <p className="card-text" align="left">직급     :   {props.simpleHRCardDetail.rankCodeName}</p>
        <p className="card-text" align="left">입사일     :   {props.simpleHRCardDetail.joinDate}</p>
        <p className="card-text" align="left">휴대폰번호  :   {props.simpleHRCardDetail.employeePhone}</p>
        <p className="card-text" align="left">이메일  :   {props.simpleHRCardDetail.employeeEmail}</p>
      </div>
    </div>
      
  );
}

