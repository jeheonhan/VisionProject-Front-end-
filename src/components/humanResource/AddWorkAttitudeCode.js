import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee
        , checkedDepartment
        , checkedRank
        , getCodeList
        , addAppointment
        , checkedWorkAttitudeCode
        , addWorkAttitude } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FindWorkAttitudeCode from 'components/humanResource/FindWorkAttitudeCode';
import FindEmployee from 'components/humanResource/FindEmployee';
import DatePicker from '../date/DatePickers';


class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false,
    workAttitudeCodeOpen: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  //자식 컴포넌트 열기
  handleSubComponentOpen = () => {
    this.setState({subOpen: true})
  }

  //자식 컴포넌트 닫기
  handleSubComponentClose = () => {
      this.setState({subOpen: false})
  }

  //근태코드 검색 열기
  handleSubWorkAttitudeCodeOpen = () => {
    this.setState({workAttitudeCodeOpen:true})
  }

  //근태코드 검색 닫기
  handleSubWorkAttitudeCodeClose = () => {
    this.setState({workAttitudeCodeOpen:false})
  }

  handleChange = name => event => {
      this.setState({[name]:event.target.value})
      console.log(this.state)
  }

  //Date Picker로부터 date정보 받는 call back function
  callBackDateChange = (date) => {
    this.setState({workAttitudeDate:date})
  }

 
  render() {

    const { checkedEmployeeData, checkedWorkAttitudeCodeData } = this.props;

    console.log("checkedWorkAttitudeCode :: "+ checkedWorkAttitudeCodeData)
    const handleSubmit = () => {
      if(this.state.workAttitudeDate === undefined){
        alert("당일 날짜로는 발령일자를 설정할 수 없습니다.")
      }
      else if(checkedEmployeeData.employeeNo === undefined){
        alert("사원번호를 입력하세요.")
      }
      else if(checkedWorkAttitudeCodeData.workAttitudeCodeNo === undefined){
        alert("근태코드를 입력하세요.")
      }
      else{
        console.log("result :: " + this.state.workAttitudeDate+ " "+checkedEmployeeData.employeeNo+
        " "+checkedWorkAttitudeCodeData.workAttitudeCodeNo+" "+this.state.workAttitudeTime)
        this.props.addWorkAttitude({workAttitudeDate:this.state.workAttitudeDate, 
                                   employeeNo:checkedEmployeeData.employeeNo,
                                   workAttitudeCodeNo:checkedWorkAttitudeCodeData.workAttitudeCodeNo,
                                   workAttitudeTime:this.state.workAttitudeTime})
        this.handleRequestClose();
      }
    }
  
    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xl">
          <DialogTitle>근태 등록</DialogTitle>
          <DialogContent >
            <DialogContentText>
              사원번호 혹은 사원명을 선택한 이후에 발령일자, 발령부서, 발령직급을 선택하시기 바랍니다.
            </DialogContentText>
            
            <div style={{float:"left"}}>
            <DatePicker callBackDateChange={this.callBackDateChange}></DatePicker>
            </div>

            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="none"
              id="employeeNo"
              label="사원번호"
            //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
              onClick={this.handleSubComponentOpen}
              value={checkedEmployeeData && checkedEmployeeData.employeeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="none"
              id="employeeName"
              label="사원명"
              onClick={this.handleSubComponentOpen}
              value={checkedEmployeeData && checkedEmployeeData.employeeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="appointDepartCodeName"
              label="근태코드"
              onClick={this.handleSubWorkAttitudeCodeOpen}
              value={checkedWorkAttitudeCodeData && checkedWorkAttitudeCodeData.workAttitudeCodeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="preRankCodeName"
              label="근태명칭"
              value={checkedWorkAttitudeCodeData && checkedWorkAttitudeCodeData.workAttitudeCodeName}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="workAttitudeTime"
              label="시간(분)"
              onChange={this.handleChange('workAttitudeTime')}
              value={this.state.workAttitudeTime && this.state.workAttitudeTime}
            />
            </div>
            {/* <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="reference"
              label="참고"
            />
            </div> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="secondary">
              확인
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>

        {/* 자식 컴포넌트 open 값이 true면 열림 이때 자기 자신을 닫게 해줄 eventHandler도 props로 전달 */}
        <FindEmployee open={this.state.subOpen} 
                    handleSubComponentClose={this.handleSubComponentClose}
                    checkedEmployee={this.props.checkedEmployee}
        />
        {/* <FindDepart open={this.state.departOpen}
                    handleSubDepartComponentClose={this.handleSubDepartComponentClose}
                    checkedDepartment={this.props.checkedDepartment}
                    /> */}
      
        <FindWorkAttitudeCode open={this.state.workAttitudeCodeOpen} 
                              handleSubWorkAttitudeCodeClose={this.handleSubWorkAttitudeCodeClose}
                              checkedWorkAttitudeCode={this.props.checkedWorkAttitudeCode}/>

      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
    const { checkedEmployeeData, checkedWorkAttitudeCodeData } = humanResource;
    return { checkedEmployeeData, checkedWorkAttitudeCodeData };
}

export default connect(mapStateToProps, { checkedEmployee, checkedDepartment
                                          , checkedRank, addAppointment, checkedWorkAttitudeCode
                                          , addWorkAttitude })(FormDialog);
