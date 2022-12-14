import React, { useState } from "react";
import "./Post.css";
// import Comment from "../../img/comment.png";
// import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import Liker from "./Liker";


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)



  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (
    <div className="Post">
      <div className="">
        <samp
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            lineHeight: "1.5",
            textTransform: "capitalize",
            color: "orange",
          }}
        >
          {data.username}
        </samp>
        <br />
        <span
          style={{
            fontSize: "10px",
            color: "orange",
          }}
        >
          {data.updatedAt.toString("dd-yyyy-MM")}
        </span>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {/* <img src={Comment} alt="" />
        <img src={Share} alt="" /> */}
      </div>
      
      <Liker data={data} likes={likes} />

      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
