import React from "react";
import Widget from "../../Widget/index";

function Status(props) {
  const isType = props.isType;
  if (isType === 'online') {
    return <span className="badge-status-dot bg-success"/>;
  } else if (isType === 'away') {
    return <span className="badge-status-dot bg-warning"/>;
  } else {
    return <span className="badge-status-dot bg-red"/>;
  }
}

const Signature = ({ signatureImage}) => {
  return (
    <Widget styleName="jr-card-profile-sm"
            title={<span>서명/도장<span className="text-grey">(Signature)</span></span>}>
      <div className="pt-2">
        <ul className="jr-fnd-list mb-0">
          <li className="mb-2" >
              <div className="jr-user-fnd">
                <img alt="..." src={`/img/${signatureImage}`}/>
                <div className="jr-user-fnd-content">
                  <span className="jr-badge"><Status isType="online"/></span>
                  <h6></h6>
                </div>
              </div>
            </li>
        </ul>
      </div>
    </Widget>
  )
};
export default Signature;
