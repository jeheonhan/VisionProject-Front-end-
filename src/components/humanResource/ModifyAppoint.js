import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee, 
         checkedDepartment, 
         checkedRank, 
         getCodeList, 
         addAppointment,
         cleanStoreState, } from 'actions/index';
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
    rankOpen: false,
    data:this.props.checkedAppointmentData,
    flag:false
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


    const {data} = this.state;    

    const { checkedEmployeeData, checkedDepartData, checkedRankData, checkedAppointmentData } = this.props;

    // if(!this.state.flag && checkedAppointmentData !== this.state.data){
    //     this.setState({data:checkedAppointmentData, flag:true});
    // }else if(checkedAppointmentData.employeeNo !== this.state.data.employeeNo){
    //     this.setState({flag:false})
    // }

    if(checkedEmployeeData && checkedEmployeeData.employeeNo !== data.employeeNo){
        this.setState({data:{...this.state.data, employeeNo:checkedEmployeeData.employeeNo}})
    }

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
          appointmentStatusCodeNo:"01"});

        this.setState({appointDate:null});
        this.props.cleanStoreState("checkedEmployeeData");
        this.props.cleanStoreState("checkedDepartData");
        this.props.cleanStoreState("checkedRankData");

        this.handleRequestClose();
      }
    }
  
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.handleModifyAppointClose} maxWidth="xl">
          <DialogTitle>인사발령 수정</DialogTitle>
          <DialogContent >
            <DialogContentText>
              사원번호 혹은 사원명을 선택한 이후에 발령일자, 발령부서, 발령직급을 선택하시기 바랍니다.
            </DialogContentText>
            
            <div style={{float:"left"}}>
            <DatePicker callBackDateChange={this.callBackDateChange} value={this.state.data && this.state.data.appointDate}></DatePicker>
            </div>

            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="none"
              id="employeeNo"
              label="사원번호"
              value={this.state.data && this.state.data.employeeNo}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="none"
              id="employeeName"
              label="사원명"
              value={this.state.data && this.state.data.employeeName}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="preDepartCodeName"
              label="이전부서"
              value={this.state.data && this.state.data.preDepartCodeName}
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
              value={this.state.data && this.state.data.appointDepartCodeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="preRankCodeName"
              label="이전직급"
              value={this.state.data && this.state.data.preRankCodeName}
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
              value={this.state.data && this.state.data.appointRankCodeName}
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="secondary">
              확인
            </Button>
            <Button onClick={this.props.handleModifyAppointClose} color="primary">
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
    const { checkedEmployeeData, checkedDepartData, checkedRankData, checkedAppointmentData } = humanResource;
    return { checkedEmployeeData, checkedDepartData, checkedRankData, checkedAppointmentData };
}

export default connect(mapStateToProps, { checkedEmployee, checkedDepartment, checkedRank, addAppointment, cleanStoreState })(FormDialog);
