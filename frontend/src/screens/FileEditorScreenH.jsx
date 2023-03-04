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
import FileScreenH from "../screens/FileScreenH"

const FileEditorScreenH = ({ history }) => {
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
  const [clientnameH, setClientNameH] = useState("");
  const [gender, setGender] = useState("Men");
  const [numbering, setNumbering] = useState('');

  const [copy, setCopy] = useState('');



  const [address, setAddress] = useState("");
  const [clientID, setClientID] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [date, setDate] = useState("");
  const [clientdate, setClientDate] = useState("");
  const [clientIDType, setClientIDType] = useState("רשיון נהיגה ישראלי");
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
      clientID,
      clientdate,
      clientIDType,
      gender,
      clientnameH,
      natioH,

    });
    setClients(temp);
    setClientID("");
    setClientDate("");
    setClientIDType("רשיון נהיגה ישראלי");
    setGender("Men");
 

    setNatioH("");
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
      navigate('/fileh');
    }
    else{
    navigate('/file_makerh', { state: { copy:copy,clients: clients, date: date ,numbering:numbering} });
    }
  }
  return (
    <FormContainer>
      <Link to="/menu" size="md" className="btn btn-dark rtl" >
        {" "}
        חזור{" "}
      </Link>

      <h1  style={{"direction":"rtl"}}> יצירת מסמך חתימה</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}  style={{"direction":"rtl"}}>
        <h4> פרטי הנוטריון</h4>

        <Form.Group controlId="hebewName">
          <Form.Label>שם מלא </Form.Label>
          <Form.Control
            disabled={true}
            type="text"
            disable
            placeholder=" הכנס שם בעברית"
            value={hebrewName}
            onChange={(e) => setHebrewName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="licenseNumber">
          <Form.Label> מס רשיון נוטריון</Form.Label>
          <Form.Control
            type="text"
            disabled={true}
            placeholder="הכנס רשיון"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
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
        <Form.Group controlId="date" >
          <Form.Label>תאריך</Form.Label>
          <Form.Control
            type="date"
            placeholder="הכנס תאריך"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br />

        <h4> פרטי לקוח</h4>

        <Form.Group controlId="clientnameh">
          <Form.Label> שם לקוח בעברית</Form.Label>
          <Form.Control
            type="text"
            placeholder=" הכנס שם לקוח בעברית"
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
          <Form.Label>סוג תעודה מזהה </Form.Label>
          <br />

          <select onChange={(e) => setClientIDType(e.target.value)}>
            <option value={"רשיון נהיגה ישראלי"}>רשיון נהיגה ישראלי</option>
            <option value={"תעודת זהות ביומטרית ישראלית"}>תעודת זהות ביומטרית ישראלית</option>
            <option value={"דרכון ביומטרי ישראלי"}>דרכון ביומטרי ישראלי</option>
            <option value={"תעודת זהות ישראלית רגילה"}>תעודת זהות ישראלית רגילה</option>
            <option value={"דרכון ישראלי רגיל"}>דרכון ישראלי רגיל</option>
            <option value={"דרכון"}>דרכון זר</option>
          </select>
          {clientIDType == "דרכון" ? (
            <>
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
          <Form.Label>מספר תעודה</Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס מספר תעודה"
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="clientdate">
          <Form.Label>תאריך הנפקה </Form.Label>
          <Form.Control
            type="date"
            placeholder="הכנס תאריך הנפקה "
            value={clientdate}
            onChange={(e) => setClientDate(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <br />

        <Button type="button" variant="dark" onClick={makeClients}>
          הוסף לקוח{" "}
        </Button>
        {clients.map((x, index) => (
          // <div key={index}>
          //   <h5>{x.clientnameH}</h5>

          //   <h5>{x.clientID}</h5>
          //   <h5>{x.clientIDType}</h5>
          // </div>
          <div class="card" key={index} style={{"width": "18rem"}}>
            <div class="card-body">
              <h5 class="card-title">{x.clientnameH}</h5>
              <p class="card-link">{x.clientID}</p>
              <p class="card-link">{x.clientIDType}</p>
            </div>
          </div>
        ))}
        <br />

        <br />

        <Button type="button" variant="dark" onClick={deleteClient}>
          {" "}
          מחק לקוח
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

          <Form.Group controlId="copy">
          <Form.Label> כמות עותקים  </Form.Label>
          <Form.Control
            type="text"
            placeholder="הכנס כמות עותקים  "
            value={copy}
            onChange={(e) => setCopy(e.target.value)}
          ></Form.Control>
        
        </Form.Group>
        <br/>
        <Button type="submit" variant="dark" onClick={MakeFile}>
          {" "}
          צור קובץ
        </Button>
      </Form>
    </FormContainer>
  );
};

export default FileEditorScreenH;
