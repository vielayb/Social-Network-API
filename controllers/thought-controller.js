const { Thought, User } = require('../models');

const thoughtController = {
      // get all users // Get /api/thoughts
      getAllThought(req, res) {
        User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
         // get one user by id // Get /api/thougts/_id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    // .populate({
    //   path: 'thoughts',
    //   select: '-__v'
    // })
    // .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  deleteThought() {
    Thought.findOneAndDelete(req, res)
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // remove reply
// removeReaction({ params }, res) {
//   Thought.findOneAndUpdate(
//     { _id: params.thoughtId },
//     { $pull: { reactions: { reaction: params.reactionId } } },
//     { new: true }
//   )
//   .populate({
//     path: 'reactions',
//     select: '-__v'
//   })
//   .select('-__v')
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => res.json(err));
// }

removeReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: req.params.reactionId } },
    { new: true }
  )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
};

module.exports = thoughtController;