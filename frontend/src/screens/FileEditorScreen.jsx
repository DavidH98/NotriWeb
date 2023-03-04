// React packages
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Redux packages
import { useDispatch, useSelector } from "react-redux";
// Components
import { Col, Row, Button, Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// Actions
import { getUserProfile } from "../actions/usersActions";

const FileEditorScreen = ({ history }) => {
  const location = useLocation();
  let navigate = useNavigate();

  // Data from the state

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const updateProfile = useSelector((state) => state.updateProfile);
  const { success } = updateProfile;

  // Variables
  const dispatch = useDispatch();
  const [hebrewName, setHebrewName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [englishAddress, setEnglishAddress] = useState("");
  const [clientnameE, setClientNameE] = useState("");
  const [clientnameH, setClientNameH] = useState("");
  const [gender, setGender] = useState("Men");
  const [numbering, setNumbering] = useState('');
  const [numberingE, setNumberingE] = useState('');
  const [copy, setCopy] = useState('');
  const [address, setAddress] = useState("");
  const [clientID, setClientID] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [date, setDate] = useState("");
  const [clientdate, setClientDate] = useState("");
  const [clientIDType, setClientIDType] = useState("Israeli Driver License");
  const [natio, setNatio] = useState("");
  const [natioH, setNatioH] = useState("");

  const [clients, setClients] = useState([]);

  const [message, setMessage] = useState(null);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Listen to data variables
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.hebrewName || success) {
        dispatch(getUserProfile("profile"));
      } else {
        setHebrewName(user.hebrewName);
        setEnglishName(user.englishName);
        setEnglishAddress(user.englishAddress);
        setAddress(user.address);
        setLicenseNumber(user.licenseNumber);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  // Handlers
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const makeClients = () => {
    const temp = [...clients];
    temp.push({
      clientnameE,
      clientID,
      clientdate,
      clientIDType,
      gender,
      clientnameH,
      natio,
      natioH,
    });
    setClients(temp);
    setClientID("");
    setClientDate("");
    setClientNameE("");
    setClientIDType("Israeli Driver License");
    setGender("Men");
    setNatioH("");
    setNatio("");
    setClientNameH("");
  };
  const deleteClient = () => {
    const temp = [...clients];
    temp.pop();
    setClients(temp);
  };
  const MakeFile =()=>{
    if(clients.length<1)
    {
      alert("לא ניתן להתקדם ללא הוספת לקוח")
      navigate('/file');
    }
    else{
    navigate('/file_makere', { state: { copy:copy,clients: clients, date: date ,numbering:numbering,numberingE:numberingE} });
    }
  }
  return (
    <FormContainer>
      <Link to="/menu" className="btn btn-dark">
        {" "}
        Back{" "}
      </Link>

      <h1>AUTHENTICATION OF SIGNATURE</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <h4>Notary information</h4>

        <Form.Group controlId="englishName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder="Enter name in ENGLISH"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="hebewName">
          <Form.Label>שם מלא </Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder=" הכנס שם בעברית"
            value={hebrewName}
            onChange={(e) => setHebrewName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="licenseNumber">
          <Form.Label>License Number</Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder="Enter license Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="englishaddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder="Enter Address IN ENGLISH"
            value={englishAddress}
            onChange={(e) => setEnglishAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>כתובת</Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder="  הכנס כתובת בעברית "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br />

        <h4>Client information</h4>
        <Form.Group controlId="clientname">
          <Form.Label>Client Name IN ENGLISH</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Client name in ENGLISH"
            value={clientnameE}
            onChange={(e) => setClientNameE(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="clientnameh">
          <Form.Label> שם לקוח בעברית</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Client name"
            value={clientnameH}
            onChange={(e) => setClientNameH(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />

        <select onChange={(e) => setGender(e.target.value)}>
          <option value={"Men"}>גבר</option>
          <option value={"Women"}>אישה</option>
        </select>
        <Form.Group controlId="typeID">
          <Form.Label>Client type of ID </Form.Label>
          <br />

          <select onChange={(e) => setClientIDType(e.target.value)}>
            <option value={"Israeli Driver License"}>Israeli Driver License</option>
            <option value={"Israeli Biometric ID"}>Israeli Biometric ID</option>
            <option value={"Israeli Biometric Passport"}>Israeli Biometric Passport</option>
            <option value={"Israeli Regular ID"}>Israeli Regular ID</option>
            <option value={"Israeli Regular Passport"}>Israeli Regular Passport</option>
            <option value={"Foreign Passport"}>Foreign Passport</option>
          </select>
          {clientIDType == "Foreign Passport" ? (
            <>
              <Form.Group controlId="Foreign Passport">
                <Form.Label>Client Passport nationality in ENGLISH</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Client Passport nationality in ENGLISH"
                  value={natio}
                  onChange={(e) => setNatio(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="fph">
                <Form.Label> מוצא הדרכון בעברית </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="הכנס את מוצא הדרכון בעברית"
                  value={natioH}
                  onChange={(e) => setNatioH(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          ) : null}
        </Form.Group>
        <br />

        <Form.Group controlId="clientid">
          <Form.Label>Client ID number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ID number"
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="clientdate">
          <Form.Label>Client ID date of issue</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter ID Date of issue "
            value={clientdate}
            onChange={(e) => setClientDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br />

        <Button type="button" variant="dark" onClick={makeClients}>
          Add Client
        </Button>
        {clients.map((x, index) => (
          <div key={index}>
            <h5>{x.clientnameH}</h5>

            <h5>{x.clientID}</h5>
            <h5>{x.clientIDType}</h5>
          </div>
        ))}
        <br />

        <br />

        <Button type="button" variant="dark" onClick={deleteClient}>
          Delete Client
        </Button>

        <br />
        <br />
           <Form.Group controlId="numbering">
          <Form.Label>מספור מסמכים מצורפים </Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס מספור למסמכים מצורפים"
            value={numbering}
            onChange={(e) => setNumbering(e.target.value)}
          ></Form.Control>
          </Form.Group>
          <Form.Group controlId="numberinge">
          <Form.Label>attached documents marking</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter attached documents marking"  
            value={numberingE}
            onChange={(e) => setNumberingE(e.target.value)}
          ></Form.Control>
          </Form.Group>
          <Form.Group controlId="copy">
          <Form.Label> כמות עותקים  </Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס כמות עותקים  "
            value={copy}
            onChange={(e) => setCopy(e.target.value)}
          ></Form.Control>
        
        </Form.Group>

        <Button type="submit" variant="dark" onClick={MakeFile}>
          Create File
        </Button>
      </Form>
    </FormContainer>
  );
};

export default FileEditorScreen;
