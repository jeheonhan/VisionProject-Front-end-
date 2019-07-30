import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { modifyOrderBranchStatus } from 'actions/index'
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ApprovalFormDetail from 'components/approvalForm/ApprovalFormDetail'
import ProductionManagement from 'reducers/ProductionManagement';
import { RemoveShoppingCart } from '@material-ui/icons'
import OrderBranchDetailCompany from 'components/productManagement/OrderBranchDetailCompany'
import SweetAlert from 'react-bootstrap-sweetalert'
import {Done} from '@material-ui/icons';
import ShippingDialog from 'components/productManagement/ShippingDialog'
//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  
  {id: 'orderFromBranchNo', align: true, disablePadding: false, label: '주문번호'},
  {id: 'branchName', align: true, disablePadding: false, label: '지점명'},
  {id: 'orderDate', align: true, disablePadding: false, label: '주문일자'},
  {id: 'orderFromBranchStatusCodeName', align: false, disablePadding: false, label: '주문서상태'},
  {id: 'leftProdToShip', align: false, disablePadding: false, label: '출하대기상품'},
];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {/* 칼럼명 나타나는 영역 */}
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}


let EnhancedTableToolbar = props => {
  const {numSelected} = props;
  
  return (
    <Toolbar
      className="table-header">
        {/* 상단 툴바
            체크가 되면 selected로 변경됨 */}
      <div className="title">
        {numSelected > 0 ? (
          <Typography variant="subheading">{numSelected} 선택</Typography>
        ) : (
          <Typography variant="title">주문서목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    if(property==='leftProdToShip'){
        order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] - a[orderBy] ))
        : this.state.data.sort((a, b) => (a[orderBy] - b[orderBy] ));
    }
    this.setState({data, order, orderBy});
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      //this.setState({selected: this.state.data.map((row, index) => index)});
      return;
    }
    this.setState({selected: []});
  };
  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };
  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };
  handleChangePage = (event, page) => {
    this.setState({page});
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  //카트 클릭 시 삭제 알러트 띄우기
  onCancelOrderAlert = (event, _row) => {
    event.preventDefault();
    this.setState({
      row:_row,
      warning:true,
    })
  }

  warningOk = () => {
    this.setState({
        warning:false
    })
    this.handleCancelOrder()
}
onCancel = () => {
  this.setState({
      warning:false
  })
}

  //카트 클릭 시 삭제
  handleCancelOrder = () => {
    const statusCode = "05"
    let data = this.state.row;
    data.orderFromBranchStatusCodeNo=statusCode;
    this.props.modifyOrderBranchStatus(data);
  }


  //주문번호 클릭 시 상세조회 띄우기
  handleClickNo = (event, row) => {
    event.preventDefault();
    this.setState({
      ...this.state,
      open: true,
      targetOB: row
    })
  }

  //주문상세창 닫기
  handleClose = (event) => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  //미배송다이얼로그
  onShippingDialog = (event, row) => {
      if(event!=null){
          event.preventDefault();
      }
      this.setState({
        shippingOpen:true,
        row:row,
        shipList:row.orderFromBranchProductList,
        shipOrderStatus : row.orderFromBranchStatusCodeNo
      })
  }
  
  onShippingDialogClose = () => {
    this.setState({shippingOpen: false});
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'codeNo',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.orderBranchList,
      page: 0,
      rowsPerPage: 10,
      warning:false,
      shippingOpen:false,
      shipList:[],
      targetOB :{
        statementNo:null
        ,orderFromBranchNo:null
        ,orderFromBranchStatusCodeNo:null
        ,orderFromBranchStatusCodeName:null
        ,orderFromBranchTotalAmount:""
        ,branchName:""
        ,branchNo:""
        ,orderDate:""
        ,accountNo:""
        ,orderFromBranchProductList:[
             {
             numbering:null
             ,productNo:""
             ,productName:null
             ,price:""
             ,orderFromBranchProductStatusCodeNo:null
             ,orderFromBranchProductStatusCodeName:null
             ,orderFromBranchNo:null
             ,orderFromBranchProductQuantity:""
             ,orderFromBranchProductAmount:""
             }
           ]
     }
    };
  }

  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;

    const { orderBranchList } = this.props;

    if(orderBranchList !== this.state.data){
      this.setState({data:orderBranchList})
    }

    if(this.state.row!=null && this.state.row!==undefined){
        const obForDialog = orderBranchList[orderBranchList.findIndex((orderBranch) => orderBranch.orderFromBranchNo===this.state.row.orderFromBranchNo)];
        if( (obForDialog.orderFromBranchProductList !== this.state.shipList) && this.state.shippingOpen){
            this.setState({
                row:obForDialog,
                shipList:obForDialog.orderFromBranchProductList,
                shipOrderStatus : obForDialog.orderFromBranchStatusCodeNo
            })
          }
    }
    
    return (
      <div className="jr-card">
        {/* <EnhancedTableToolbar numSelected={selected.length}/> */}
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                
                {/* props로 받은 list값을 페이지에 맞게 잘라서 map()을 사용함 */}
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  console.log("page::"+page+" rowsPerPage :: "+rowsPerPage+" index :: "+index+" data.length ::"+data.length);
                  const isSelected = this.isSelected(page*rowsPerPage+index);
                  return (
                    <TableRow
                      hover
                      onKeyDown={event => this.handleKeyDown(event, page*rowsPerPage+index)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={page*rowsPerPage+index}
                      selected={isSelected}
                    >
                      
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickNo(event, row)}>
                          {row.orderFromBranchNo}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickNo(event, row)}>
                          {row.branchName}
                        </span>
                      </TableCell>
                      <TableCell align="left">{row.orderDate}</TableCell>
                      <TableCell align="left"  size="small" >{row.orderFromBranchStatusCodeName}{ 
                            row.orderFromBranchStatusCodeNo==="04" && 
                            <span style={{cursor:'pointer', paddingLeft:"25px"}}  onClick={(event) => this.onCancelOrderAlert(event, row)}>
                                <Done/>
                            </span>
                            }</TableCell>
                      <TableCell align="left" >
                      {row.orderFromBranchStatusCodeNo==="01" || row.orderFromBranchStatusCodeNo==="03" ? <span style={{cursor:'pointer'}}  onClick={(event) => this.onShippingDialog(event, row)}>{row.leftProdToShip}</span> : <span style={{cursor:'pointer'}}  onClick={(event) => this.onShippingDialog(event, row)}><i class="zmdi zmdi-minus zmdi-hc-1x"></i></span>}
                      </TableCell>
                   
                   </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <OrderBranchDetailCompany targetOB={this.state.targetOB} 
                            open={this.state.open} 
                            handleClose={this.handleClose}/>
        <ShippingDialog open={this.state.shippingOpen}
                        cancel={this.onShippingDialogClose}
                        productList={this.state.shipList}
                        status={this.state.shipOrderStatus}/>
        <SweetAlert show={this.state.warning}
                    warning
                    showCancel
                    confirmBtnText="네, 취소합니다"
                    cancelBtnText="나가기"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="주문이 취소됩니다."
                    onConfirm={this.warningOk}
                    onCancel={this.onCancel}
            >
                주문을 취소하시겠습니까?
            </SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = ({ productionManagement }) => {
    const { orderBranchList } = productionManagement;
    return { orderBranchList }
}

export default connect(mapStateToProps, {modifyOrderBranchStatus})(EnhancedTable);