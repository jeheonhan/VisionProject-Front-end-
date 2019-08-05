// import React from 'react';
// import DatePicker from '../date/DatePickers';
// import Button from '@material-ui/core/Button';
// import Slide from '@material-ui/core/Slide';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';


// function Transition(props) {
//     return <Slide direction="down" {...props} />;
// }

// class AddDatePicker extends React.Component{

//     state = {
//         open:false,
//     }


//     handleClickOpen = () => {
//         this.setState({open: true});
//       };

//     render() {

//         return(

//             <div>

//             <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClickOpen}>
//                     등록
//             </Button>

//             <Dialog
//                     open={this.state.open}
//                     onClose={this.handleRequestClose}
//                     TransitionComponent={Transition}
//                     maxWidth=""
//                     >

//                 <AppBar className="position-relative">
//                     <Toolbar className="bg-secondary">
//                     <Typography variant="title" color="inherit" style={{
//                         flex: 1,
//                         minWidth: '800px',
//                     }}>
//                         일매출 일자선택
//                     </Typography>
//                     <Button onClick={this.handleRequestClose} color="inherit">
//                         닫기
//                     </Button>
//                     </Toolbar>
//                 </AppBar>

//             </Dialog>

//             <DatePicker 
//                 callBackDateChange={this.callBackDateChange}
//                 label="매출일자 선택"
//             />

//             </div>

//         );
//     }

// }

// export default AddDatePicker