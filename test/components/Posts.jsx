import React, { useEffect } from "react";
import Post from "./Post";

import {
  fetchPosts,
  getAllPosts,
  postStatus,
} from "../features/posts/postsSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const status = useSelector(postStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  return (
    <section className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}
