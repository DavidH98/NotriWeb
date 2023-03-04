// Node packages
import asyncHandler from 'express-async-handler'
// Models
import User from '../models/userModel.js'
// Middleware
import generateToken from '../utils/generateToken.js'




// @dec:    Auth user & get token
// @route:  POST /api/users/login
// @access: Public
const authUser = asyncHandler( async(req,res) => {

const {email, password} = req.body

const user = await User.findOne({email})

if(user && (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        hebrewName:user.hebrewName,
        englishName:user.englishName,
        email:user.email,
        isAdmin:user.isAdmin,
        licenseNumber:user.licenseNumber,
        address:user.address,
        englishAddress:user.englishAddress,
        files:user.files,

        token:generateToken(user._id)
    })
}else{

    res.status(401)
    throw new Error('Invalid email or password')

}

})

const uploadFile= asyncHandler( async(req,res) => {
    res.json(req)
    
})


// @dec:    Register a new user
// @route:  POST /api/users
// @access: Public
const registerUser = asyncHandler( async(req,res) => {

const {englishName,englishAddress,hebrewName ,email, password,address,licenseNumber} = req.body

const userExist = await User.findOne({email})

if(userExist){

    res.status(400)
    throw new Error('User already exist')

}

const user = await User.create({
    hebrewName,
    englishName,
    email,
    password,
    address,
    englishAddress,
    licenseNumber,
})

if(user){
    res.status(201).json({

        _id: user._id,
        hebrewName:user.hebrewName,
        englishName:user.englishName,
        englishAddress:user.englishAddress,
        email:user.email,
        isAdmin:user.isAdmin,
        licenseNumber:user.licenseNumber,
        address:user.address,
        token:generateToken(user._id)

    })

}else{

    res.status(400)
    throw new Error('Invalid user data')



}

})

// @dec:    Get user profile
// @route:  GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler( async(req,res) => {

    const user = await User.findById(req.user.id)

    if(user){

        res.json({

            _id: user._id,
            hebrewName:user.hebrewName,
            englishName:user.englishName,
            englishAddress:user.englishAddress,
            email:user.email,
            isAdmin:user.isAdmin,
            licenseNumber:user.licenseNumber,
            address:user.address,
            files:user.files,
            

        })

    }
    else{
        res.status(404)
        throw new Error('User not found')
    }


})

// @dec:    Update user profile
// @route:  PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler( async(req,res) => {
    
    const user = await User.findById(req.user.id)
    if(user){

        user.hebrewName = req.body.hebrewName || user.hebrewName
        user.englishName = req.body.englishName || user.englishName
        user.englishAddress = req.body.englishAddress || user.englishAddress
        user.email = req.body.email || user.email
        user.address=req.body.address||user.address
        user.licenseNumber=req.body.licenseNumber||user.licenseNumber
        user.files=req.body.files




        if(req.body.password){

            user.password = req.body.password
        }

        const updatedUser = await user.save()
   
        res.json({
        _id: updatedUser._id,
        hebrewName:updatedUser.hebrewName,
        englishName:updatedUser.englishName,
        englishAddress:updatedUser.englishAddress,
        files:updatedUser.files,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        licenseNumber:updatedUser.licenseNumber,
        address:updatedUser.address,
        token:generateToken(updatedUser._id)
    })

    }
    else{
        res.status(404)
        throw new Error('User not found')
    }


})

// @dec:    Get all users
// @route:  GET /api/users
// @access: Private/Admin
const getUsers = asyncHandler( async(req,res) => {

    const users = await User.find({})

    res.json(users)


})

// @dec:    Delete user
// @route:  DELETE /api/users/:id
// @access: Private/Admin
const deleteUser = asyncHandler( async(req,res) => {

    try {

        await User.findByIdAndDelete(req.params.id)
        res.json({message:'User Deleted successfully'})

    } catch (error) {
        res.status(404)
        throw new Error('User not found')

    }


})

// @dec:    Get user by id
// @route:  GET /api/users/:id
// @access: Private/Admin
const getUserById = asyncHandler( async(req,res) => {

    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }

})

// @dec:    Update user by admin
// @route:  PUT /api/users/:id
// @access: Private/admin
const updateUser = asyncHandler( async(req,res) => {

    const user = await User.findById(req.params.id).select('-password')

    if(user){

        user.hebrewName = req.body.hebrewName || user.hebrewName
        user.englishName = req.body.englishName || user.englishName
        user.englishAddress = req.body.englishAddress || user.englishAddress
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        user.address=req.body.address||user.address
        user.licenseNumber=req.body.licenseNumber||user.licenseNumber
        user.files=req.body.files||user.files



        const updatedUser = await user.save()

        res.json({
        _id: updatedUser._id,
        hebrewName:updatedUser.hebrewName,
        englishName:updatedUser.englishName,
        englishAddress:updatedUser.englishAddress,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        licenseNumber:updatedUser.licenseNumber,
        address:updatedUser.address,
        files:updatedUser.files,
        })

    }
    else{
        res.status(404)
        throw new Error('User not found')
    }


})


export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    uploadFile
}