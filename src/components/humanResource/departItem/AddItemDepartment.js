import React from 'react';
import IntlMessages from 'util/IntlMessages';


export default function AddItemDepartment(props){

  const {styleName, headerStyle, itemStyle, footerStyle, values} = props;

  return(
    <div className={`${styleName}`}>
        <div className={`${headerStyle}`}>
          <span className="price">{"신규 부서 등록"}</span>
          <h4 className="letter-spacing-base text-uppercase mb-0">{<IntlMessages
            id="department"/>}</h4>
        </div>
        
        <br/><br/><br/><br/>
        <ul className={`package-items ${itemStyle}`} align="center">
        <i class="zmdi zmdi-plus-circle zmdi-hc-5x text-red" 
            style={{cursor:"pointer"}} 
            onClick={props.handleAddDepartOpen}></i>  
        </ul>
      </div>
  );
}

