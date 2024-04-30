const { validationResult } = require('express-validator');
const { createCourse, getCourse, deleteCourse } = require('../controllers/courseController');
const Course = require('../models/courseModel');

jest.mock('express-validator');

describe('createCourse', () => {
    it('should create a new course', async () => {
        const req = {
            body: {
                course_name: 'Test Course',
                code: 'TC101',
                description: 'This is a test course',
                credit: 3,
                categories: ['category1', 'category2']
            }
        };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue(null);
        const savedCourse = { _id: 'course_id', ...req.body };
        Course.prototype.save = jest.fn().mockResolvedValue(savedCourse);
        Course.findOne = jest.fn().mockResolvedValue(savedCourse);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await createCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Course Added Successfully!',
            data: savedCourse
        });
    });

    it('should return validation errors if request body is invalid', async () => {
        const req = { body: {} };
        validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => ['Validation Error'] });
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await createCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Errors',
            errors: ['Validation Error']
        });
    });

    it('should return error if course with same name already exists', async () => {
        const req = {
            body: {
                course_name: 'Test Course',
                code: 'TC101',
                description: 'This is a test course',
                credit: 3,
                categories: ['category1', 'category2']
            }
        };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue({ _id: 'existing_course_id' });
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await createCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Course with the same name already exists!'
        });
    });

    it('should return error if any error occurs during course creation', async () => {
        const req = {
            body: {
                course_name: 'Test Course',
                code: 'TC101',
                description: 'This is a test course',
                credit: 3,
                categories: ['category1', 'category2']
            }
        };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue(null);
        Course.prototype.save = jest.fn().mockRejectedValue(new Error('Database Error'));
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await createCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Database Error'
        });
    });
});

describe('getCourse', () => {
    it('should fetch all courses', async () => {
        const courses = [
            { _id: 'course_id1', course_name: 'Course 1' },
            { _id: 'course_id2', course_name: 'Course 2' }
        ];
        Course.find = jest.fn().mockResolvedValue(courses);
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await getCourse({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Course Fetched Successfully!',
            data: courses
        });
    });

    it('should return error if any error occurs during course fetching', async () => {
        Course.find = jest.fn().mockRejectedValue(new Error('Database Error'));
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await getCourse({}, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Database Error'
        });
    });
});

describe('deleteCourse', () => {
    it('should delete the specified course', async () => {
        const req = { body: { id: 'course_id' } };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue({ _id: 'course_id' });
        Course.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'course_id' });
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await deleteCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Course Deleted Successfully!'
        });
    });

    it('should return error if course to delete is not found', async () => {
        const req = { body: { id: 'non_existing_course_id' } };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue(null);
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await deleteCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: "Course doesn't exists!"
        });
    });

    it('should return error if any error occurs during course deletion', async () => {
        const req = { body: { id: 'course_id' } };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Course.findOne = jest.fn().mockResolvedValue({ _id: 'course_id' });
        Course.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Database Error'));
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await deleteCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: 'Database Error'
        });
    });
});

