import logo from './logo.svg';
import plus_icon from './add.png';
import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

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
      <div id="home-page" className="page-container">
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

class Review extends React.Component{
  render(){
    return(
      <div className = "review">
        <div style={{display:'flex', alignItems: 'center'}}>
          <p style={{fontWeight: "bold"}}>{this.props.name}&nbsp;</p>
          
            <StarRatingComponent className="star"
              editing={false}
              starCount={5}
              value={this.props.rating}
            />
        </div>
          <p>{this.props.description}</p>
      </div>
    );
  }
}

function CreateReview() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button id="add-review" variant="light" onClick={handleShow}>
        <img src={plus_icon}/>&nbsp;&nbsp;Add a review
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Full Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="John Doe"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Contact"
            />
          </InputGroup>
          <br/>
          <StarRatingComponent id="rate" className="star"
              name="create"
              editing={true}
              starCount={5}
            />
          <FormControl as="textarea" placeholder="Pour your heart out." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </ div>
  );
}

class AddressPage extends React.Component {
  render() {
    return (
      <div id="address-page" className="page-container">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="two-tone-text">
          <span className="blueText">The Deal</span>&nbsp;<span className="blackText">with {this.props.address}</span>
        </div>
        <div id="main-ratings">
          <div id="picture">
            <img src={this.props.picture} height="350"/>
          </div>
          <div className="rating-container">
            <h4>Our Rating</h4>
            <div className="rating"><h1>{this.props.our_rating}</h1></div>
            <a href="#our-rating">See why &rsaquo;</a>
          </div>
          <div className="rating-container">
            <h4>The People's Rating</h4>
            <div className="rating"><h1>{this.props.people_rating}</h1></div>
            <a href="#people-rating">See why &rsaquo;</a>
          </div>
        </div>
        <div id="our-rating">
          <div className="two-tone-text">
            <span className="blueText">Our</span>&nbsp;&nbsp;<span className="blackText">Rating</span>
          </div>
          <p>Your listing is valued at {this.props.actual_price} whereas we estimated the cost to be 
          {this.props.estimated_price}. This is because it has {this.props.details}</p>
        </div>
        <div id="people-rating">
          <div className="inline">
            <div className="two-tone-text">
              <span className="blueText">The People's</span>&nbsp;&nbsp;<span className="blackText">Rating</span>
            </div>
            <CreateReview />
          </div>
          <Review rating="1" name="John Doe" description="Makes for a good potato"></Review>
          <Review rating="5" name="Nhat Nguyen" description="Landlord didn’t give back the deposit, but also was always able to accomodate my wife and I throughout the pandemic. The water heater also leaks."></Review>
        </div>
      </div>
    );
  }
}


function App() {
  document.title = 'Tenant Hill';
  return (
    <div className="App">
      
      <NavBar />
      <AddressPage picture="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg" address="2424 Haste Street" our_rating="Good" people_rating="68%"/>
    </div>
  );
}

export default App;