import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
    authorName: { type: String, required: true, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
