// React packages
import React, { useEffect } from "react";
import { Col, Row, Button, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Redux packages
import { useDispatch, useSelector } from "react-redux";
// Components
import Message from "../components/Message";
import Loader from "../components/Loader";
// Actions

const FileViewScreen = ({ match }) => {
  const userProfile = useSelector((state) => state.userProfile);
  let navigate = useNavigate();
  const { loading, error, user } = userProfile;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo, user]);

  const ViewFile = (index) => {
    if (!userInfo.files[index].numberingE) {
      navigate("/viewh", {
        state: {
          copy: userInfo.files[index].copy,
          clients: userInfo.files[index].clients,
          date: userInfo.files[index].date,
          numbering: userInfo.files[index].numbering,
        },
      });
    } else {
      navigate("/viewe", {
        state: {
          copy: userInfo.files[index].copy,
          clients: userInfo.files[index].clients,
          date: userInfo.files[index].date,
          numbering: userInfo.files[index].numbering,
          numberingE: userInfo.files[index].numberingE,
        },
      });
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>מסמכים שהונפקו</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>שם הלקוחות</th>
                <th>סוג המסמך</th>
                <th>תאריך המסמך</th>
                <th>שכר הנוטריון</th>
                <th> צפה במסמך</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.files.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    {item.clients.map((c, index) => (
                      <span>
                        {c.clientnameH}
                        {index < item.clients.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </td>

                  <td>{item.type}</td>

                  <td>{item.date}</td>

                  <td>
                    {"₪ "}
                    {item.wage}{" "}
                  </td>

                  <td>
                    {" "}
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => ViewFile(index)}
                    >
                      צפה בקובץ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default FileViewScreen;
