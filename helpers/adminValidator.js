const {check} = require('express-validator');

exports.permissionAddValidator = [
    check('permission_name','permission name is required').not().isEmpty(),
];

exports.permissionDeleteValidator = [
    check('id','ID is required').not().isEmpty(),
];

exports.permissionUpdateValidator = [
    check('id','ID is required').not().isEmpty(),
    check('permission_name','Permission Name is required').not().isEmpty()
];

exports.categoryAddValidator = [
    check('category_name','Category name is required').not().isEmpty(),
];

exports.categoryDeleteValidator = [
    check('id','ID is required').not().isEmpty(),
];

exports.categoryUpdateValidator = [
    check('id','ID is required').not().isEmpty(),
    check('category_name','category_name is required').not().isEmpty(),
];

exports.courseCreateValidator = [
    check('course_name','Course Name is required').not().isEmpty(),
    check('code','Code is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('credit','Credits is required').not().isEmpty(),
];

exports.courseDeleteValidator = [
    check('id','ID is required').not().isEmpty(),
];

exports.courseUpdateValidator = [
    check('id','ID is required').not().isEmpty(),
    check('course_name','Course Name is required').not().isEmpty(),
    check('code','Code is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    check('credit','Credits is required').not().isEmpty(),
];

exports.storeRoleValidator = [
    check('role_name','Role Name is required').not().isEmpty(),
    check('value','Value is required').not().isEmpty(),
];

exports.timetableAddValidator = [
    check('course_name','Course Name ID is required').not().isEmpty(),
    check('faculty','Faculty ID is required').not().isEmpty(),
    check('time','Time is required').not().isEmpty(),
    check('location','Allocation Room ID is required').not().isEmpty(),
];

exports.timetableDeleteValidator = [
    check('id','Timetable ID is required').not().isEmpty(),
];

exports.timetableUpdateValidator = [
    check('id','Timetable ID is required').not().isEmpty(),
    check('course_name','Course Name ID is required').not().isEmpty(),
    check('faculty','Faculty ID is required').not().isEmpty(),
    check('time','Time is required').not().isEmpty(),
    check('location','Allocation Room ID is required').not().isEmpty(),
];

exports.roomAddValidator = [
    check('location_number','Room Number is required').not().isEmpty(),
];

exports.roomDeleteValidator = [
    check('id','Room id is required').not().isEmpty(),
];

exports.roomUpdateValidator = [
    check('id','Room id is required').not().isEmpty(),
    check('location_number','Room Number is required').not().isEmpty(),
];



