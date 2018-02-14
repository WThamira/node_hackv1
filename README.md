
## Quick Start & development

To run this project

```bash
$ git clone https://github.com/gayanW/selkie.git
$ cd selkie
$ git pull origin node.js
$ npm install
$ npm start
$ node server
```

## Hosted on

```bash
https://selkie.herokuapp.com/
```
Note : wait for some time & even if not please refresh the tab once again. (app will be sleep after every 30 min)


## for Testers

Regarding Issue 1 :

  * launch the postman
  * Set Request type as GET
  * Enter URL as https://selkie.herokuapp.com/api
  * Hit Send Button

Regarding Issue 4 :

  * launch the postman
  * Set Request type as POST
  * Enter URL as https://selkie.herokuapp.com/api/users
  * go to the 'body' tab choose 'raw' & then 'JSON(application/json)'
  * Change the body content as follows & look for responses

  if the user was successfully created.
  Request body
  ```bash
  {
    “emailAddress”: “admin@letmehack.lk”,
    “password”: “password”
  }
  ```
  Response :
  ```bash
  {
    “self”: “http://localhost:8090/api/users/{user_id}”
    “emailAddress”: “admin@letmehack.lk”
  }
  ```

  if no email address passes.
  Request body
  ```bash
  {
    “emailAddress”: “”,
    “password”: “password”
  }
  ```

  Response status
  Status 400

  user already exist
  Request body
  ```bash
  “emailAddress”: “admin@letmehack.lk”,
  “password”: “password”
  ```
  Response
  ```bash
  {
	"status": 409,
	"message": "An user with email: admin@letmehack.lk already exists.",
	"developerMessage": "User creation failed because the email: admin@letmehack.lk already exists."
  }
  ```
