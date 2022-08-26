import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  const user = await UserModel.findById(newPost.userId);
  newPost.username= user.username;
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
 // const liker;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });


       await post.updateOne({ $set: { liker: [] } });
       post.likes.map(async (likerUser) => {
         const likePostUser = await UserModel.findById(likerUser);
         await post.updateOne({ $push: { liker: likePostUser } });
       });
      const likePostUser = await UserModel.findById(userId);
      await post.updateOne({ $pull: { liker: likePostUser } });
      
      
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });


       await post.updateOne({ $set: { liker: [] } });
       post.likes.map(async (likerUser) => {
         const likePostUser = await UserModel.findById(likerUser);
         await post.updateOne({ $push: { liker: likePostUser } });
       });
      
       const likePostUser = await UserModel.findById(userId);
       await post.updateOne({ $push: { liker: likePostUser } });
      
      res.status(200).json("Post liked");
    }



  } catch (error) {
    res.status(500).json(error);
  }
};


// Get timeline posts
export const getTimelinePosts = async (req, res) => {

  const userId = req.params.id
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    const allTimeLinePost=currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        
    // allTimeLinePost.map(async (post) => {
    //   //  post.liker.dropIndexs();
    //      await post.findOneAndUpdate({ $set: { liker: [] } });

    //       let likePostUser;

    //     post.likes.map(async(likerUser) => {
    //       likePostUser = await UserModel.findById(likerUser);
    //       await post.updateOne({ $push: { liker: likePostUser } });

    //     }); 

    // })
     
        
        res.status(200).json(allTimeLinePost);
  } catch (error) {
    res.status(500).json(error);
  }
};
