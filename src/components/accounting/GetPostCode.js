import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DaumPostcode from 'react-daum-postcode';

class GetPostCode extends React.Component {
  
  constructor(props){
    super(props);
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
       
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>우편번호검색</Button>
        
        <Dialog open={this.state.open} onClose={this.handleRequestClose}>
          <DialogTitle>우편번호검색</DialogTitle>
          <DialogContent>
            <Postcode getPostcode={this.props.getPostcode} handle={this.handleRequestClose}></Postcode>
          </DialogContent>
        </Dialog>
      </div>
    );
  } 
}//end of class

export default GetPostCode;

//주소검색창

function Postcode(props){

  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.handle();
    props.getPostcode(data.zonecode, fullAddress);
  }

    return (
      <DaumPostcode onComplete={handleAddress} autoClose={true} width={"500"} />
    );
  
};