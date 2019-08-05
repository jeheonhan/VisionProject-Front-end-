import React from 'react';
import { connect } from 'react-redux';
import {  addProduct, addOrderToVendor, getProductList , getOrderToVendorProductStatusComplete } from 'actions/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import OrderToVendorRequstList from 'components/productManagement/OrderToVendorRequestList';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
    open: false,
    InteProduction:{
      orderToVendorNo : '',
      statementNo : '',
      totalAmount : '',
      orderToVendorDate : '',
      purchasePrice  : '',
      purchasePrice : '',
      orderToVendorProduct : [ ]
    }
  };
  
  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClickClose = () => {
    this.setState({
      open:false
    })
  }

  handleRequestClose = () => {

    this.setState({open: false});
  };

  close(event){
    this.setState({open: false});
  };
  

  render() {

    return ( 
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            발주
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleRequestClose}
          TransitionComponent={Transition}
        >
          <AppBar className="position-relative">
            <Toolbar className="bg-deep-orange">
              <IconButton onClick={this.handleRequestClose} aria-label="Close">
              </IconButton>
              <Typography variant="title" color="inherit" style={{
                flex: 1,
                minWidth: '485px',
              }}
              align="center"
              >
                발주 
              </Typography>
              <Button onClick={this.handleRequestClose} color="inherit">
                닫기
              </Button>            
            </Toolbar>
          </AppBar>    
  <div  align="center">
  <br/>
          <Typography variant="h4" color="textPrimary" style={{
                flex: 1,
              }}>
                발주 
          <br/><br/>
              </Typography>
              <OrderToVendorRequstList click={this.handleClickClose}></OrderToVendorRequstList>
  </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({productionManagement}) => {
 const {infoAccount}  = productionManagement ; 
   return { infoAccount  };//키값
}

export default connect(mapStateToProps,{addProduct , addOrderToVendor ,getProductList , getOrderToVendorProductStatusComplete})(FullScreenDialog);



    


    

    
    

    
