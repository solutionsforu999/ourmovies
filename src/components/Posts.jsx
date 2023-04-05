import React, { useEffect, useState, useCallback, useRef } from "react";

import '../css files/post.css';
import ReactPlayer from "react-player";
import loadinggif from '../tools/snoopdog.gif';
import {
  fetchPosts,
  getAllPosts,
  postStatus,
  getvid,
  getvidstatus,
  fetchvideo,
  mfiltred,
  sortByGender,
} from "../features/posts/postsSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Posts() {
  const playerRef=useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector(getAllPosts);
  const status = useSelector(postStatus);
  const filtred = useSelector(mfiltred);
  const [Gif, setGif] = useState('d-none');
  const [currentGender, setcurrentGender] = useState('none');
  const [Display, setDisplay] = useState(['', 'd-none']);
  const [Genders, setGenders] = useState([{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]);

const [testVid,setestVd]=useState(false);

  const video = useSelector(getvid);
  const [vidKey, setvidKey] = useState(null);
  const videoStatus = useSelector(getvidstatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    } else if (status === "loading") {
      setGif('d-block align-items-center mx-auto');
    } else { setGif('d-none') }
    if (videoStatus === 'succeeded') {
      // setloadingvideo('d-none');
      console.log('hada vid', video);
      const copy = { ...video };
      if (copy.results.length === 0) {
        setvidKey(null);
      } else {
        const parts = copy.results.find((ele) => ele.name === 'Official Trailer');
        
        if (parts) {
          console.log(parts.key)
          setvidKey(parts.key);
          console.log('found!!')
        } else {
          setvidKey(null);
        }
      }

    } else if (videoStatus === 'failed') {
      setvidKey(null);
    } 
    else {
      setvidKey('<i className="fa fa-spinner fa-4" aria-hidden="true"></i>');
    }
  }, [status, videoStatus]);

  function sortBygender(event) {

    const gender = event.target.value;
    if (gender === 'none') {
      setDisplay(['', 'd-none']);
      setcurrentGender('none');
      console.log('display state');
      // dispatch(reSetStatus());
      return;
    } else {
      setDisplay(['d-none', '']);
      setcurrentGender('full');
      console.log('display fltred');
      dispatch(sortByGender([posts, gender]));

      return;
    }
  }
  const triggervideo = (vidx) => {
    console.log(vidx);
    dispatch(fetchvideo(vidx));


    return
  }
  const close = (id) => {
    setestVd(false);
    var iframe = document.querySelectorAll('iframe')[id];
    if(iframe){
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
      return 
    }
    
  }
  return (
    <>
      <img className={Gif} src={loadinggif} width='30px' alt='loadinggif' />
      <select onChange={sortBygender}>
        <option value='none'>Sort By Gender</option>
        {Genders.map((gender) => <option value={gender.id}>{gender.name}</option>)}
      </select>
      <section className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">

        {posts.length !== 0 && currentGender === 'none' ?
          posts.results.map((movie,index) =>
            <div key={movie.id + 1000} className="col">
              <article className="card w-30">
                <img className="img" data-bs-toggle="modal" onClick={() => { triggervideo(movie.id) }} data-bs-target={`#exampleModal${movie.id}`} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.original_title} />
                <div className="modal fade" id={`exampleModal${movie.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${movie.id}`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content modal-fullscreen-bg-down">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel${movie.id}`}>Official Trailer</h5>
                      <button onClick={()=>close(index)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body d-flex justify-content-center">
                      {vidKey===null&&<h4 style={{width:'100%',margin:'0 50%'}}>Nothing...</h4>}
                        {testVid===false&&vidKey!==null?<span style={{position:'absolute'}}><i className="fa fa-spinner fa-4" aria-hidden="true"></i> Loading</span>:null}
                        <ReactPlayer width='100%' height='100%' onReady={()=>setestVd(true)} url={`https://www.youtube.com/embed/${vidKey}`} />

                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">

                  <h5 className="card-title">{movie.original_title.substring(0, 20)}</h5>
                  <p className="card-text">{movie.overview.substring(0, 130)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <h6><i className="fa fa-star fa-4" aria-hidden="true"></i> {movie.vote_average}</h6>
                  <h6>Date: {movie.release_date}</h6>
                </div>
              </article>
            </div>)
          :
          (posts.length !== 0 && filtred.length !== 0 && currentGender !== 'none' ? filtred.map((movie) =>
            <div key={movie.id} className="col">
              <article className="card w-30">
                <img className="img" data-bs-toggle="modal" onClick={() => { triggervideo(movie.id) }} data-bs-target={`#exampleModal${movie.id}`} src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.original_title} />
                <div className="modal fade" id={`exampleModal${movie.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${movie.id}`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content modal-fullscreen-bg-down">
                      <div className="modal-header">
                        <h5 className="modal-title" id={`exampleModalLabel${movie.id}`}>Official Trailer</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body d-flex justify-content-center">
                      {vidKey===null&&<h4 style={{width:'100%',margin:'0 50%'}}>Nothing...</h4>}
                        {testVid===false&&vidKey!==null?<span style={{position:'absolute'}}><i className="fa fa-spinner fa-4" aria-hidden="true"></i> Loading</span>:null}
                        <ReactPlayer width='100%' height='100%' onReady={()=>setestVd(true)} url={`https://www.youtube.com/embed/${vidKey}`} />

                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-body">

                  <h5 className="card-title">{movie.original_title.substring(0, 20)}</h5>
                  <p className="card-text">{movie.overview.substring(0, 130)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <h6><i className="fa fa-star fa-4" aria-hidden="true"></i> {movie.vote_average}</h6>
                  <h6>Date: {movie.release_date}</h6>
                </div>
              </article>
            </div>) :
            <span>No Movie</span>)}

      </section>
    </>
    // <>
    //   {/* <div>

    //     </div> */}
    //   {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //       Launch demo modal
    //     </button> */}


    //   <section className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
    //     {/* {posts.map((post) => (
    //       <Post key={post.id} post={post} />
    //     ))} */}
    //     {/* <h6>{status}</h6> */}
    //     {/* {video.length===0?video.length:video.results.length} */}

    //     {posts.length === 0 ? posts : posts.results.map((movie) => <Movie loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />)}
    //   </section>
    // </>

  );
}
{/* <Movie key={movie.id} movie={movie}/> */ }

// posts[0].results.map((movie)=><h1>{movie.id}</h1>)