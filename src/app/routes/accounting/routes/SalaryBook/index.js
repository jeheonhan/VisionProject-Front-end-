import React from "react";
import { connect } from 'react-redux';
import { getSalaryBookList } from 'actions/index';
import ContainerHeader from "components/ContainerHeader";
import SalaryBookManage from "containers/accounting/SalaryBookManage";
import $ from "jquery";

class SalaryBook extends React.Component{

  constructor(props){
    super(props);
    this.element = React.createRef();
  }

  componentDidMount(){
    
    console.log(this.element)
    console.log($("#salaryBookId"))
    console.log($("#salaryBookId").prop('scrollHeight'));
    console.log(this.element.current.parentElement.clientHeight)

  }

  
  render() {

    console.log(this.element)
    console.log($("#salaryBookId"))

    
    const {salaryBookList, getSalaryBookList, match} = this.props;
    

    if(salaryBookList === undefined) {
      getSalaryBookList({searchKeyword : ''})
    }
    
    
    return (
      
      <div id="salaryBookId" ref={ this.element }>
        {/* match는 뭐지? App > Accounting > Salary*/}
        <ContainerHeader title={"회계관리"} match={match}/>
        <div className="timeline-section timeline-center timeline-zigzag clearfix animated slideInUpTiny animation-duration-3">
          {salaryBookList && salaryBookList.map((salaryBook, index) => <SalaryBookManage 
                                                                  key={index}
                                                                  styleName={index % 2 === 0 ? '' : 'timeline-inverted'}
                                                                  salaryBook={salaryBook}
                                                                  />)}
        </div>
      </div>
    );
  }//end of render

}//end of class

const mapStateToProps = ({ accounting }) => {
  const { salaryBookList } = accounting;

  return { salaryBookList };
}

export default connect(mapStateToProps, { getSalaryBookList })(SalaryBook);
  