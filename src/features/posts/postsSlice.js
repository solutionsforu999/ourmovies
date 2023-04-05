import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import { current } from '@reduxjs/toolkit';


// fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // calling api with get methd
  const response = await API.get("movie/popular?api_key=b73db69b1473b998e603b1135a45e51d&language=en-US&page=1");
  // return fetched data
  console.log(response.data)
  return response.data;
});

export const fetchtoprated = createAsyncThunk("posts/fetchtoprated", async () => {
  // calling api with get methd
  const response = await API.get("movie/top_rated?api_key=b73db69b1473b998e603b1135a45e51d&language=en-US&page=1");
  // return fetched data
  console.log(response.data)
  return response.data;
});


export const fetchupcoming = createAsyncThunk("posts/fetchupcoming", async () => {
  // calling api with get methd
  const response = await API.get("movie/upcoming?api_key=b73db69b1473b998e603b1135a45e51d&language=en-US&page=1");
  // return fetched data
  console.log(response.data)
  return response.data;
});

export const fetchvideo = createAsyncThunk("fetchvideo", async (id) => {
  // calling api with get methd
  const response = await API.get(`movie/${id}/videos?api_key=b73db69b1473b998e603b1135a45e51d&language=en-US`);
  // return fetched data
  console.log('video',response.data)
  return response.data;
});
// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (updatedPost) => {
//     const response = await API.put(`posts/${updatedPost.id}`, updatedPost);
//     return response.data;
//   }
// );

// // adding new Post
// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   async (newPost) => {
//     // calling api with post method
//     const response = await API.post("posts", newPost);
//     return response.data;
//   }
// );
// // deleting a post by id
// export const deletePostById = createAsyncThunk(
//   "posts/deletePostById",
//   async (postId) => {
//     // calling api with delete method
//     const response = await API.delete(`posts/${postId}`);
//     return response.data;
//   }
// );

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    toprated:[],
    topstatus: "idle",
    toperror: null,
    upcoming:[],
    comingstatus: "idle",
    comingerror: null,
    video:[],
    vidstatus:"idle",
    viderror:null,
    filtred:[]
  },
  reducers:{
    reSetStatus:(state,action)=>{
      state.comingstatus="idle";
    },
    sortByGender:(state,action)=>{
      state.filtred=[];
      // state.comingstatus='idle';
      // const test=current(state.comingstatus);
      // if(test==='succeeded'){
      //   console.log('good!!')
      // }

      
      
      // let filtred=[];

      // console.log('here=>',current(state.upcoming));
      // console.log(action.payload[0]);
      // console.log(action.payload[1]);

      // state.upcoming.results=action.payload;

      const movie=action.payload[0].results;
      if(action.payload[1]==='none'){
        state.filtred=[];
      }else{
        for (let i=0;i<movie.length;i++){
          const genderids=movie[i].genre_ids;
          for(let x=0;x<genderids.length;x++){
            if(genderids[x]===parseInt(action.payload[1])){
              console.log('hado mtsawyin',action.payload[1],genderids[x]);
              state.filtred.push(movie[i]);
            }
          }
        }
      }
      // console.log('filtred:',current(state.filtred));
      // console.log(state.upcoming.results=filtred);
      
      // return filtred;

      //______________________
      // action.payload[0].results.filtre((movie)=>movie.genre_ids.foreach((id)=>id==action.payload[1]))
      // state.upcoming=action.payload[0]
      // console.log(action.payload);
      // console.log(action.payload[0].results[0].genre_ids);
      // console.log(action.payload[0].results[0].genre_ids.forEach(id=>console.log(id)));
      // console.log(action.payload[0].results.filter((movie)=>movie.genre_ids.foreach((id)=>id==action.payload[1])));
      // console.log(action.payload[0].results.filter((movie)=>action.payload[1]==movie.genre_ids.map(id=>id)));
      // state.upcoming[0].results.sort((a,b)=>a.popularity-b.popularity);
    }
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
      //end
      .addCase(fetchtoprated.pending, (state) => {
        state.topstatus = "loading";
      })
      .addCase(fetchtoprated.fulfilled, (state, action) => {
        state.toprated = action.payload;
        state.topstatus = "succeeded";
      })
      .addCase(fetchtoprated.rejected, (state, action) => {
        state.topstatus = "failed";
        state.toperror = action.error.message;
      })
      //end
      .addCase(fetchupcoming.pending, (state) => {
        state.comingstatus = "loading";
      })
      .addCase(fetchupcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
        state.comingstatus = "succeeded";
      })
      .addCase(fetchupcoming.rejected, (state, action) => {
        state.comingstatus = "failed";
        state.comingerror = action.error.message;
      })
      .addCase(fetchvideo.pending, (state) => {
        state.vidstatus = "loading";
      })
      .addCase(fetchvideo.fulfilled, (state, action) => {
        state.video = action.payload;
        state.vidstatus = "succeeded";
      })
      .addCase(fetchvideo.rejected, (state, action) => {
        state.vidstatus = "failed";
        state.viderror = action.error.message;
      })

      // .addCase(updatePost.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   const index = state.posts.findIndex(
      //     (post) => post.id === action.payload.id
      //   );
      //   state.posts.splice(index, 1, action.payload);
      // })
      // .addCase(updatePost.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      // .addCase(addNewPost.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   // pushing new added post
      //   state.posts.unshift(action.payload);
      // })
      // .addCase(addNewPost.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
      // .addCase(deletePostById.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   console.log(action);
      //   const index = state.posts.findIndex(
      //     (post) => post.id === action.meta.arg
      //   );
      //   state.posts.splice(index, 1);
      // })
      // .addCase(deletePostById.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // });
  },
});

export const getoprated=(state)=>state.posts.toprated;
export const getTopstatus=(state)=>state.posts.topstatus;

export const upcoming=(state)=>state.posts.upcoming;
export const upcomingstatus=(state)=>state.posts.comingstatus;
export const {sortBypopularity,sortByGender,reSetStatus}=postsSlice.actions;
export const mfiltred=(state)=>state.posts.filtred;

export const getvid=(state)=>state.posts.video;
export const getvidstatus=(state)=>state.posts.vidstatus;

export const getAllPosts = (state) => state.posts.posts;
export const postStatus = (state) => state.posts.status;




export default postsSlice.reducer;
