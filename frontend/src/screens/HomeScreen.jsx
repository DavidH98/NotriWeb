// React packages
import React, { useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// Redux packages
import { useDispatch, useSelector } from "react-redux";
// Components
import Message from "../components/Message";
import Loader from "../components/Loader";
// Actions

const HomeScreen = ({ match }) => {
  return (
    <Row>
      <Row>
        <Col>
          {" "}
          <div dir="rtl">
            <h1>ברוכים הבאים ל NortiWeb</h1>
            <hr/>

            <h4>בחר סוג קובץ</h4>
          </div>
        </Col>
      </Row>

      


      <Row>
      <Col><br/>
        <br/>
          <div className="d-grid gap-2">

            <Link to="/menu" className="btn btn-dark"> אימות חתימה</Link>

          </div></Col>
        <Col>
        </Col>
        <Col>
        </Col>
        <Col>
        
        </Col>
       
      </Row>
    </Row>
  );
};

export default HomeScreen;
