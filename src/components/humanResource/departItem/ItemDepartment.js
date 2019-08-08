import React from 'react';
import IconButton from '@material-ui/core/IconButton';

export default function ItemDepartment(props){

  const {styleName, headerStyle, itemStyle, footerStyle, values} = props;

  const handleConvertUsage = () => {
    props.handleDepartUsageStatus(values);
  }

  const handleConfirmDepartmentDelete = () => {

  }

  return(
    <div className={`${styleName}`}  style={{maxHeight:"480px", minHeight:"480px"}}>
      {/* <div className="jr-card-header-top">
          <IconButton className="icon-btn p-1 text-white ml-auto">
            <i className="zmdi zmdi-close" onClick={props.handleSimpleHRCardClose}/>
          </IconButton>
        </div> */}
        <div className={values.departUsageStatusCodeNo == '01' ? `${headerStyle}`:"package-header bg-grey lighten-1 text-white"}
          style={{paddingTop:"10px"}}>
        <div className="jr-card-header-top">
          <IconButton className="icon-btn p-1 text-white ml-auto">
            <i className="zmdi zmdi-close" onClick={event => {event.preventDefault(); props.handleDeleteDepartmentOpen(values)}}/>
          </IconButton>
        </div>
          <span className="price">{values.departCodeName}</span>
          <h4 className="letter-spacing-base text-uppercase mb-0">department</h4>
        </div>

        <ul className={`package-items ${itemStyle}`}>
          <li>
            <i className="zmdi zmdi-alert-octagon zmdi-hc-fw"/>
            <span>접근가능메뉴 : {values.accessMenuCodeName}</span>
          </li>
          <li>
            <i className="zmdi zmdi-assignment-account zmdi-hc-fw"/>
            <span>직원 수 : {values.countEmployee} 명</span>
          </li>
          <li>
            <i className="zmdi zmdi-font zmdi-hc-fw"/>
            <span>사용상태 : {values.departUsageStatusCodeName}</span>
          </li>
          <li>
            <i className="zmdi zmdi-mail-send zmdi-hc-fw"/>
            <span>업무소개 : {values.departInfo}</span>
          </li>        
        </ul>

        <div className="package-footer">
          {/* <span className={`jr-link ${footerStyle}`} onClick={handleConvertUsage}>상태 변경</span> */}
          <span className={values.departUsageStatusCodeNo == '01' ? `jr-link 
              ${footerStyle}`:"btn btn-default bg-grey lighten-1 text-white"} onClick={handleConvertUsage}>상태 변경</span>
              {/* <span className={values.departUsageStatusCodeNo == '01' ? `jr-link 
                ${footerStyle}`:"btn btn-default bg-grey lighten-1 text-white"} 
                onClick={event => {event.preventDefault(); props.handleDeleteDepartmentOpen(values)}}>영구 삭제</span> */}
        </div>
      </div>
  );
}

