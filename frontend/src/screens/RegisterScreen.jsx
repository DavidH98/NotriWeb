// React packages
import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
// Redux packages
import {useDispatch,useSelector} from 'react-redux'
// Components
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Actions
import { register } from '../actions/usersActions'



const RegisterScreen = ({history}) => {
        const location = useLocation();
        let navigate = useNavigate();


        // Data from the state
        const userRegister = useSelector(state => state.userRegister)
        const {loading, error, userInfo} = userRegister

        // Variables
        const dispatch = useDispatch()
        const [email,setEmail] = useState('')
        const [password,setPassword] = useState('')
        const [confirmPassword,setConfirmPassword] = useState('')
        const [hebrewName, setHebrewName] = useState('')
        const [englishName, setEnglishName] = useState('')
        const [englishAddress, setEnglishAddress] = useState('')

        const [address, setAddress] = useState('')
        const [licenseNumber, setLicenseNumber] = useState('')
        const [message, setMessage] = useState(null)
        const redirect = location.search ? location.search.split('=')[1] : '/'


        // Listen to data variables
        useEffect(() => {
            if(userInfo){
                navigate(redirect)
            }
        }, [navigate, redirect, userInfo])


        // Handlers
        const submitHandler = (e)=>{
            e.preventDefault()
            if(password !== confirmPassword){
                setMessage('Passwords do not match')
            }else{

                dispatch(register(hebrewName,englishName,englishAddress,email,password,address,licenseNumber))

            }

        }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}


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
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
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
            <Form.Label>License Number</Form.Label>
            <Form.Control type='text' placeholder='Enter license Number' value={licenseNumber} onChange={(e)=>setLicenseNumber(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark'>Register</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                        Have an account ? {' '} <Link to={redirect ? '/login?redirect='+redirect : '/login'}>Login</Link>
                </Col>
            </Row>


        </FormContainer>
    )
}

export default RegisterScreen
