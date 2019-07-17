import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { getCodeList } from 'actions/Code';



class GetGroupCodeList extends React.Component {
  

  render(){
    const handleClick = (e) => {
      e.preventDefault();
      console.log(this.props.code);
      this.props.action({searchKeyword:this.props.code});
    }

    return (

      <Card className="shadow border-0" align="right">
      <CardBody>
        <h4>{this.props.title}&nbsp;&nbsp;
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={handleClick}>
            <i className="zmdi zmdi-search zmdi-hc-fw"/>
        </Button></h4>
      </CardBody>
    </Card>

    );
  }
}

export default GetGroupCodeList;