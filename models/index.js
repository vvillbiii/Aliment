require("../config/db.connections");

module.exports = {
  Restaurant: require("../models/retaurant"),
  User: require('./user_models'),
  Review: require('./reviews_model'),

};



