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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Note';
import FilterListIcon from '@material-ui/icons/FilterList';
import GetBankInfo from 'components/accounting/GetBankInfo';
import UpdateVendor from 'components/accounting/UpdateVendor';
import GetVendorAddress from 'components/accounting/GetVendorAddress';
import { getVendor, updateVendor, getCodeList } from "actions/index";
import { connect } from 'react-redux';
import IconHome from '@material-ui/icons/Home'
import IconPayment from '@material-ui/icons/Payment'


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'vendorNo', align: false, disablePadding: false, label: '거래처번호'},
  {id: 'vendorName', align: true, disablePadding: false, label: '거래처명'},
  {id: 'representativeName', align: true, disablePadding: false, label: '대표자명'},
  {id: 'vendorTel', align: true, disablePadding: false, label: '전화번호'},
  {id: 'vendorPhone', align: true, disablePadding: false, label: '휴대폰번호'},
  {id: 'vendorCategoryCodeName', align: true, disablePadding: false, label: '거래처분류'},
  {id: 'bankInfo', align: true, disablePadding: false, label: '이체정보'},
  {id: 'address', align: true, disablePadding: false, label: '주소'},
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
          <TableCell padding="checkbox">
            <Checkbox color="secondary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={onSelectAllClick}
            />
          </TableCell>
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
}//end of class


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
          <Typography variant="title">거래처 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <div className="actions">
        {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="수정">
            <IconButton aria-label="수정">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon/>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class VendorTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.VendorList.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      open: false,
      subOpen: false,
      addressOpen: false
    };
  }
  //이체정보 다이얼로그를 띄우는데 필요한 플래그 state



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

    this.setState({data, order, orderBy});
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map((row, index) => index)});
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

  getBankInfo = (event, vendorNo) => {
    event.preventDefault();
    console.log("BankInfo 가져오라는 요청 :: "+vendorNo);
    if(vendorNo !== undefined){
      this.props.getVendor(vendorNo);
    }
    this.setState({open : true});
  }

  updateVendor = (event, vendorNo) => {
    event.preventDefault();
    console.log("updateVendor 가져오라는 요청");
    if(vendorNo !== undefined){
      this.props.getVendor(vendorNo);
    }
    this.setState({subOpen : true})
  }

  getVendorAddress = (event, vendorNo) => {
    event.preventDefault();
    console.log("updateVendor 가져오라는 요청");
    if(vendorNo !== undefined){
      this.props.getVendor(vendorNo);
    }
    this.setState({addressOpen : true})
  }

  //이체정보 다이얼로그 컴포넌트를 조작할 close open 자체는 getBankInfo에서 setState로 true 플래그를 바꿔줘서 열게함

  handleRequestClose = () => {
    this.setState({open : false});
  };

  updateVendorClose = () => {
    this.setState({subOpen : false});
  };

  addressVendorClose = () => {
    this.setState({addressOpen : false});
  }

  render() {

    const { bankList, vendorList } = this.props;
    if(bankList === undefined){
      this.props.getCodeList({ searchKeyword : "bank" });
      this.props.getCodeList({ searchKeyword : "vendor" });
    }

    if(this.props.VendorList !== this.state.data){
      this.setState({
        data : this.props.VendorList
      })
    }

    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
  
    return (
      <div>
        <EnhancedTableToolbar numSelected={selected.length}/>
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
                  const currVenorNo = row.vendorNo;
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
                      <TableCell padding="checkbox">
                        <Checkbox color="secondary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, page*rowsPerPage+index)}/>
                      </TableCell>
                      <TableCell align="left" ><span onClick={ event => this.updateVendor(event, row.vendorNo) } style={{cursor:'pointer'}}>{row.vendorNo}</span></TableCell>
                      <TableCell align="left" >{row.vendorName}</TableCell>
                      <TableCell align="left">{row.representativeName}</TableCell>
                      <TableCell align="left">{row.vendorTel}</TableCell>
                      <TableCell align="left">{row.vendorPhone}</TableCell>
                      <TableCell align="left">{row.vendorCategoryCodeName}</TableCell>
                      <TableCell align="left"><span onClick={ event => this.getBankInfo(event, row.vendorNo) } style={{cursor:'pointer'}}><IconPayment htmlColor={"#e65100"} titleAccess={"이체정보보기"} /></span></TableCell>
                      <TableCell align="left"><span onClick={ event => this.getVendorAddress(event, row.vendorNo) } style={{cursor:'pointer'}} id={row.vendorNo}><IconHome htmlColor={"#e65100"} titleAccess={"주소보기"} /></span></TableCell>
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

            {/* 이체정보를 위한 다이얼로그. 다이얼로그는 미리 띄워놓은 상태이지만 default가 false라 안보이는 것 뿐.
            내가 직접 dialog에 open을 주입해줘야 다이얼로그가 띄워질 것*/}
            {/* 중괄호로 감싸면 JSX에 어떤 표현식이던 넣을 수 있다. 여기에는 자바스크립트 논리 && 연산자도 포함된다.
            이를 사용하면 요소의 조건부 포함을 더 편리하게 할 수 있다. */}
            { this.props.Vendor && (<GetBankInfo
              open={ this.state.open }
              close={ this.handleRequestClose }
              vendor={ this.props.Vendor }
            />)}
            { this.props.Vendor && (<UpdateVendor
              bankCodeList={ bankList } 
              vendorCodeList={ vendorList }
              open={ this.state.subOpen }
              close={ this.updateVendorClose }
              vendor={ this.props.Vendor }
              updateVendor={ this.props.updateVendor }
            />)}
            { this.props.Vendor && (<GetVendorAddress
              open={ this.state.addressOpen }
              close={ this.addressVendorClose }
              vendor={ this.props.Vendor }
            />)}
                
          </div>
        </div>
      </div>
    );
  }
}

    const mapStateToProps = ({accounting, code}) => {
      const { Vendor } = accounting;
      const { bankList, vendorList } = code;
      return { Vendor, bankList, vendorList  };
    }

export default connect(mapStateToProps, { getVendor, updateVendor, getCodeList } )(VendorTable);

