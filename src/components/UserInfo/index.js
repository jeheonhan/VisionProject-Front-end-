import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {userSignOut} from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import {NavLink, withRouter} from 'react-router-dom';

class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    user:JSON.parse(localStorage.getItem('user'))
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {

    const { user } = this.state

    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
           src={user.employeeNo && (user.profileImage ? `http://localhost:8080/img/${user.profileImage}`:require("assets/images/placeholder.jpg"))}
          //                       :(user.branchNo && require("assets/images/noneProfile.png"))}
          className="user-avatar "
        >{user.branchNo && user.branchName.charAt(0)}</Avatar>
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>
            {user.employeeNo? (user.employeeName+" "+user.memberCodeName)
                            :(user.branchName)}
          <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>

        {JSON.parse(localStorage.getItem('user')).employeeNo != null ? (
            <Menu className="user-info"
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleRequestClose}
            PaperProps={{
              style: {
                minWidth: 120,
                paddingTop: 0,
                paddingBottom: 0
              }
            }}
           >
        
            <MenuItem onClick={this.handleRequestClose} >
              <NavLink to={user.employeeNo? "/app/getMyInfo/employee":"/app/getMyInfo/branch"} className="text-black">
                <i className="zmdi zmdi-account zmdi-hc-fw mr-2 "/>
                내정보보기
              </NavLink>
            </MenuItem>

            <MenuItem>
              <NavLink to="/app/commute" className="text-black">
                <i className="zmdi zmdi-assignment zmdi-hc-fw mr-2"/>
                출퇴근기록
              </NavLink>
            </MenuItem>
              <MenuItem onClick={() => {
                this.handleRequestClose();
                this.props.userSignOut()
              }}>
                <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

                <IntlMessages id="popup.logout"/>
              </MenuItem>
            </Menu>
            )
            :(
              <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}
        >
          
            <MenuItem onClick={this.handleRequestClose} >
              <NavLink to={user.employeeNo? "/app/getMyInfo/employee":"/app/getMyInfo/branch"} className="text-black">
                <i className="zmdi zmdi-account zmdi-hc-fw mr-2 "/>
                내정보보기
              </NavLink>
            </MenuItem>

            <MenuItem onClick={() => {
              this.handleRequestClose();
              this.props.userSignOut()
            }}>
              <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

              <IntlMessages id="popup.logout"/>
            </MenuItem>
          </Menu>
            )}
        
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale} = settings;
  return {locale}
};
export default connect(mapStateToProps, {userSignOut})(UserInfo);


