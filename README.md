# CalAI Challenge Project

Welcome to the CalAI Challenge Project! This repository contains an educational technology (EdTech) project aimed at providing learning resources to users. Below, you'll find details about the project and its tech stack. This project has frontend with Landing Page and Courses and Stripe Payment Gateway.

# Overview
The CalAI Challenge Project is an EdTech platform designed to offer various learning resources to users. It leverages modern technologies to provide an interactive and engaging learning experience.

# Tech Stack
- # Frontend
  - # React.js:
    The frontend of the project is built using React.js, a popular JavaScript library for building user interfaces. React.js allows for the creation of dynamic and responsive UI components.
  - # Tailwind CSS:
    Tailwind CSS is used for styling the frontend components. It provides a utility-first approach to CSS, allowing for rapid development and easy customization of styles.
  
- # Backend
  - # Express.js:
    Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It is used to build the backend API endpoints and handle server-side logic.
  - # Firebase:
    Firebase provides various backend services such as authentication, database, storage, and hosting. It is used in conjunction with Express.js to handle user authentication and other backend functionalities.

# Installation
To set up the CalAI Challenge Project locally, follow these steps:
1. Clone the repository: `git clone https://github.com/<your-username>/CalAI_challenge_project.git`
2. Navigate to the project directory: `cd CalAI_challenge_project`
3. Create a .env file in the root directory with the following content: 
> REACT_APP_STRIPE_PUBLIC_KEY="YOUR_STRIPE_PUBLIC_KEY"
REACT_APP_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
REACT_APP_FIREBASE_MEASUREMENT_ID="YOUR_FIREBASE_MEASUREMENT_ID"
STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
SERVER_PORT="YOUR_SERVER_PORT"
4. Isntall all dependencies : `npm install`
5. Have Two Split Screens:
   > 1. **Frontend**: `npm start`.
   > 2. **Backend**: `npm/nodemon server.js`.

6. Access the application in your browser: `Open http://localhost:3000 to view the frontend.`
