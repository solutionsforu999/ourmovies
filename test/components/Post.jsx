import React from "react";
import { deletePostById } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="col">
      <article className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{post.title.substring(0, 20)}</h5>
          <p className="card-text">{post.body.substring(0, 100)}</p>
        </div>
        <div className="card-footer d-flex justify-content-around">
          <button
            onClick={() => dispatch(deletePostById(post.id))}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`${post.id}`)}
            className="btn btn-outline-primary"
          >
            Update
          </button>
        </div>
      </article>
    </div>
  );
};

export default Post;
