const express = require('express');
const router = express();

const auth = require('../middlewares/authMiddleware');

const{ categoryAddValidator,categoryDeleteValidator,categoryUpdateValidator,courseCreateValidator,courseDeleteValidator,courseUpdateValidator,timetableAddValidator,roomAddValidator,roomDeleteValidator,roomUpdateValidator,timetableDeleteValidator,timetableUpdateValidator} = require('../helpers/adminValidator');

const {createUserValidator,updateUserValidator,deleteUserValidator,courseEnrollDisenrollValidator,courseEnrollCountValidator} = require('../helpers/validator');

const categoryController = require('../controllers/categoryController');

const courseController = require('../controllers/courseController');

const userController = require('../controllers/userController');

const enrollController = require('../controllers/enrollController');

const timetableController = require('../controllers/timetableController');

const roomController = require('../controllers/roomController');

//category Routes
router.post('/add-category',auth,categoryAddValidator,categoryController.addCategory);
router.get('/get-categories',auth,categoryController.getCategories);
router.post('/delete-category',auth,categoryDeleteValidator,categoryController.deleteCategory);
router.post('/update-category',auth,categoryUpdateValidator,categoryController.updateCategory);


//Course Routes
router.post('/create-course',auth,courseCreateValidator,courseController.createCourse);
router.get('/get-course',auth,courseController.getCourse);
router.post('/delete-course',auth,courseDeleteValidator,courseController.deleteCourse);
router.post('/update-course',auth,courseUpdateValidator,courseController.updateCourse);

//User Routers
router.post('/create-user',auth,createUserValidator,userController.createUser);
router.get('/get-users',auth,userController.getUsers);
router.post('/update-user',auth,updateUserValidator,userController.updateUser);
router.post('/delete-user',auth,deleteUserValidator,userController.deleteUser);

//enroll & Disenroll routes
router.post('/course-enroll',auth,courseEnrollDisenrollValidator,enrollController.courseEnroll);
router.post('/course-disenroll',auth,courseEnrollDisenrollValidator,enrollController.courseDisenroll);
router.post('/course-enroll-count',auth,courseEnrollCountValidator,enrollController.courseEnrollCount);

//timetable Routes
router.post('/add-timetable',auth,timetableAddValidator,timetableController.addTimetable);
router.get('/get-timetable',auth,timetableController.getTimetable);
router.post('/delete-timetable',auth,timetableDeleteValidator,timetableController.deleteTimetable);
router.post('/update-timetable',auth,timetableUpdateValidator,timetableController.updateTimetable);

//Room Routes
router.post('/add-rooms',auth,roomAddValidator,roomController.addRooms);
router.get('/get-rooms',auth,roomController.getRooms);
router.post('/delete-rooms',auth,roomDeleteValidator,roomController.deleteRooms);
router.post('/update-rooms',auth,roomUpdateValidator,roomController.updateRooms);

module.exports = router;