import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Container, Navbar, Nav, Button, Col, Row } from "react-bootstrap"

function Month(number) {
  const mon = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  return mon[number - 1]
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
      response: []
    }

    this.getIformation = this.getIformation.bind(this);
  }

  getIformation(){
    const main = this;
    fetch('/get_data')
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
            main.setState({response: data})
            console.log("Recorded!");
          });
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', error);
      });

  }

  componentDidMount(){
      this.getIformation();
  }

  render(){
    let main =
      <Container>

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

          <Col lg={12} md={12}>

            {this.state.response.length > 0 ? this.state.response : null}

          </Col>


      </Container>;

    return(main);
  }
}
