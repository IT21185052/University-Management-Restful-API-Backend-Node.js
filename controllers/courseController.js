const { validationResult } = require('express-validator');

const Course = require('../models/courseModel');

const createCourse = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { course_name, code, description, credit } = req.body;

        var obj = {
            course_name,
            code,
            description,
            credit
        };

        if (req.body.categories) {
            obj.categories = req.body.categories;
        }

        const course = new Course(obj);

        const courseData = await course.save();

        const courseFullData = await Course.findOne({_id:courseData._id}).populate('categories');

        return res.status(200).json({
            success: true,
            msg: 'Course Added Successfully!',
            data: courseFullData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const getCourse = async(req,res) =>{
    try{
        const courses = await Course.find({}).populate('categories');

        return res.status(200).json({
            success: true,
            msg: 'Course Fetched Successfully!',
            data: courses
        });

   } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const deleteCourse = async(req,res) =>{
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

        const isExists = await Course.findOne({_id:id});

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: "Course doesn't exists!"
            });
        }

        await Course.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success: true,
            msg: 'Course Deleted Successfully!',
        });

   } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Course doesn't exists!"
        });
    }
};

const updateCourse = async(req,res) =>{
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {id,course_name,code,description,credit} = req.body;

        const isExists = await Course.findOne({_id:id});

        if(!isExists){
            return res.status(400).json({
                success: false,
                msg: "Course doesn't exists!"
            });
        }

        var updateObj = {
            course_name,
            code,
            description,
            credit
        }

        if(req.body.categories){
            updateObj.categories = req.body.categories;
        }

        const updatedCourse = await Course.findByIdAndUpdate({_id:id},{
            $set: updateObj
        },{new:true});

        return res.status(200).json({
            success: true,
            msg: 'Course Updated Successfully!',
            data: updatedCourse
        });

   } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Course doesn't exists!"
        });
    }
};

module.exports = {
    createCourse,
    getCourse,
    deleteCourse,
    updateCourse
};
