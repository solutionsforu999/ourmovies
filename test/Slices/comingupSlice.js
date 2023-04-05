import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../api/apibase';
export const fetchcomingup = createAsyncThunk('posts', async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=b73db69b1473b998e603b1135a45e51d&language=en-US&page=1');
    console.log(response.data);
    return response.data
});

const upcomingSlice = createSlice({
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
    extraReducers: {
        [fetchcomingup.fulfilled]:(state,action)=>{
            state.posts=action.payload;
            state.status='success';
        },
        [fetchcomingup.pending]:(state)=>{
            state.status='loading';
        },
        [fetchcomingup.rejected]:(state)=>{
            state.status='failed';
        }


    }
  });
  
//   export const upcoming = (state) => state.posts;
//   export const status = (state) => state.status;
//   export const error = (state) => state.error;
  
  export default upcomingSlice.reducer;
  