# Aspire App
## Introduction

Aspire App is a web application designed to provide various functionalities such as user registration, authentication, file upload, user profile management.

# REST API application
### Testing in Thunder Client
Thunder Client is a lightweight, fast, and open-source REST API client extension for Visual Studio Code. It provides a convenient way to test and debug RESTful APIs directly from within the VS Code environment. Thunder Client offers features such as environment variables, history of requests, and syntax highlighting for JSON, making it easier for developers to manage and execute HTTP requests efficiently. 

## Install

    npm install

## Run the app

    node server.js

# REST API

## Register The User

### Request

`POST /register/`

    http://localhost:3000/register/
### with JSON Data
```json
{
  "name": "Rushikesh Shinde",
  "username": "Rushikesh",
  "email": "rushikesh@gmail.com",
  "password": "Rushikesh123"
}
```

### Response

```json
{
  "message": "Registered",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

### Possible Errors:

1. **400 Bad Request**

   - **Description**: Indicates that some or all of the required fields are missing in the request body.
   - **Response**: `Please fill all the fields`

2. **400 Bad Request**

   - **Description**: Indicates that a user with the provided username or email already exists in the database.
   - **Response**: `User already exists`

3. **500 Internal Server Error**
   - **Description**: Indicates an unexpected error occurred while creating the user.
   - **Response**: `Internal Server Error`
   - or
   - **Description** : User is aleady exit
   - **Response** : ```json {
                      "error": "Username already exists"
                      }
                   ```

## Login The User

### Request

`POST /login/`

    http://localhost:3000/login/
### with JSON Data
```json
{
  "username" : "Rushikesh",
  "password" : "Rushikesh123"
}
```
    

### Response

```json
{
  "status": 200,
  "data": {
    "user": {
      "_id": "66668776599416671889aa78",
      "username": "Rushikesh",
      "email": "Rushikesh@gmail.com",
      "name": "Rushikesh Shinde",
      "__v": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
  },
  "message": "logged in successfully"
}
```

### Possible Errors:

1. **400 Bad Request**

   - **Description**: Both username and password are missing in the request body.
   - **Response**: ```json
                   {
                    "message": "Login failed",
                      "info": {
                        "message": "Missing credentials"
                    }
                  }
                  ```

2. **404 Not Found**

   - **Description**: Invalid username or password.
   - **Response**: ```json
                  {
                    "message": "Login failed",
                      "info": {
                      "message": "Incorrect password"
                      }
                  }
                   ```
3. **500 Internal Server Error**
   - **Description**: Unexpected error occurred while processing the login request.
   - **Response**: `Internal Server Error`

## LogOut

### Request

`POST /logout`
  
    http://localhost:3000/logout
### with Header
`Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
Content-type : application/json`

### Response

```json
{
  "status": 200,
  "data": {},
  "message": "logged out successful"
}
```
## Update the User Profile

### Request

`PUT /users/:id/`

    http://localhost:3000/users/66668776599416671889aa78
    
### with Headers and JSON Data

`Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

```json
{
  "username": "UpdateRushikesh",
  "email": "updaterushikesh@example.com",
  "name": "update Rushikesh"
}
```

### Response

```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "66668776599416671889aa78",
    "name": "update Rushikesh",
    "username": "UpdateRushikesh",
    "password": "$2a$10$vrYZcTdHb.lqTr0RM2.Dq.GQtSbyUn9u1o1NF2ADMqVwAYGGIA25G",
    "email": "updaterushikesh@example.com",
    "__v": 0
  }
}
```


## File Upload

### Request

`POST /upload`

    http://localhost:3000/upload
    
### Response:

```json
{
  "status": 200,
  "data": {
    "_id": "6090e1a36b8e840015eeecae",
    "file": "https://cloudinary.com/example_file.jpg",
    "__v": 0
  },
  "message": "File Uploaded Successfully"
}
```
### with Headers and Body (Form-data)
`Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
file : Choose the file`

### Response
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "Screenshot_20221124_221733.png",
    "contentType": "image/png",
    "user": "66668776599416671889aa78",
    "_id": "66668cc1599416671889aa83",
    "__v": 0
  }
}
```

## Delete File

### Request

`DELETE /files/:id`

    http://localhost:3000/files/66668edf599416671889aa8b

### with Headers
`Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
### Response:

```json
{
  "message": "File deleted successfully",
  "file": {
    "_id": "66668edf599416671889aa8b",
    "filename": "Screenshot_20221124_221733.png",
    "contentType": "image/png",
    "user": "66668776599416671889aa78",
    "__v": 0
  }
}
```

## AUTHENTICATION

## Authentication with bcrypt and JSON Web Tokens (JWT)
Uses [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords and [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for creating and verifying JSON Web Tokens (JWTs).

### bcrypt
`bcrypt` is a library to help you hash passwords. It is designed to be computationally intensive to thwart brute force attacks. Here's how you can use `bcrypt` to hash and compare passwords


## Contact Details

```
Name: Rushikesh Shinde
MOBILE NUMBER: 9623548002
MAIL ID: omkumar7828@gmail.com
```

