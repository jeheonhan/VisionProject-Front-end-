import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { checkDuplicateCodeName 
        ,getNewCodeNo
        ,getCodeList
        ,addDepartment } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';


class FormDialog extends React.Component {

 constructor(props){
     super(props);
     this.state ={
        newCodeBoolean:false,
        snackbar:false,
        snackbarContents:""
     }
 }

  //화면 닫기
  handleClickClose = () => {
    this.setState({
      departCodeName:null,
      accessMenuCodeNo:null,
      departInfo:null,
      newCodeBoolean:false
    })
    this.props.handleAddDepartClose();
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

 handleChange = name => event => {
     if(name == 'codeName'){
        this.props.checkDuplicateCodeName({groupCode:'depart',codeName:event.target.value})
     }
     this.setState({
         [name]:event.target.value
     })
 }
 

 handleSubmit = () => {

    if(this.state.departCodeName == null){
      this.handleRequestSnackBarOpen("부서명을 반드시 입력하세요");
    }else if(this.state.accessMenuCodeNo == null){
      this.handleRequestSnackBarOpen("접근가능메뉴를 입력하세요.");
    }else if(this.state.departInfo == null){
      this.handleRequestSnackBarOpen("업무소개를 입력하세요.");
    }else{
      this.props.addDepartment(this.state);
      this.handleClickClose();
      //this.props.handleAddDepartClose();
      this.props.getNewCodeNo('depart');
    }
 }

 

  render() {

    const { CodeNameBool, newCodeNo, accessMenuList} = this.props;
    const { departCodeNo } = this.state;

    if(newCodeNo === undefined){
        this.props.getNewCodeNo('depart');
    }else if(!this.state.newCodeBoolean && newCodeNo !== undefined){
        this.setState({
            departCodeNo:newCodeNo.codeNo,
            newCodeBoolean:true
        })
    }
    

    if(accessMenuList === undefined){
        this.props.getCodeList({searchKeyword:'accessMenu'});
    }

    console.log(this.state);

    return (
      <div>
        
        <Dialog open={this.props.open} onClose={this.handleClickClose}>
          <DialogTitle>부서등록</DialogTitle>
          <DialogContent>
            <DialogContentText>
              신규부서 등록시에 반드시 접근가능메뉴를 신중하게 
              설정하여주시기바랍니다.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="departCodeNo"
              label="부서번호"
              type="departCodeNo"
              value={this.state.departCodeNo && this.state.departCodeNo}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="departCodeName"
              label="부서명"
              type="departCodeName"
              value={this.state.departCodeName && this.state.departCodeName}
              onChange={this.handleChange('departCodeName')}
              helperText={CodeNameBool == false ? '중복된 부서명은 사용할 수 없습니다.':''}
              fullWidth
            />
            <br/>
            <FormControl className="w-100 mb-2">
                <InputLabel htmlFor="age-simple">접근가능메뉴</InputLabel>
                <Select
                value={this.state.accessMenuCodeNo}
                onChange={this.handleChange('accessMenuCodeNo')}
                input={<Input id="ageSimple1"/>}
                >
                {accessMenuList && accessMenuList.map( row => {
                    return(
                        <MenuItem value={row.codeNo}>{row.codeName}</MenuItem>
                    )
                })}                
                </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="departInfo"
              label="업무소개"
              type="departInfo"
              multiline={true}
              value={this.state.departInfo && this.state.departInfo}
              onChange={this.handleChange('departInfo')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="secondary">
              등록
            </Button>
            <Button onClick={this.handleClickClose} color="primary">
              취소
            </Button>
          </DialogActions>
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
      </div>
    );
  }
}

const mapStateToProps = ({code}) => {
    const { CodeNameBool, newCodeNo, accessMenuList } = code;
    return { CodeNameBool, newCodeNo, accessMenuList };
}

export default connect(mapStateToProps, {checkDuplicateCodeName, getNewCodeNo, getCodeList, addDepartment})(FormDialog);