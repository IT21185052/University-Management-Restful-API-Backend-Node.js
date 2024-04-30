
const { validationResult } = require('express-validator');
const Room = require('../models/roomModel');

const addRooms = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { location_number } = req.body;

        const isExist = await Room.findOne({
            room_number:{
                $regex: location_number,
                $options:'i'
            }
        })

        if(isExist){
            return res.status(400).json({
                success: false,
                msg: 'room number already exists!'
            });
        }

        const newRoom = new Room({
            room_number: location_number
        });

        const roomData = await newRoom.save();

        return res.status(200).json({
            success: true,
            msg: 'Room/Location Added Successfully!',
            data: roomData
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getRooms = async (req, res) => {
    try {
        const roomsData = await Room.find({});

        return res.status(200).json({
            success: true,
            msg: 'Rooms/Locations Fetched Successfully!',
            data: roomsData
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};


const deleteRooms = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        const {id}= req.body;

        const roomData = await Room.findOne({ _id:id});

        if(!roomData){
            return res.status(400).json({
                success: false,
                msg: "Room/Location ID doesn't exists!"
            });
        }

        await Room.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            msg: 'Room/Location Deleted Successfully!',
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const updateRooms = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }
        const {id, location_number}= req.body;

        const roomData = await Room.findOne({ _id:id});

        if(!roomData){
            return res.status(400).json({
                success: false,
                msg: "Room ID doesn't exists!"
            });
        }

        const isExist = await Room.findOne({
            _id:{$ne:id},
            room_number:{
                $regex: location_number,
                $options:'i'
            }
        })

        if(isExist){
            return res.status(400).json({
                success: false,
                msg: 'Room Number already assigned to another category!'
            });
        }

        const updatedData = await Room.findByIdAndUpdate({_id:id},{
            $set:{
                room_number: location_number
            }
        },{ new:true});

        return res.status(200).json({
            success: true,
            msg: 'Room Number Updated Successfully!',
            data: updatedData
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

module.exports = {
    addRooms,
    getRooms,
    deleteRooms,
    updateRooms
};
