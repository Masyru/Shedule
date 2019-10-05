import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Container, Navbar, Nav, Button, Col, Row } from "react-bootstrap"


export default class TableRow extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({data: nextProps.data})
  }

  render(){
    console.log(this.state.data);
    const data = this.state.data;
    let rows =
        <tr style={{textAlign: "center"}}>
          <td scope="col" width="30px">{data.id}</td>
          <td scope="col" width="80px">{data.name}</td>
          <td scope="col" width="30px">{data.type}</td>
          {data.data.map((obj, ind) => <td scope="col" width="30px">{obj}</td>)}
        </tr>;

    return(rows)
  }
}
