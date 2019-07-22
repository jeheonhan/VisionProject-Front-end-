import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import CardBox from 'components/CardBox';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FileBase64 from 'react-file-base64';
import FindDepart from './FindDepart';
import FindRank from './FindRank';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import GetPostCode from 'components/accounting/GetPostCode';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DatePicker from 'components/date/DatePickers';
import { getBranchDetail } from 'actions/BusinessSupport';

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
    return <Slide direction="up" {...props} />;
  }

  class FullScreenDialog extends React.Component {


    state = {
      open: false,
      branch: null
    };
  
    handleClickOpen = () => {
      this.setState({open: true});
    };
  
    handleRequestClose = () => {
      this.setState({open: false});
    };
   
    render() {

      console.log(this.state)
  
      const { branch } = this.props;
  
      if(branch === undefined){
        this.props.getBranchDetail({branchNo});
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

                <Button onClick={this.handleRequestClose} color="inherit">
                  닫기
                </Button>
              </Toolbar>
            </AppBar>
                
            <div  align="center">
            <CardBox styleName="col-md-4" cardStyle="p-0" headerOutside>
              <div> 지점번호 : {this.props.branch.branchNo}</div>
              <div> 지점명 : {this.props.branch.branchName}</div>
              <div> 지  역 : {this.props.branch.localCodeName}</div>
              <div> 우편번호 : {this.props.branch.zipCode}</div>
              <div> 주  소 : {this.props.branch.address}</div>
              <div> 상세주소 : {this.props.branch.detailAdress}</div>
              <div> 지점장명 : {this.props.branch.branchManagerName}</div>
              <div> 사업자등록번호 : {this.props.branch.businessLicenseNo}</div>
              <div> 지점전화번호 : {this.props.branch.branchTel}</div>
              <div> 지점장휴대폰번호 : {this.props.branch.branchManagerPhone}</div>
              <div> 지점등록일 : {this.props.branch.branchRegDate}</div>
              <div> 영업상태 : {this.props.branch.branchStatus}</div>
            </CardBox>
            </div>
          </Dialog>
        </div>
      );
    }
  }

export default FullScreenDialog;