require("../config/db.connections");

module.exports = {
  restaurant: require("../controllers/restaurant"),
  review: require("../controllers/review"),
  user: require("../controllers/user"),
};
