import logo from './logo.svg';
import plus_icon from './add.png';
import './App.css';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button, FormControl, InputGroup, Modal, Card, OverlayTrigger, Popover } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';


class NavBar extends React.Component{
  render(){
    return(
      <Navbar id="navbar" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand href="/apartment?id=2424-Haste">Tenant Hill</Navbar.Brand>
            <Nav.Link href="/">Check a Price</Nav.Link>
            <Nav.Link href="/">Find Deals</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Address" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
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

class LabelText extends React.Component{
  render(){
    return(
      <div style={{display:"flex"}}>
        <p style={{fontWeight: "bold", color: "#6181b0"}}>{this.props.before}</p>
        <p>&nbsp;{this.props.after}</p>
      </div>
    );
  }
}

class ZipcodePage extends React.Component {
  render() {
    return (
      <div id="zipcode-page" className="page-container">
        <div className="welcome" id="bg-2">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Find Apartments Near You</h1>
          <Form inline>
            <FormControl type="text" placeholder="Zipcode" className="mr-sm-2" />
            <Button variant="warning">Search</Button>
          </Form>
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
            <OverlayTrigger trigger="click" placement="right" overlay=
            {<Popover id="popover-basic">
              <Popover.Title as="h3">Contact Information</Popover.Title>
              <Popover.Content>
              k8+SQZqPRj4!v$-f@gmail.com 
              </Popover.Content>
            </Popover>}>
              <p style={{fontWeight: "bold", cursor:"pointer"}}>{this.props.name}&nbsp;</p>
            </OverlayTrigger>
          
          
            <StarRatingComponent className="star"
              name="display"
              editing={false}
              starCount={5}
              value={parseInt(this.props.rating)}
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
          <label className="container">&nbsp;&nbsp;&nbsp;Laundry<input type="checkbox"/> <span className="checkmark"></span></label>
          <label className="container">&nbsp;&nbsp;&nbsp;Wifi<input type="checkbox"/> <span className="checkmark"></span></label>
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

function AddressPage(props) {
  const { search } = useLocation();
  const match = search.match(/id=(.*)/);
  const id = match?.[1];

  //send query to backend
  let apt_data = {
    title: "Jones Berkeley",
    price: 2100,
    bed: 3,
    dog: true,
    cat: true,
    address: "1500 San Pablo Ave Berkeley, CA 94702",
    gym:false,
    dishwasher: true,
    ac: true,
    laundry: true,
    parking: false,
    estimatedPrice: 2000,
    img_url: "",
    ratings:{
      "1230841234":{
        rating: 1,
        fullname: "John Doe",
        description:"Makes for a good potato",
        contact: "$n$6N^GDs5P&XMR-@gmail.com"
      },
      "6234532454":{
        rating: 5,
        fullname: "Nhat Nguyen",
        description:"Landlord didn’t give back the deposit, but also was always able to accomodate my wife and I throughout the pandemic. The water heater also leaks.",
        contact: "k8+SQZqPRj4!v$-f@gmail.com"
      }
    }
  };
  
  //send query to backend
  const our_rating = "Good"
  const avg_rating = 68;

  return (
    <div id="address-page" className="page-container">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className="two-tone-text">
        <span className="blueText">The Deal</span>&nbsp;<span className="blackText">with {apt_data["address"]}</span>
      </div>
      <div id="main-ratings">
        <div id="picture">
          <img src={apt_data["imgUrl"]} height="350"/>
        </div>
        <div className="main-cols">
          <h4 className="blackTextSmall"> List Price</h4>
          <div className="pricing"><h1>{apt_data["price"]}</h1></div>
          
          
          <div className="rating-container">
            <h4 className="blackTextSmall">The Anthill rated this...</h4>
            
            <div className="rating"><h1>{our_rating}</h1></div>
            <a href="#our-rating">See why &rsaquo;</a>
          </div>
        </div>
        <div className="main-cols">
          
          <h4 className="blackTextSmall" > Estimated Price</h4>
          <div className="pricing"><h1>{apt_data["estimatedPrice"]}</h1></div>

          <div className="rating-container">
            <h4 className="blackTextSmall">People rated this...</h4>
            <div className="rating"><h1>{avg_rating}%</h1></div>
            <a href="#people-rating">See why &rsaquo;</a>
          </div>
        </div>
      </div>
      <div id="our-rating">
        <div className="two-tone-text">
          <span className="blueText">Our</span>&nbsp;&nbsp;<span className="blackText">Rating</span>
        </div>
        <p className="darkBlueTextSmall">Your listing is valued at {apt_data["actual_price"]} whereas we estimated 
        the cost to be {apt_data["estimatedPrice"]}. We based our evaluation on the following properties:</p>
        <LabelText before="Dogs Allowed:" after={apt_data["dog"].toString()}/>
        <LabelText before="Cats Allowed:" after={apt_data["cat"].toString()}/>
        <LabelText before="Indoor Gym:" after={apt_data["gym"].toString()}/>
        <LabelText before="Dishwasher:" after={apt_data["dishwasher"].toString()}/>
        <LabelText before="AC:" after={apt_data["ac"].toString()}/>
        <LabelText before="Laundry:" after={apt_data["laundry"].toString()}/>
      </div>
      <div id="people-rating">
        <div className="inline">
          <div className="two-tone-text">
            <span className="blueText">The People's</span>&nbsp;&nbsp;<span className="blackText">Rating</span>
          </div>
          <CreateReview />
        </div>
        {Object.values(apt_data["ratings"]).map(rating => (
          <Review rating={rating["rating"]} name={rating["fullname"]} description={rating["description"]}></Review>
        ))}
      </div>
    </div>
  );
}

class HouseCard extends React.Component{
  render(){
    return(
      <Card style={{ width: '18rem', margin: "10px"}}>
        <Card.Img variant="top" src={this.props.picture} />
        <Card.Body>
          <Card.Title class="card-title">{this.props.address}</Card.Title>
          <Card.Text>
            <LabelText key="Actual Price:" value={"$" + this.props.actual_price}/>
            <LabelText key="Estimated Value:" value={"$" + this.props.est_price}/>
          </Card.Text>
          <Button variant="warning">More</Button>
        </Card.Body>
      </Card>
    );
  }
}

function HouseListingsPage(){
  const { search } = useLocation();
  const match = search.match(/zipcode=(.*)/);
  const zipcode = match?.[1];
  let listings = {
    "1234123545":{
      price: 1200,
      estimatedPrice: 1400,
      address: "1500 San Pablo Ave Berkeley, CA 94702",
      imgUrl: "https://images1.apartments.com/i2/7kCLBEyMGq-247cAWJ3Iklr29Z06oUTRATGlL4sbZHc/111/berkeley-central-berkeley-ca-primary-photo.jpg"
    },
    "1234143545":{
      price: 1200,
      estimatedPrice: 1400,
      address: "1500 San Pablo Ave Berkeley, CA 94702",
      imgUrl: "https://images1.apartments.com/i2/7kCLBEyMGq-247cAWJ3Iklr29Z06oUTRATGlL4sbZHc/111/berkeley-central-berkeley-ca-primary-photo.jpg"
    },
    "1236143545":{
      price: 1200,
      estimatedPrice: 1400,
      address: "1500 San Pablo Ave Berkeley, CA 94702",
      imgUrl: "https://images1.apartments.com/i2/7kCLBEyMGq-247cAWJ3Iklr29Z06oUTRATGlL4sbZHc/111/berkeley-central-berkeley-ca-primary-photo.jpg"
    },
    "1234129545":{
      price: 1200,
      estimatedPrice: 1400,
      address: "1500 San Pablo Ave Berkeley, CA 94702",
      imgUrl: "https://images1.apartments.com/i2/7kCLBEyMGq-247cAWJ3Iklr29Z06oUTRATGlL4sbZHc/111/berkeley-central-berkeley-ca-primary-photo.jpg"
    }
  }
  //send query to backend
  return(
    <div id="listings-page" className="page-container">
      <div className="two-tone-text">
      <span className="blackText">Exuber</span><span className="blueText">Ant</span>&nbsp;<span className="blackText">Deals in {zipcode}</span>
      </div>
      <div id="listings">
        {Object.values(listings).map(apt => (
          <HouseCard  actual_price={apt["price"].toString()} est_price={apt["estimatedPrice"].toString()} address={apt["address"]} picture={apt["imgUrl"]}/>
        ))}
      </div>
    </div>
  );
}

function App() {
  document.title = 'Tenant Hill';
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/apartment">
          <AddressPage picture="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F1026205392%2F0x0.jpg"/>
          </Route>
          <Route path="/zipcode">
            <ZipcodePage />
          </Route>
          <Route path="/listings">
            <HouseListingsPage zipcode="95070"/>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;