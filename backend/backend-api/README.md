
Final Project Cloud Backend Deployment
This repository contains the backend code and deployment specifications for the cloud-based project.

Project Structure
- S3 Image Bucket - Stores user-uploaded images for profile.
- DynamoDB Users Table - Stores user details with `email` as the primary key.
- AWS Lambda Functions - Handles user authentication and profile management.
- API Gateway - Exposes REST APIs for frontend integration.
- IAM Role & Permissions - Ensures secure access control.

Backend Deployment Steps

1.Create S3 Image Bucket
Configure an S3 bucket to store images. 

2.Create DynamoDB Table
Table Name: Users
Primary Key: email

3.Deploy Backend Code
Push the backend code to AWS Lambda.
Ensure proper role permissions.

4.Set Up IAM Role Permissions
Grant permissions for Lambda to interact with S3, DynamoDB, API Gateway.

5.Create & Upload AWS Lambda Layer
Package Node.js dependencies in a Lambda layer.
Upload to AWS for efficient function execution.

6.Configure API Gateway
Expose Signup, Login, and Profile APIs using AWS API Gateway.
Enable CORS to allow frontend integration.


API Endpoints

API	Method	Description

/signup	POST	Registers a new user

/login	POST	Authenticates a user

/profile	GET	Fetches user profile details

/updateprofile PUT Update user profile with profile image
