import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {Card, CardBody, CardHeader, CardSubtitle, CardText} from 'reactstrap';
import { connect } from 'react-redux';
import { checkDuplicateSalaryDate, addSalary } from 'actions/index';

import moment from 'moment';
import MonthPickers from 'components/accounting/MonthPickers';

import SweetAlert from 'react-bootstrap-sweetalert';

class AddSalary extends Component {
  state = {
    open : false,
    success : false,
    warning : false,
  };

  //급여등록 다이얼로그 끄기
  handleRequestClose = () => {
    this.setState({open : false});
  };

  //등록성공알람 켜기
  openSuccessAlarm = () => {
    this.setState({
      success : true
    })
  }

  //등록성공알람 끄기
  closeSuccessAlarm = () => {
    this.setState({
      success : false
    })
  }

  //등록실패알람 켜기
  openWarningAlarm = () => {
    this.setState({
      warning : true
    })
  }

  //등록실패알람 끄기
  closeWarningAlarm = () => {
    this.setState({
      warning : false
    })
  }


  //급여날짜 입력값을 받아오는 메소드
  callBackDateChange = (getSalaryDate) => {
    var findText = getSalaryDate.indexOf("/");
    var pureSalaryDate = getSalaryDate.substring(0,findText) + getSalaryDate.substring(findText+1, getSalaryDate.length);
    this.props.checkDuplicateSalaryDate(pureSalaryDate);
    this.setState({ 
      salaryDate : pureSalaryDate,        
    });
  }

  submitAddSalary = (event) => {
    event.preventDefault();
    
    //급여등록은 1일부터 7일까지 가능하며, 등록하고자 하는 연월이 오늘 연월보다 작아야하고
    if( moment().format('YYYYMM') > this.state.salaryDate ){
      //이미 등록되어있지 않아야한다
      alert(this.props.salaryDateResult)
      if(this.props.salaryDateResult){
        this.props.addSalary(this.state.salaryDate);
        this.openSuccessAlarm();
        this.handleRequestClose();
      }else{
        this.openWarningAlarm();
      }
    } else {
      this.openWarningAlarm();
    }
  }

  render() {

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={() => this.setState({open: true})}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
            <Card className="shadow border-0">
                <CardHeader className="bg-secondary text-white">급여등록</CardHeader>
                    <CardBody>
                        <h3 className="card-title">급여등록을 원하시는 연월을 선택해주세요</h3>
                        
                            {/* div태그는 세로로 span 태그는 가로로 사용하자 */}
                            <div style={{display:"block"}}>
                                    <MonthPickers
                                        callBackDateChange={this.callBackDateChange}
                                    />
                            </div>
                            <div style={{paddingTop:"10px"}}>
                                일자의 경우 입력되지 않으나 1일로 선택해주세요
                            </div>
                        <div align="center" style={{paddingTop:"30px"}}>
                            <Button onClick={ event => this.submitAddSalary(event)} className="btn btn-sm" color="primary">등록하기</Button>
                        </div>
                    </CardBody>
            </Card>
        </Dialog>

        <SweetAlert 
          show={this.state.success} 
          success 
          title="등록완료"
          onConfirm={this.closeSuccessAlarm}
          confirmBtnText="확인"
          confirmBtnBsStyle="danger"
          >
          등록에 성공했습니다
        </SweetAlert>

        <SweetAlert 
          show={this.state.warning}
          warning 
          confirmBtnText="닫기"
          confirmBtnBsStyle="danger"
          title="유효하지 않은 급여월입니다"          
          onConfirm={this.closeWarningAlarm}
        >
          급여월을 다시 확인해주세요
        </SweetAlert>
        
      </div>


    );
    
  }
}

  const mapStateToProps = ({ accounting }) => {
    const { salaryDateResult } = accounting;

    return { salaryDateResult };
  }

export default connect(mapStateToProps, { checkDuplicateSalaryDate, addSalary })(AddSalary);