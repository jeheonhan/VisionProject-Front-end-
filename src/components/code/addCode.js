import React from 'react';
import { connect } from 'react-redux';
import { getForCodeDetail, getNewCodeNo, checkDuplicateCodeName, addCode } from 'actions/Code';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false,
    departOpen: false,
    rankOpen: false,
    duplicate: "코드명을 중복확인하세요"
  };

  handleClickOpen = () => {
    this.setState({open: true});
    this.props.getNewCodeNo(this.props.List[0].groupCode)
  };

  handleRequestClose = () => {
    this.setState({open: false});
    this.props.getForCodeDetail({searchCondition :0, searchKeyword: this.props.List[0]});
  };


  handleChange = name => event => {
      this.setState(...this.state, {[name]:event.target.value})
      console.log(this.state)
  }

  handleChangeCodeName = event => {
      event.preventDefault();
      this.props.checkDuplicateCodeName({groupCode: this.props.List[0].groupCode, codeName: event.target.value})
      this.setState({
          ...this.state,
          Code : {codeName : event.target.value}
      })

      console.log(this.state)
  }

  firstSettingState = () => {
    this.setState({
        ...this.state, 
        Code : {groupCode : this.props.List[0].groupCode,
                groupCodeName : this.props.List[0].groupCodeName,
                codeNo: this.props.newCodeNo,
                codeName: ""}
    })
    
  }

  componentDidMount() {
    this.firstSettingState();
    console.log(this.state)
  }
 
  render() {

    const { List, newCodeNo, CodeNameBool } = this.props;

    const handleSubmit = (event) => {
      if(!this.props.CodeNameBool){
        alert("입력하신 코드명이 중복됩니다.")
      }
      else{
        this.props.addCode({groupCode: this.props.List[0].groupCode, groupCodeName: this.props.List[0].groupCodeName, codeNo: this.props.newCodeNo.codeNo, codeName: this.state.Code.codeName})
        this.handleRequestClose();
      }
    }
  
    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            코드 등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xl">
          <DialogTitle>새로운 코드 등록</DialogTitle>
          <DialogContent >
            <DialogContentText>
              코드명을 입력하세요.
            </DialogContentText>
            
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="normal"
              id="groupCode"
              label="그룹코드"
              value={List[0].groupCode}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="normal"
              id="groupCodeName"
              label="그룹코드명"
              value={List[0].groupCodeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="codeNo"
              label="코드번호"
              value={newCodeNo!==undefined && newCodeNo.codeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="codeName"
              label="코드명"
              onChange={this.handleChangeCodeName}
              value={this.state.codeName}
              helperText={CodeNameBool!==undefined ? (CodeNameBool ? "사용하실 수 있는 코드명입니다.":"코드명이 중복됩니다."): (this.state.duplicate)}
            />
            </div>
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
  
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
    const { newCodeNo, CodeNameBool } = code;
    return { newCodeNo, CodeNameBool };
}

export default connect(mapStateToProps, { getNewCodeNo, checkDuplicateCodeName, addCode, getForCodeDetail })(FormDialog);
