
Final Project Cloud Backend Deployment
This repository contains the backend code and deployment specifications for the cloud-based project.

Project Structure
- S3 Image Bucket - Stores user-uploaded images for profile.
- DynamoDB Users Table - Stores user details with `email` as the primary key.
- AWS Lambda Functions - Handles user authentication and user profile management
- API Gateway - Create REST APIs for frontend and backend integration.
- IAM Role & Permissions - Ensures secure access control list

Backend Deployment Steps

1.Create S3 Image Bucket
Configure an S3 bucket to store user profile images 

2.Create DynamoDB Table
Table Name: Users
Primary Key: email

3.Deploy Backend Code
Push the backend code to AWS Lambda.
Ensure proper role permissions.

4.Set Up IAM Role Permissions
Grant permissions for Lambda to interact with S3, DynamoDB, API Gateway.

5.Create & Upload AWS Lambda Layer
Package Node.js dependencies in a Lambda layer such as node_modules with required libraries 
Upload to AWS for efficient function execution 

6.Configure API Gateway
Configure Signup, Login, User Profile and Update User Profile APIs using AWS API Gateway.
Enable CORS to allow frontend integration.


# API Endpoints

| API Endpoint     | Method | Description                              |
|-----------------|--------|------------------------------------------|
| `/signup`       | POST   | Registers a new user with profile                |
| `/login`        | POST   | Authenticates a user using credentials                    |
| `/profile`      | GET    | Fetches user profile details and display in user interface           |
| `/updateprofile` | PUT    | Update user profile with profile image and display in user interface |