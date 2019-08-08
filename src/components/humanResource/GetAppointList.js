import React from 'react';
import { connect } from 'react-redux';
import { getAppointList } from 'actions/HumanResource';
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
import { checkedApointmentRowData, updateAppointStatus } from 'actions/index';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import SearchBox from 'components/SearchBox';
import SweetAlert from 'react-bootstrap-sweetalert';

let counter = 0;


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'appointDate', align: false, disablePadding: false, label: '발령일자'},
  {id: 'employeeNo', align: false, disablePadding: false, label: '사원번호'},
  {id: 'employeeName', align: true, disablePadding: false, label: '사원명'},
  {id: 'preDepartCodeName', align: true, disablePadding: false, label: '이전부서'},
  {id: 'appointDepartCodeName', align: true, disablePadding: false, label: '발령부서'},
  {id: 'preRankCodeName', align: true, disablePadding: false, label: '이전직급'},
  {id: 'appointRankCodeName', align: true, disablePadding: false, label: '발령직급'},
  // {id: 'reference', align: true, disablePadding: false, label: '참고'},
  {id: 'appointmentStatusCodeName', align: true, disablePadding: false, label: '확정여부'},
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
            <Checkbox color="primary"
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
}


let EnhancedTableToolbar = props => {
  const {numSelected} = props;
  const [value, setValue] = React.useState({searchKeyword : ''});

  //검색 키워드 수정
  const updateSearchKeyword = (event) => {
    setValue({
      searchKeyword: event.target.value,
    });
    console.log(value.searchKeyword)
  }

  //검색 기능
  const searchActivity = (event) => {
    event.preventDefault();
      props.getAppointList(value)
  }

  //엔터 검색 기능
  const searchEnterActivity = (event) => {
    if(event.key === 'Enter'){
      props.getAppointList(value)
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
          <Typography variant="title">인사발령 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      
      <div className="actions">
        {numSelected > 0 ? (
          // 툴팁 내용
          <Tooltip title="수정">
            <IconButton aria-label="수정">
              <DeleteIcon onClick={props.handleModifyAppointWithData}/>
            </IconButton>
          </Tooltip>
        ) : (
          <SearchBox 
          styleName="d-none d-sm-block" 
          placeholder="사원번호/사원명"
          onChange={updateSearchKeyword}
          value={value.searchKeyword}
          onClick={ event => searchActivity(event)}
          onKeyDown={ event => searchEnterActivity(event)}
        />
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


class EnhancedTable extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'desc',
      orderBy: 'appointDate',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.appointList,
      page: 0,
      rowsPerPage: 10,
      search:{searchKeyword:null},
      flag:false,
      snackbar:false,
      snackbarContents:"",
      user:JSON.parse(localStorage.getItem('user')),
      convertConfirmShow:false
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

  //체크박스 클릭시
  handleClick = (event, id, row) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    if(selectedIndex !== -1){
      this.setState({
              selected: [],
              checkedRowData:null
            });
    }else{
      this.setState({
          selected: [id],
          checkedRowData: row
                    });
    }

  };
  //수정버튼 누를 시에 체크된 Data를 수정화면으로 보내기위한 action
  handleModifyAppointWithData = (event, row) => {
    event.preventDefault();

    if(Number(this.state.user.rankCodeNo) > 1){
      if(new Date(row.appointDate) < new Date(moment().format('YYYY/MM/DD'))){
        this.setState({
          snackbar:true,
          snackbarContents:"이미 지난 날짜의 인사발령은 수정할 수 없습니다."
        })
      }else{
        this.props.checkedApointmentRowData(row);
        this.props.handleModifyAppointOpen();
      }
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
    }
  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  //사원번호 클릭시 사원 프로필 보기
  handleClickEmployeeNo = (event, employeeNo) => {
    event.preventDefault();
    this.props.getSimpleHRCardByEmployeeNo(employeeNo);
    this.props.handleSimpleHRCardOpen();
  }

  //발령상태 변경
  handleClickAppointStatus = (event, rowData) => {
    event.preventDefault();

    if(Number(this.state.user.rankCodeNo) > 1){
      if(rowData.appointmentStatusCodeNo == '01'){
        this.setState({
          tempStatus:Object.assign({},rowData,{appointmentStatusCodeNo:'02'}),
          convertConfirmShow:true
        })
        // this.props.updateAppointStatus(Object.assign({},rowData,{appointmentStatusCodeNo:'02'}))
      }else if(rowData.appointmentStatusCodeNo == '02'){
        this.handleRequestSnackBarOpen("이미 확정된 상태는 변경할 수 없습니다.");
      }
      else if(rowData.appointmentStatusCodeNo == '03'){
        this.handleRequestSnackBarOpen("이미 취소된 상태는 변경할 수 없습니다.");
      }
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.");
    }
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
      snackbarContents:""
    })
  }

  //발령 상태변경 Confirm열기
  handleConvertAppointOpen = () => {
    this.setState({
        convertConfirmShow:true
    })
   }

  //발령 상태변경 Confirm 확인
  onConfirmConvert = () => {
    this.props.updateAppointStatus(this.state.tempStatus);
      this.setState({
          tempStatus:null,
          convertConfirmShow:false
      })
  }

  //발령 상태변경 Confirm 취소
  onCancelConvert = () => {
      this.setState({
          convertConfirmShow:false
      })
  }


  render() {
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;



    if(this.props.appointList !== this.state.data){
      this.setState({data:this.props.appointList.sort((a, b) => (b.noticeNo - a.noticeNo))});
    }

    

    return (
      <div>
        <EnhancedTableToolbar numSelected={selected.length}
                               handleModifyAppointWithData={this.handleModifyAppointWithData}
                               getAppointList={this.props.getAppointList}/>
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
                        <Checkbox color="primary" checked={isSelected} 
                                  onClick={event => this.handleClick(event, page*rowsPerPage+index, row)}/>
                      </TableCell> */}
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleModifyAppointWithData(event, row)} title="수정">
                          {row.appointDate}
                        </span>
                      </TableCell>
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickEmployeeNo(event, row.employeeNo)}>
                          {row.employeeNo}
                        </span>
                      </TableCell>
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => this.handleClickEmployeeNo(event, row.employeeNo)}>
                          {row.employeeName}
                        </span>
                      </TableCell>
                      <TableCell align="left">{row.preDepartCodeName}</TableCell>
                      <TableCell align="left">{row.appointDepartCodeName}</TableCell>
                      <TableCell align="left">{row.preRankCodeName}</TableCell>
                      <TableCell align="left">{row.appointRankCodeName}</TableCell>
                      {/* <TableCell align="left">{row.reference}</TableCell> */}
                      <TableCell align="left" style={{cursor:'pointer', color:row.appointmentStatusCodeNo == '01' ? "blue":"red"}} 
                            onClick={event => {this.handleClickAppointStatus(event,row)}}>
                        {row.appointmentStatusCodeName}
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
        <SweetAlert show={this.state.convertConfirmShow}
          warning
          showCancel
          confirmBtnText={"네"}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          cancelBtnText={"아니오"}
          title={"인사발령 상태를 변경하시겠습니까?"}
          onConfirm={this.onConfirmConvert}
          onCancel={this.onCancelConvert}
      ></SweetAlert>
      </div>
    );
  }
}

const mapStateToProps = ({ humanResource }) => {
  const { appointList } = humanResource;
  return { appointList }
}

export default connect(mapStateToProps,{ getAppointList, checkedApointmentRowData, updateAppointStatus })(EnhancedTable);