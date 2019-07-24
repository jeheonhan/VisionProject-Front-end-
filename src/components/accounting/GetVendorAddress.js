import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

class GetVendorAddress extends Component {

  //this.state 직접 변경은 constructor 안에서만 가능하고, 그 외에 state 값을 변경하고 싶으면 setState 메소드를 사용해야함.
  //setState 사용하면 redering 된다.


  render() {
    const { vendorAddress } = this.props;
    console.log("여기는 GetVendorAddress");
    
    return (
      <div>

        <Dialog open={this.props.open}>
          <DialogTitle>
            {"거래처주소"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            <div>
                우편번호 : { vendorAddress && vendorAddress.zipCode }
              </div>
              <div>
                주소 : { vendorAddress && vendorAddress.address }
              </div>
              <div>
                상세주소 : { vendorAddress && vendorAddress.detailAddress }
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.props.close} color="secondary">
              닫기
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStatetoProps = ({ accounting }) => {
  const { vendorAddress } = accounting;
  
  return { vendorAddress };
}

export default connect(mapStatetoProps)(GetVendorAddress);