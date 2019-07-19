import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardText} from 'reactstrap';
import Button from '@material-ui/core/Button';





class GetGroupCodeList extends React.Component {
  
  handleClick = (event) => {
    event.preventDefault();
    this.props.action(this.props.code);
  }

  render(){
    return (

      <Card className="shadow border-0" align="right">
       
      <CardBody>
        <h4 className="card-title">{this.props.title}&nbsp;&nbsp;
        <Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={this.handleClick}>
          <i className="zmdi zmdi-search zmdi-hc-fw"/>
        </Button>
        </h4>
      </CardBody>
    </Card>

    );
  }
}
//<Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={handleClick}>
//<i className="zmdi zmdi-search zmdi-hc-fw"/>
//</Button>
export default GetGroupCodeList;