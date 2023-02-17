const { Thought, User } = require('../models');

const thoughtController = {



  getThoughts(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

    createThought(req, res) {
    Thought.create(req.body)
      .then(({_id}) => User.findOneAndUpdate(
        {_id: req.params.userID},
        {$push:{thoughts: _id}},
        {new: true}
      ))
      .then(data => res.json(data))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID!' })
          : User.findOneAndUpdate(
            { _id: req.params.userID},
            {$pull: {thoughts: thought._id}},
            {new: true}
          )
      )
      .then(() => res.json({ message: 'Thought has been deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought).json({ message: 'Thought has been updated!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body }},
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No friend found with that ID!'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    console.log(req.params)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId }}},
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No friend found with this ID!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;