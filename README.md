# back-endMethod Endpoint Description

POST /api/users/users

    Creates a user using the information sent inside the body of the request. Hash the password before saving the user to the database.

POST /api/users/login

    Use the credentials sent inside the body to authenticate the user. On successful login, create a new JWT with the user id as the subject and send it back to the client. If login fails, respond with the correct status code and the message: 'You shall not pass!'

GET /api/users

    If the user is logged in, respond with an array of all the users contained in the database. If the user is not logged in respond with the correct status code and the message: 'You shall not pass!'.

GET /api/hacks

    If user is logged in with restricted admin access, then find hacks from database.  If succesful send 200 message, if not send 500 failed message.

POST /api/hacks

    If user is logged in, then after requiring body input addHacks to user profile. If successful send 200 success message, if not send 500 message saying could not add hack.
