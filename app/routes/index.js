var endpointRoutes = require('./endpoints.routes');

module.exports = function (app, db) {
  endpointRoutes(app, db);

};
