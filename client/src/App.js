import logo from './logo.svg';
import plus_icon from './add.png';
import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Navbar, Nav, Form, Button, FormControl, InputGroup, Modal, ListGroup } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './pages/Upload.js';
import Home from './pages/Home.js';
import axios from 'axios'; 
class NavBar extends React.Component{
  render(){

    async function handleSubmit(e){
      e.preventDefault(); 
      const nameValue = document.getElementById("searchform").value;
      console.log("value", nameValue); 
      
      await axios.post('http://localhost:8000/api/findhouse', {
        
          address: nameValue
        
      }).then(() => {
        console.log("send successfully");
      })
    }
    return(
       <Navbar id="navbar" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand href="/2424-Haste">Tenant Hill</Navbar.Brand>
            <Nav.Link href="/">Check a Price</Nav.Link>
            <Nav.Link href="/">Find Deals</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl id="searchform" type="text" placeholder="Address" className="mr-sm-2" />
            <Button onClick={handleSubmit} variant="outline-light">Search</Button>
          </Form>
          <CreateListing/>
        </Navbar.Collapse>
      </Navbar> 
     
    )
  }
}



class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page" className="page-container">
        <div id="welcome">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Good deals on your hill</h1>
          <Form inline>
            <FormControl type="text" placeholder="Address" className="mr-sm-2" />
            <Button variant="warning">Search</Button>
          </Form>
        </div>
        <div id="mission">
          <h1>Our Mission</h1>
          <p>At Tenant Hill, our goal is to assist you in finding the most affordable, 'worth-it' living situation in your area. With housing insecurities on the rise during the pandemic, renters have found it increasingly difficult to face inflated prices and seemingly impossible living situations.</p>
          <p>We want to make sure you are being offered the best deals possible; with advanced machine learning techniques, we predict the price of an apartment in your area and compare it to the listing price to see if it's worth it for its price. Using features such as the available rooms, amenities,
             and area of the property, we ensure that everything is taken into account when deciding how to rate an apartment, just for you. Apartments also have testimonies from previous tenants, with whom you can chat and discuss whether or not it's the right place for you. We welcome you with open arms, the hill awaits!</p>
        </div>
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

function CreateListing() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{margin:"0px 8px"}}>
      <Button id="add-listing" variant="light" onClick={handleShow}>
        <img src={plus_icon}/>&nbsp;&nbsp;Listing
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Apartment to Tenant Hill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Address</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="10000 Outer Space St"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="3000"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Sq ft</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Square footage"
            />
          </InputGroup>
          <label class="container">&nbsp;&nbsp;Laundry<input type="checkbox"/> <span class="checkmark"></span></label>
          <label class="container">&nbsp;&nbsp;Wifi<input type="checkbox"/> <span class="checkmark"></span></label>
          <br/>
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
          <div className="main-cols">
            <h4 className="blackTextSmall"> List Price</h4>
            <div className="pricing"><h1>{this.props.actual_price}</h1></div>
            
            
            <div className="rating-container">
              <h4 className="blackTextSmall">The Anthill rated this...</h4>
              
              <div className="rating"><h1>{this.props.our_rating}</h1></div>
              <a href="#our-rating">See why &rsaquo;</a>
            </div>
          </div>
          <div className="main-cols">
            
            <h4 className="blackTextSmall" > Estimated Price</h4>
            <div className="pricing"><h1>{this.props.estimated_price}</h1></div>

            <div className="rating-container">
              <h4 className="blackTextSmall">People rated this...</h4>
              <div className="rating"><h1>{this.props.people_rating}</h1></div>
              <a href="#people-rating">See why &rsaquo;</a>
            </div>
          </div>
        </div>
        <div id="our-rating">
          <div className="two-tone-text">
            <span className="blueText">Our</span>&nbsp;&nbsp;<span className="blackText">Rating</span>
          </div>
          <p className="darkBlueTextSmall">Your listing is valued at {this.props.actual_price} whereas we estimated 
          the cost to be {this.props.estimated_price}. This is because it has {this.props.details}</p>
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
      <AddressPage picture="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg" 
      address="2424 Haste Street" our_rating="Good" people_rating="68%"
      estimated_price = "$1000" actual_price = "$1250" details="a breathtaking view of the mountains and a serial killer living next door."/>
    </div>
  );
}

export default App;
