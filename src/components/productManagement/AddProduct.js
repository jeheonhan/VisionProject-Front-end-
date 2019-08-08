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
import MenuItem from '@material-ui/core/MenuItem';
import { Input } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Snackbar from '@material-ui/core/Snackbar';

class TradeAmountMask extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        thousandSeparator
      />
    );
  }
}

TradeAmountMask.propTypes = {
  onChange: PropTypes.func.isRequired,
};



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
      vendorName : '',
    },
    snackBar: false,
    snackBarContents : '',
  };

  handleChange = (e) => {

    e.preventDefault();
    var _vendorName;

    if(e.target.name == 'vendorNo'){
      if(this.props.infoAccount !== null){
        this.props.infoAccount.map(element => {
          if(element.vendorNo == e.target.value){
            _vendorName = element.vendorName;
          }
        })
      }
      this.setState({
        product:{
          ...this.state.product,
          vendorName:_vendorName,
          vendorNo:e.target.value
        }
      })
    }else{
      this.setState({
        ...this.state,
        product : {
          ...this.state.product,
        [e.target.name] : e.target.value,
        }
      });
    }
  };


  //물품 등록창 열기
  handleClickOpen = () => {
    this.setState({open: true});
  };

  //물품 등록창 닫기
  handleClickClose = () => {
    this.setState({
      open:false,
      product:null
    })
  }

  handleRequestClose = () => {
    this.setState({open: false});
  };

   //snackBar 열기
   openSnackBar  = (valueName) => {
    this.setState({ ...this.state, snackBar: true, snackBarContents : valueName });
  };

  //snackBar 닫기
  closeSnackBar = () => {
    this.setState({ ...this.state, snackBar: false });
  };

  //Submit
  handleSubmit = () => {
    

    if(this.state.product.productName === ''){
      this.openSnackBar('물품명')
    } else if(this.state.product.purchasePrice === ''){
      this.openSnackBar('매입단가')
    } else if(this.state.product.salesPrice === ''){
      this.openSnackBar('출하단가')
    } else if(this.state.product.quantity === ''){
      this.openSnackBar('재고')
    } else if(this.state.product.vendorName === ''){
      this.openSnackBar('거래처')
    } else {
    
      this.props.addProduct({
        ...this.state.product
        })
        this.handleClickClose();
    }


  }
  //랜더링은 setState할때와 reducer가 store값을 세팅할때임.

  render() {

    const {infoAccount} = this.props;
    const { product } = this.state;

    return (
      <div>
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
            등록
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
              
            <div className="col-md-6 col-12" >
              <TextField
                name="productName"
                label="물품명"
                value={product && product.productName}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
              />
              <br />
              </div>
   
              <div className="col-md-6 col-12" >
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel htmlFor="purchasePrice">매입단가</InputLabel>
                  <Input
                    name="purchasePrice"
                    placeholder="매입단가 입력"
                    inputComponent={TradeAmountMask}
                    value={product && product.purchasePrice}
                    fullWidth={true}
                    margin="none"
                    onChange={this.handleChange}
                    endAdornment={product && product.purchasePrice ? (<InputAdornment position="end">원</InputAdornment>) :  null}
                  />
                </FormControl>
              </div>
  

             <div className="col-md-6 col-12" >
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel htmlFor="salesPrice">출하단가</InputLabel>
                  <Input
                    name="salesPrice"
                    inputComponent={TradeAmountMask}
                    label="출하단가"
                    value={product && product.salesPrice}
                    fullWidth={true}
                    margin="none"
                    onChange={this.handleChange}
                    endAdornment={product && product.salesPrice ? (<InputAdornment position="end">원</InputAdornment>) :  null}
                  />
                </FormControl>
              </div>


              <div className="col-md-6 col-12" >
                <FormControl className="mb-3" fullWidth margin='normal'>
                  <InputLabel htmlFor="quantity">재고</InputLabel>
                  <Input
                    name="quantity"
                    inputComponent={TradeAmountMask}
                    label="재고"
                    value={product && product.quantity}
                    fullWidth={true}
                    margin="none"
                    onChange={this.handleChange}
                    endAdornment={product && product.quantity ? (<InputAdornment position="end">개</InputAdornment>) :  null}
                  />
                </FormControl>
              </div>
      
    <div className="col-md-6 col-12" >
    <TextField
      name="vendorNo"
      label="거래처선택"
      select
      value= {product && product.vendorNo}
      onChange={this.handleChange}
      margin="normal"
      helperText="거래처를 선택하세요"
      fullWidth
      //셀렉트바에서는 값을 하나만 넘겨야함.
      //객체인채로 보내도 되는데 그러면 셀렉트바에서는 원하는 값이 안뜸.
    >
      {infoAccount && infoAccount.map( option => (

        <MenuItem  key={option.vendorNo} value={option.vendorNo}>
        {option.vendorName} 

        </MenuItem>

  //셀릭트바에서 거래처명을 클릭했을때 거래처명과 거래처번호를 둘 다 넘기는 방법을 몰라서 물어봤었음
  //1. handlechange에서 이벤트의 vendorname을 가져와서 for문으로 vendorNo을 가져온다고하고(index함수사용)
  //2. 새로운 함수를 만들어서 set해준다고함.
  //3. 하나의 함수에서만 쓸거라면 map으로 객체정보를 다 가져오니 이 객체를 넘겨서 set해줘도

))}
 </TextField>
    <br />
    </div>

    <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={this.state.snackBar}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarContents} 항목을 입력하지 않으셨습니다</span>}
                    autoHideDuration={1500}
                  />
      </div>
      <br/>
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



    


    

    
    

    
