const {check} = require('express-validator');

exports.registerValidator = [
    check('name','Name is required').not().isEmpty(),
    check('email','Please include valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password','Password is required').not().isEmpty(),
];

exports.loginValidator = [
    check('email','Please include valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password','Password is required').not().isEmpty(),
];

exports.createUserValidator = [
    check('email','Please include valid Email').isEmail().normalizeEmail({
        gmail_remove_dots:true
    }),
    check('password','Password is required').not().isEmpty(),
];

exports.updateUserValidator = [
    check('id','ID is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
];

exports.deleteUserValidator = [
    check('id','ID is required').not().isEmpty(),
];

exports.courseEnrollDisenrollValidator = [
    check('user_id','User ID is required').not().isEmpty(),
    check('course_id','Course ID is required').not().isEmpty(),
];

exports.courseEnrollCountValidator = [
    check('course_id','Course ID is required').not().isEmpty(),
];