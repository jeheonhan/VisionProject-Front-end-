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
    }
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
  //랜더링은 setState할때와 reducer가 store값을 세팅할때임.

  render() {

    const {infoAccount} = this.props;
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
      label="거래처선택"
      select
      value= {this.state.product.vendorNo && this.state.product.vendorNo}
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
  </div>
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



    


    

    
    

    
