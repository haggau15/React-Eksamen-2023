* [x] Some form of Login and access control
* [x] Jest tests
* [x] Snapshot tests (Technically)
* [ ] Simulate + jest.fn
* [ ] Supertest
* [ ] Github Actions with coverage report
* [ ] Deployment to cloud (in this case, Azure)
* [x] Mongodb
* [x] Navigating in the application using React Router (remember Express Middleware)
* [x] Reading data from the server (remember error handling)
* [x] Writing data to the server
* [ ] Websockets

Endpoints-client

"/" Frontpage.

"/user/update" Lets user edit their own profile.

"/login" Lets user log in.

"/user/delete" Lets user delete any user.

"/user/all" Lists all users in the database.

/user/new" Lets you create a new user.

Endpoints-server

"/api/user/current" Is used to return currently logged in user.

"/api/logout" Is used to log out currently logged in user.

"/api/login" Is used to log in a user as well as checking if someone is logged in.

"/api/user" Is used for deleting, adding and updating and retriving all users.