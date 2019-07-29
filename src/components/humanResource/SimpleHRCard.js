import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import UserProfileCard from 'components/dashboard/Common/userProfileCard/UserProfileCard';
import { connect } from 'react-redux';
import { minWidth } from '@material-ui/system';
import ComposeMail from 'components/mail/ComposeMail';


class SimpleHRCard extends React.Component{
    state = {
        open: false,
        mailOpen:false
      };
    
      handleRequestClose = () => {
        this.setState({open: false});
      };

        //메일 화면 열기
      handleOpenMailComponent = () => {
        this.setState({
          mailOpen:true
        })
        this.props.handleSimpleHRCardClose();
      }

      //메일 화면 닫기
      handleCloseMailComponent = () => {
        this.setState({
          mailOpen:false
        })
      }

    render(){

      const { simpleHRCardDetail } = this.props;

        return(
            <div >              
            <Dialog open={this.props.open} onClose={this.props.handleSimpleHRCardClose}
                    maxWidth={false}>
                  {simpleHRCardDetail && (<UserProfileCard simpleHRCardDetail={simpleHRCardDetail} 
                                          handleOpenMailComponent={this.handleOpenMailComponent}/>)}
            </Dialog>

            <ComposeMail open={this.state.mailOpen} onClose={this.handleCloseMailComponent} 
                        emailForSending={simpleHRCardDetail && simpleHRCardDetail.employeeEmail}/>
          </div>
            
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
  const { simpleHRCardDetail } = humanResource;
  return { simpleHRCardDetail }
}

export default connect(mapStateToProps, {})(SimpleHRCard);

