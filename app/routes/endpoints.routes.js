var serviceRouters = require('../serviceRouters/users.service.router');

module.exports = function (app, db) {

  app.get('/', function (req, res) {
    res.render('/public/index.html');
  });

  app.get('/api', function (req, res) {
    res.send('200 OK');
  });

  app.post('/api/users', function (req, res) {
    serviceRouters.addUsers(db, req.body, function (result) {
      res.status(result[0]).send(result[1]);
    });
  });

};
