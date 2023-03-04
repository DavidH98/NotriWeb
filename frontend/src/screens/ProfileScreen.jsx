// React packages
import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
// Redux packages
import { useDispatch, useSelector } from 'react-redux'
// Components
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { getUserProfile, updateUserProfile } from '../actions/usersActions'
// Constants
import { USER_UPDATE_PROFILE_RESET } from '../constants/usersConstants'

const ProfileScreen = () => {

  let navigate = useNavigate();

  // Data from the state
  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, user } = userProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const updateProfile = useSelector((state) => state.updateProfile)
  const { success } = updateProfile




  // Variables
  const dispatch = useDispatch()
  const [hebrewName, setHebrewName] = useState('')
  const [englishName, setEnglishName] = useState('')
  const [englishAddress, setEnglishAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [files, setFiles] = useState([""])

  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [message, setMessage] = useState(null)



  // Listen to data variables
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.hebrewName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserProfile('profile'))
      } else {
        setHebrewName(user.hebrewName)
        setEnglishName(user.englishName)
        setEnglishAddress(user.englishAddress)
        setEmail(user.email)
        setAddress(user.address)
        setLicenseNumber(user.licenseNumber)
        setFiles(user.files)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])


  // Handlers
  const submitHandler = (e) => {
    e.preventDefault()

      dispatch(updateUserProfile({ id: user._id, hebrewName,englishName,englishAddress, email, password,address,licenseNumber,files}))
    
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='englishName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type='text' placeholder='Enter name in ENGLISH' value={englishName} onChange={(e)=>setEnglishName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='hebewName'>
            <Form.Label>שם מלא </Form.Label>
            <Form.Control type='text' placeholder=' הכנס שם בעברית' value={hebrewName} onChange={(e)=>setHebrewName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='englishaddress'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter Address IN ENGLISH' value={englishAddress} onChange={(e)=>setEnglishAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
            <Form.Label>כתובת</Form.Label>
            <Form.Control type='text' placeholder='  הכנס כתובת בעברית ' value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='licenseNumber'>
              <Form.Label>license Number</Form.Label>
              <Form.Control
                type='licenseNumber'
                placeholder='Enter license Number'
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

     

            <Button type='submit' variant='dark'>
              Update
            </Button>
          </Form>
        )}
      </Col>
   
    </Row>
  )
}

export default ProfileScreen
