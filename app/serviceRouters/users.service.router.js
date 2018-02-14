module.exports = {

  testApi: function (body) {
    return (body);
  },

  addUsers: function (db, requestBody, callback) {

    var responseArray = new Array(); //statusCode | Response

    var userEmail = requestBody.emailAddress;
    var userPassword = requestBody.password;
    var userMobile = '';
    var userRole = 'user';
    var isUserRoleValid = true;
    var regxFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    /* LOGIC : There are two types of roles: user, and admin.
    If the role is not, it should default to user.
    Return status 400 if the input is invalid (e.g. invalid role name).
    */

    if (requestBody.hasOwnProperty('role')) {
      if (requestBody.role == 'admin') {
        userRole = requestBody.role;
      }else if (requestBody.role == 'user') {
        userRole = requestBody.role;
      }else {
        isUserRoleValid = false;
      }
    }else {
      //by default its a user
    }

    if (requestBody.hasOwnProperty('mobile')) {
      userMobile = requestBody.mobile;
    } else {}

    //Generate a random password if there is no password
    if (!userPassword || userPassword.indexOf(' ') >= 0) {
      var userPass = Math.random().toString(36).slice(-8);
      userPassword = userPass.concat('*');
    }else {}

    if (!userEmail || userEmail.indexOf(' ') >= 0) {
      // if emailAddress is not passesed with the request
      responseArray[0] = '400';
      responseArray[1] = 'No email address';
      callback(responseArray);

    }else if (isUserRoleValid === false) {
      responseArray[0] = '400';
      responseArray[1] = 'Invalid Role Name';
      callback(responseArray);

    }else if (!((userPassword.length < 5) || (regxFormat.test(userPassword)))) {
      responseArray[0] = '400';
      responseArray[1] = '{\n\t"status": "400," \n\t"message": "Password complexity requirement not met," \n\t"developerMessage": "User creation failed because password complexity requirement not met",\n}';
      callback(responseArray);
    }else {

      var userDetail = { email: userEmail, password: userPassword, role: userRole, mobile: userMobile};

      db.collection('users').findOne({ email: userEmail }, function (err, result) {
        if (result) {
          // user exists
          responseArray[0] = '409';
          responseArray[1] = '{\n\t"status": 409,\n\t"message": "An user with email: ' + userEmail + ' already exists.",\n\t"developerMessage": "User creation failed because the email: ' + userEmail + ' already exists."\n}';
          callback(responseArray);

        } else {
          //user doesnt exist
          db.collection('users').insert(userDetail, function (err, result) {
            if (err) {
              responseArray[0] = '404';
              responseArray[1] = { error: 'An error has occurred' };
              callback(responseArray);

            } else {
              //console.log(result.ops[0]._id);
              console.log(JSON.stringify(result.ops[0]));
              responseArray[0] = '201';
              responseArray[1] = '{\n\t"self": "http://localhost:8090/api/users/' + result.ops[0]._id + '",\n\t"emailAddress": "' + result.ops[0].email + '",\n\t"role": "' + result.ops[0].role + '"\n\t"mobile": "' + result.ops[0].mobile + '"\n}';
              callback(responseArray);
            }
          });

        }
      });
    }
  },
};
