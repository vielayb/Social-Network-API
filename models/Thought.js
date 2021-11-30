const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
 {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},

   // reference 18.2.4 tell the schema that it can use virtuals by adding toJSON
   {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }

);

  // reference 18.2.4
  // get total count of comments and replies on retrieval
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  // reference 18.1.5
  // create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;