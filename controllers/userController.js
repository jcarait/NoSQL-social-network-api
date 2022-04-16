const User = require('../models/User');

module.exports = {
  //Get all users
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
  },
  //Get a  single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user 
          ? res.status(404).json({ message: 'No student with that ID' }) 
          : res.json({
              user,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
};