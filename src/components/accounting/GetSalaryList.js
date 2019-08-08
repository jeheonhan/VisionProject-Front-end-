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
import UpdateSalary from 'components/accounting/UpdateSalary';
import { connect } from 'react-redux';
import { getSalary, updateSalaryStatus } from 'actions/index';
import Button from '@material-ui/core/Button';
import Iamport from 'react-iamport';
import SweetAlert from 'react-bootstrap-sweetalert'

//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'salaryDate', align: false, disablePadding: false, label: '급여월'},
  {id: 'employeeName', align: true, disablePadding: false, label: '사원명'},
  {id: 'totalRegularWorkTime', align: true, disablePadding: false, label: '소정근로시간(분)'},
  {id: 'totalExtendWorkTime', align: true, disablePadding: false, label: '연장근로시간(분)'},
  {id: 'wage', align: true, disablePadding: false, label: '시급'},
  {id: 'salaryStatusCodeName', align: true, disablePadding: false, label: '급여상태'},
  {id: 'individualTotalSalary', align: true, disablePadding: false, label: '개인지급총액'},
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

          {/* <TableCell padding="checkbox">
            <Checkbox color="secondary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={onSelectAllClick}
            />
          </TableCell> */}

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
          <Typography variant="title">계좌 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      {/* <div className="actions">
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
      </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class SalaryTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.salaryList.sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      updateSalaryDialogOpen: false,
      changeSalaryStatusConfirm: false
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
  
  //급여수정 다이얼로그 열기
  openUpdateSalaryDialog = () => {
    this.setState({
      updateSalaryDialogOpen : true
    })
  }

  //급여수정 다이얼로그 닫기
  closeUpdateSalaryDialog = () => {
    this.setState({
      updateSalaryDialogOpen : false
    })
  }
  
  //급여수정 화면 띄우기
  updateSalaryDialog = (event, salaryNumbering) => {
    event.preventDefault();
    this.props.getSalary(salaryNumbering);
    this.openUpdateSalaryDialog();
  }

  //급여상태 변경
  changeSalaryStatus = (event, _salaryNumbering, _salaryStatusCodeNo) => {
    event.preventDefault();
    //this.onClickConfirmChangeSalaryStatus(_salaryNumbering, _salaryStatusCodeNo);
    this.setState({
      paramSalaryNumbering:_salaryNumbering,
      paramSalaryStatusCodeNo:_salaryStatusCodeNo
    })
    this.handleOpenConfirmChangeSalaryStatus();
  }

  onSuccessIamport = (_salaryNumbering, _salaryStatusCodeNo ) => {
    // alert('계좌이체 성공')
    // this.props.updateSalaryStatus({ salaryNumbering : _salaryNumbering, 
    //                                 salaryStatusCodeNo : _salaryStatusCodeNo  })
  }

  onFailIamport = () => {

  }

  //급여상태 변경 확인창 열기
  handleOpenConfirmChangeSalaryStatus = () => {
    this.setState({
      changeSalaryStatusConfirm:true
    })
  }

  //급여상태 변경 확인
  onClickConfirmChangeSalaryStatus = () => {

    this.props.updateSalaryStatus({ salaryNumbering : this.state.paramSalaryNumbering, 
      salaryStatusCodeNo : this.state.paramSalaryStatusCodeNo })

    this.setState({
      changeSalaryStatusConfirm:false,
      paramSalaryNumbering:null,
      paramSalaryStatusCodeNo:null
    })
  }

   //급여상태 변경 취소
   onClickCancelChangeSalaryStatus = () => {
    this.setState({
      changeSalaryStatusConfirm:false
    })
  }

  
  render() {

    if(this.props.salaryList !== this.state.data){
      this.setState({
        data : this.props.salaryList
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
                      {/* <TableCell padding="checkbox">
                        <Checkbox color="secondary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, page*rowsPerPage+index)}/>
                      </TableCell> */}
                      <TableCell align="left">
                        <Tooltip
                          title="수정하기"
                          placement={'bottom-start'}
                          enterDelay={300}>
                            <span onClick={event => this.updateSalaryDialog(event, row.salaryNumbering)} style={{cursor:'pointer'}}>
                              {row.salaryDate}
                            </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">{row.employeeName}</TableCell>
                      <TableCell align="left">{row.totalRegularWorkTime} 분</TableCell>
                      <TableCell align="left">{row.totalExtendWorkTime} 분</TableCell>
                      <TableCell align="left">{row.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
                      <TableCell align="left">
                        {row.salaryStatusCodeNo === '01' ? 
                          (<Tooltip
                            title="급여확정"
                            placement={'bottom-start'}
                            enterDelay={300}>
                              <span onClick={event => this.changeSalaryStatus(event, row.salaryNumbering, row.salaryStatusCodeNo)} style={{cursor:'pointer'}}>
                                {row.salaryStatusCodeName}
                              </span>
                          </Tooltip>)
                          : row.salaryStatusCodeNo === '02' ?
                          (<Iamport
                            identificationCode="imp36066914"
                            params={{
                              pg: 'inicis',
                              pay_method: 'trans',
                              merchant_uid: 'merchant_' + new Date().getTime(),
                              name:  row.salaryDate+"월 "+row.employeeName+" 급여",
                              amount: 150, //individualSalarytotal,
                              buyer_email: '',
                              buyer_tel: '',
                              buyer_addr: '',
                              buyer_postcode: '',
                              buyer_name: '비전 컴퍼니',
                              m_redirect_url: 'http://localhost:3000/app/accounting/salary',
                            }}
                            jqueryLoaded={false}
                            onFailed={this.onFailIamport}
                            onSuccess={event => {event.preventDefault(); this.onSuccessIamport( row.salaryNumbering, row.salaryStatusCodeNo);}}
                            render={(renderProps) => (
                              <Tooltip
                                title="이체하기"
                                placement={'bottom-start'}
                                enterDelay={300}>
                                  <div style={{cursor:'pointer'}} onClick={renderProps.onClick}>
                                    급여이체
                                  </div>
                              </Tooltip>
                            )}
                          />)
                          : 
                          row.salaryStatusCodeName
                        }
                      </TableCell>
                      <TableCell align="left">{row.individualTotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</TableCell>
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

            <UpdateSalary
              open={this.state.updateSalaryDialogOpen}
              close={this.closeUpdateSalaryDialog}
            />

            <SweetAlert show={this.state.changeSalaryStatusConfirm}
                    warning
                    showCancel
                    confirmBtnText={"확인"}
                    cancelBtnText={"취소"}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title={"급여상태를 변경하시겠습니까?"}
                    onConfirm={this.onClickConfirmChangeSalaryStatus}
                    onCancel={this.onClickCancelChangeSalaryStatus}
            ></SweetAlert>


          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { getSalary, updateSalaryStatus })(SalaryTable);