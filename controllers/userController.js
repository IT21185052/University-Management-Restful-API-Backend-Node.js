const { validationResult } = require('express-validator');

const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const randomstring = require('randomstring');

const createUser = async (req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {name,email} = req.body;

        const isExists = await User.findOne({
            email
        })

        if(isExists){
            return res.status(400).json({
                success: false,
                msg: 'Email is already exists!'
            });
        }

        const password = randomstring.generate(6);
        const hashPassword = await bcrypt.hash(password,10);

        var obj = {
            name,
            email,
            password: hashPassword
        }

        if(req.body.role && req.body.role==1){
            return res.status(400).json({
                success: false,
                msg: "You can't create admin!"
            });
        }
        else if(req.body.role){
            obj.role = req.body.role;
        }

        const user = new User(obj);

        const userData = await user.save();

        console.log(password);
        return res.status(200).json({
            success: true,
            msg: "User created successfuly!",
            data:userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const getUsers = async(req,res)=>{
    try{
        const users = await User.find({
            _id:{
                $ne:req.user._id
            }
        })

        return res.status(200).json({
            success: true,
            msg: 'Users Fetched Successfully!',
            data:users
        });



    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const updateUser = async(req,res)=>{
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {id,name} = req.body;

        const isExists = await User.findOne({
            _id:id
        })

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: 'User not exists!'
            });
        }

        var updateObj = {
            name
        }
        if(req.body.role != undefined){
            updateObj.role=req.body.role;
        }

        const updatedData = await User.findByIdAndUpdate({_id:id},{
            $set: updateObj
        },{new:true});


        return res.status(200).json({
            success: true,
            msg: 'Users Updated Successfully!',
            data:updatedData
        });



    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

const deleteUser = async(req,res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {id} = req.body;

        const isExists = await User.findOne({
            _id:id
        })

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: 'User not found!'
            });
        }

        User.findByIdAndDelete({
            _id:id
        })

        return res.status(200).json({
            success: true,
            msg: 'User deleted uccessfully!'
        });

    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports ={
    createUser,
    getUsers,
    updateUser,
    deleteUser

}