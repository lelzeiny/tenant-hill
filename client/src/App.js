import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component{
  render(){
    return(
      <Navbar id="navbar" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand href="#home">Tenant Hill</Navbar.Brand>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Address" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Good deals on your hill</h1>
        <Form inline>
          <FormControl type="text" placeholder="Address" className="mr-sm-2" />
          <Button variant="warning">Search</Button>
        </Form>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;