const { validationResult } = require('express-validator');

const Timetable = require('../models/timetableModel');
const { createNotification } = require('../controllers/notificationController');

const addTimetable = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { course_name, faculty,time,location } = req.body;

        var obj = {
            course_name,
            faculty,
            time,
            location
        };

        if (req.body.course_name) {
            obj.course_name = req.body.course_name;
        }
        if (req.body.faculty) {
            obj.faculty = req.body.faculty;
        }
        if (req.body.location) {
            obj.location = req.body.location;
        }
        

        const timetable = new Timetable(obj);

        const timetableData = await timetable.save();

        const timetableFullData = await Timetable.findOne({_id:timetableData._id}).populate('course_name').populate('faculty').populate('location');

        return res.status(200).json({
            success: true,
            msg: 'Timetable Added Successfully!',
            data: timetableFullData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getTimetable = async(req,res) =>{
    try{
        const timetables = await Timetable.find({_id:id}).populate('course_name').populate('faculty').populate('location');

        return res.status(200).json({
            success: true,
            msg: 'Timetable Fetched Successfully!',
            data: timetables
        });

   } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const deleteTimetable = async(req,res) =>{
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {id} = req.body;

        const isExists = await Timetable.findOne({_id:id});

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: "Timetable doesn't exists!"
            });
        }

        await Timetable.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            msg: 'Timetable Deleted Successfully!',
        });

   } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Timetable doesn't exists!"
        });
    }
};

const updateTimetable = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { id, course_name, faculty, time, location } = req.body;

        const isExists = await Timetable.findOne({ _id: id });

        if (!isExists) {
            return res.status(400).json({
                success: false,
                msg: "Timetable doesn't exists!"
            });
        }

        var updateObj = {
            course_name,
            faculty,
            time,
            location
        }

        // Update obj properties only if they are present in the request body
        if (req.body.course_name) {
            updateObj.course_name = req.body.course_name;
        }
        if (req.body.faculty) {
            updateObj.faculty = req.body.faculty;
        }
        if (req.body.location) {
            updateObj.location = req.body.location;
        }

        // Update timetable
        const updatedTimetable = await Timetable.findByIdAndUpdate({ _id: id }, { $set: updateObj }, { new: true });

        // Create notification after successful update
        await createNotification('Timetable updated successfully');

        return res.status(200).json({
            success: true,
            msg: 'Timetable Updated Successfully!',
            data: updatedTimetable
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Something went wrong while updating the timetable."
        });
    }
};


module.exports = {
    addTimetable,
    getTimetable,
    deleteTimetable,
    updateTimetable
};
