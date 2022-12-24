# IELTSTAR - IELTS Online Test Platform
## Project Description
IELTSTAR is an online IELTS test platform. The platform provides multiple mock tests to help users improve their listening, reading, writing, and speaking IELTS exam performance. IELTSTAR can predict the user's overall IELTS band score with a score calculator. It consists of an AI-based speaking assessment to help users improve Fluency & Coherence, Lexical Resources, Grammatical range and accuracy, and Pronunciation. It lets users post their scores on social media platforms like Facebook, Twitter, and Whatsapp and send scores via SMS and Email. IELTSTAR have an interactive dashboard for registered users to help track their progress and view past test mock exams.

## User Requirements
#### Admin Users
- Admin can log in to the platform using the admin credentials
- Admin can CRUD questions
- Admin can CRUD moderators
- Admin can CRUD user profiles

#### Moderators
- Moderator can log in to the platform using the moderator credentials
- Moderator can CRUD questions
- Moderator can update user profile

#### Registered Users (Students)
- Users can log in using their credentials to enter the platform 
- Users can take the IELTS test 
- Registered users can view previous test histories 
- User can view the scores immediately after completing the test 
- Users have access to the dashboard to view their progress
- Users can send scores to different social platforms  
- Users can send scores via email or SMS
- Users will be able to view browser notifications for new questions and promotional activities
- Users can sign up for additional rewards (study material via email)

## Team Members
- Amey Bansod (NUID: 002743117)
- Harshil Shah (NUID: 002780887)
- Keerthana Satheesh (NUID: 002747795)
- Saloni Talwar (NUID: 002924067)

## Domain Model
![Final domain diagram]

![image](https://user-images.githubusercontent.com/113074747/206375077-633c45fb-8d01-4e03-8b3e-946b1ce1721c.png)

### Installation
#### Prerequisites
- Node.js
- NPM
- MongoDB

#### Steps
- Clone the repository
- Add a collection named `ieltstar` in MongoDB
- Run `npm install` in ieltstar and server folder to install all the dependencies
- Add .env.local file in ieltstar along with the following env variables:- API_URL, AUTH0_SECRET, AUTH0_BASE_URL, AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET and set appropriate values
- Add .env file in server along with the following env variables:- PORT, DB_NAME, DB_URL, SENDGRID_APIKEY, FROM_EMAIL, AccountSID, AuthToken, FROM_SMS, SENDGRID_TEMPLATEID and set appropriate values
- Run `npm start` in ieltstar and server folder to start the application, `npm run dev` in ieltstar folder to start the application in development mode
- Go to http://localhost:3000 to view the application

### Technology Stack
- React
- Node.js
- Express
- MongoDB
- Auth0
- SendGrid
- Twilio
- React Material UI
- NextJS
- TypeScript

### Folder Structure
```
.
├── ieltstar - The frontend application
│   ├── components - All the common components
│   ├──├── Layout - All the common layouts (admin and student layout)
│   ├── pages - All the pages
│   ├── public - All the static files
│   ├──├── admin - All the admin pages
│   ├──├── student - All the student pages
│   ├── styles - All the styles
│   ├── images - All the images
│   ├── store - Redux store
│   ├── images - All the images
│   ├── material-ui-configs - Material UI theme configurations
│   ├── utils - All the utility functions
│   ├── .env.local - Environment variables
│   ├── .gitignore - Git ignore file
│   ├── next.config.js - NextJS configuration file
│   ├── package.json - NPM package file
│   ├── tsconfig.json - TypeScript configuration file
│   └── yarn.lock - Yarn lock file
├── server - The backend application
│   ├── server.js - Entry point of the application
│   ├── api - All the APIs
│   ├──├── controllers - All the controllers
│   ├──├── routes - All the middlewares
│   ├──├── services - All the services
    └──└── models - All the models

```


