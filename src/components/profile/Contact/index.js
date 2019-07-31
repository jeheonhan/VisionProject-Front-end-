import React from "react";
import Widget from "components/Widget";
// import {contactList} from 'components/common/data';



const Contact = (props) => {

  const contactList = [
    {
      id: 1,
      title: 'Email',
      icon: 'email',
      desc: [<span className="" key={1}>{props.HRCardDetailData.employeeEmail}</span>]
    },
    {
      id: 2,
      title: 'Phone',
      icon: 'phone',
      desc: [<span>{props.HRCardDetailData.employeePhone}</span>]
    },
  ];

  return (
    <Widget title="Contact" styleName="jr-card-profile-sm">
      {contactList.map((data, index) =>
        <div key={index} className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-${data.icon} jr-fs-xxl text-grey`}/>
          </div>
          <div className="media-body">
            <span className="mb-0 text-black jr-fs-sm">{data.title}</span>
            <p className="mb-0 ">{data.desc}</p>
          <br/>
          </div>
        </div>
      )}
    </Widget>
  )
}

export default Contact;
