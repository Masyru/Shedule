import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Container, Navbar, Nav, Button, Col, Row } from "react-bootstrap"
import TableRow from "./TableRow"

function Month(number) {
  const mon = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  return mon[number - 1]
}

function height_and_width() {
  		let h = document.documentElement.clientHeight;
  		let w = document.documentElement.clientWidth;
      w = w - 100
      return [h, w]
}

const CreateTable = (num) => {
  console.log(num);
  let array = new Array();
  for (var i = 0; i < num; i++) {
    array.push(<th key={i} scope="Col" style={{ minWidth: '100px' }}>{(i + 1) % 31} сентября</th>)
  }
  return array
}

const ToggleButton = () => {
  return <div
      className="ToggleButton mt-2"
      style={{
        position: "fixed",
        top: "0",
        right: "5%",
      }}>
          <Button variant="secondary" onClick={() => print()}>Распечатать</Button>
      </div>
}


export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      window: 1,
      response: {},
      loading: false
    }

    this.getInformation = this.getInformation.bind(this);
  }

  getInformation(){
    const main = this;
    this.setState({loading: true})
    fetch('/getScheduleTable')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          // Examine the text in the response
          response.json()
          .then(function(data) {
            main.setState({
              response: data,
              loading: false,
            })
            console.log("Recorded!");
          });
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', error);
      });

  }

  componentDidMount(){
      this.getInformation();
  }

  render(){
    let main =
      <Container>
        <Row className="mt-5">
            <Col lg={12} md={12}
              style={{
                overflow: "auto",
                maxHeight: height_and_width()[0],
                maxWidth: height_and_width()[1],
              }}
            >
            {Object.keys(this.state.response).length == 3 ?
              <table

              >

                <tr style={{textAlign: "center"}}>
                  <th scope="col" style={{height: "30px", width: "30px"}}>
                    №
                  </th>
                  <th scope="col">
                    Сотрудник
                  </th>
                  <th scope="col">
                    Тип
                  </th>
                  {
                    CreateTable(this.state.response.table.length)
                  }
                </tr>
                {this.state.response.table.map((obj, ind) => <TableRow key={ind} data={obj}/>)}
              </table>
              :
              <div>НЕТ РАСПИСАНИЯ НА ЭТОТ МЕСЯЦ (Создайте его)</div>
            }

            </Col>
        </Row>
        <Row>
          <Navbar expand="lg" variant="light" bg="light" fixed="bottom">
            <Navbar.Brand>Расписание:</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link className="ml-3">Сгенерировать расписание на следующий месяц</Nav.Link>
              <Nav.Link style={{
                position: "absolute",
                right: "10%"
              }}>Просмотреть историю</Nav.Link>
            </Nav>
          </Navbar>

          <ToggleButton />
      </Row>


      </Container>;

    return(main);
  }
}
