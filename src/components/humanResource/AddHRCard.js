import React from 'react';
import { connect } from 'react-redux';
import { getCodeList } from 'actions/index';
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



function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {


  state = {
    open: false,
    employee: null,
    employee:{
      account:{

      }
    }
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };



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

  handleFileUpload = (files) => {
    this.setState({employee:{file:files}})
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
            <AddTextField handleChange={this.handleChange} handleFileUpload={this.handleFileUpload}
              stateValue={this.state} bankList={bankList}
              state={this.state}></AddTextField>
          </CardBox>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
  const { bankList } = code;
  return { bankList };
}

export default connect(mapStateToProps, { getCodeList })(FullScreenDialog);


//입력창
function AddTextField(props){

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
                    <Avatar className="size-100" alt="Remy Sharp" src='https://via.placeholder.com/150x150'/>
                  </Tooltip>
                </CardBox>
              </div>              
              
            <div className="col-md-8 col-12" >
            <TextField
                    id="employeeNo"
                    label="사원번호"
                    onChange={props.handleChange('employeeNo')}
                    margin="normal"
                    fullWidth
                />
            </div>
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
            <TextField
                    id="joinDate"
                    label="입사일자"
                    onChange={props.handleChange('joinDate')}
                    margin="normal"
                    fullWidth
                />
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

            <div style={{display:"none"}}>
                  <FileBase64 
                    multiple={false}
                    onDone = {props.handleFileUpload}/>
            </div>
            <br/><br/><br/>
            <FindDepart open={value.findDepartOpen} handleSubDepartComponentClose={handleFindDepartClose}/>
            <FindRank open={value.findRankOpen} handleSubRankComponentClose={handleFindRankClose}/>
            <GetPostCode></GetPostCode>
        </div>
    );
}