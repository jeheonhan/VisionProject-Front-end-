import React from 'react';
import { connect } from 'react-redux';
import { checkedEmployee } from 'actions/HumanResource';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxListSecondary from 'components/checkBox/CheckboxListSecondary';
import CardBox from 'components/CardBox';
import FindEmployee from './FindEmployee';

class FormDialog extends React.Component {
  state = {
    open: false,
    subOpen: false
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  //자식 컴포넌트 열기
  handleSubComponentOpen = () => {
    this.setState({subOpen: true})
  }

  //자식 컴포넌트 닫기
  handleSubComponentClose = () => {
      this.setState({subOpen: false})
  }

  handleChange = name => event => {
      this.setState({[name]:event.target.value})
  }

  render() {

    const { checkedEmployeeData } = this.props;

    if(checkedEmployeeData !== undefined){
        console.log("employee :: "+checkedEmployeeData);
    }

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
        <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xl">
          <DialogTitle>인사발령 등록</DialogTitle>
          <DialogContent >
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
            <div style={{float:"left"}}>
            <TextField
              margin="dense"
              id="appointDate"
              label="발령일자"
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              autoComplete="1111,2222"
              margin="dense"
              id="employeeNo"
              label="사원번호"
            //사원번호 클릭시 자식컴포넌트 Open값을 true로 변경
              onClick={this.handleSubComponentOpen}
              value={checkedEmployeeData && checkedEmployeeData.employeeNo}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="employeeName"
              label="사원명"
              value={checkedEmployeeData && checkedEmployeeData.employeeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="preDepartCodeName"
              label="이전부서"
              value={checkedEmployeeData && checkedEmployeeData.departCodeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="appointDepartCodeName"
              label="발령부서"
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="preRankCodeName"
              label="이전직급"
              value={checkedEmployeeData && checkedEmployeeData.rankCodeName}
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="appointRankCodeName"
              label="발령직급"
            />
            </div>
            <div style={{float:"left"}}>
            &nbsp;
            <TextField
              margin="dense"
              id="reference"
              label="참고"
            />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestClose} color="secondary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

        {/* 자식 컴포넌트 open 값이 true면 열림 이때 자기 자신을 닫게 해줄 eventHandler도 props로 전달 */}
        <FindEmployee open={this.state.subOpen} 
                    handleSubComponentClose={this.handleSubComponentClose}
                    checkedEmployee={this.props.checkedEmployee}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
    const { checkedEmployeeData } = humanResource;
    return { checkedEmployeeData };
}

export default connect(mapStateToProps, { checkedEmployee })(FormDialog);
