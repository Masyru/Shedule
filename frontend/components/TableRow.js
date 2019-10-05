import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Container, Navbar, Nav, Button, Col, Row } from "react-bootstrap"

function Color(str) {
  switch (str) {
    case 8 || 10:
      return "#f8fc03"
    case "О":
      return "#fca103"
    case "В":
      return "#807d78"
    case "6":
      return "#88d468"
    case "7":
      return "#cc7054 "
    default:
      return "white"
  }
}


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
          <td scope="col" style={{minWidth: "130px"}}>{data.name}</td>
          <td scope="col" width="30px">{data.type}</td>
          {data.data.map((obj, ind) => <td scope="col" width="30px" style={{backgroundColor: Color(obj)}}>{obj}</td>)}
        </tr>;

    return(rows)
  }
}
