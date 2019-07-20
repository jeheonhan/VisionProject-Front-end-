import React from 'react';
import { connect } from 'react-redux';
import { sendEmail } from 'actions/index';
import {Modal, ModalHeader} from 'reactstrap';
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class ComposeMail extends React.Component {
  constructor() {
    super();
    this.state = {
      recipient: '',
      subject: '',
      contents: '',
    }
  }

  render() {
    const { onClose } = this.props;
    const {recipient, subject, contents} = this.state;

    if( recipient !== this.props.emailForSending){
      this.setState({recipient:this.props.emailForSending})
    }
    console.log(this.state)

    return (
      <Modal className="modal-box modal-box-mail" toggle={onClose} isOpen={this.props.open}
             style={{zIndex: 2600}}>
        <ModalHeader className="modal-box-header bg-secondary text-white">
          새 메세지
          <IconButton className="text-white"
                      onClick={onClose}>
            <CloseIcon/>
          </IconButton>
        </ModalHeader>
        <div className="modal-box-content d-flex flex-column">

          <TextField
            id="required"
            label="받는사람*"            
            defaultValue={recipient}
            value={recipient}
            margin="normal"/>
          <TextField
            id="required"
            label="제목"
            onChange={(event) => this.setState({subject: event.target.value})}
            value={subject}
            margin="normal"
          />
          <TextField
            id="required"
            label="내용"
            onChange={(event) => this.setState({contents: event.target.value})}
            value={contents}
            multiline
            rowsMax="4"
            margin="normal"/>
        </div>

        <div className="modal-box-footer">

          <Button disabled={recipient === ''} variant="contained" color="primary" onClick={() => {
            onClose();
            this.props.sendEmail(this.state)

          }}>
            <i className="zmdi zmdi-mail-send mr-2"/> 전송</Button>
        </div>
      </Modal>
    ); 
  }
}

const mapStateToProps = (state) => {
  const value = state;
  return value;
}

export default connect(mapStateToProps, { sendEmail })(ComposeMail);