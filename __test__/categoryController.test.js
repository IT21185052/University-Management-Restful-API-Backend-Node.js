const { validationResult } = require('express-validator');
const { addCategory, getCategories, deleteCategory, updateCategory } = require('../controllers/categoryController');
const Category = require('../models/categoryModel');

describe('addCategory', () => {
    it('should add a new category', async () => {
        const req = {
            body: {
                category_name: 'Test Category'
            }
        };

        // Mocking validationResult object and its methods
        const mockValidationResult = {
            array: jest.fn(), // Mocking the array method
        };

        // Mocking validationResult object and its methods
        jest.spyOn(validationResult, 'array').mockReturnValue([]); // Mocking the array method

        // Mocking Category.findOne to resolve with null
        Category.findOne = jest.fn().mockResolvedValue(null);

        // Mocking the save method of Category.prototype
        const savedCategory = { _id: 'category_id', name: 'Test Category' };
        const mockSave = jest.fn().mockResolvedValue(savedCategory);
        jest.spyOn(Category.prototype, 'save').mockImplementation(mockSave);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Calling the addCategory function
        await addCategory(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Category Created Successfully!',
            data: savedCategory
        });
    });
});

describe('getCategories', () => {
    it('should fetch all categories', async () => {
        const categories = [{ name: 'Category1' }, { name: 'Category2' }];
        Category.find = jest.fn().mockResolvedValue(categories);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getCategories({}, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Category Fetched Successfully!',
            data: categories
        });
    });
});

describe('deleteCategory', () => {
    it('should delete a category', async () => {
        const req = {
            body: {
                id: 'category_id'
            }
        };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Category.findOne = jest.fn().mockResolvedValue({ _id: 'category_id', name: 'Test Category' });
        Category.findByIdAndDelete = jest.fn().mockResolvedValueOnce({});
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await deleteCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Category Deleted Successfully!'
        });
    });
});

describe('updateCategory', () => {
    it('should update a category', async () => {
        const req = {
            body: {
                id: 'category_id',
                category_name: 'Updated Category'
            }
        };
        validationResult.mockReturnValueOnce({ isEmpty: () => true });
        Category.findOne = jest.fn().mockResolvedValue({ _id: 'category_id', name: 'Test Category' });
        Category.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({ _id: 'category_id', name: 'Updated Category' });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await updateCategory(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Category Updated Successfully!',
            data: { _id: 'category_id', name: 'Updated Category' }
        });
    });
});
