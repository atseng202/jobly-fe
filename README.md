# Jobly

[Jobly](http://jobly.demo.alan-tseng.com "Jobly")  is a full stack app built with a React frontend, Node and Express backend, and PostgreSQL as a database. It allows users to search for companies and jobs with query filters, and routes are authenticated and authorized using JSON Web Tokens (JWTs) with middleware in the backend. Users can only access certain routes when authenticated, with some backend routes limited to authorized admin users.

The backend deployment was split into a separate repository for easier deployment. it can be found [here](https://github.com/atseng202/jobly).


# App Highlights
* New users can log in / sign up to access protected routes
* Logged in users can edit their profile users
* Logged in users can view companies and company details, which include job postings related to the company
* Logged in users can view all jobs available or make custom queries

## Upcoming features
* Users can apply for jobs
* Users can live search for jobs and companies upon text input
* Listings of jobs and companies are paginated in batches


# Installation and Setup

## Server-side Setup
Clone the [backend repository](https://github.com/atseng202/jobly)  
`cd jobly`   
`npm install`  
`createdb jobly`  
`createdb jobly-test`  
`psql jobly < data.sql`  
`npm start`

To run tests: `npm test`  

## Client-side Setup
Clone this repository  
`cd jobly-fe`  
`npm install`  
`npm start`

# Technologies Used
1. [React](https://reactjs.org/) for frontend framework
2. [Node](https://nodejs.org/en/) / [Express JS](https://expressjs.com/) for backend framework for routing and middlewares
3. [PostgreSQL](https://www.postgresql.org/) database
4. [node-postgres](https://node-postgres.com/) for connecting to PostgreSQL database from node

# Authors
My partner for the backend was [@kellenrowe](https://github.com/kellenrowe)

My partner for the frontend was [@jiangtracy](https://github.com/jiangtracy)  

# Acknowledgments
Although I wrote both the backend and frontend for this application, the deployed app demo currently uses a version built by Rithm School. This was to ensure that everyone had the same working endpoints while working on the frontend.