import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import UserProfileCard from 'components/dashboard/Common/userProfileCard/UserProfileCard';
import { connect } from 'react-redux';
import { minWidth } from '@material-ui/system';


class SimpleHRCard extends React.Component{
    state = {
        open: false,
      };
    
      handleRequestClose = () => {
        this.setState({open: false});
      };

    render(){

      const { simpleHRCardDetail } = this.props;

        return(
            <div >              
            <Dialog open={this.props.open} onClose={this.props.handleSimpleHRCardClose}
                    maxWidth={false}>
                  {simpleHRCardDetail && (<UserProfileCard simpleHRCardDetail={simpleHRCardDetail}/>)}
            </Dialog>
          </div>
            
        );
    }
}

const mapStateToProps = ({ humanResource }) => {
  const { simpleHRCardDetail } = humanResource;
  return { simpleHRCardDetail }
}

export default connect(mapStateToProps, {})(SimpleHRCard);

