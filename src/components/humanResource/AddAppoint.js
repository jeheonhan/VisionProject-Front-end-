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
import Snackbar from '@material-ui/core/Snackbar';


class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false,
    departOpen: false,
    rankOpen: false,
    snackbar: false,
    snackbarContents: ''
  };

  handleClickOpen = () => {
    this.setState({open: true});
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

  //스낵바 닫기
  handleRequestClose = () => {
    this.setState({
      snackbar:false,
      snackbarContents:"",
      open: false
    })
  }


 
  render() {

    const { checkedEmployeeData, checkedDepartData, checkedRankData } = this.props;


    const handleSubmit = () => {
      if(this.state.appointDate === undefined){
        this.setState({
          snackbar:true,
          snackbarContents:"발령일자를 반드시 입력하세요."
        })
      }
      else if(checkedEmployeeData === undefined){
        this.setState({
          snackbar:true,
          snackbarContents:"사원번호/사원명을 반드시 입력하세요."
        })
      }else if(checkedDepartData === undefined){
        this.setState({
          snackbar:true,
          snackbarContents:"발령부서를 반드시 입력하세요."
        })
      }else if(checkedRankData === undefined){
        this.setState({
          snackbar:true,
          snackbarContents:"발령직급을 반드시 입력하세요."
        })
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
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xl">
          <DialogTitle>인사발령 등록</DialogTitle>
          <DialogContent >
            <DialogContentText>
              사원번호 혹은 사원명을 선택한 이후에 발령일자, 발령부서, 발령직급을 선택하시기 바랍니다.
            </DialogContentText>
            
            <div className="row">
            <div className="col-md-4 col-6" >
            <DatePicker callBackDateChange={this.callBackDateChange} label="발령일자"></DatePicker>
            </div>

            <div className="col-md-4 col-6" style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="none"
              id="employeeNo"
              label="사원번호"
            //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
              fullWidth
              onClick={this.handleSubComponentOpen}
              value={checkedEmployeeData && checkedEmployeeData.employeeNo}
            />
            </div>

            <div className="col-md-4 col-6" style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="none"
              id="employeeName"
              label="사원명"
              fullWidth
              onClick={this.handleSubComponentOpen}
              value={checkedEmployeeData && checkedEmployeeData.employeeName}
            />
            </div>
            </div>

            <div className="row">
            <div  className="col-md-3 col-5"style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="preDepartCodeName"
              label="이전부서"
              value={checkedEmployeeData && checkedEmployeeData.departCodeName}
              disabled
            />
            </div>

            <div className="col-md-3 col-5" style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="appointDepartCodeName"
              label="발령부서"
              onClick={this.handleSubDepartComponentOpen}
              value={checkedDepartData && checkedDepartData.codeName}
            />
            </div>

            <div className="col-md-3 col-5" style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="preRankCodeName"
              label="이전직급"
              value={checkedEmployeeData && checkedEmployeeData.rankCodeName}
              disabled
            />
            </div>

            <div className="col-md-3 col-5" style={{display:"inline"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="appointRankCodeName"
              label="발령직급"
              onClick={this.handleSubRankComponentOpen}
              value={checkedRankData && checkedRankData.codeName}
            />
            </div>
            </div>
            {/* <div style={{float:"left",display:"inline"}}>
            &nbsp;
            <TextField
              margin="none"
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
        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1500"
            onClose={this.handleRequestClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />
      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
    const { checkedEmployeeData, checkedDepartData, checkedRankData } = humanResource;
    return { checkedEmployeeData, checkedDepartData, checkedRankData };
}

export default connect(mapStateToProps, { checkedEmployee, checkedDepartment, checkedRank, addAppointment, cleanStoreState })(FormDialog);
