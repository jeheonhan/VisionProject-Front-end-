import React from 'react';
import { connect } from 'react-redux';
import { getForCodeDetail, getNewCodeNo, checkDuplicateCodeName, addCode, updateCode } from 'actions/Code';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class FormDialog extends React.Component {

    constructor(props){
        super(props);
        this.firstSettingState();
    }
  state = {
    open: false,
    subOpen: false,
    departOpen: false,
    rankOpen: false,
    duplicate: "코드명을 중복확인하세요",
    Code : {groupCode : "",
        groupCodeName : "",
        codeNo: "",
        codeName: ""}
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
    //this.props.getForCodeDetail({searchCondition :0, searchKeyword: this.props.List[0]});
  };


  handleChange = name => event => {
      this.setState(...this.state, {[name]:event.target.value})
      //console.log(this.state)
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
        Code : {groupCode : this.props.code.groupCode,
                groupCodeName : this.props.code.groupCodeName,
                codeNo: this.props.code.codeNo,
                codeName: this.props.code.codeName}
    })
    
  }

//   componentDidMount() {
//     this.firstSettingState();
//   }
 
  render() {

    const { code, CodeNameBool } = this.props;

    const handleSubmit = (event) => {
      if(!this.props.CodeNameBool){
        alert("입력하신 코드명이 중복됩니다.")
      }
      else{
        this.props.updateCode(this.props.code)
        this.props.action();
      }
    }
    console.log(this.state)
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.action} maxWidth="xl">
          <DialogTitle>코드 수정하기</DialogTitle>
          <DialogContent >
            <DialogContentText>
              코드명을 수정할 수 있습니다.
            </DialogContentText>
            
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="normal"
              id="groupCode"
              label="그룹코드"
              value={this.props.code.groupCode}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              required
              margin="normal"
              id="groupCodeName"
              label="그룹코드명"
              value={this.props.code.groupCodeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="codeNo"
              label="코드번호"
              value={this.props.code.codeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="normal"
              id="codeName"
              label="코드명"
              onChange={this.props.handleName}
              value={this.props.code.codeName}
              helperText={CodeNameBool!==undefined ? (CodeNameBool ? "사용하실 수 있는 코드명입니다.":"코드명이 중복됩니다."): (this.state.duplicate)}
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} color="secondary">
              확인
            </Button>
            <Button onClick={this.props.action} color="primary">
              취소
            </Button>
          </DialogActions>
        </Dialog>
  
      </div>
    );
  }
}

const mapStateToProps = ({ code }) => {
    const { CodeNameBool } = code;
    return { CodeNameBool };
}

export default connect(mapStateToProps, { checkDuplicateCodeName, getForCodeDetail, updateCode })(FormDialog);
