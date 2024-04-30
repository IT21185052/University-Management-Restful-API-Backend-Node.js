const { validationResult } = require('express-validator');
const { createUser } = require('../controllers/userController');
const User = require('../models/userModel');

describe('createUser', () => {
    it('should create a new user', async () => {
        // Mock request object with valid data
        const req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123'
            }
        };

        // Mock validationResult to return no errors
        const mockValidationResult = jest.fn();
        mockValidationResult.isEmpty = jest.fn().mockReturnValue(true);
        validationResult.mockReturnValue(mockValidationResult);

        // Mock User.findOne to return null (indicating user doesn't exist)
        User.findOne = jest.fn().mockResolvedValue(null);

        // Mock User.save to return the saved user
        const savedUser = { _id: 'user_id', name: 'John Doe', email: 'john@example.com' };
        const mockSave = jest.fn().mockResolvedValue(savedUser);
        jest.spyOn(User.prototype, 'save').mockImplementation(mockSave);

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Execute createUser function
        await createUser(req, res);

        // Check if the response is as expected
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'User created successfully!',
            data: savedUser
        });
    });
});
