import React from 'react';
import { connect } from 'react-redux';
import { getHRCardList, getHRCardDetail, cleanStoreState } from 'actions';
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
import Tooltip from '@material-ui/core/Tooltip';
import IconMailOutline from '@material-ui/icons/MailOutline';
import ComposeMail from 'components/mail/ComposeMail';
import FindDepart from 'components/humanResource/FindDepart';
import FindRank from 'components/humanResource/FindRank';
import Switch from '@material-ui/core/Switch';
import SearchBox from 'components/SearchBox';
import Snackbar from '@material-ui/core/Snackbar';

let counter = 0;


//칼럼명 지어주는 곳
//label에 쓰는 단어가 화면에 표시
const columnData = [
  {id: 'employeeNo', align: false, disablePadding: false, label: '사원번호'},
  {id: 'employeeName', align: true, disablePadding: false, label: '사원명'},
  {id: 'departCodeName', align: true, disablePadding: false, label: '부서명'},
  {id: 'rankCodeName', align: true, disablePadding: false, label: '직급'},
  {id: 'joinDate', align: true, disablePadding: false, label: '입사일자'},
  {id: 'employeePhone', align: true, disablePadding: false, label: '휴대폰번호'},
  {id: 'employeeEmail', align: true, disablePadding: false, label: '이메일'},
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
      props.getHRCardList(value)
  }

  //엔터 검색 기능
  const searchEnterActivity = (event) => {
    if(event.key === 'Enter'){
      props.getHRCardList(value)
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
          <Typography variant="title">인사카드 목록조회</Typography>
        )}
      </div>
      <div className="spacer"/>
      <SearchBox 
        styleName="d-none d-sm-block" 
        placeholder="사원번호/사원명"
        onChange={updateSearchKeyword}
        value={value.searchKeyword}
        onClick={ event => searchActivity(event)}
        onKeyDown={ event => searchEnterActivity(event)}
      />
      <Switch
              color="primary"
              title="퇴사자 조회"
                classes={{
                  checked: 'text-secondary',
                  //bar: 'bg-primary',
                }}
                checked={props.checkedSearch=='02'? true:false}
              onChange={props.handleSearchResign}
              />
    
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


class EnhancedTable extends React.Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      // data에 props로 들어오는 list값 넣어주기.
      data: this.props.HRCardList,
      page: 0,
      rowsPerPage: 10,
      search:{searchKeyword:null},
      flag: false,
      composeMail:false,
      user:JSON.parse(localStorage.getItem('user'))
    };
  }

  componentWillUnmount(){
    this.props.cleanStoreState("HRCardList");
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

  //Mail 창 열기
  handleClickMailOpen = (event, email) => {
    event.preventDefault();
    this.setState({
      composeMail:true,
      emailForSending:email
    })
  }

  //Mail 창 닫기
  handleClickMailClose = () => {
    this.setState({
      composeMail:false
    })
  }
  

  //수정화면 열기 및 getHRCardDetail Action 발생
  handleModifyHRCard = (event, employeeNo) => {
    event.preventDefault();
    if(Number(this.state.user.rankCodeNo) > 1){
      this.props.getHRCardDetail(employeeNo)
      this.props.handleModifyHRCardOpen();
    }else{
      this.handleRequestSnackBarOpen("해당 기능에 접근권한이 없습니다.")
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
    handleRequestSnackBarClose = () => {
      this.setState({
        snackbar:false,
        snackbarContents:""
      })
    }
    

  handleSearchResign = () => {
    if(this.state.search.searchCondition == '02'){
      this.setState({
        search:{searchCondition:"01"}
      })
      this.props.getHRCardList(Object.assign({},this.state.search,{searchCondition:"01"}))
    }else{
      this.setState({
        search:{searchCondition:"02"}
      })
      this.props.getHRCardList(Object.assign({},this.state.search,{searchCondition:"02"}))
    }
  }


  render() {
   
    const {data, order, orderBy, selected, rowsPerPage, page, search} = this.state;

    const { HRCardList } = this.props;

    const { emailForSending } = this.state;

    if(HRCardList == undefined){
      this.props.getHRCardList(this.state.search)
    }
    if(HRCardList !== this.state.data){
      this.setState({data:HRCardList});
    }

    console.log(this.state)


    return (
      <div>
        <EnhancedTableToolbar numSelected={selected.length}
                               handleSearchResign={this.handleSearchResign}
                               checkedSearch={this.state.search.searchCondition}
                               getHRCardList={this.props.getHRCardList}/>
        <div className="flex-auto">
          <div className="table-responsive-material">
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data && data.length}
              />
              <TableBody>
                
                {/* props로 받은 list값을 페이지에 맞게 잘라서 map()을 사용함 */}
                {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                                  onClick={event => this.handleClick(event, page*rowsPerPage+index)}/>
                      </TableCell> */}
                      <TableCell align="left" >
                        <span style={{cursor:'pointer'}} onClick={event => {this.handleModifyHRCard(event, row.employeeNo)}}
                          title="상세조회/수정">
                          {row.employeeNo}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{cursor:'pointer'}} onClick={event => {this.handleModifyHRCard(event, row.employeeNo)}}
                          title="상세조회/수정">
                          {row.employeeName}
                        </span>
                      </TableCell>
                      <TableCell align="left">{row.departCodeName}</TableCell>
                      <TableCell align="left">{row.rankCodeName}</TableCell>
                      <TableCell align="left">{row.joinDate}</TableCell>
                      <TableCell align="left">{row.employeePhone}</TableCell>
                      <TableCell align="left">
                        <IconMailOutline onClick={event => this.handleClickMailOpen(event, row.employeeEmail)} 
                                        style={{cursor:'pointer'}} htmlColor={"#e65100"}/><input type="hidden" value={row.employeeEmail}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={data && data.length}
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
        {/* 메일 컴포넌트 */}
        <ComposeMail open={this.state.composeMail} //user={user}
                             onClose={this.handleClickMailClose}
                             //onMailSend={this.onMailSend.bind(this)
                             emailForSending={emailForSending}
          />
        {/* 부서검색 */}
        <FindDepart/>
        {/* 직급검색 */}
        <FindRank/>

        <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1500"
            onClose={this.handleRequestSnackBarClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />
      </div>
    );
  }
}
const mapStateToProps = ({humanResource}) => {
  const { HRCardList } = humanResource;
  return { HRCardList };
}

export default connect(mapStateToProps, { getHRCardList, getHRCardDetail, cleanStoreState })(EnhancedTable);