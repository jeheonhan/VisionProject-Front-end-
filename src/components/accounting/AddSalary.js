import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {Card, CardBody, CardHeader, CardSubtitle, CardText} from 'reactstrap';
import { connect } from 'react-redux';
import { checkDuplicateSalaryDate, addSalary } from 'actions/index';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';  
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContent from '@material-ui/core/DialogContent';
import axios from 'axios';

//급여날짜 정규식
class SalaryDateMask extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
      />
    );
  }
}

class AddSalary extends Component {
  state = {
    open : false,
    success : false,
    warning : false,
    salaryDate: '',
    duplicateContext: ''
  };

  //급여등록 다이얼로그 끄기
  handleRequestClose = () => {
    this.setState({open : false, salaryDate:''});
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
    this.handleRequestClose();
  }

  //등록실패알람 켜기
  openWarningAlarm = (message) => {
    this.setState({
      warning : true, duplicateContext : message
    })
  }

  //등록실패알람 끄기
  closeWarningAlarm = () => {
    this.setState({
      warning : false
    })
  }

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value })
  }

  //급여등록
  submitAddSalary = (event) => {
    
    event.preventDefault();

    //급여 중복체크
    var values = async () => await axios({
      method:"GET",
      url:"http://localhost:8080/accounting/checkDuplicateSalaryDate/"+this.state.salaryDate,
    })
    .then(response => { 
      if(response.data){ 
        if( moment().format('YYYYMM') > this.state.salaryDate ){
          this.props.addSalary(this.state.salaryDate);
          this.openSuccessAlarm();
        } else {
          this.openWarningAlarm('아직 등록되지 않은 급여입니다');
        }
      }else{
        this.openWarningAlarm('이미 등록된 급여입니다');
      }
    })
    .catch(response => console.log(response));
    
    values();
  }

  render() {

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={() => this.setState({open: true})}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="lg">
          <DialogContent style={{ padding:'0px'}}>
                <CardHeader className="bg-secondary text-white">급여등록</CardHeader>
                    <CardBody>
                        <h2 className="card-title">급여등록을 원하시는 연월을 입력해주세요</h2>
                          <span style={{display:"block"}}>

                            <FormControl className="mb-3" fullWidth margin='normal'>
                              <InputLabel htmlFor="addSalary">급여등록</InputLabel>
                                <Input
                                  id="salaryDate"
                                  value={ this.state && this.state.salaryDate }
                                  inputComponent={ SalaryDateMask }
                                  className="w-100 mb-3"
                                  inputProps={{
                                  'aria-label': 'Description',
                                  }}
                                  onChange={this.handleChange('salaryDate')}
                                  placeholder="예시: 201901"
                                />
                              <FormHelperText style={{margin:'0px'}}>2019년 1월 급여의 경우 201901을 입력해주세요</FormHelperText>
                            </FormControl>
                          </span>
                        
                    </CardBody>
                        <div align="center" style={{paddingBottom:"30px"}}>
                            <Button onClick={ event => this.submitAddSalary(event)} className="btn btn-sm" color="primary">등록하기</Button>
                        </div>
          </DialogContent>
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
          onConfirm={this.closeWarningAlarm}>
          {this.state.duplicateContext}
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