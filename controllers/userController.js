const User = require('../models/User')
const helper = require('../helpers')

const USERS_NOT_FOUND = { message: 'No users found' }
const USER_NOT_FOUND = { message: 'user not found' }
const SUCCESS = {message:"success"}

const getAllUsers = async (req, res) => {
    try {
        console.log('get all users')
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        })
        users.length > 1 ? res.status(200).send(users) : res.status(500).send(USERS_NOT_FOUND)
    } catch (error) {
        res.status(500).send(error)
    }
}


const getUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        console.log('get user')

        const exists = await helper.resourceExists(User, id)
        if (!exists) {
            res.status(404).send(USER_NOT_FOUND)
        } else {
            const user = await User.findAll({
                where: {
                    id: id
                }
            })
            res.status(200).send(user)
        }


    } catch (error) {
        res.status(500).send(error)
    }
}

const createUser = async(req, res) => {
    try {
        console.log('create user', req.body)
        const user = await User.create(req.body, { fields: ['name', 'email'] })
        res.status(201).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async(req, res) =>{
    const {id} = req.params
    try{
        console.log('update user')
        const exists = await helper.resourceExists(User,id)
        if(!exists){
            res.status(404).send(USER_NOT_FOUND)
        }else{
            await User.update(req.body,{
                where:{
                    id:id
                }
            })
            res.status(200).send(SUCCESS)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

const deleteUser = async(req, res)=>{
    console.log('delete user')
    const {id} = req.params
    try{
        
        const exists = await helper.resourceExists(User, id)
        if(!exists){
            res.status(404).send(USER_NOT_FOUND)
        }else{
            await User.destroy({
                where:{
                    id:id
                }
            })
            res.status(200).send(SUCCESS)
        }
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}