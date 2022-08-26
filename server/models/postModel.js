import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    desc: { type: String, required: true },
    likes: [],
    liker:[],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
