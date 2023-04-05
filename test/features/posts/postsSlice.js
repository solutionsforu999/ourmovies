import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // calling api with get methd
  const response = await API.get("posts");
  // return fetched data
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const response = await API.put(`posts/${updatedPost.id}`, updatedPost);
    return response.data;
  }
);

// adding new Post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    // calling api with post method
    const response = await API.post("posts", newPost);
    return response.data;
  }
);
// deleting a post by id
export const deletePostById = createAsyncThunk(
  "posts/deletePostById",
  async (postId) => {
    // calling api with delete method
    const response = await API.delete(`posts/${postId}`);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchPostById: (state, action) => {
      return state.posts.filter((post) => post.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // pushing new added post
        state.posts.unshift(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        const index = state.posts.findIndex(
          (post) => post.id === action.meta.arg
        );
        state.posts.splice(index, 1);
      })
      .addCase(deletePostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllPosts = (state) => state.posts.posts;
export const postStatus = (state) => state.posts.status;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
