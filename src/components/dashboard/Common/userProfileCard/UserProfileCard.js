import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

// const UserProfileCard = ({headerStyle}, props) => {
//   return (
//     <div className="jr-card text-center">
//       <div className={`jr-card-header-color ${headerStyle}`}>
//         <div className="jr-card-header-top">
//           <IconButton className="jr-fs-lg text-white" aria-label="Menu"><i className="zmdi zmdi-menu"/></IconButton>
//           <IconButton className="icon-btn p-1 text-white ml-auto"><i className="zmdi zmdi-more-vert"/></IconButton>
//         </div>

//         <img className="rounded-circle size-90 avatar-shadow mb-3"
//              src="https://via.placeholder.com/150x150" alt="Team Member"/>

//         <div className="jr-card-hd-content">
//           <h5 className="mb-0 text-white">{props.simpleHRCardDetail.employeeName}</h5>
//           <p className="jr-fs-sm mb-0 text-grey text-lighten-2">Graphic Designer</p>
//         </div>
//         <Fab className="jr-badge-up bg-success"><i className="zmdi zmdi-mail-send"/></Fab>
//       </div>
//       <div className="jr-card-body pt-2">
//         <p className="card-text">Cenas in erat accumsan, hendrerit lorem vel, pulvinar odio. Quisque eu conva.</p>
//       </div>
//     </div>
//   )
// };

// export default UserProfileCard;

export default function UserProfileCard(props){


  return(
    <div className="jr-card text-center">
      <div className={`jr-card-header-color bg-secondary`}>
        <div className="jr-card-header-top">
          <IconButton className="jr-fs-lg text-white" aria-label="Menu"><i className="zmdi zmdi-menu"/></IconButton>
          <IconButton className="icon-btn p-1 text-white ml-auto"><i className="zmdi zmdi-more-vert"/></IconButton>
        </div>

        <img className="rounded-circle size-90 avatar-shadow mb-3"
             src={`/img/${props.simpleHRCardDetail.profileImage}`} alt="Team Member"/>

        <div className="jr-card-hd-content">
          <h5 className="mb-0 text-white">{props.simpleHRCardDetail.employeeName}</h5><br/>
          <p className="jr-fs-sm mb-0 text-grey text-lighten-2">{props.simpleHRCardDetail.departCodeName}</p>
        </div>
        <Fab className="jr-badge-up bg-success"><i className="zmdi zmdi-mail-send"/></Fab>
      </div>
      <div className="jr-card-body pt-2">
        <p className="card-text" align="left">직급     :   {props.simpleHRCardDetail.rankCodeName}</p>
        <p className="card-text" align="left">입사일     :   {props.simpleHRCardDetail.joinDate}</p>
        <p className="card-text" align="left">휴대폰번호  :   {props.simpleHRCardDetail.employeePhone}</p>
        <p className="card-text" align="left">이메일  :   {props.simpleHRCardDetail.employeeEmail}</p>
      </div>
    </div>
  );
}

