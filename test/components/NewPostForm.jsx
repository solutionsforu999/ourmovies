import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/posts/postsSlice";

const NewPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const userId = 1;

  const onSave = () => {
    dispatch(
      addNewPost({
        title: postTitle,
        body: postBody,
        userId,
      })
    );
    navigate("/posts", { replace: true });
  };
  return (
    <section>
      <h3 className="display-6 mb-4">Adding new post</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="titleOfPost" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            id="titleOfPost"
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bodyOfPost" className="form-label">
            Post Body
          </label>
          <textarea
            onChange={(e) => setPostBody(e.target.value)}
            className="form-control"
            id="bodyOfPost"
            rows="3"
          ></textarea>
        </div>

        <button onClick={onSave} type="button" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
};

export default NewPostForm;
