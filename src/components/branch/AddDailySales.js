import React from 'react';
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
import { connect } from 'react-redux';
import { getSalesMenuList } from 'actions/index';



const columnData = [
    {id: 'menuNo', align: true, disablePadding: false, label: '메뉴번호'},
    {id: 'menuName', align: true, disablePadding: false, label: '메뉴명'},
    {id: 'menuPrice', align: true, disablePadding: false, label: '메뉴단가'},
  ];


function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class AddDailySales extends React.Component {

      state = {
        open : false,
      }

      handleClickOpen = () => {
        this.setState({open: true});
      };
    
      handleRequestClose = () => {
        this.setState({open: false});
      };

    render(){

        const { salesMenuList } = this.props;

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
                <TableCell>메뉴번호</TableCell>
                <TableCell align="right">메뉴명</TableCell>
                <TableCell align="right">메뉴단가</TableCell>
                <TableCell align="right">수량</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesMenuList && salesMenuList.map(row => {
                return (
                  <TableRow key={row.menuNo}>
                    <TableCell>{row.menuNo}</TableCell>
                    <TableCell align="right">{row.menuName}</TableCell>
                    <TableCell align="right">{row.menuPrice}</TableCell>
                    <TableCell align="right"><FormControl style={{width:"70px"}}>
                          <Input
                              id={row.menuNo}
                              type="number"
                              //value=
                              //onChange={this.handleNumberInputChange(this.state.orderBranch.orderFromBranchProductList.findIndex(prod => prod.productNo===row.productNo), row, index)}
                          />
                          </FormControl>

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardBox>
        </Dialog>
    </div>

            
        )
    }

   
}

const mapStateToProps = ({ branch }) => {
    const { salesMenuList } = branch;
    return { salesMenuList };
}

export default connect(mapStateToProps, { getSalesMenuList })(AddDailySales);