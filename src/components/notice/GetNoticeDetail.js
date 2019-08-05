import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import DialogActions from '@material-ui/core/DialogActions';
import SweetAlert from 'react-bootstrap-sweetalert';
import { convertNoticeStatusCode } from 'actions/Notice';
import { connect } from 'react-redux';


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class GetNoticeDetail extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      warning:false,
      notice : this.props.noticeDetail,
      open : this.props.open
    }
}

  convertNoticeStatusCode = ( notice ) => {
    this.props.convertNoticeStatusCode(notice);
    this.props.handleRequestClose();
  }

  onSweetAlert = (event) => {
      event.preventDefault();
      this.setState({
          warning:true,
      })
    }

    warningOk = () => {
        this.setState({
            warning:false,
        })
        this.convertNoticeStatusCode(this.state.notice);
    }

    onCancel = () => {
        this.setState({
            warning:false,
        })
    }

  render() {

    if(this.state.notice !== this.props.noticeDetail){
       this.setState({notice: this.props.noticeDetail});
    }
    //console.log(this.state)
    return (
      <div className="app-wrapper">
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          maxWidth=""
        >
          <AppBar className="position-relative" >
            <Toolbar className="bg-secondary">
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '800px',
                }} 
                align="left"
                >
                공지사항 상세조회
              </Typography>
              <DialogActions>
                <Button onClick={this.props.handleRequestClose} color="inherit" >닫기</Button>
              </DialogActions>
                   
            </Toolbar>
          </AppBar>

                

              <br/>
              <div align="left">
              <h2><strong>&nbsp;&nbsp;{this.state.notice.completeTitle}</strong></h2>
              </div>
              <br/>
              <div  align="left">
                  <table class="table" border="0">
                    <tr>
                        <th>No</th>
                        <td>{this.state.notice.noticeNo}</td>
                        <th>작성자</th>
                        <td>{this.state.notice.employeeName} ({this.state.notice.departCodeName})</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>{this.state.notice.noticeRegDate}</td>
                      <th>조회수</th>
                      <td>{this.state.notice.viewCount}</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>
                      <th></th>
                      <td></td>
                    </tr>
                  </table>
                  <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside ><div style={{padding:"50px"}} dangerouslySetInnerHTML={{__html:this.state.notice.content}}/></CardBox>
              </div>
              <DialogActions>
                <Button color="secondary" onClick={() => this.props.updateNoticeOpen()}>
                          수정
                </Button>
                <Button onClick={this.onSweetAlert} 
                        >
                    <i class="zmdi zmdi-delete zmdi-hc-fw zmdi-hc-1g"></i> 삭제
                </Button>
              </DialogActions>

              <SweetAlert show={this.state.warning}
                        warning
                        showCancel
                        cancelBtnText="네"
                        confirmBtnText="아니오"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="공지사항을 삭제합니다."
                        onConfirm={this.onCancel}
                        onCancel={this.warningOk}
                >
                    공지사항을 삭제하시겠습니까?
                </SweetAlert>

        </Dialog>
      </div>
    );
  }
}

export default connect(null, { convertNoticeStatusCode })(GetNoticeDetail);