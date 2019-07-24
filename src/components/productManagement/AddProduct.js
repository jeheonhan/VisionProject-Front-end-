import React from 'react';
import { connect } from 'react-redux';
import {  addProduct,getInfoAccount } from 'actions/index';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';


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

  constructor(props){
    super(props);

  }


  state = {
    open: false,
    product:{
      productName : '',
      purchasePrice : '',
      salesPrice : '',
      quantity : '',
      vendorNo : '',
    }
  };



  handleChange = (e) => {
    
    e.preventDefault();

    this.setState({
      ...this.state,
      product : {
        ...this.state.product,
      [e.target.name] : e.target.value,
      }
    });

    console.log(this.state.product);
  };






  //물품 등록창 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //물품 등록창 닫기
  handleClickClose = () => {
    this.setState({
      open:false
    })
  }

  handleRequestClose = () => {
    this.setState({open: false});
  };

 

  //Submit
  handleSubmit = () => {

   this.props.addProduct({
   ...this.state.product
   });

    this.handleClickClose()
  }

  render() {
    const {infoAccount} = this.props;
    console.log("startastatrastat");
    console.log(infoAccount);
   
    return (
      <div>

        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
        </Button>
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
              <Typography variant="title" color="inherit" style={{
                flex: 1,
              }}>
                물품 등록
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
                물품 등록
          <br/><br/>
              </Typography>
              
  <div className="col-md-3 col-3" >
    <TextField
      name="productName"
      label="물품명"
      value={this.state.productName}
      onChange={this.handleChange}
      margin="normal"
      fullWidth
    />
    <br />
    </div>
    <div className="col-md-3 col-3" >
    <TextField
      name="purchasePrice"
      label="매입단가"
      value={this.state.name}
      onChange={this.handleChange}
      margin="normal"
      fullWidth
    />
    <br />
    </div>
    <div className="col-md-3 col-3" >
    <TextField
      name="salesPrice"
      label="출하단가"
      value={this.state.name}
      onChange={this.handleChange}
      margin="normal"
      fullWidth
    />
    <br />
    </div>
    <div className="col-md-3 col-3" >
    <TextField
      name="quantity"
      label="재고"
      value={this.state.name}
      onChange={this.handleChange}
      margin="normal"
      fullWidth
    />
    <br />
    </div>
    <div className="col-md-3 col-3" >
    <TextField
      name="vendorNo"
      label="번호"
      value= {this.state.name}
      onChange={this.handleChange}
      margin="normal"
      fullWidth
    />
    <br />
    </div>
   
  </div>
);
          <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleSubmit}>전송</Button>
        </Dialog>
      </div>
    );
  }
}




const mapStateToProps = ({productionManagement}) => {
 
 const {infoAccount}  = productionManagement ; 
   return { infoAccount  };//키값

}


export default connect(mapStateToProps,{addProduct })(FullScreenDialog);



    


    

    
    

    
