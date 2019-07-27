import React from 'react';

const SalaryBookManage = ({styleName, salaryBook}) => {

  const {salaryDate, salaryBookName, totalSalary} = salaryBook;
  return (
    <div className={`timeline-item ${styleName}`}>
      <div className="timeline-badge timeline-img">
        {styleName.includes("timeline-inverted") ?
          <img className="size-60" src={require("assets/images/pentagon.png")} alt="Pentagon" title="Pentagon"/> :
          <img className="size-60" src={require("assets/images/pentagon.png")} alt="Pentagon" title="Pentagon"/>}
      </div>

      <div className="timeline-panel ">
        <div className="timeline-panel-scroll">
          <div className="timeline-panel-header">

            <div className="timeline-header-img timeline-left">
              <img className="size-60 rounded-circle" src={require("assets/images/favicon-32x32.png")} alt="Pentagon" title="Pentagon"/>
            </div>
            <div className="timeline-heading">
              <h5>{salaryDate}</h5>
              <h3 className="timeline-title">{salaryBookName}</h3>
            </div>
          </div>
          <div className="timeline-body">
            <p className="card-text">{totalSalary} </p>
            <p className="card-text">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            <p className="card-text">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            <p className="card-text">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SalaryBookManage;