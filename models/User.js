const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const UserSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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
  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
    // return this.thoughts.reduce((total, thoughts) => total + thoughts.reactions.length + 1, 0);
  });


  const User = model('User', UserSchema);

  // export the Users model
  module.exports = User;