import logo from './logo.svg';
import plus_icon from './add.png';
import './App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Row, Form, Button, FormControl, InputGroup, Modal, Card, OverlayTrigger, Popover, Badge } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { BrowserRouter, Route, Switch, useLocation,Redirect,useHistory } from 'react-router-dom';
import axios from 'axios'; 
import imgUrl_ from './house_imgs.json';

let imgUrl = Object.values(imgUrl_);

const NavBar = () => {
  const history = useHistory();

    async function handleSubmit(e){
      e.preventDefault(); 
      const nameValue = document.getElementById("searchform").value;
      console.log("value", nameValue); 
      
      await axios.post('http://localhost:8000/api/getaddress', {
          address: nameValue
      }).then((data) => {
        console.log("send successfully",data.data._id);
        history.push(`apartment?id=${data.data._id}`);
      })
      // ?id=${data.data._id}


    }
    const login = () => {
      console.log("clicking"); 
      history.push(`/apartment?id=12341513451`);
    }
    return(
       <Navbar id="navbar" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Navbar.Brand href="/apartment?id=2424-Haste">Tenant Hill</Navbar.Brand>
            <Nav.Link href="/">Check a Price</Nav.Link>
            <Nav.Link href="/zipcode">Find Deals</Nav.Link>
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



class HomePage extends React.Component {
  render() {
    return (
      <div id="home-page" className="page-container">
        <div className="welcome">
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
            <Button  variant="warning">Search</Button>
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

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const handleFileInputChange = (e) => {
      console.log("address",  document.getElementById('address').value);
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      };
  };

  const handleSubmitFile = (e) => {
      e.preventDefault();
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
          uploadImage(reader.result);
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          setErrMsg('something went wrong!');
      };
  };

  const uploadImage = async (base64EncodedImage) => {

      const getAdress = document.getElementById('address').value; 
      const getPrice = document.getElementById('price').value;
      const getSqrt = document.getElementById('sqrtft').value; 
      console.log("address", getAdress);
      try {
          await fetch('http://localhost:8000/api/house', {
              method: 'POST',
              body: JSON.stringify({ data: base64EncodedImage,
              address:getAdress,
              price: getPrice,
          }),
              headers: { 'Content-Type': 'application/json' },
          });
          setFileInputState('');
          setPreviewSource('');
          setSuccessMsg('Image uploaded successfully');
      } catch (err) {
          console.error(err);
          setErrMsg('Something went wrong!');
      }
  };

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
          <InputGroup  className="mb-3">
            <InputGroup.Prepend>
              <input id="address" placeholder="address" type="text" name="address"/>
            </InputGroup.Prepend>
            <FormControl placeholder="10000 Outer Space St"/>
          </InputGroup>
          <InputGroup  className="mb-3">
            <InputGroup.Prepend>
              <input id="price" placeholder="address" type="text" name="address"/>
            </InputGroup.Prepend>
            <FormControl
              placeholder="3000"
            />
          </InputGroup>
          <InputGroup  className="mb-3">
            <InputGroup.Prepend>
            <input id="sqrtft" placeholder="address" type="text" name="address"/>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Square footage"
            />
          </InputGroup>

          <label class="container"> <input type="checkbox" id="dogs"/><span class="checkmark"></span>
            <label for="dogs"class="checkboxContainer">&nbsp;&nbsp;&nbsp;Allow Dogs</label>
          </label>

          <label class="container"> <input type="checkbox" id="cats"/><span class="checkmark"></span>
            <label for="cats"class="checkboxContainer">&nbsp;&nbsp;&nbsp;Allow Cats</label>
          </label>
          <label class="container"> <input type="checkbox" id="dishwasher"/><span class="checkmark"></span>
            <label for="dishwasher"class="checkboxContainer">&nbsp;&nbsp;&nbsp;In-House Dishwasher</label>
          </label>
          <label class="container"> <input type="checkbox" id="ac"/><span class="checkmark"></span>
            <label for="ac"class="checkboxContainer">&nbsp;&nbsp;&nbsp;AC</label>
          </label>
          <label class="container"> <input type="checkbox" id="laundry"/><span class="checkmark"></span>
            <label for="laundry"class="checkboxContainer">&nbsp;&nbsp;&nbsp;Laundry</label>
          </label>
          <label class="container"> <input type="checkbox" id="park"/><span class="checkmark"></span>
            <label for="park"class="checkboxContainer">&nbsp;&nbsp;&nbsp;Parking</label>
          </label>
          <label class="container"> <input type="checkbox" id="gym"/><span class="checkmark"></span>
            <label for="gym"class="checkboxContainer">&nbsp;&nbsp;&nbsp;Gym</label>
          </label>
          
          <br/>

          {/* <Alert msg={errMsg} type="danger" />
          <Alert msg={successMsg} type="success" /> */}
         
          <form className="form">
              <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
              />
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmitFile}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </ div>
  );
}

const  CreateReview = (props) => {
  const { rating } = 1;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReview = async () => {

    const fullname = document.getElementById('fullname').value; 
    const fullemail = document.getElementById('fullemail').value;
    const review = document.getElementById('thought').value; 
    console.log("rate", rating);
    console.log("fullname", fullname); 
    console.log("id", props.houseId); 
    await axios.post(`http://localhost:8000/api/house/${props.houseId}`, {
      
        name: fullname, 
        comment: review,
        contact: fullemail, 
        rating: rating
      
    })

  }

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
            <FormControl id="fullname" placeholder="John Doe"/>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="fullemail"
              placeholder="Contact"
            />
          </InputGroup>
          <label class="container"> <input type="checkbox" id="opt-in"/><span class="checkmark"></span>
            <label for="contact" class="checkboxContainer">&nbsp;&nbsp;&nbsp;Allow Contact From Residents</label>
          </label>
          <br/>
          <StarRatingComponent id="rate" className="star"
              name="create"
              editing={true}
              starCount={5}
              value={rating}
            />
          <FormControl id="thought" as="textarea" placeholder="Pour your heart out." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReview}>
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
  const [returnData, setReturnData] = useState(null); 
  useEffect(() => {
    console.log("getting id", id);
    console.log("gettiing id", props.params); 
    axios.get(`http://localhost:8000/api/gethouse/${id}`)
    .then((data) => {
      console.log("data", data.data); 
      setReturnData(data.data); 
    })
    .catch((err) => {
      console.log("err", err); 
    })
  }, [])
  
  console.log("getting id", id);
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
       {returnData !== null ? <div>
        <div className="two-tone-text">
        <span className="blueText">The Deal</span>&nbsp;<span className="blackText">with {returnData.address}</span>
      </div>
      <div id="main-ratings">
        <div id="picture">
          <img src={returnData.picture} height="350"/>
        </div>
        <div className="main-cols">
          <h4 className="blackTextSmall"> List Price</h4>
          <div className="pricing"><h1>{returnData.price}</h1></div>
          
          
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
          <CreateReview houseId={returnData._id} />
        </div>
        {returnData.reviews.map(item => (
          <Review rating={item.rating} name={item.name} description={item.comment}></Review>
        ))}
      </div>
       </div> 
       
       // contitional here
       
       : <div>
        <div className="two-tone-text">
        <span className="blueText">The Deal</span>&nbsp;<span className="blackText">with {apt_data["address"]}</span>
      </div>
      <div id="main-ratings">
        <div id="picture">
          <img src={imgUrl.pop()} height="350"/>
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
       </div> }
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
     
    </div>
  );
}

class HouseCard extends React.Component{
  render(){
    return(
      <Card style={{ width: '18rem', margin: "10px"}}>
        <Card.Img variant="top" src={this.props.picture} />
        <Card.Body>
          <Card.Title class="card-title">{this.props.address}<Badge variant="primary" style={{fontWeight: "lighter"}}>Rated {this.props.ranking}%</Badge></Card.Title>
          <Card.Text>
            <LabelText before="Actual Price:" after={"$"+this.props.actual_price}/>
            <LabelText before="Estimated Value:" after={"$"+this.props.est_price}/>
          </Card.Text>
          <Button className="peach">More</Button>
        </Card.Body>
      </Card>
    );
  }
}

function HouseListingsPage(){
  const { search } = useLocation();
  const match = search.match(/zipcode=(.*)/);
  const zipcode = match?.[1];
  console.log("zupcode", zipcode); 
  const [returnData, setReturnData] = useState(null); 
  useEffect(async () => {
    await axios.get(`http://localhost:8000/api/getzipcode/${zipcode}`).then((data) =>{
      console.log("success listings", data.data);
    }).catch((err)=>console.log(err));
  }, [])
  let listings = {
    "1234123545":{
      price: 1200,
      estimatedPrice: 1400,
      rating: 85,
      address: "1500 San Pablo Ave Berkeley, CA 94702"
    },
    "1234143545":{
      price: 1200,
      estimatedPrice: 1400,
      rating: 72,
      address: "1500 San Pablo Ave Berkeley, CA 94702"
    },
    "1236143545":{
      price: 1200,
      estimatedPrice: 1400,
      rating: 68,
      address: "1500 San Pablo Ave Berkeley, CA 94702"
    },
    "1234129545":{
      price: 1200,
      estimatedPrice: 1400,
      rating: 24,
      address: "1500 San Pablo Ave Berkeley, CA 94702"
    }
  }
  //send query to backend
  return(
    <div id="listings-page" className="page-container">

      {returnData !== null ? <div>

        <div className="two-tone-text">
      <span className="blackText">Exuber</span><span className="blueText">Ant</span>&nbsp;<span className="blackText">Deals in {zipcode}</span>
      </div>
      <div id="listings">
        {returnData.map(apt => (
          <HouseCard  actual_price={apt["price"].toString()} est_price={apt["estimatedPrice"].toString()} address={apt["address"]} picture={apt["imgUrl"]}/>
        ))}
      </div>

      </div> 
      
      
      
      //conditiona;
      
      : <div>
        
        <div className="two-tone-text">
          <span className="blackText">Exuber</span><span className="blueText">Ant</span>&nbsp;<span className="blackText">Deals in {zipcode}</span>
          </div>
          <div id="listings">
            {Object.values(listings).map(apt => (
              <HouseCard  actual_price={apt["price"].toString()} est_price={apt["estimatedPrice"].toString()} address={apt["address"]} picture={apt["imgUrl"]}/>
            ))}
          </div>
      </div>}
          
    </div>
  );
}

function App() {
  document.title = 'Tenant Hill';
  return (
    <div className="App">
      

      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/apartment/:id">
            <AddressPage/>
          </Route>
          <Route path="/apartment">
            <AddressPage/>
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