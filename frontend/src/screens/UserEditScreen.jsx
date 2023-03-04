// React packages
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
// Redux packages
import {useDispatch,useSelector} from 'react-redux'
// Components
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// Actions
import { updateUser,getUserProfile } from '../actions/usersActions'
// Constants
import { USER_UPDATE_RESET } from '../constants/usersConstants'



const UserEditScreen = ({match,history}) => {

        // Data from the state
        const userProfile = useSelector(state => state.userProfile )
        const {loading,error,user} =  userProfile

        const userUpdate = useSelector(state => state.userUpdate )
        const {loading:loadingUpdate ,error:errorUpdate,success:successUpdate} =  userUpdate

        // Variables
        const dispatch = useDispatch()

        const [email,setEmail] = useState('')
        const [name, setName] = useState('')
        const [isAdmin, setIsAdmin] = useState(null)


        const userId = match.params.id


        // Listen to data variables
        useEffect(() => {
            if(successUpdate){
                dispatch({type:USER_UPDATE_RESET})
                dispatch(getUserProfile(userId))
                history.push('/admin/users')
            }else{

                if(!user  ||!user._id || user._id !== userId){
                dispatch(getUserProfile(userId))
                }else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                }

            }
        }, [dispatch, history, successUpdate, user, userId])


        // Handlers
        const submitHandler = (e)=>{
            e.preventDefault()
            dispatch(updateUser({_id:userId,name,email,isAdmin}))

        }

    return (
        <>
            <Link to='/admin/users' className='btn btn-dark my-3'>Go Back</Link>

            <FormContainer>

                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ?  <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isAdmin'>
                    <Form.Check type='checkbox' label='isAdmin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
                    </Form.Group>

                    <Button type='submit' variant='dark'>Update</Button>

            </Form>

            ) }
        </FormContainer>

        </>

    )
}

export default UserEditScreen
