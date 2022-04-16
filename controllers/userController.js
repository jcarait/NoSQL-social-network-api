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
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user 
          ? res.status(404).json({ message: 'No user with this id!' }) 
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user 
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};