# CS 516 - Cloud Computing

This project is an engineering proof of concept aimed at providing hands-on experience in building a full-stack application using ReactJs and Nodejs technologies. 

## Project Requirements
| Feature                                                                                                                                                                                                                                                                                  
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
| 1. Develop an Auth application with the following                   Features                                                                                                                                                                          
| * SignUp: Users can use this feature to register an account which contains email (as ID), password, name, profileImage.                                                                                                                                                                 |    
| * Login: After registering successfully, users can login to the application.                                                                                                                                                                                                                                                                     
| * Upload image: After logging in successfully, users can upload their profile images. Users also can preview image. And the profile image is updated, they can see the profile image.        

| 2. Tech Stack                                                                                                                                                                                                     
| * Front End: ReactJS, Angular, or any frontend frameworks you prefer.                                                                                                           
| * Backend: Your preferred backend technology, such as NodeJS, Python, or Java.   
| * Front End: ReactJS, Angular, or any frontend frameworks you prefer.                                                                                                           
|3. Deployment: Serverless architecture
|* Frontend: S3, CloudFront
|* Backend: Lambda, API gateway
|* Database: DynamoDB
|4. Implment CloudFormation template (YAML or CDK) for the above resources.
|5. Implement CodePipeline for Frontend or Backend
|6. Add the above CodePipeline to to the template.                                                                                                                                                                                                                                 


# Group member

| Name         | Student ID | Responsibility
| ------------ | ---------- |
| Nomin Nergui     |      | - Develop the user interface using ReactJS
- Implement SignUp,Login, Retrieve User Info and Upload Image features
- Integrate with backend APIs for user authentication and profile image upload to S3 bucket.
- Implement responsive design and user-friendly experience and deploy the frontend to S3 and configure CloudFront for distribution.     
| Sukhbat Amartugs  |      | 
- Develop the CloudFormation YAML template for the serverless architecture.
- Define resources: Such as Lambda, API Gateway, DynamoDB, S3 
- Implement CodePipeline for automated deployment of frontend and backend.
| Toe Toe Aung | 618090     | - Develop the backend using NodeJS 
- Implement SignUp,Login, Retrieve User Info and Upload Image APIs.
- Integrate with DynamoDB for storing user data.
- Implement image upload and storage functionality using S3.
- Ensure secure authentication and authorization mechanisms and deploy the backend using Lambda and API Gateway.