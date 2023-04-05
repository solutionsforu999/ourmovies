import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, selectPostById } from "../features/posts/postsSlice";

const EditPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`posts/${postId}`);
        // setPost(response.data);
        setPostBody(response.data?.body || "");
        setPostTitle(response.data?.title || "");
        setUserId(response.data?.userId || "");
      } catch (err) {
        setError(err.message);
      }
    };
    if (!post) {
      fetchPost();
    } else {
      setPostBody(post?.body);
      setPostTitle(post?.title);
      setUserId(post?.userId);
    }
  }, [postId, post]);
  const onValidate = () => {
    dispatch(
      updatePost({
        id: Number(postId),
        title: postTitle,
        body: postBody,
        userId,
      })
    );
    navigate("/posts", { replace: true });
  };
  return (
    <section>
      <h3 className="display-6 mb-4">Editing Post #{postId}</h3>
      {error && <h4>Something went wrong: {error}</h4>}
      {!error && (
        <form>
          <div className="mb-3">
            <label htmlFor="titleOfPost" className="form-label">
              Post Title
            </label>
            <input
              type="text"
              className="form-control"
              id="titleOfPost"
              value={postTitle}
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
              value={postBody}
            ></textarea>
          </div>

          <button
            onClick={onValidate}
            type="button"
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      )}
    </section>
  );
};

export default EditPostForm;
