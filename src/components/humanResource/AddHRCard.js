import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, 
         addHRCard,
         checkedDepartment,
         checkedRank } from 'actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
// import FileBase64 from 'react-file-base64';
import FileBase64 from 'components/base64/react-file-base64';
import FindDepart from './FindDepart';
import FindRank from './FindRank';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import GetPostCode from 'components/accounting/GetPostCode';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DatePicker from 'components/date/DatePickers';
import InputLabel from '@material-ui/core/InputLabel';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';

//주민등록번호 Mask
class SsnMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/, /\d/,  /\d/,  /\d/, '-', /\d/, /\d/, /\d/, /\d/,  /\d/,  /\d/,  /\d/]}
        placeholderChar={'\u2000'}
        //showMask
      />
    );
  }
}

//휴대폰번호 Mask
class phoneMaskCustom extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={[ /\d/, /\d/, /\d/,'-', /\d/, /\d/,  /\d/,  /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        //showMask
      />
    );
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {


  state = {
    open: false,
    employee:{
      account:{
      }
    },
    departOpen:false,
    rankOpen:false
  };

  //인사카드 등록창 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //인사카드 등록창 닫기
  handleClickClose = () => {
    this.setState({
      employee:{
        account:{
  
        }
      },
      open:false
    })
  }

  handleRequestClose = () => {
    this.setState({open: false});
  };

  handleChange = name => event => {
   
    if(name == 'bankCodeNo' || name == 'accountNo'){

        if(this.state.employee.account == null){
          this.setState({employee:{  ...this.state.employee, 
            account:{
              [name]:event.target.value
            }
          }})
        }else{
          this.setState({employee:{  ...this.state.employee, 
            account:{...this.state.employee.account,
              [name]:event.target.value
            }
          }})
        }
    }else{
      this.setState({ employee:{...this.state.employee,
        [name]: event.target.value,
      }});
    }

  };

  //프로필 사진 업로드
  handleProfileImgUpload = (files) => {
    this.setState({employee:{...this.state.employee,
      profileFile:files}})
  }

  //서명 사진 업로드
  handleSignatureImgUpload = (files) => {
    this.setState({employee:{...this.state.employee,
      signatureFile:files}})
  }

  //우편번호 API로부터 Data받아오기
  handleAddress = (zonecode, fullAddress) => {
      this.setState({
        employee:{...this.state.employee,
          zipCode:zonecode,
          address:fullAddress
        }
      })
  }

  //입사일자 Date Picker로부터 값 받아오기
  handleDatePicker = (date) => {
    this.setState({
      employee:{...this.state.employee,
      joinDate:date}
    })
  }

  // //부서 검색창으로부터 선택된 부서 data 받아오기
  // checkedDepartment = (checkedParam) => {
  //   this.setState({
  //     employee:{...this.state.employee,
  //     departCodeNo:checkedParam.codeNo,
  //     departCodeName:checkedParam.codeName}
  //   })
  // }

  // //직급 검색창으로부터 선택된 직급 data 받아오기
  // checkedRank = (checkedParam) => {
  //   this.setState({
  //     employee:{...this.state.employee,
  //     rankCodeNo:checkedParam.codeNo,
  //     rankCodeName:checkedParam.codeName}
  //   })
  // }


  //Submit
  handleSubmit = () => {
    this.props.addHRCard(this.state.employee);
    this.handleClickClose()
  }

  render() {

    const { bankList, checkedDepartData, checkedRankData } = this.props;

    if(bankList === undefined){
      this.props.getCodeList({searchKeyword:"bank"});
    }
    if(checkedDepartData && checkedDepartData.codeNo !== this.state.employee.departCodeNo){
      this.setState({
        employee:{
          ...this.state.employee,
          departCodeNo:checkedDepartData.codeNo,
          departCodeName:checkedDepartData.codeName
        }
      })
    }
    if(checkedRankData && checkedRankData.codeNo !== this.state.employee.rankCodeNo){
      this.setState({
        employee:{
          ...this.state.employee,
          rankCodeNo:checkedRankData.codeNo,
          rankCodeName:checkedRankData.codeName
        }
      })
    }

    console.log(this.state)

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar className="bg-deep-orange">
              <IconButton onClick={this.handleRequestClose} aria-label="Close">
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                인사카드 등록
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                닫기
              </Button>
            </Toolbar>
          </AppBar>
              
          <div  align="center">
          <CardBox styleName="col-lg-8" cardStyle="p-0" headerOutside>
            <AddTextField handleChange={this.handleChange} 
              handleProfileImgUpload={this.handleProfileImgUpload}
              handleSignatureImgUpload={this.handleSignatureImgUpload}
              stateValue={this.state} bankList={bankList}
              state={this.state}
              handleAddress={this.handleAddress}
              handleDatePicker={this.handleDatePicker}
              checkedDepartment={this.props.checkedDepartment}
              checkedRank={this.props.checkedRank}
              />
          </CardBox>
          </div>

          <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleSubmit}>전송</Button>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ code, humanResource }) => {
  const { bankList } = code;
  const { checkedDepartData, checkedRankData} = humanResource;
  return { bankList, checkedDepartData, checkedRankData };
}

export default connect(mapStateToProps, { getCodeList, addHRCard, checkedDepartment, checkedRank })(FullScreenDialog);


//입력창
function AddTextField(props){

    const classes = useStyles();


    const[value, setValue] = React.useState({findDepartOpen:false, findRankOpen:false});

    //부서검색 열기
    const handleFindDepartOpen = () => {
      setValue({findDepartOpen: true});
    }
  
     //부서검색 닫기
    const handleFindDepartClose = () => {
      setValue({findDepartOpen: false});
    }
  
    //직급검색 열기
    const handleFindRankOpen = () => {
      setValue({findRankOpen: true});
    }
  
     //직급검색 닫기
    const handleFindRankClose = () => {
      setValue({findRankOpen: false});
    }

    //입사일자 값 받기
    const callBackDateChange = (_date) => {
      props.handleDatePicker(_date);
    }

    //upload버튼 클릭시 trigger발생
    const handleClickUploadBtn = () => {
      
    }

    const handleClickDatePicker = (event) => {
      event.preventDefault();
      props.refs.onclick()
    }

    //프로필 파일업로드 화면 열기
    const handleOnClickFileUpload = (e) => {
      document.getElementById('profileInputFile').click();
    }

    //
    const handleOnClickSignUpload = (e) => {
      document.getElementById('signatureFile').click();
    }


    //상위 Component의 state 값에 profileImage가 저장되어 있으면 가져옴
    const { profileFile, departCodeName, rankCodeName, ssn, employeePhone } = props.state.employee;

    console.log("-------------------")
    console.log(props.state.employee.employeePhone)

    return(
        <div >
          <br/>
          <Typography variant="h4" color="textPrimary" style={{
                flex: 1,
                float:"initial"
              }}>
                인사카드 등록
          <br/><br/>
              </Typography>
              <br/>

              <div className="col-md-4 col-6" style={{float:"left"}}>
              <br/><br/>
                <div className="jr-card" style={{width:"160px",height:"150px"}} align="center">
                  <Tooltip id="tooltip-icon" title="Hello" placement="bottom">
                    <Avatar className="size-100" alt="Remy Sharp" src={profileFile ? `${profileFile.base64}`:require("assets/images/noneProfile.png")}/>
                  </Tooltip>   
                </div>
                <div style={{position:"relative", top:"-25px"}}>
                  <Button variant="contained" color="default" className={classes.button} 
                        onClick={handleOnClickFileUpload}>
                    프로필사진
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                </div>               
              </div>              
              <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeeName"
                      label="사원명"
                      onChange={props.handleChange('employeeName')}
                      margin="normal"
                      fullWidth
                  />
              </div>
              {/* <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
                <TextField
                        id="ssn"
                        label="주민등록번호"            
                        onChange={props.handleChange('ssn')}
                        margin="normal"
                        fullWidth
                    >
                  </TextField>
              </div> */}
              <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
                  <FormControl  fullWidth margin="normal" >
                    <InputLabel htmlFor="cardNo">주민등록번호</InputLabel>
                      <Input
                        id="ssn"
                        inputComponent={SsnMaskCustom}
                        value={ssn ? `${ssn}`:''}
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={props.handleChange('ssn')}
                        
                      />
                  </FormControl>
              </div>
              <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <DatePicker  label="입사일자" callBackDateChange={callBackDateChange}/>            
              </div>

              <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeeEmail"
                      label="이메일"
                      onChange={props.handleChange('employeeEmail')}
                      margin="normal"
                      fullWidth
                  />
              </div>
              {/* <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeePhone"
                      label="휴대폰번호"
                      onChange={props.handleChange('employeePhone')}
                      margin="normal"
                      fullWidth
                  />
              </div> */}
              <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="employeePhone">휴대폰번호</InputLabel>
                      <Input
                        id="employeePhone"
                        inputComponent={phoneMaskCustom}
                        value={employeePhone ? `${employeePhone}`:''}
                        inputProps={{
                        'aria-label': 'Description',
                        }}
                        onChange={props.handleChange('employeePhone')}
                        fullWidth
                      />
                  </FormControl>
                </div>
              <div className="col-md-4 col-6"  style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeeTel"
                      label="전화번호"
                      onChange={props.handleChange('employeeTel')}
                      margin="normal"
                      fullWidth
                  />
              </div>
            <div className="col-md-4 col-6"  style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeeTel"
                      label="부서"
                      onChange={props.handleChange('employeeTel')}
                      onClick={handleFindDepartOpen}
                      value={departCodeName}
                      margin="normal"
                      fullWidth
                  />
              </div>
              <div className="col-md-4 col-6"  style={{float:"left", display:"inline"}}>
              <TextField
                      id="employeeTel"
                      label="직급"
                      onChange={props.handleChange('employeeTel')}
                      onClick={handleFindRankOpen}
                      value={rankCodeName}
                      margin="normal"
                      fullWidth
                  />
              </div>

            
            {/* <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <FormControl fullWidth>
                <InputLabel htmlFor="age-simple">은행 선택</InputLabel>
                <Select
                  fullWidth
                  onChange={props.handleChange('bankCodeNo')}
                  value={props.state.employee && props.state.employee.account && props.state.employee.account.bankCodeNo}
                >
                
                  {props.bankList && props.bankList.map( bankRow => 
                    (<MenuItem value={bankRow.codeNo}>{bankRow.codeName}</MenuItem>)
                  )}
                </Select>
                <FormHelperText>급여 받으실 은행을 선택하세요.</FormHelperText>
                </FormControl>
            </div> */}

            <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                id="select-currency"
                select
                label="급여통장"
                value={props.state.employee && props.state.employee.account && props.state.employee.account.bankCodeNo}
                onChange={props.handleChange('bankCodeNo')}
                SelectProps={{}}
                //helperText="급여 받으실 통장을 선택하세요."
                margin="normal"
                fullWidth
              >
              {props.bankList && props.bankList.map( bankRow => 
                      (<MenuItem value={bankRow.codeNo}>{bankRow.codeName}</MenuItem>)
                    )}
            </TextField>
          </div>

            <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="accountNo"
                      label="계좌번호"
                      onChange={props.handleChange('accountNo')}
                      margin="normal"
                      fullWidth
                  />
            </div>

            <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="wage"
                      label="시급"
                      margin="normal"
                      onChange={props.handleChange('wage')}
                      fullWidth
                  />
            </div>

            <div className="col-md-2 col-3" style={{float:"left", display:"inline", paddingTop:"3.5%"}}>
            <GetPostCode getPostcode={props.handleAddress}></GetPostCode>
            </div>

            <div className="col-md-2 col-3" style={{float:"left", display:"inline", position:'relative', left:"%"}}>
              <TextField
                      id="zipCode"
                      label="우편번호"
                      margin="normal"
                      value={props.state.employee.zipCode}
                      fullWidth
                  />
            </div>

           

            <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="address"
                      label="주소"
                      margin="normal"
                      value={props.state.employee.address}
                      fullWidth
                      //multiline={true}
                  />
            </div>

            <div className="col-md-4 col-6" style={{float:"left", display:"inline"}}>
              <TextField
                      id="detailAddress"
                      label="상세주소"
                      margin="normal"
                      onChange={props.handleChange('detailAddress')}
                      fullWidth
                  />
            </div>

            

            <div className="col-md-8 col-12" style={{float:"left", display:"inline"}}>
              <TextField
                      id="refer"
                      label="참조"
                      margin="normal"
                      onChange={props.handleChange('refer')}
                      fullWidth
                  />
            </div>

            <Button variant="contained" size="small" className={classes.button} onClick={handleOnClickSignUpload}>
              <SaveIcon className={clsx(classes.leftIcon, classes.iconSmall)} />
              서명/도장
            </Button>


            <div style={{display:"none"}} >
                  프로필 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {props.handleProfileImgUpload}
                    inputId="profileInputFile"
                    />
            </div>

            <div style={{display:"none"}} >
                  도장/서명 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {props.handleSignatureImgUpload}
                    inputId="signatureFile"
                    />
            </div>

            <br/><br/><br/>
            <FindDepart 
              open={value.findDepartOpen} 
              handleSubDepartComponentClose={handleFindDepartClose}
              checkedDepartment={props.checkedDepartment}
              />
            <FindRank 
              open={value.findRankOpen} 
              handleSubRankComponentClose={handleFindRankClose}
              checkedRank={props.checkedRank}
              />
            
         

        </div>
    );
}