const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining post Schema
const PostSchema = new Schema ({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now        
    }
});

module.exports = Post = mongoose.model("posts", PostSchema)