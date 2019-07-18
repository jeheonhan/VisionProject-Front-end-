import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import UserProfileCard from 'components/dashboard/Common/userProfileCard/UserProfileCard';


class SimpleHRCard extends React.Component{
    state = {
        open: false,
      };
    
      handleRequestClose = () => {
        this.setState({open: false});
      };

    render(){
        return(
            <div >
            <Button variant="contained" className="bg-primary text-white" onClick={() => this.setState({open: true})}>Open
              alert dialog</Button>
            <Dialog open={this.state.open} onClose={this.handleRequestClose} maxWidth="xs">
                    <div className="col-lg-6 col-md-12">
                    <UserProfileCard headerStyle="bg-secondary"/>
                    </div>
            </Dialog>
          </div>
            
        );
    }
}

export default SimpleHRCard;

