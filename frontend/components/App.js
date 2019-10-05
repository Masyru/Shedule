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
    array.push(<th key={i} scope="col" style={{ minWidth: '120px', padding: '4px' }}>{(i + 1) % 31} сентября</th>)
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
            <Col lg={10} md={10}
              style={{
                overflow: "auto",
                maxHeight: (height_and_width()[0] - 100).toString() + "px",
              }}
            >
            {Object.keys(this.state.response).length == 3 ?
              <table
                class="table table-hover" style={{borderLeft: "1px solid grey"}}
              >
                <thead class="thead-light">
                  <tr style={{textAlign: "center"}}>
                    <th scope="col" style={{minWidth: "30px", padding: "4px", minHeight: "33px"}}>
                      №
                    </th>
                    <th scope="col" style={{minWidth: "120px", padding: "4px"}}>
                      Сотрудник
                    </th>
                    <th scope="col" style={{minWidth: "35px", padding: "4px"}}>
                      Тип
                    </th>
                    {
                      CreateTable(this.state.response.table[0].data.length)
                    }
                  </tr>
                </thead>
                <tbody>
                  {this.state.response.table.map((obj, ind) => <TableRow key={ind} data={obj}/>)}
                </tbody>
              </table>
              :
              <div>НЕТ РАСПИСАНИЯ НА ЭТОТ МЕСЯЦ (Создайте его)</div>
            }

            </Col>
            <Col md={2} lg={2}>
            {Object.keys(this.state.response).length == 3 ?
              <table>

                  <thead class="thead-light">
                    <tr style={{textAlign: "center"}}>
                      <th scope="col" style={{minWidth: "30px", padding: "4px", minHeight: "33px"}}>
                        Рабочее время
                      </th>
                      <th scope="col" style={{minWidth: "30px", padding: "4px", minHeight: "33px"}}>
                        Разница
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.response.table.map((data, ind) => <tr key={ind}>
                                                                    <td>{data.sum_hours}</td>
                                                                    <td>{data.delta}</td>
                                                                   </tr>)
                    }
                  </tbody>
              </table>
              :
              null
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
