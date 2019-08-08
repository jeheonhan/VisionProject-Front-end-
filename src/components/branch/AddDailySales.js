import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CardBox from "components/CardBox";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import DatePicker from '../date/DatePickers';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { getSalesMenuList, addDailySales, getDailySalesList } from 'actions/index';
import Snackbar from '@material-ui/core/Snackbar';



const columnData = [
    {id: 'menuNo', align: true, disablePadding: false, label: '메뉴번호'},
    {id: 'menuName', align: true, disablePadding: false, label: '메뉴명'},
    {id: 'menuPrice', align: true, disablePadding: false, label: '메뉴단가'},
  ];


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class AddDailySales extends React.Component {

      constructor(props){

        super(props);

        this.state = {
          open : false,
          salesDate : '',
          salesProductList :[],
          warning:false,
          success:false,
          propList : this.props.salesMenuList,
          user:JSON.parse(localStorage.getItem('user')),
          snackbar:false,
          snackbarContents:""
        }

        this.datePicker = React.createRef();

      }

      handleClickOpen = () => {
        this.setState({open: true});
      };
    
      handleRequestClose = () => {
        this.setState({
          open : false,
          salesDate : '',
          salesProductList :[],
          warning:false,
          success:false
        })
      };

      //Date 값 가져오기
      callBackDateChange = (date) => {

        const result = async () => {
          return axios({
            method:"POST",
            url:"/branch/checkDuplicateSalesDate",
            data:{branchNo:this.state.user.branchNo,salesDate:date}
          })
          .then(response => {
            if(response.data == true){
              this.handleRequestSnackBarOpen("이미 등록된 날짜는 선택하실 수 없습니다.")
              this.datePicker.current.setState({
                selectedDate:null
              })
            }else{
              this.setState({
                ...this.state, 
                salesDate: date
              });
            }
          })
          .catch(error => console.log(error))
        }
        result();
        
      }

      handleInputChange = (key, row) => event => {
        if(this.state.salesDate == undefined || this.state.salesDate == ''){
          let _warningText = '일자를 먼저 선택해 주십시오.';
          this.setState({
            ...this.state,
            warning:true,
            warningText:_warningText,
          })
          return;

        }else{
        console.log(event.target.value);

        let _quantity = parseInt(event.target.value, 10);

        if(isNaN(_quantity)){
          _quantity = 0
        }

        let _menuPrice = parseInt(row.menuPrice, 10);

        let _salesAmount = _menuPrice * _quantity;

        if(_quantity <= 0){
          if(key == -1){
            return;
          }

          let list = this.state.salesProductList;

          list.splice(key, 1);
          this.setState({
            ...this.state, salesProductList: list
          })
          return;
        }

        if(key == -1){
          this.setState({
            ...this.state,
            salesProductList : this.state.salesProductList.concat(
              {
                branchNo: JSON.parse(localStorage.getItem("user")).branchNo,
                menuNo: row.menuNo,
                salesDate: this.state.salesDate,
                salesQuantity: _quantity,
                salesAmount: _salesAmount,
              })
          })
        }else{
          let list = this.state.salesProductList;
          let updateProd = {
                branchNo: JSON.parse(localStorage.getItem("user")).branchNo,
                menuNo: row.menuNo,
                salesDate: this.state.salesDate,
                salesQuantity: _quantity,
                salesAmount: _salesAmount,
          };
          list.splice(key, 1, updateProd);

          this.setState({
            ...this.state,
            salesProductList : list
          })
        }
      }
    }

      submitFn = () => {

        if(this.state.salesProductList.length == 0){
          this.handleRequestSnackBarOpen("입력된 정보가 없습니다. 다시 확인하세요.")
        }else{
          this.props.addDailySales(this.state.salesProductList);
          localStorage.getItem('user').branchNo && this.props.getDailySalesList(localStorage.getItem('user').branchNo);
          this.setState({
            open : false,
            salesDate : '',
            salesProductList :[],
            warning:false,
            success:false
          })
        }
      }

      warningOk = () => {
        this.setState({
            warning:false
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
      handleRequestSnackBarClose = () => {
        this.setState({
          snackbar:false,
          snackbarContents:""
        })
      }

    render(){

        const { salesMenuList } = this.props;
        if(salesMenuList && salesMenuList !== this.state.propList){
          this.setState({
            propList : salesMenuList,
          })
        }else if(salesMenuList && this.state.salesDate && this.state.salesProductList[0]===undefined){
          let list = [];
          this.state.propList.map((row)=>{
            list = list.concat({
              branchNo: JSON.parse(localStorage.getItem("user")).branchNo,
              menuNo: row.menuNo,
              salesDate: this.state.salesDate,
              salesQuantity: 0,
              salesAmount: 0,
             })
          })
          this.setState({
            salesProductList : list
          })
        }

        console.log(this.state);

        return(

            <div>

            <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
                    등록
            </Button>

            <Dialog
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    TransitionComponent={Transition}
                    maxWidth=""
                    >

                <AppBar className="position-relative">
                    <Toolbar className="bg-secondary">
                    <Typography variant="title" color="inherit" style={{
                        flex: 1,
                        minWidth: '800px',
                    }}>
                        일매출 등록
                    </Typography>
                    <Button onClick={this.handleRequestClose} color="inherit">
                        닫기
                    </Button>
                    </Toolbar>
                </AppBar>
            
            <CardBox styleName="col-lg-13" cardStyle="p-0" headerOutside>

                <div className="table-responsive-material" >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">메뉴명</TableCell>
                <TableCell align="right">메뉴단가</TableCell>
                <TableCell align="right">수량</TableCell>
                <TableCell align="right">금액</TableCell>
                <TableCell align="center">매출일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesMenuList && salesMenuList.map(row => {
                return (
                  <TableRow key={row.menuNo}>
                    <TableCell width="50px">{row.menuNo}</TableCell>
                    <TableCell align="right">{row.menuName}</TableCell>
                    <TableCell align="right">{row.menuPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</TableCell>
                    <TableCell align="right"><FormControl style={{width:"70px"}}>
                          <Input
                              id={row.menuNo}
                              type="number"
                              value= { this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo)!=-1 ? 
                                      this.state.salesProductList[this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo)].salesQuantity : 0}
                              onChange={this.handleInputChange(this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo), row)}
                          />
                          </FormControl>

                        </TableCell>
                    <TableCell align="right">{this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo)!=-1 ? this.state.salesProductList[this.state.salesProductList.findIndex(prod => prod.menuNo===row.menuNo)].salesAmount:''}</TableCell>
                    <TableCell align="center">{this.state.salesDate}</TableCell>
                      </TableRow>
                    );
                  })}
                      <TableRow>
                          <TableCell>
                          </TableCell>
                          <TableCell>
                          </TableCell>
                          <TableCell>
                          </TableCell>
                          <TableCell>
                          </TableCell>
                          <TableCell>
                            <div width="100px">
                            </div>
                          </TableCell>
                          <TableCell>
                              <DatePicker 
                                callBackDateChange={this.callBackDateChange}
                                label="매출일자 선택"
                                ref={this.datePicker}
                              />
                          </TableCell>
                      </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardBox>
        <div align="center">
                    <Button className="btn-block text-white  bg-deep-orange col-md-4 col-4" 
                            color="default" size="medium" 
                            onClick={() => {this.submitFn()}}
                            
                            >
                                등록하기
                    </Button>
        </div>
        <br/><br/><br/>
        </Dialog>

            <SweetAlert show={this.state.warning}
                    warning
                    confirmBtnText="확인"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title=""
                    onConfirm={this.warningOk}
            >
                {this.state.warningText}
            </SweetAlert>

            <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={this.state.snackbar}
            autoHideDuration="1800"
            onClose={this.handleRequestSnackBarClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackbarContents}</span>}
          />

    </div>

            
        )
    }

   
}

const mapStateToProps = ({ branch }) => {
    const { salesMenuList } = branch;
    return { salesMenuList };
}

export default connect(mapStateToProps, { getSalesMenuList, addDailySales, getDailySalesList })(AddDailySales);