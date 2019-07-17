import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FileBase64 from 'react-file-base64';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class FullScreenDialog extends React.Component {
  state = {
    open: false,
    employee: null
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  handleChange = name => event => {
   
    this.setState({employee:{
      [name]: event.target.value,
    }});
    console.log(this.state);
  };

  handleFileUpload = (files) => {
    this.setState({employee:{file:files}})
  }

  render() {
    console.log(this.state.employee)
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
                <CloseIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                인사카드 등록
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                확인
              </Button>
            </Toolbar>
          </AppBar>
              
          <div  align="center">
          <CardBox styleName="col-md-5" cardStyle="p-0" headerOutside>
            <AddTextField handleChange={this.handleChange} handleFileUpload={this.handleFileUpload}
              stateValue={this.state}></AddTextField>
          </CardBox>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default FullScreenDialog;


//입력창
function AddTextField(props){
    return(
        <div align="center">
          <br/><br/><br/>
            <div className="col-md-8 col-12" align="center">
              <CardBox 
                    childrenStyle="d-flex justify-content-center"
                    heading={"프로필 사진"}>
              <Tooltip id="tooltip-icon" title="Hello" placement="bottom">
                <Avatar className="size-100" alt="Remy Sharp" src='https://via.placeholder.com/150x150'/>
              </Tooltip>
            </CardBox>
              <FileBase64 
                multiple={false}
                onDone = {props.handleFileUpload}/>
            </div>
            <div className="col-md-8 col-12" float="left">
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
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="rankCodeNo"
                    label="직급"
                    onChange={props.handleChange('rankCodeNo')}
                    margin="normal"
                    fullWidth
                />
            </div>
            {/* <div className="col-md-3 col-12">
            <TextField
              id="select-currency"
              select
              label="Select"
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{}}
              helperText="Please select your currency"
              margin="normal"
              fullWidth
            >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div> */}
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="급여통장"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>


            <br/><br/><br/>
        </div>
    );
}