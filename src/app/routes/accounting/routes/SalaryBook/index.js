import React from "react";
import { connect } from 'react-redux';
import { getSalaryBookList } from 'actions/index';
import ContainerHeader from "components/ContainerHeader";
import SalaryBookManage from "containers/accounting/SalaryBookManage";


const SalaryBook = ({salaryBookList, getSalaryBookList, match}) => {
  
  if(salaryBookList === undefined) {
    getSalaryBookList({searchKeyword : ''})
  }
    
    console.log(match)

    return (
    
      <div>
        {/* match는 뭐지? App > Accounting > Salary*/}
        <ContainerHeader title={"회계관리"} match={match}/>
        <div className="timeline-section timeline-center timeline-zigzag clearfix animated slideInUpTiny animation-duration-3">
          {salaryBookList && salaryBookList.map((salaryBook, index) => <SalaryBookManage 
                                                                  key={index}
                                                                  styleName={index % 2 === 0 ? '' : 'timeline-inverted'}
                                                                  salaryBook={salaryBook}/>)}
        </div>
      </div>
    );
};

const mapStateToProps = ({ accounting }) => {
  const { salaryBookList } = accounting;

  return { salaryBookList };
}

export default connect(mapStateToProps, { getSalaryBookList })(SalaryBook);
  