// React packages
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// Actions
import { logout } from '../actions/usersActions';
import { useNavigate } from 'react-router-dom';

const Header = ({ history }) => {
  // Data from the state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
    let navigate = useNavigate();
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  // Variables
  const dispatch = useDispatch();

  // Handlers
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")

  };

  return (
    // <header>
    //   <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    //     <Container>
    //       <LinkContainer to='/'>
    //         <Navbar.Brand>NotriWeb</Navbar.Brand>
    //       </LinkContainer>
    //       <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //       <Navbar.Collapse id='basic-navbar-nav'>
    //         <Nav className='ms-auto'>
        
    //           {userInfo ? (
    //             <NavDropdown title={userInfo.englishName} id='username'>
    //               <LinkContainer to='/profile'>
    //                 <NavDropdown.Item>Profile</NavDropdown.Item>
    //               </LinkContainer>
                  
    //               <LinkContainer to='/view'>
    //                 <NavDropdown.Item>Files</NavDropdown.Item>
    //               </LinkContainer>
    //               <NavDropdown.Item onClick={logoutHandler}>
    //                 Logout
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           ) : (
    //             <LinkContainer to='/login'>
    //               <Nav.Link>
    //                 <i className='fas fa-user'></i> Sign In
    //               </Nav.Link>
    //             </LinkContainer>
    //           )}
    //           {userInfo && userInfo.isAdmin && (
    //             <NavDropdown title='Admin' id='users'>
    //               <LinkContainer to='/admin/users'>
    //                 <NavDropdown.Item>Users</NavDropdown.Item>
    //               </LinkContainer>
               
    //             </NavDropdown>
    //           )}
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top ">
  <div className="container">
    <LinkContainer to='/'>
      <Navbar.Brand className='text-light'>NotriWeb</Navbar.Brand>
    </LinkContainer>
    <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <ul className="navbar-nav ms-auto" dir='rtl'>
      {userInfo ? (<>
        <li className="nav-item">
          <NavDropdown.Item className=" text-light ">{userInfo.hebrewName}</NavDropdown.Item>
        </li>

      <li className="nav-item">
        <LinkContainer to='/profile'>
          <NavDropdown.Item className=" text-light ">הפרופיל שלי</NavDropdown.Item>
        </LinkContainer>
      </li>
      <li className="nav-item">
        <LinkContainer to='/view'>
          <NavDropdown.Item className=" text-light ">המסמכים שלי</NavDropdown.Item>
        </LinkContainer>
      </li>
      <li className="nav-item">

        <NavDropdown.Item className=" text-light " onClick={logoutHandler}>התנתק</NavDropdown.Item>

      </li>
      </>) : (<>
        <li className="nav-item">
          <LinkContainer className=" text-light " to='/login'>
            <Nav.Link>
              <i className='fas fa-user'></i> כניסה
            </Nav.Link>
          </LinkContainer>
      </li>
      </>)}
      </ul>
    </div>
  </div>
</nav>

<header>

  <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active" style={{"background-image": "url(images/h1.jpg)"}}>
      </div>
      <div className="carousel-item" style={{"background-image": "url(images/h2.jpg)"}}>
      </div>
      <div className="carousel-item" style={{"background-image": "url(images/h3.jpg)"}}>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
</header>
    </>
  );
};

export default Header;
