import React from 'react'
import Box from '@material-ui/core/Box';

class Approver extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array : [
                {key : 1, rank : '담당', imgSrc:"https://d19bk7nwhg2ikg.cloudfront.net/stamps/normal7.png"},
                {key : 2, rank : '부장', imgSrc:"https://d19bk7nwhg2ikg.cloudfront.net/stamps/normal7.png"},
                {key : 3, rank : '부장', imgSrc:"https://d19bk7nwhg2ikg.cloudfront.net/stamps/normal7.png"},
                {key : 4, rank : '부장', imgSrc:"https://d19bk7nwhg2ikg.cloudfront.net/stamps/normal7.png"},
                {key : 5, rank : '부장', imgSrc:"https://d19bk7nwhg2ikg.cloudfront.net/stamps/normal7.png"},
            ]
        }
    }

    render(){
        return(
            <span>
                {console.log(this.props.arr)}
                {this.props.arr.map((emp, index) => {
                    {console.log(emp)}
                    if(emp.approvalStatus==1){
                        return(
                            <span style={{float:"left", paddingLeft:"1px"}} key={index}>
                            <Box bgcolor="text.hint" color="white" width="90px" height="30px" align="center" padding="5px">{emp.rankCodeName}</Box>
                            <Box border={1} bgcolor="white" width="90px" height="90px" align="center"><img style={{paddingTop:"5px"}} width="82px" height="82px" src={`/img/${emp.signatureImage}`}/></Box>
                            
                            </span>
                        )
                    }else{
                        return(
                            <span style={{float:"left", paddingLeft:"1px"}} key={index}>
                            <Box bgcolor="text.hint" color="white" width="90px" height="30px" align="center" padding="5px">{emp.rankCodeName}</Box>
                            <Box border={1} bgcolor="white" width="90px" height="90px" align="center"></Box>
                            
                            </span>
                        )
                    }
                    
                })}
            </span>
        )
    }
}

export default Approver;