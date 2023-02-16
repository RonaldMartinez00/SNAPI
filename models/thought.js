const { Schema, model } = require('mongoose');
const reaction = require('./Reaction')

const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdDate: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split('T')[0];
      },
    },
    author: {
      type: String,
      required: true,
    },
    reactions: [reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
