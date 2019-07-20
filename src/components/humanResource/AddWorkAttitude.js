import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, checkedDepartment, checkedRank, getCodeList, addAppointment } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FindEmployee from './FindEmployee';
import FindDepart from './FindDepart';
import FindRank from './FindRank';
import DatePicker from '../date/DatePickers';


class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false,
    departOpen: false,
    rankOpen: false
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

  //부서검색 컴포넌트 열기
  handleSubDepartComponentOpen = () => {
    this.setState({departOpen: true})
  }

   //부서검색 컴포넌트 닫기
   handleSubDepartComponentClose = () => {
    this.setState({departOpen: false})
  }

  //직급검색 컴포넌트 열기
  handleSubRankComponentOpen = () => {
    this.setState({rankOpen: true})
  }

  //직급검색 컴포넌트 닫기
  handleSubRankComponentClose = () => {
    this.setState({rankOpen: false})
  }

  handleChange = name => event => {
      this.setState(...this.state, {[name]:event.target.value})
      console.log(this.state)
  }

  //Date Picker로부터 date정보 받는 call back function
  callBackDateChange = (date) => {
    this.setState({appointDate:date})
  }

 
  render() {

    const { checkedEmployeeData, checkedDepartData, checkedRankData } = this.props;


    const handleSubmit = () => {
      if(this.state.appointDate === undefined){
        alert("당일 날짜로는 발령일자를 설정할 수 없습니다.")
      }
      else if(checkedEmployeeData === undefined){
        alert("사원번호/사원명을 입력하세요!")
      }else if(checkedDepartData === undefined){
        alert("발령부서를 입력하세요!")
      }else if(checkedRankData === undefined){
        alert("발령직급을 입력하세요!")
      }else{
        this.props.addAppointment({appointDate:this.state.appointDate, employeeNo:checkedEmployeeData.employeeNo,
          preDepartCodeNo:checkedEmployeeData.departCodeNo, preRankCodeNo:checkedEmployeeData.rankCodeNo,
          appointDepartCodeNo:checkedDepartData.codeNo, appointRankCodeNo:checkedRankData.codeNo,
          appointmentStatusCodeNo:"01"})
        this.handleRequestClose();
      }
    }
  
    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xl">
          <DialogTitle>인사발령 등록</DialogTitle>
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
              id="preDepartCodeName"
              label="이전부서"
              value={checkedEmployeeData && checkedEmployeeData.departCodeName}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="appointDepartCodeName"
              label="발령부서"
              onClick={this.handleSubDepartComponentOpen}
              value={checkedDepartData && checkedDepartData.codeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="preRankCodeName"
              label="이전직급"
              value={checkedEmployeeData && checkedEmployeeData.rankCodeName}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="appointRankCodeName"
              label="발령직급"
              onClick={this.handleSubRankComponentOpen}
              value={checkedRankData && checkedRankData.codeName}
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
        <FindDepart open={this.state.departOpen}
                    handleSubDepartComponentClose={this.handleSubDepartComponentClose}
                    checkedDepartment={this.props.checkedDepartment}
                    />
      
        <FindRank open={this.state.rankOpen}
                  handleSubRankComponentClose={this.handleSubRankComponentClose}
                  checkedRank={this.props.checkedRank}/>
        
      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
    const { checkedEmployeeData, checkedDepartData, checkedRankData } = humanResource;
    return { checkedEmployeeData, checkedDepartData, checkedRankData };
}

export default connect(mapStateToProps, { checkedEmployee, checkedDepartment, checkedRank, addAppointment })(FormDialog);
