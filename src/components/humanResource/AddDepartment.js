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



class FormDialog extends React.Component {

 constructor(props){
     super(props);
     this.state ={
        newCodeBoolean:false
     }
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
     this.props.addDepartment(this.state);
     this.props.handleAddDepartClose();
 }

  render() {

    const { CodeNameBool, newCodeNo, accessMenuList} = this.props;

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
        
        <Dialog open={this.props.open} onClose={this.props.handleAddDepartClose}>
          <DialogTitle>부서등록</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
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
            <Button onClick={this.props.handleAddDepartClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({code}) => {
    const { CodeNameBool, newCodeNo, accessMenuList } = code;
    return { CodeNameBool, newCodeNo, accessMenuList };
}

export default connect(mapStateToProps, {checkDuplicateCodeName, getNewCodeNo, getCodeList, addDepartment})(FormDialog);