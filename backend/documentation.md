# API Documentation

## Sign In / Registeration

### Sign up
- Description: register user
- Request `POST /signup`
    - content-type: application/json
    - body: object
        - username: (String) new user's username
        - password: (String) new user's password
        - role: (String) new user's role
- Responses:
    - Status: 200 
        - indication: User successfully registered without error
        - content-type: application/json
        - body: json object
            - username: (String) the username of the new user
            - role: (String) the users role
    - Status: 400 
        - indication: request made without role, password or username in body
        - content-type: application/json
        - body: json object
            - message: (String) "Request body must contain username, password and role attributes"
    - Status: 500
        - indication: Server side error occured when saving user
        - content-type: application/json
        - body: json object
            - message: (String) error message