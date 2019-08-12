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
import GetStatementDetail from 'components/accounting/GetStatementDetail';
import { connect } from 'react-redux';
import { getStatement, getStatementList, deleteStatement } from 'actions/index';
import SearchBox from 'components/SearchBox';
import SweetAlert from 'react-bootstrap-sweetalert';
import Snackbar from '@material-ui/core/Snackbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'statementNo', align: false, disablePadding: false, label: '전표번호'},
  {id: 'statementCategoryCodeName', align: true, disablePadding: false, label: '전표구분'},
  {id: 'statementDetail', align: true, disablePadding: false, label: '전표내용'},
  {id: 'tradeDate', align: true, disablePadding: false, label: '거래일자'},
  {id: 'tradeAmount', align: true, disablePadding: false, label: '공급가액'},
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


let EnhancedTableToolbar = props => {
  const {numSelected} = props;
  const [value, setValue] = React.useState({searchKeyword : '', searchCondition : '', anchorEl: undefined, open: false});

  //...클릭시 발생하는 이벤트
  //메뉴바를 내가 클릭한 위치에서 열게해준다.
  const handleClick = event => {
    setValue({open: true, anchorEl: event.currentTarget});
  };

  //메뉴바 닫기
  const handelClose = () => {
    setValue({
      open : false
    })
  }

  //메뉴바에서 메뉴 선택시 발생 이벤트
  const handleRequestChoose = (event, index) => {
    event.preventDefault();
    
    //닫기면 index === 0
    if(index === 0){
      props.getStatementList({searchCondition : ''})
      handelClose();
    //수정이면 index === 1
    } else if(index === 1){
      props.getStatementList({searchCondition : '01'})
      handelClose();
    } else if(index === 2){
      props.getStatementList({searchCondition : '02'})
      handelClose();
    }
  };

  //검색 키워드 수정
  const updateSearchKeyword = (event) => {
    setValue({
      searchKeyword: event.target.value,
    });
  }

  //검색 기능
  const searchActivity = (event) => {
    event.preventDefault();
    props.getStatementList(value.searchKeyword)
  }

  //검색 엔터 기능
  const searchEnterActivity = (event) => {
    if(event.key === 'Enter'){
      props.getStatementList(value.searchKeyword)
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
          <Typography variant="title">전표 목록조회</Typography>
        )}
      </div>

      <div className="spacer"/>

      {numSelected > 0 ? ( 
        <div>
        </div>
      ) : (
        <Tooltip
          title="검색하기"
          placement={'bottom-start'}
          enterDelay={300}>
            <div style={{paddingRight:'20px'}}>
              <SearchBox 
                styleName="d-none d-sm-block" 
                placeholder="전표번호/내용"
                onChange={updateSearchKeyword}
                value={value.searchKeyword}
                onClick={ event => searchActivity(event) }
                onKeyDown={ event => searchEnterActivity(event) }
              />
            </div>
        </Tooltip>
      )}
      <div className="actions">
        {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="삭제">
            <IconButton aria-label="삭제" onClick={ props.updateUsageStatus }>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            title="전표필터"
            placement={'bottom-start'}
            enterDelay={300}>
              <div style={{paddingRight:'20px'}}>
                <IconButton
                className="icon-btn p-1 text-white ml-auto"
                aria-label="More"
                aria-owns={value.open ? 'long-SidenavContent.js' : null}
                aria-haspopup
                onClick={handleClick}>
                  <MoreVertIcon color='action'/>
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={value.anchorEl}
                  open={value.open}
                  onClose={handelClose}
                  MenuListProps={{
                    style: {
                      width: 100,
                    },
                }}>
                  <MenuItem onClick={event => handleRequestChoose(event, 0)}>
                      전체보기
                  </MenuItem>
                  <MenuItem onClick={event => handleRequestChoose(event, 1)}>
                      매출전표
                  </MenuItem>
                  <MenuItem onClick={event => handleRequestChoose(event, 2)}>
                      매입전표
                  </MenuItem>
                </Menu>
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


class StatementTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.statementList.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      detailDialogOpen: false,
      warning: false,
      updateSuccess : false,
      snackBar: false,
      user: JSON.parse(localStorage.getItem('user'))
    };
  }

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
      this.setState({selected: this.state.data.map((row, index) => row.statementNo)});
      return;
    }
    this.setState({selected: []});
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  //snackBar 열기
  openSnackBar  = () => {
    this.setState({ ...this.state, snackBar: true });
  };

  //snackBar 닫기
  closeSnackBar = () => {
    this.setState({ ...this.state, snackBar: false });
  };

  handleClick = (event, id, statementDetail) => {
    
    if(statementDetail.substring(statementDetail.length-2,statementDetail.length) === '가맹' || statementDetail.substring(0,2) === '주문' || statementDetail.substring(0,2) === '발주'){
      this.openSnackBar()
      return 
    }

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

  //전표 상세조회 다이얼로그 열기
  statementDetailDialogOpen = () => {
    this.setState({
      detailDialogOpen : true
    })
  }

  //전표 상세조회 다이얼로그 닫기
  statementDetailDialogClose = () => {
    this.setState({
      detailDialogOpen : false
    })
  }

  //전표 상세조회 클릭 이벤트
  GetStatementDetail = (event, statementNo) => {
    event.preventDefault();
    this.props.getStatement(statementNo);
    this.statementDetailDialogOpen();
  }
  
  //전표 삭제시 발생 이벤트 삭제확인 다이얼로그 띄움
  updateUsageStatus = () => {
    if(Number(this.state.user.rankCodeNo) > 1){
      this.setState({ warning : true })
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
    }
  }

  //전표 삭제 확인 버튼
  deleteFile = () => {
    this.props.deleteStatement(this.state.selected);
    this.setState({
      warning: false,
      selected: []
    })
  };

  //전표 삭제 취소 버튼
  onCancelDelete = () => {
    this.setState({
      warning: false
    })
  };

  //수정성공알람 켜기
  openUpdateSuccessAlarm = () => {
    this.setState({
      ...this.state,
      updateSuccess : true
    })
  }

  //수정성공알람 끄기
  closeUpdateSuccessAlarm = () => {
    this.setState({
      ...this.state,
      updateSuccess : false
    })
  }

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

    if(this.props.statementList !== this.state.data){
      this.setState({
        data : this.props.statementList
      })
    }

    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
  
    return (
      <div>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          getStatementList={this.props.getStatementList}
          updateUsageStatus={this.updateUsageStatus}
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
                  const isSelected = this.isSelected(row.statementNo);
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
                                  onClick={event => this.handleClick(event, row.statementNo, row.statementDetail)}/>
                      </TableCell>
                      <TableCell align="left">
                        <Tooltip
                          title="상세보기"
                          placement={'bottom-start'}
                          enterDelay={300}>
                            <span onClick={event => this.GetStatementDetail(event, row.statementNo)} style={{cursor:'pointer'}}>
                              {row.statementNo}
                            </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">{row.statementCategoryCodeName}</TableCell>
                      <TableCell align="left">{row.statementDetail}</TableCell>
                      <TableCell align="left">{row.tradeDate}</TableCell>
                      <TableCell align="left">{row.tradeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
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

            <GetStatementDetail
              open={this.state.detailDialogOpen}
              close={this.statementDetailDialogClose}
              openUpdateSuccessAlarm={this.openUpdateSuccessAlarm}
              closeUpdateSuccessAlarm={this.closeUpdateSuccessAlarm}
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

            <SweetAlert 
              show={this.state.updateSuccess} 
              success 
              title="수정완료"
              onConfirm={this.closeUpdateSuccessAlarm}
              confirmBtnText="확인"
              confirmBtnBsStyle="danger"
            >
              수정에 성공했습니다
            </SweetAlert>

            <Snackbar
              anchorOrigin={{vertical: 'top', horizontal: 'center'}}
              open={this.state.snackBar}
              onClose={this.closeSnackBar}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">발주, 주문, 가맹 전표는 삭제할 수 없습니다</span>}
              autoHideDuration={1500}
            />

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


export default connect(null, { getStatement, getStatementList, deleteStatement })(StatementTable);