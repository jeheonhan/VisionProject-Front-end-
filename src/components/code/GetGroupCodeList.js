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
      <Card className="shadow border-0" align="center">
      <CardBody>
        <br/>
        <h3 className="font-weight-light">{this.props.title}</h3>
        <h4><i class="zmdi zmdi-quote zmdi-hc-1x zmdi-hc-flip-horizontal"></i>&nbsp;{this.props.engCode}&nbsp;<i class="zmdi zmdi-quote zmdi-hc-1x"></i></h4>
        <br/>
        <Button style={{backgroundColor:"#ae402d"}} fullWidth variant="contained" className="jr-btn text-white" onClick={this.handleClick}>
          <i className="zmdi zmdi-search zmdi-hc-fw  zmdi-hc-2x"/>
        </Button>
      </CardBody>
    </Card>

    );
  }
}
//<Button variant="contained" className="jr-btn bg-deep-orange text-white" onClick={handleClick}>
//<i className="zmdi zmdi-search zmdi-hc-fw"/>
//</Button>
export default GetGroupCodeList;