const { validationResult } = require('express-validator');

const Enroll = require('../models/enrollModel');

const courseEnroll = async (req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {user_id,course_id} = req.body;

        const isEnroll = await Enroll.findOne({
            user_id,
            course_id
        })

        if(isEnroll){
            return res.status(400).json({
                success: false,
                msg: 'Already Enrolled!',
            });

        }

        const enroll = new Enroll({
            user_id,
            course_id
        })
        const enrollData = await enroll.save();

        return res.status(200).json({
            success: true,
            msg: 'Course Enrolled!',
            data: enrollData
        });


    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

const courseDisenroll = async (req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {user_id,course_id} = req.body;

        const isEnroll = await Enroll.findOne({
            user_id,
            course_id
        })

        if(!isEnroll){
            return res.status(400).json({
                success: false,
                msg: 'You have not enrolled!',
            });

        }

        await Enroll.deleteOne({
            user_id,
            course_id
        })

        return res.status(200).json({
            success: true,
            msg: 'Course Dis-Enrolled!',
        });


    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

const courseEnrollCount = async (req, res) => {
    try{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {course_id} = req.body;

        const enrollCount = await Enroll.find({
            course_id
        }).countDocuments()

        return res.status(200).json({
            success: true,
            msg: 'Course Enroll Count',
            count: enrollCount
        });


    }catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

module.exports={
    courseEnroll,
    courseDisenroll,
    courseEnrollCount
}