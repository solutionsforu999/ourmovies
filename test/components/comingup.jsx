import React, { useEffect } from "react";
// import Post from "./Post";

// import {
//   fetchPosts,
//   getAllPosts,
//   postStatus,
// } from "../features/posts/postsSlice";

import { useDispatch, useSelector } from "react-redux";
import { fetchcomingup } from "../Slices/comingupSlice";

export default function Comingup() {
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts);
  const status = useSelector((state)=>state.status);
  useEffect(() => {
    if (status === "idle") {
        console.log(status);s
      dispatch(fetchcomingup());
    }
  }, [status, dispatch]);
    return (
        <>
            <div>{status}</div>
        </>
    );
}
