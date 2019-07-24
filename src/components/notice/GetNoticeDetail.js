import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GetNoticeDetail extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      notice : this.props.noticeDetail,
      open : this.props.open
    }
}


  render() {

    if(this.state.notice !== this.props.noticeDetail){
       this.setState({notice: this.props.noticeDetail});
    }
    //console.log(this.state)
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar className="bg-deep-orange">
              <IconButton onClick={this.handleRequestClose} aria-label="Close">
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                공지사항 상세조회
              </Typography>
              <Button onClick={this.props.handleRequestClose} color="inherit">
                닫기
              </Button>
            </Toolbar>
          </AppBar>
              
          <div  align="center">
            <List>
                <ListItem>
                  <div>No : {this.state.notice.noticeNo}</div>
                </ListItem>
                <hr/>
                <ListItem>
                  <div>제   목 : {this.state.notice.noticeTitle}</div>
                </ListItem>
                <hr/>
                <ListItem>
                  <div>작성자 : {this.state.notice.employeeName}({this.state.notice.departCodeName})</div>
                </ListItem>
                <hr/>
                <ListItem>
                  <div>조회수 : {this.state.notice.viewCount}</div>
                </ListItem>
                <hr/>
                <ListItem>
                  <div>내   용 </div>
                </ListItem>
                  <br/>
                  <div>{this.state.notice.content}</div>             
            </List>
          </div>

        </Dialog>
      </div>
    );
  }
}
export default GetNoticeDetail;