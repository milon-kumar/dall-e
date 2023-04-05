import mongoose from "mongoose";

const Post = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
},{timestamps:true});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;