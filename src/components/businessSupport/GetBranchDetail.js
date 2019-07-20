function Transition(props) {
    return <Slide direction="down" {...props} />;
  }

  class FullScreenDialog extends React.Component {


    state = {
      open: false,
      employee: null,
      employee:{
        account:{
  
        }
      }
    };
  
    handleClickOpen = () => {
      this.setState({open: true});
    };
  
  
  
    handleRequestClose = () => {
      this.setState({open: false});
    };
  
    handleChange = name => event => {
     
      if(name == 'bankCodeNo' || name == 'accountNo'){
  
          if(this.state.employee.account == null){
            this.setState({employee:{  ...this.state.employee, 
              account:{
                [name]:event.target.value
              }
            }})
          }else{
            this.setState({employee:{  ...this.state.employee, 
              account:{...this.state.employee.account,
                [name]:event.target.value
              }
            }})
          }
      }else{
        this.setState({ employee:{...this.state.employee,
          [name]: event.target.value,
        }});
      }
  
    };
  
    handleFileUpload = (files) => {
      this.setState({employee:{file:files}})
    }
  
    render() {
  
      const { bankList } = this.props;
  
      if(bankList === undefined){
        this.props.getCodeList({searchKeyword:"bank"});
      }
  
      console.log(this.state)
  
      return (
        <div>
          <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
              등록
          </Button>
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleRequestClose}
            TransitionComponent={Transition}
          >
            <AppBar className="position-relative">
              <Toolbar className="bg-deep-orange">
                <IconButton onClick={this.handleRequestClose} aria-label="Close">
                </IconButton>
                <Typography variant="title" color="inherit" style={{
                  flex: 1,
                }}>
                  인사카드 등록
                </Typography>
                <Button onClick={this.handleRequestClose} color="inherit">
                  닫기
                </Button>
              </Toolbar>
            </AppBar>
                
            <div  align="center">
            <CardBox styleName="col-md-4" cardStyle="p-0" headerOutside>
              <AddTextField handleChange={this.handleChange} handleFileUpload={this.handleFileUpload}
                stateValue={this.state} bankList={bankList}
                state={this.state}></AddTextField>
            </CardBox>
            </div>
          </Dialog>
        </div>
      );
    }
  }