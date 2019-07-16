import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';



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

  render() {
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
          <CardBox styleName="col-md-6" cardStyle="p-0" headerOutside>
            <AddTextField handleChange={this.handleChange}></AddTextField>
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
            <div className="col-md-8 col-12">
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
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
            <div className="col-md-8 col-12">
            <TextField
                    id="name"
                    label="사원명"
                    onChange={props.handleChange('name')}
                    margin="normal"
                    fullWidth
                />
            </div>
        </div>
    );
}