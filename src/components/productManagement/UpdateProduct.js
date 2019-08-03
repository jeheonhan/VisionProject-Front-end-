import React from 'react';
import { connect } from 'react-redux';
import { getCodeList, cleanStoreState, updateAccount, updateProduct } from 'actions/index';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from '@material-ui/core/MenuItem';
import SweetAlert from 'react-bootstrap-sweetalert';

class UpdateProduct extends React.Component {
  
    state = {
        success : false,
        updateFlag : false
    }

    //물품수정 제출
    submitProduct = (event) => {
        event.preventDefault();
        this.props.updateProduct(this.state.product);
        this.setState({ updateFlag : false });
        this.props.cleanStoreState('Product');
        this.openSuccessAlarm();
    }

    //물품수정
    handleChange = name => event => {
        this.setState({
            product : { ...this.state.product, [name] : event.target.value}
        })
        console.log(this.state.product)
    }

    //물품수정 다이얼로그 닫기
    closeUpdateProduct = (event) => {
        event.preventDefault();
        this.setState({ updateFlag : false});
        this.props.cleanStoreState('Product');
        this.props.close();
    }

    //수정성공알람 켜기
    openSuccessAlarm = () => {
        this.setState({
        ...this.state,
        success : true
        })
    }

    //수정성공알람 끄기
    closeSuccessAlarm = () => {
        this.setState({
        ...this.state,
        success : false
        })
        this.props.close();
    }

    render() {
    const { Product } = this.props;
    console.log(Product);

    if( !this.state.updateFlag ) {

        if(this.state.product !== Product && Product !== null) {
            this.setState({
                
                updateFlag : true,
                product : Product
            })
        }
    }

    return (
      <div>
        
        <Dialog open={this.props.open} maxWidth="lg" onClose={ event => this.closeUpdateProduct(event) }>
          <DialogTitle>물품수정</DialogTitle>
            <DialogContent style={{minWidth: '700px', maxWidth: '700px'}}>
          
                    <form className="row" noValidate autoComplete="off">
                        
                        <div className="col-md-5 col-6" style={{float:"left"}}>
                            <TextField
                                id="productName"
                                label="물품명"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                placeholder="물품명"
                                value={this.state.product && this.state.product.productName}
                                fullWidth={true}
                                margin="normal"
                            />
                        </div>
                        <div className="col-md-5 col-6" style={{float:"left"}}>
                            <TextField
                                id="purchasePrice"
                                label="매입단가"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                placeholder="매입단가"
                                value={this.state.product && this.state.product.purchasePrice}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('purchasePrice')}
                            />
                        </div>

                        <div className="col-md-5 col-6" style={{float:"left"}}>
                            <TextField
                                id="salesPrice"
                                label="출하단가"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                placeholder="출하단가"
                                value={this.state.product && this.state.product.salesPrice}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('salesPrice')}
                            />
                        </div>

                        <div className="col-md-5 col-6" style={{float:"left"}}>
                            <TextField
                                id="quantity"
                                label="재고"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                placeholder="재고"
                                value={this.state.product && this.state.product.quantity}
                                fullWidth={true}
                                margin="normal"
                                onChange={this.handleChange('quantity')}
                            />
                        </div>
                    </form>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={(event) => {this.submitProduct(event)}}>
                수정
            </Button>
            <Button onClick={ event => this.closeUpdateProduct(event) } color="primary">
                닫기
            </Button>
          </DialogActions>

          <SweetAlert 
            show={this.state.success} 
            success 
            title="수정완료"
            onConfirm={this.closeSuccessAlarm}
            confirmBtnText="확인"
            confirmBtnBsStyle="danger"
            >
            수정에 성공했습니다
        </SweetAlert>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ productionManagement }) => {

    const { Product } = productionManagement;

    return { Product };
}

export default connect(mapStateToProps, {cleanStoreState, updateProduct})(UpdateProduct);