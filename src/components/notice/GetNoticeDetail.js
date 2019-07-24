import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  return <Slide direction="left" {...props} />;
}

class GetNoticeDetail extends React.Component {


  state = {
    open: false,
    notice:{}
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {

    if(this.state.notice !== this.props.notice){
       this.setState({notice: this.props.notice});
    }

    console.log(this.state)

    return (
      <div>
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
                공지사항 상세조회
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                닫기
              </Button>
            </Toolbar>
          </AppBar>
              
          <div  align="center">
          <CardBox styleName="col-lg-8" cardStyle="p-0" headerOutside>
            <List>
                <ListItem>
                  <div>No : {this.state.notice.noticeNo}</div>
                </ListItem>
                <ListItem>
                  <div>제   목 : {this.state.notice.noticeTitle}</div>
                </ListItem>
                <ListItem>
                  <div>작성자 : {this.state.notice.employeeName}({this.state.notice.departCodeName})</div>
                </ListItem>
                <ListItem>
                  <div>조회수 : {this.state.notice.viewCount}</div>
                </ListItem>
                <ListItem>
                  <div>내   용 : </div><br/>
                  <div>{this.state.notice.viewCount}</div>
                </ListItem>

            </List>
          </CardBox>
          </div>

        </Dialog>
      </div>
    );
  }
}
export default GetNoticeDetail;