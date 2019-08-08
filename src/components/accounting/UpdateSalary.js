import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { updateSalary } from 'actions/index';
import IconButton from '@material-ui/core/IconButton';
import IconMailOutline from '@material-ui/icons/MailOutline';
import TextField from '@material-ui/core/TextField';
import SweetAlert from 'react-bootstrap-sweetalert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NumberFormat from 'react-number-format';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import ComposeMail from 'components/mail/ComposeMail';

//급여 개인지급총액 정규식
class TotalSalaryMask extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        thousandSeparator
      />
    );
  }
}

class UpdateSalary extends Component {

  state = {
    updateFlag : false,
    anchorEl: undefined,
    open: false,
    success : false,
    snackbar:false,
    snackbarContents:"",
    mailOpen:false
  }

  //...클릭시 발생하는 이벤트
  //메뉴바를 내가 클릭한 위치에서 열게해준다.
  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  //메뉴바 닫기
  handelClose = () => {
    this.setState({
      open : false
    })
  }

  //메뉴바에서 메뉴 선택시 발생 이벤트
  handleRequestChoose = (event, index) => {
    event.preventDefault();
    
    //닫기면 index === 0
    if(index === 0){
      this.handelClose();
      this.setState({ salary : this.props.salaryInfo })
      this.props.close();
    
    //수정이면 index === 1
    } else if(index === 1){
      if(this.state.salary.salaryStatusCodeNo == '02'){
        this.handleRequestSnackBarOpen("급여이체 단계에서는 급여를 수정하실 수 없습니다.")
      }else if(this.state.salary.salaryStatusCodeNo == '03'){
        this.handleRequestSnackBarOpen("이미 이체가 완료된 급여는 수정하실 수 없습니다.")
      }else{
        this.handelClose();
        this.openSuccessAlarm();
        this.props.updateSalary(this.state.salary)
      }
    }

    // this.setState({open: false});
  };

  //급여 수정 함수
  handleChange = name => event => {
    this.setState({
      salary : { ...this.state.salary, [name] : event.target.value}
    })
  }

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
    this.props.close()
  }

  //급여수정 다이얼로그 닫기
  closeUpdateSalary = () => {
    this.setState({ 
      updateFlag:false
     })
    this.props.close();
  }

  //스낵바 열기
  handleRequestSnackBarOpen = (contents) => {
    this.setState({
      snackbar:true,
      snackbarContents:contents
    })
  }

  //스낵바 닫기
  handleRequestSnackBarClose = () => {
    this.setState({
      snackbar:false,
      snackbarContents:""
    })
  }

  //메일 화면 열기
  handleOpenMailComponent = () => {
    this.setState({
      mailOpen:true
    })
    this.closeUpdateSalary();
  }

  //메일 화면 닫기
  handleCloseMailComponent = () => {
    this.setState({
      mailOpen:false
    })
  }

  render() {

    const { salaryInfo } = this.props;

    if(salaryInfo && !this.state.updateFlag ){
      this.setState({
        updateFlag : true,
        salary : salaryInfo
      })
    }


    return (
      <div>

        <Dialog open={this.props.open} onClose={this.closeUpdateSalary}>
          
          <div style={{minWidth: '300px', maxWidth: '300px', minHeight:'500px', maxHeight:'500px'}} className="profile-intro shadow  border-0 text-center">
            <div className="pi-header">
              <div className="bg-secondary card-header" style={{minHeight: '200px', maxHeight: '200px', paddingTop:"10px", paddingBottom:"210px"}}>
                <div className="jr-card-header-top">
                  <Tooltip
                    title="메일 보내기"
                    placement={'bottom-start'}
                    enterDelay={300}>
                      <IconButton className="jr-fs-lg text-white" aria-label="Menu" onClick={this.handleOpenMailComponent}>
                        <IconMailOutline/>
                      </IconButton>
                  </Tooltip>
                  {/* 메일 보내려면 사원 메일번호 필요함 */}
                  {/* <IconMailOutline onClick={event => this.handleClickMailOpen(event, row.employeeEmail)} 
                                          style={{cursor:'pointer'}} htmlColor={"#e65100"}/><input type="hidden" value={row.employeeEmail}/> */}

                  {/* <IconButton className="icon-btn p-1 text-white ml-auto" onClick={this.props.close} aria-label="Close">
                    <CloseIcon/>
                  </IconButton> */}
                  <Tooltip
                    title="수정하기"
                    placement={'bottom-start'}
                    enterDelay={300}>
                      <IconButton
                        className="icon-btn p-1 text-white ml-auto"
                        aria-label="More"
                        aria-owns={this.state.open ? 'long-SidenavContent.js' : null}
                        aria-haspopup
                        onClick={this.handleClick}>
                        <MoreVertIcon/>
                      </IconButton>
                  </Tooltip>
                  <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handelClose}
                    MenuListProps={{
                      style: {
                        width: 100,
                      },
                    }}
                  >
                    <MenuItem onClick={event => this.handleRequestChoose(event, 0)}>
                      <i className="zmdi zmdi-close zmdi-hc-fw mr-2"/>
                        닫기
                    </MenuItem>
                    <MenuItem onClick={event => this.handleRequestChoose(event, 1)}>
                      <i className="zmdi zmdi-check zmdi-hc-fw mr-2"/>
                        수정
                    </MenuItem>

                  </Menu>
                </div>
                <div className="text-white">
                  {salaryInfo && salaryInfo.employeeName}&nbsp;{salaryInfo && salaryInfo.rankCodeName}
                  <span style={{fontSize:"14px"}}><br/>{salaryInfo && salaryInfo.departCodeName}<br/></span>
                </div>
                <img className="avatar-circle" src={require("assets/images/placeholder.jpg")} alt="Team Member"/>
              </div>
            </div>
            <div className="pi-content">
              <h4 className="card-text" align="center">{salaryInfo && salaryInfo.salaryDate} &nbsp; 급여</h4>
              <p className="card-text" align="left">소정근로시간(분) : {salaryInfo && salaryInfo.totalRegularWorkTime} 분</p>
              <p className="card-text" align="left">연장근로시간(분) : {salaryInfo && salaryInfo.totalRegularWorkTime} 분</p>
              <p className="card-text" align="left" style={{marginBottom:'0px'}}>시급 : {salaryInfo && salaryInfo.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
              
              <div style={{padding:"0px"}} className="col-md-12 col-12">
              <FormControl className="mb-3" fullWidth margin='normal'>
                <InputLabel shrink={true} htmlFor="tradeAmount">개인지급총액</InputLabel>
                  <Input
                    inputComponent={TotalSalaryMask}
                    id="individualTotalSalary"
                    placeholder="개인지급총액 입력"
                    value={this.state.salary && this.state.salary.individualTotalSalary}
                    onChange={this.handleChange('individualTotalSalary')}
                    margin="dense"
                    fullWidth
                    disabled={salaryInfo && (salaryInfo.salaryStatusCodeNo == '03' ||  salaryInfo.salaryStatusCodeNo == '02') ? true:false}
                    endAdornment={this.state.salary && this.state.salary.individualTotalSalary ? (<InputAdornment position="end">원</InputAdornment>) : null}
                  />
              </FormControl>
              </div>

            </div>
          </div>

        <SweetAlert 
          show={this.state.success} 
          success 
          title="수정완료"
          onConfirm={this.closeSuccessAlarm}
          confirmBtnText="확인"
          confirmBtnBsStyle="danger"
          >
          수정에 성공했습니다
        </SweetAlert>

        </Dialog>

        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1500"
            onClose={this.handleRequestSnackBarClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />

        <ComposeMail open={this.state.mailOpen} onClose={this.handleCloseMailComponent} 
                     emailForSending={this.state.salary && this.state.salary.employeeEmail}/>
      </div>
    );
  }
}

const mapStateToProps = ({ accounting }) => {
  const { salaryInfo } = accounting;
  return { salaryInfo };
}

export default connect(mapStateToProps, {updateSalary})(UpdateSalary);