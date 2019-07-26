import React from 'react';
import { connect } from 'react-redux';
import { checkedWorkAttitudeCode
        , cleanStoreState
        , updateWorkAttitude } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FindWorkAttitudeCode from 'components/humanResource/FindWorkAttitudeCode';
import DatePicker from '../date/DatePickers';


class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false,
    workAttitudeCodeOpen: false,
    data:null,
    flag:false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  //근태코드 검색 열기
  handleSubWorkAttitudeCodeOpen = () => {
    this.setState({workAttitudeCodeOpen:true})
  }

  //근태코드 검색 닫기
  handleSubWorkAttitudeCodeClose = () => {
    this.setState({workAttitudeCodeOpen:false})
  }

  handleChange = name => event => {
      this.setState({data:{...this.state.data,[name]:event.target.value}})
  }

  //Date Picker로부터 date정보 받는 call back function
  callBackDateChange = (date) => {
    this.setState({workAttitudeDate:date})
  }

  //수정화면을 닫을 때 기존 state의 값을 지움
  handleCloseToRemovePreData = () => {
    this.setState({
      flag:false
    });
    this.props.handleModifyClose();
  }

 
  render() {

    console.log(this.state)

    const { checkedWorkAttitudeCodeData, checkedWorkAttitudeData } = this.props;
    const { data } = this.state;

    if(!this.state.flag && checkedWorkAttitudeData &&checkedWorkAttitudeData !== this.state.data){
      this.setState({
        data:checkedWorkAttitudeData,
        flag:true
      })
    }

    if(checkedWorkAttitudeCodeData && data && checkedWorkAttitudeCodeData.workAttitudeCodeNo != data.workAttitudeCodeNo){
      this.setState({
        data:{...this.state.data, 
          workAttitudeCodeNo:checkedWorkAttitudeCodeData.workAttitudeCodeNo,
          workAttitudeCodeName:checkedWorkAttitudeCodeData.workAttitudeCodeName
        }
      })
    }
    
    const handleSubmit = () => {
      if(this.state.data.workAttitudeCodeNo === undefined){
        alert("근태코드를 입력하세요.")
      }
      else if(this.state.data.workAttitudeTime === undefined){
        alert("시간은 반드시 입력하세요.")
      }
      else{
        this.props.updateWorkAttitude(this.state.data);
        this.props.cleanStoreState("checkedWorkAttitudeCodeData");
        this.props.cleanStoreState("checkedWorkAttitudeData");
        this.setState({
              flag:false
        });
        this.handleCloseToRemovePreData();
      }
    }
  
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.handleCloseToRemovePreData} maxWidth="xl">
          <DialogTitle>근태 수정</DialogTitle>
          <DialogContent >
            <DialogContentText>
              사원번호 혹은 사원명을 선택한 이후에 발령일자, 발령부서, 발령직급을 선택하시기 바랍니다.
            </DialogContentText>
            
            <div style={{float:"left"}}>
            <DatePicker callBackDateChange={this.callBackDateChange} 
                        value={data && data.workAttitudeDate}
                        disabled={true}/>
                      
            </div>

            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="none"
              id="employeeNo"
              label="사원번호"
              value={data && data.employeeNo}
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
              value={data && data.employeeName}
              disabled
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="appointDepartCodeName"
              label="근태코드"
              onClick={this.handleSubWorkAttitudeCodeOpen}
              value={data && data.workAttitudeCodeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="none"
              id="preRankCodeName"
              label="근태명칭"
              value={data && data.workAttitudeCodeName}
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
              value={data && data.workAttitudeTime}
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="secondary">
              확인
            </Button>
            <Button onClick={this.handleCloseToRemovePreData} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>
      
        <FindWorkAttitudeCode open={this.state.workAttitudeCodeOpen} 
                              handleSubWorkAttitudeCodeClose={this.handleSubWorkAttitudeCodeClose}
                              checkedWorkAttitudeCode={this.props.checkedWorkAttitudeCode}/>

      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
    const { checkedWorkAttitudeCodeData, checkedWorkAttitudeData } = humanResource;
    return {  checkedWorkAttitudeCodeData, checkedWorkAttitudeData };
}

export default connect(mapStateToProps, {  checkedWorkAttitudeCode, cleanStoreState, updateWorkAttitude })(FormDialog);
