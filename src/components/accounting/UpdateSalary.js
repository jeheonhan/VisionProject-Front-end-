import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class UpdateSalary extends Component {

  render() {
    return (
      <div>

        <Dialog open={this.props.open} onClose={this.props.close}>
          <DialogTitle>
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="secondary">
              Disagree
            </Button>
            <Button onClick={this.props.close} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UpdateSalary;