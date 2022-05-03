# cloud-client

## Overview
summery of the application

## Login/Security
### Firebase auth
The login system uses the authentication from Firbase cloud service. When a user registers to our website the mail and password gets saved to the authentication service and then the username and userrole to the cloud database Firestore.
<br/>
### Express-session
The application also uses express-session to store a user to prevent the need to login multiple times. When a user login a object of the user i saved in the session. The role of the user is also saved in the session which is used in the API to know if the the user trying to fetch is a registered regular user, an admin or a non registered user. This is for security reasons, as a visitor/user should not be able to fetch things that is intended only for the admins.

## Statistics
### Admin Page
When an admin logs in they go directly to the admin page where they can choose between seeing all the quizzes and all the users. The result is presented in a table and for the quizzes the quiz name togheter with the number of questions. The table of the users show all the users with there username and there userrole.

### Highscore 

## Automated testing
### Cypress
There is automated testing with GitHub actions and the tool Cypress. The action is done by first building the node.js applicaion by installing all npm packages and then running the Cypress tests on localhost.

## Heroku/Docker

## Offline
