import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getProductListForOrder } from "actions/ProductionManagement";




class OrderToVendorRequestList extends React.Component {


    constructor(props) {
        super(props);
    
        this.state = {
          ProductListForOrder: this.props.ProductListForOrder
        };
      }

render() {
    const { ProductListForOrder } = this.props;
            if(ProductListForOrder === undefined){
                console.log("if문 ProductListForOrder 들어왓냐");
                console.log(ProductListForOrder);
                this.props.getProductListForOrder();
                console.log(ProductListForOrder);

            }
    let id = 0;

    function createData(productName, quantity, purchasePrice, vendorName) {
      id += 1;
      return {id, productName, quantity, purchasePrice, vendorName };
    }
    
    const data = [
      ProductListForOrder.map((data) => {
            return (
                createData(data.productName , data.quantity , data.purchasePrice , data.vendorName)
            )  
        })
    ];

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
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.productName}</TableCell>
                <TableCell align="right">{n.quantity}</TableCell>
                <TableCell align="right">{n.purchasePrice}</TableCell>
                <TableCell align="right">{n.vendorName}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    )
}
}

const mapStateToProps = (state, {productionManagement}) => {
    console.log(state.productionManagement)
    const  { ProductListForOrder} = productionManagement;
    console.log("정의가 아직안됨");
    console.log(ProductListForOrder);
    return { ProductListForOrder};
  }

export default connect(mapStateToProps , {getProductListForOrder})(OrderToVendorRequestList);
