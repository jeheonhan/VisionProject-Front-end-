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
    
    return (
      <div>
        <Dialog open={this.props.open} onClose={this.props.close}>
          <DialogTitle>
            {"거래처주소"}
          </DialogTitle>
            <DialogContent style={{maxWidth:"360px", minWidth:"360px", maxHeight:"180px", minHeight:"180px"}}>
              <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                <div className="mr-3">
                  <i className={`zmdi zmdi-email jr-fs-xxl text-grey`}/>
                </div>
                <div className="media-body">
                  <span className="mb-0 text-grey jr-fs-sm">우편번호</span>
                  <p className="mb-0">{ vendorAddress && vendorAddress.zipCode }</p>
                </div>
              </div>
              <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                <div className="mr-3">
                  <i className={`zmdi zmdi-home jr-fs-xxl text-grey`}/>
                </div>
                <div className="media-body">
                  <span className="mb-0 text-grey jr-fs-sm">주소</span>
                  <p className="mb-0">{ vendorAddress && vendorAddress.address }</p>
                </div>
              </div>
              <div className="media align-items-center flex-nowrap jr-pro-contact-list">
                <div className="mr-3">
                  <i className={`zmdi zmdi-pin jr-fs-xxl text-grey`}/>
                </div>
                <div className="media-body">
                  <span className="mb-0 text-grey jr-fs-sm">상세주소</span>
                  <p className="mb-0">{ vendorAddress && vendorAddress.detailAddress }</p>
                </div>
              </div>
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