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

const MenuScreen = ({ match }) => {
  return (
    <Row>
      <Row><Col><br/></Col></Row>

      <Row>
      <Col>
          <div className="d-grid gap-2">

            <Link to="/fileh" className="btn btn-dark"> מסמך חתימה בעברית</Link>

          </div>
        </Col>
    
        <Col>
        </Col>
        <Col>
          <div className="d-grid gap-2">

            <Link to="/file" className="btn btn-dark"> מסמך חתימה משולב עברית+אנגלית</Link>

          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default MenuScreen;
