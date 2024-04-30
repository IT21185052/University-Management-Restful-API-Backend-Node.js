[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)


# RESTful API for a University Timetable Management System(Node.js)

## Introduction

This Node.js REST API is designed to facilitate the management of various resources within an educational institution or any organization requiring scheduling and resource allocation. It provides endpoints for creating, updating, deleting, and retrieving timetables, rooms, users, courses, and handling user authentication.

## Features

- **Timetable Management**: Create, update, delete, and retrieve timetables for courses, faculty, and locations.
- **Room Allocation**: Add, view, and manage rooms for various activities such as classes, meetings, and events.
- **User Management**: Create, update, delete, and authenticate users with secure authentication mechanisms.
- **Course Management**: Manage courses by creating, updating, and deleting course information.
- **Course Enrollment**: Enroll and disenroll users in courses and track enrollment counts.
- **Validation and Error Handling**: Utilizes Express Validator for request validation and provides detailed error handling.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Usage

1. Set up environment variables (if any).
2. Run `npm start` to start the server.
3. Access the API endpoints using an API client like Postman.

## Endpoints

#### Here are the some majorly primary endpoints of our API:

### Timetable Management

- **Add Timetable**
  - Endpoint: `POST /api/timetable/add`
  - Description: Adds a new timetable entry for a course.
  - Request Body:
    ```json
    {
      "course_name": "Course ID",
      "faculty": "Faculty ID",
      "time": "Timetable entry time",
      "location": "Location ID"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Timetable Added Successfully!",
      "data": {
        "_id": "Timetable ID",
        "course_name": "Course ID",
        "faculty": "Faculty ID",
        "time": "Timetable entry time",
        "location": "Location ID"
      }
    }
    ```

- **Get Timetable**
  - Endpoint: `GET /api/timetable/:id`
  - Description: Retrieves timetable information by ID.
  - Request Body:
    ```json
    {
      "id": "Timetable ID"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Timetable Fetched Successfully!",
      "data": {
        "_id": "Timetable ID",
        "course_name": "Course ID",
        "faculty": "Faculty ID",
        "time": "Timetable entry time",
        "location": "Location ID"
      }
    }
    ```

- **Update Timetable**
  - Endpoint: `PUT /api/timetable/update/:id`
  - Description: Updates an existing timetable entry.
  - Request Body:
    ```json
    {
      "course_name": "Updated Course ID",
      "faculty": "Updated Faculty ID",
      "time": "Updated Timetable entry time",
      "location": "Updated Location ID"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Timetable Updated Successfully!",
      "data": {
        "_id": "Timetable ID",
        "course_name": "Updated Course ID",
        "faculty": "Updated Faculty ID",
        "time": "Updated Timetable entry time",
        "location": "Updated Location ID"
      }
    }
    ```

- **Delete Timetable**
  - Endpoint: `DELETE /api/timetable/delete/:id`
  - Description: Deletes a timetable entry by ID.
  - Request Body:
    ```json
    {
      "id": "Timetable ID"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Timetable Deleted Successfully!"
    }
    ```

### Room Management

- **Add Room**
  - Endpoint: `POST /api/room/add`
  - Description: Adds a new room to the system.
  - Request Body:
    ```json
    {
      "room_number": "Room number"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Room Added Successfully!",
      "data": {
        "_id": "Room ID",
        "room_number": "Room number"
      }
    }
    ```

- **Get Room**
  - Endpoint: `GET /api/room/:id`
  - Description: Retrieves room information by ID.
  - Response:
    ```json
    {
      "success": true,
      "msg": "Room Fetched Successfully!",
      "data": {
        "_id": "Room ID",
        "room_number": "Room number"
      }
    }
    ```

- **Update Room**
  - Endpoint: `PUT /api/room/update/:id`
  - Description: Updates an existing room.
  - Request Body:
    ```json
    {
      "room_number": "Updated Room number"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Room Updated Successfully!",
      "data": {
        "_id": "Room ID",
        "room_number": "Updated Room number"
      }
    }
    ```

- **Delete Room**
  - Endpoint: `DELETE /api/room/delete/:id`
  - Description: Deletes a room by ID.
  - Response:
    ```json
    {
      "success": true,
      "msg": "Room Deleted Successfully!"
    }
    ```

### Enrollment Endpoints

#### Course Enrollment

- **URL:** `/api/enroll/course`
- **Method:** POST
- **Description:** Enroll a user into a course.
- **Request Body:**
  - `user_id` (String): ID of the user to enroll.
  - `course_id` (String): ID of the course to enroll in.
- **Response:**
  - Success: 200 OK
    ```json
    {
        "success": true,
        "msg": "Course Enrolled!",
        "data": {
            // Enroll Data
        }
    }
    ```
  - Error: 400 Bad Request
    ```json
    {
        "success": false,
        "msg": "Already Enrolled!"
    }
    ```

#### Course Disenrollment

- **URL:** `/api/enroll/course`
- **Method:** DELETE
- **Description:** Disenroll a user from a course.
- **Request Body:**
  - `user_id` (String): ID of the user to disenroll.
  - `course_id` (String): ID of the course to disenroll from.
- **Response:**
  - Success: 200 OK
    ```json
    {
        "success": true,
        "msg": "Course Dis-Enrolled!"
    }
    ```
  - Error: 400 Bad Request
    ```json
    {
        "success": false,
        "msg": "You have not enrolled!"
    }
    ```

#### Course Enrollment Count

- **URL:** `/api/enroll/course/count`
- **Method:** GET
- **Description:** Get the count of users enrolled in a course.
- **Request Query Parameters:**
  - `course_id` (String): ID of the course to get the enrollment count for.
- **Response:**
  - Success: 200 OK
    ```json
    {
        "success": true,
        "msg": "Course Enroll Count",
        "count": 10
    }
    ```
  - Error: 400 Bad Request
    ```json
    {
        "success": false,
        "msg": "Errors",
        "errors": [
            // Array of validation errors
        ]
    }
    ```

    ### Course Management

- **Create Course**
  - Endpoint: `POST /api/course/create`
  - Description: Creates a new course.
  - Request Body:
    ```json
    {
      "course_name": "Course Name",
      "code": "Course Code",
      "description": "Course Description",
      "credit": "Course Credit"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Course Created Successfully!",
      "data": {
        "_id": "Course ID",
        "course_name": "Course Name",
        "code": "Course Code",
        "description": "Course Description",
        "credit": "Course Credit"
      }
    }
    ```

- **Get All Courses**
  - Endpoint: `GET /api/course/all`
  - Description: Retrieves all courses available in the system.
  - Response:
    ```json
    {
      "success": true,
      "msg": "Courses Fetched Successfully!",
      "data": [
        {
          "_id": "Course ID",
          "course_name": "Course Name",
          "code": "Course Code",
          "description": "Course Description",
          "credit": "Course Credit"
        },
        {
          "_id": "Course ID",
          "course_name": "Course Name",
          "code": "Course Code",
          "description": "Course Description",
          "credit": "Course Credit"
        },
        ...
      ]
    }
    ```

- **Get Course by ID**
  - Endpoint: `GET /api/course/:id`
  - Description: Retrieves a course by its ID.
  - Path Parameter:
    - `id`: Course ID
  - Response:
    ```json
    {
      "success": true,
      "msg": "Course Fetched Successfully!",
      "data": {
        "_id": "Course ID",
        "course_name": "Course Name",
        "code": "Course Code",
        "description": "Course Description",
        "credit": "Course Credit"
      }
    }
    ```

- **Update Course**
  - Endpoint: `PUT /api/course/update/:id`
  - Description: Updates a course by its ID.
  - Path Parameter:
    - `id`: Course ID
  - Request Body (Fields to update):
    ```json
    {
      "course_name": "Updated Course Name",
      "code": "Updated Course Code",
      "description": "Updated Course Description",
      "credit": "Updated Course Credit"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "msg": "Course Updated Successfully!",
      "data": {
        "_id": "Course ID",
        "course_name": "Updated Course Name",
        "code": "Updated Course Code",
        "description": "Updated Course Description",
        "credit": "Updated Course Credit"
      }
    }
    ```

- **Delete Course**
  - Endpoint: `DELETE /api/course/delete/:id`
  - Description: Deletes a course by its ID.
  - Path Parameter:
    - `id`: Course ID
  - Response:
    ```json
    {
      "success": true,
      "msg": "Course Deleted Successfully!"
    }
    ```

 ### Login

- **Login**
  - Endpoint: `POST/api/login`
  - Description: Login as a user.
  - Path Parameter:
    - `email`: User Email,
    - `password`: user Password
  - Request Body (Fields to update):
    ```json
    {
      "email": "User Email",
      "password": "User Password",
    }
    ```
  - Response:
    ```json
    {
      "success": true,
    "msg": "Login Successfully!",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1ZmYyYTk5MjZmMjI5MmNiYWUyOGZiYSIsIm5hbWUiOiJuYW1hbCIsImVtYWlsIjoibmFtYWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkbi9RZFlCZkdrUXRkT0ZnNWszbFNILlhJay8vdlFseG1JVjh2WkhIZktlRXJZYXhJVTlQcEsiLCJyb2xlIjowLCJfX3YiOjB9LCJpYXQiOjE3MTEyOTcxNDQsImV4cCI6MTcxMTMwNDM0NH0.8K00MtsCWBhG44gd6UU76O8HTYjAs1OalJ0q4DuRxXE",
    "tokenType": "Bearer",
    "data": {
        "_id": "65ff2a9926f2292cbae28fba",
        "name": "namal",
        "email": "namal@gmail.com",
        "role": 0,
        "permissions": {
            "_id": "65ff2a9926f2292cbae28fbd",
            "user_id": "65ff2a9926f2292cbae28fba",
            "permissions": [
                {
                    "permission_name": "enroll",
                    "permission_value": [
                        0,
                        1,
                        2,
                        3
                    ],
                    "_id": "65ff2a9926f2292cbae28fbe"
                }
            ],
            "__v": 0
      }
    }
    ```

## Technologies Used

- **Node.js:** Backend JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** MongoDB object modeling for Node.js.
- **JSON Web Tokens (JWT):** Securely transmit information between parties as a JSON object.
- **Express Validator:** Middleware for request validation in Express.js applications.

## Dependencies

- **bcrypt**: ^5.1.1
- **bcryptjs**: ^2.4.3
- **body-parser**: ^1.20.2
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.18.3
- **express-validator**: ^7.0.1
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.2.2
- **nodemailer**: ^6.9.13
- **nodemon**: ^3.1.0
- **randomstring**: ^1.3.0

## Postman Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/33740793/2sA35Bck3T)


## Improve Code Quality & Standards

-  Added clear and descriptive variable names.
-  Added comments to explain each section of the code.
-  Ensured consistent indentation and spacing for better readability.
-  Removed unnecessary variable assignments.

## Contributing

S.Y.T.D.Bandara (IT21185052)


