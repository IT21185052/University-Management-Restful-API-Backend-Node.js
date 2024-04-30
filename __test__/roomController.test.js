const { addRooms ,getRooms, deleteRooms} = require('../controllers/roomController');
const Room = require('../models/roomModel');

describe('addRooms', () => {
    it('should add a new room/location', async () => {
        // Simulate a request object with valid data
        const req = {
            body: {
                location_number: 'Room101'
            }
        };
        // Mock the response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Mock Room.findOne to return null (indicating room doesn't exist)
        Room.findOne = jest.fn().mockResolvedValue(null);
        // Mock Room.save to return a new room object
        const savedRoom = { _id: 'room_id', room_number: 'Room101' };
        Room.prototype.save = jest.fn().mockResolvedValue(savedRoom);
        // Execute the addRooms function
        await addRooms(req, res);
        // Check if the response is as expected
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Room/Location Added Successfully!',
            data: savedRoom // Ensure data is returned
        });
    });
});

describe('getRooms', () => {
    it('should fetch all rooms/locations', async () => {
        // Mock Room.find to return some rooms
        const rooms = [{ room_number: 'Room101' }, { room_number: 'Room102' }];
        Room.find = jest.fn().mockResolvedValue(rooms);
        // Mock the response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Execute the getRooms function
        await getRooms({}, res);
        // Check if the response is as expected
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Rooms/Locations Fetched Successfully!',
            data: rooms // Ensure rooms data is returned
        });
    });
});

describe('deleteRooms', () => {
    it('should delete the specified room/location', async () => {
        // Simulate a request object with valid data
        const req = {
            body: {
                id: 'room_id'
            }
        };
        // Mock Room.findOne to return the room to be deleted
        const roomToDelete = { _id: 'room_id', room_number: 'Room101' };
        Room.findOne = jest.fn().mockResolvedValue(roomToDelete);
        // Mock Room.findByIdAndDelete to resolve successfully
        Room.findByIdAndDelete = jest.fn().mockResolvedValue({});
        // Mock the response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Execute the deleteRooms function
        await deleteRooms(req, res);
        // Check if the response is as expected
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: 'Room/Location Deleted Successfully!'
        });
    });

    it('should handle the case when room/location ID does not exist', async () => {
        // Simulate a request object with valid data
        const req = {
            body: {
                id: 'non_existing_room_id'
            }
        };
        // Mock Room.findOne to return null (indicating room does not exist)
        Room.findOne = jest.fn().mockResolvedValue(null);
        // Mock the response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Execute the deleteRooms function
        await deleteRooms(req, res);
        // Check if the response is as expected
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            msg: "Room/Location ID doesn't exists!"
        });
    });
});





