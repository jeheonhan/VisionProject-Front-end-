import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getProductListForOrder } from "actions/ProductionManagement";
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';



class OrderToVendorRequestList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          orderToVendorRequestList: [
            
          ]
        };
      }
      

      
      handleNumberInputChange = (key, n, index) => event => {
       
        console.log(n);
        console.log(key);
        let _quantity = parseInt(event.target.value, 10);
        if(isNaN(_quantity)){
          _quantity = 0
        }
        if(_quantity>n.quantity){
          _quantity = n.quantity;
        }
        if(n.quantity==0){
          return this.onLackQuantity();
        }
        if(_quantity<=0){
          if(key==-1){
            return;
          }
          
          let list = this.state.orderToVendorRequestList;
          list.splice(key,1)
          this.setState({
            orderToVendorRequestList : list
          })
          return;
        }
    
        if(key==-1){
          console.log(n)
          this.setState({
            orderToVendorRequestList: this.state.orderToVendorRequestList.concat(
              {productNo:n.productNo
               ,productName:n.productName
               ,price:n.purchasePrice
               ,orderToVendorProductQuantity:_quantity
               ,orderToVendorProductAmount:n.purchasePrice*_quantity
               })
         
          })
        }else{
          let list = this.state.orderToVendorRequestList;
          let updatedProd = 
            {productNo:n.productNo
            ,productName:n.productName
            ,price:n.purchasePrice
            ,orderToVendorProductQuantity:_quantity
            ,orderToVendorProductAmount:n.purchasePrice*_quantity
            };
          list.splice(key,1,updatedProd)
    
          this.setState({
            orderToVendorRequestList:list
          })
    
        }
      };


      onLackQuantity = () => {
        this.setState({
          warning:true,
          warningText:"현재 재고가 없는 상품입니다."
        })
      }

render() {


  
            
             const { ProductListForOrder } = this.props;
             const { data } = this.state;


            if(ProductListForOrder === undefined){
                console.log("if문 ProductListForOrder 들어왓냐");
                console.log(ProductListForOrder);
                this.props.getProductListForOrder();
                console.log(ProductListForOrder);

            }
            else if(ProductListForOrder && ProductListForOrder != this.state.data){
              this.setState({data:ProductListForOrder})
            }
            
            let total = 0;

            if(this.state.orderToVendorRequestList.length!=0){
            this.state.orderToVendorRequestList.map((prod) => {
              console.log(total);
              return total += prod.orderToVendorProductAmount
            })}
        
 
            

  return (
    
  <div className="table-responsive-material" >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>물품명</TableCell>
            <TableCell align="right">수량</TableCell>
            <TableCell align="right">구입가</TableCell>
            <TableCell align="right">거래처</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.productName}</TableCell>
                <TableCell align="right">
                
                <FormControl style={{width:"100px"}}>
                                                <Input
                                                    id={n.productNo}
                                                    type="number"
                                                    value=
                                                    { this.state.orderToVendorRequestList.
                                                    findIndex(prod => prod.productNo===n.productNo)  != -1 ?
                                                     this.state.orderToVendorRequestList[this.state.orderToVendorRequestList.findIndex(prod => prod.productNo===n.productNo)].quantity : 0}
                                                    
                                                     onChange=
                                                      {this.handleNumberInputChange(this.state.orderToVendorRequestList.findIndex(prod => prod.productNo===n.productNo), n)}
                                                />
                                                </FormControl>
                
                
                
                </TableCell>
                <TableCell align="right">{n.purchasePrice}</TableCell>
                <TableCell align="right">{n.vendorName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <div style={{position:"fixed", width:"300px", height:"50px", display:"inline-block", right:"20%", /* 창에서 오른쪽 길이 */ top:"80%", /* 창에서 위에서 부터의 높이 */ backgroundColor: "transparent", margin:0}}><Paper className="text-white" style={{backgroundColor:"#f15b41", padding:"20px", float:"right"}}elevation={16}>총 주문금액:{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Paper></div>
    </div>
    )
}
}

const mapStateToProps = ( {productionManagement}) => {
    const  { ProductListForOrder} = productionManagement;
    return { ProductListForOrder};
  }

export default connect(mapStateToProps , {getProductListForOrder})(OrderToVendorRequestList);
