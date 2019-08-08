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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import GetBankInfo from 'components/accounting/GetBankInfo';
import UpdateVendor from 'components/accounting/UpdateVendor';
import GetVendorAddress from 'components/accounting/GetVendorAddress';
import { getVendor, updateVendor, getVendorList, getCodeList, getVendorBank, getVendorAddress, deleteVendor } from "actions/index";
import { connect } from 'react-redux';
import IconHome from '@material-ui/icons/Home';
import IconPayment from '@material-ui/icons/Payment';
import SweetAlert from 'react-bootstrap-sweetalert';
import SearchBox from 'components/SearchBox';
import Snackbar from '@material-ui/core/Snackbar';

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
            <Checkbox color="primary"
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
// 여기까지는 테이블에서 칼럼 이름에 해당함


let EnhancedTableToolbar = props => {

  const {numSelected} = props;
  const [value, setValue] = React.useState({searchKeyword : ''});

  const updateSearchKeyword = (event) => {
    setValue({
      searchKeyword: event.target.value,
    });
    console.log(value.searchKeyword)
  }

  const searchActivity = (event) => {
    event.preventDefault();
    props.getVendorList(value)
  }

  const searchEnterActivity = (event) => {
    if(event.key === 'Enter'){
      props.getVendorList(value)
    }
  }

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
            <div style={{paddingRight:'10px'}}>
              <Tooltip title="삭제">
                <IconButton aria-label="삭제" onClick={ props.updateUsageStatus }>
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            <Tooltip
            title="검색하기"
            placement={'bottom-start'}
            enterDelay={300}>
              <div style={{paddingRight:'20px'}}>
                <SearchBox 
                  styleName="d-none d-sm-block"
                  placeholder="거래처번호/명"
                  onChange={updateSearchKeyword}
                  value={value.searchKeyword}
                  onClick={ event => searchActivity(event) }
                  onKeyDown={ event => searchEnterActivity(event) }
                />
              </div>
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
      data: this.props.VendorList,
      page: 0,
      rowsPerPage: 10,
      open: false,
      subOpen: false,
      addressOpen: false,
      warning: false,
      user:JSON.parse(localStorage.getItem('user'))
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
  
  //전체선택
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map((row, index) => row.vendorNo)});
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
    event.preventDefault();
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    //기존에 없던 값일때, 기존배열에 새로 붙여서 새로운 배열 반환
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    //기존 배열에서 제일 처음에 있을때, 첫 값 빼고 전부 잘라서 새로운 배열 반환
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    //기존 배열에서 제일 마지막에 있을때, 마지막 값만 빼고 잘라서 새로운 배열 반환
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    //처음, 끝값이 아니면 자신의 위치 구해서 배열 만들어서 반환
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

  //거래처 이체정보 클릭시 발생 이벤트
  getBankInfo = (event, vendorNo) => {
    event.preventDefault();
    console.log("BankInfo 가져오라는 요청 :: "+vendorNo);
    if(vendorNo !== undefined){
      this.props.getVendorBank(vendorNo);
    }
    this.handleRequestOpen();
  }

  //거래처 수정 다이얼로그 클릭시 발생 이벤트
  updateVendorDialog = (event, vendorNo) => {
    event.preventDefault();

    if(Number(this.state.user.rankCodeNo) > 1){
      if(vendorNo !== undefined){
        this.props.getVendor(vendorNo);
      }
      this.updateVendorOpen();
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
    }
  }

  //거래처 주소 다이얼로그 클릭시 발생 이벤트
  getVendorAddress = (event, vendorNo) => {
    event.preventDefault();
    console.log("getVendorAddress 가져오라는 요청");
    if(vendorNo !== undefined){
      this.props.getVendorAddress(vendorNo);
    }
    this.addressVendorOpen();
  }

  //이체정보 다이얼로그 컴포넌트를 조작할 close open 자체는 getBankInfo에서 setState로 true 플래그를 바꿔줘서 열게함
  //다이얼로그에 직접 boolean 값을 string 으로 보내주게 되면 동작은 하지만 에러 발생함. true는 전송할 수 있지만 false는 전송할 수 없다함

  //거래처 이체정보 다이얼로그 열기
  handleRequestOpen = () => {
    this.setState({open : true});
  };
  //거래처 이체정보 다이얼로그 닫기
  handleRequestClose = () => {
    this.setState({open : false});
  };

  //거래처 수정 다이얼로그 열기
  updateVendorOpen = () => {
    this.setState({subOpen : true});
  };

  //거래처 수정 다이얼로그 닫기
  updateVendorClose = () => {
    this.setState({subOpen : false});
  };

  //거래처 주소 다이얼로그 열기
  addressVendorOpen = () => {
    this.setState({addressOpen : true});
  }
  //거래처 주소 다이얼로그 닫기
  addressVendorClose = () => {
    this.setState({addressOpen : false});
  }

  //거래처 삭제시 발생 이벤트 삭제확인 다이얼로그 띄움
  updateUsageStatus = () => {

    if(Number(this.state.user.rankCodeNo) > 1){
      this.setState({ warning : true })
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
    }
  }

  //거래처 삭제 확인 버튼
  deleteFile = () => {
    this.props.deleteVendor(this.state.selected);
    this.setState({
      warning: false,
      selected: []
    })
  };

  //거래처 삭제 취소 버튼
  onCancelDelete = () => {
    this.setState({
      warning: false
    })
  };

  //스낵바 열기
  handleRequestSnackBarOpen = (contents) => {
    this.setState({
      snackbar:true,
      snackbarContents:contents
    })
  }

  //스낵바 닫기
  handleRequestClose = () => {
    this.setState({
      snackbar:false,
      snackbarContents:"",
      open: false
    })
  }
  

  render() {
    if(this.props.VendorList !== this.state.data){
      this.setState({
        data : this.props.VendorList
      })
    }

    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
  
    return (
      <div>
        {/* EnhancedTableToolbar에 함수를 주면 위에있는 함수형 컴포넌트에 사용할 수 있다 */}
        <EnhancedTableToolbar 
          numSelected={selected.length}
          updateUsageStatus={this.updateUsageStatus}  
          getVendorList={this.props.getVendorList}
        />
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
                  const isSelected = this.isSelected(row.vendorNo);
                  
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
                        <Checkbox color="primary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, row.vendorNo)}/>
                      </TableCell>
                      <TableCell align="left" >
                        <Tooltip
                          title="수정하기"
                          placement={'bottom-start'}
                          enterDelay={300}>
                            <span onClick={ event => this.updateVendorDialog(event, row.vendorNo) } style={{cursor:'pointer'}}>
                              {row.vendorNo}
                            </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" >{row.vendorName}</TableCell>
                      <TableCell align="left">{row.representativeName}</TableCell>
                      <TableCell align="left">{row.vendorTel}</TableCell>
                      <TableCell align="left">{row.vendorPhone}</TableCell>
                      <TableCell align="left">{row.vendorCategoryCodeName}</TableCell>
                      <TableCell align="left">
                        <Tooltip
                          title="이체정보"
                          placement={'bottom-start'}
                          enterDelay={300}>
                            <span onClick={ event => this.getBankInfo(event, row.vendorNo) } style={{cursor:'pointer'}}>
                              <IconPayment htmlColor={"#e65100"}/>
                            </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip
                          title="주소정보"
                          placement={'bottom-start'}
                          enterDelay={300}>
                            <span onClick={ event => this.getVendorAddress(event, row.vendorNo) } style={{cursor:'pointer'}} id={row.vendorNo}>
                              <IconHome htmlColor={"#e65100"}/>
                            </span>
                        </Tooltip>
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

            {/* 이체정보를 위한 다이얼로그. 다이얼로그는 미리 띄워놓은 상태이지만 default가 false라 안보이는 것 뿐.
            내가 직접 dialog에 open을 주입해줘야 다이얼로그가 띄워질 것*/}
            {/* 중괄호로 감싸면 JSX에 어떤 표현식이던 넣을 수 있다. 여기에는 자바스크립트 논리 && 연산자도 포함된다.
            이를 사용하면 요소의 조건부 포함을 더 편리하게 할 수 있다. */}
            <GetBankInfo
              open={ this.state.open }
              close={ this.handleRequestClose }
            />

            <UpdateVendor
              open={ this.state.subOpen }
              close={ this.updateVendorClose }
            />
            
            <GetVendorAddress
              open={ this.state.addressOpen }
              close={ this.addressVendorClose }
            />

            <SweetAlert 
              show={this.state.warning}
              warning
              showCancel
              confirmBtnText="삭제"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              cancelBtnText="닫기"
              title="삭제하시겠습니까?"
              onConfirm={this.deleteFile}
              onCancel={this.onCancelDelete}
            >
              삭제시 복구가 불가능합니다
            </SweetAlert>
                
            <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1500"
            onClose={this.handleRequestClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getVendor,
                               updateVendor,
                               getVendorList,
                               getCodeList, 
                               getVendorBank, 
                               getVendorAddress,
                               deleteVendor,
                              })(VendorTable);

