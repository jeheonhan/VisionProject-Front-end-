import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, addHRCard } from 'actions/index';
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
import FileBase64 from 'react-file-base64';
import FindDepart from './FindDepart';
import FindRank from './FindRank';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import GetPostCode from 'components/accounting/GetPostCode';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DatePicker from 'components/date/DatePickers';

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
    }
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

  //부서 검색창으로부터 선택된 부서 data 받아오기
  checkedDepartment = (checkedParam) => {
    this.setState({
      employee:{...this.state.employee,
      departCodeNo:checkedParam.codeNo,
      departCodeName:checkedParam.codeName}
    })
  }

  //직급 검색창으로부터 선택된 직급 data 받아오기
  checkedRank = (checkedParam) => {
    this.setState({
      employee:{...this.state.employee,
      rankCodeNo:checkedParam.codeNo,
      rankCodeName:checkedParam.codeName}
    })
  }

  //Submit
  handleSubmit = () => {
    this.props.addHRCard(this.state.employee);
    this.handleClickClose()
  }

  render() {

    const { bankList } = this.props;

    if(bankList === undefined){
      this.props.getCodeList({searchKeyword:"bank"});
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
          <CardBox styleName="col-md-4" cardStyle="p-0" headerOutside>
            <AddTextField handleChange={this.handleChange} 
              handleProfileImgUpload={this.handleProfileImgUpload}
              handleSignatureImgUpload={this.handleSignatureImgUpload}
              stateValue={this.state} bankList={bankList}
              state={this.state}
              handleAddress={this.handleAddress}
              handleDatePicker={this.handleDatePicker}
              checkedDepartment={this.checkedDepartment}
              checkedRank={this.checkedRank}></AddTextField>
          </CardBox>
          </div>

          <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleSubmit}>전송</Button>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
  const { bankList } = code;
  return { bankList };
}

export default connect(mapStateToProps, { getCodeList, addHRCard })(FullScreenDialog);


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

    //상위 Component의 state 값에 profileImage가 저장되어 있으면 가져옴
    const { profileImage, departCodeName, rankCodeName } = props.state.employee;

    return(
        <div align="center">
          <br/>
          <Typography variant="h4" color="textPrimary" style={{
                flex: 1,
              }}>
                인사카드 등록
          <br/><br/>
              </Typography>
              <div className="col-md-8 col-12" >
                <CardBox 
                        childrenStyle="d-flex justify-content-center"
                        heading={""}>
                  <Tooltip id="tooltip-icon" title="Hello" placement="bottom">
                    <Avatar className="size-100" alt="Remy Sharp" src={profileImage && `${profileImage.base64}`}/>
                  </Tooltip>
                </CardBox>
              </div>              
              
            {/* <div className="col-md-8 col-12" >
            <TextField
                    id="employeeNo"
                    label="사원번호"
                    onChange={props.handleChange('employeeNo')}
                    margin="normal"
                    fullWidth
                />
            </div> */}
            <div className="col-md-8 col-12">
            <TextField
                    id="employeeName"
                    label="사원명"
                    onChange={props.handleChange('employeeName')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="ssn"
                    label="주민등록번호"            
                    onChange={props.handleChange('ssn')}
                    margin="normal"
                    fullWidth
                >
                </TextField>
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="employeePhone"
                    label="휴대폰번호"
                    onChange={props.handleChange('employeePhone')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="employeeTel"
                    label="전화번호"
                    onChange={props.handleChange('employeeTel')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <DatePicker label="입사일자" callBackDateChange={callBackDateChange}/>            
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="employeeEmail"
                    label="이메일"
                    onChange={props.handleChange('employeeEmail')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="departCodeNo"
                    label="부서"
                    onChange={props.handleChange('departCodeNo')}
                    margin="normal"
                    fullWidth
                    value={departCodeName}
                    onClick={handleFindDepartOpen}
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="rankCodeNo"
                    label="직급"
                    onChange={props.handleChange('rankCodeNo')}
                    margin="normal"
                    fullWidth
                    value={rankCodeName}
                    onClick={handleFindRankOpen}
                />
            </div>
            

            <div className="col-md-8 col-12">
              <FormControl fullWidth>
                {/* <InputLabel htmlFor="age-simple">급여통장 은행 선택</InputLabel> */}
                <Select
                  fullWidth
                  onChange={props.handleChange('bankCodeNo')}
                  value={props.state.employee && props.state.employee.account && props.state.employee.account.bankCodeNo}
                  // input={<Input id="ageSimple1"/>}
                >
                
                  {props.bankList && props.bankList.map( bankRow => 
                    (<MenuItem value={bankRow.codeNo}>{bankRow.codeName}</MenuItem>)
                  )}
                </Select>
                <FormHelperText>급여 받으실 은행을 선택하세요.</FormHelperText>
                </FormControl>
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="accountNo"
                      label="계좌번호"
                      onChange={props.handleChange('accountNo')}
                      margin="normal"
                      fullWidth
                  />
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="zipCode"
                      label="우편번호"
                      margin="normal"
                      value={props.state.employee.zipCode}
                      fullWidth
                  />
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="address"
                      label="주소"
                      margin="normal"
                      value={props.state.employee.address}
                      fullWidth
                      multiline={true}
                  />
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="detailAddress"
                      label="상세주소"
                      margin="normal"
                      onChange={props.handleChange('detailAddress')}
                      fullWidth
                  />
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="wage"
                      label="시급"
                      margin="normal"
                      onChange={props.handleChange('wage')}
                      fullWidth
                  />
            </div>

            <div className="col-md-8 col-12">
              <TextField
                      id="refer"
                      label="참조"
                      margin="normal"
                      onChange={props.handleChange('refer')}
                      fullWidth
                  />
            </div>

            <Button variant="contained" color="default" className={classes.button} onClick={handleClickUploadBtn}>
              Upload
              <CloudUploadIcon className={classes.rightIcon} />
            </Button>

            <div style={{display:""}} >
                  프로필 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {props.handleProfileImgUpload}/>
            </div>

            <div style={{display:""}} >
                  도장/서명 사진
                  <FileBase64 
                    multiple={false}
                    onDone = {props.handleSignatureImgUpload}/>
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
              checkedRank={props.checkedRank}/>

            <GetPostCode getPostcode={props.handleAddress}></GetPostCode>
            
        </div>
    );
}