import React from "react";
import '../css files/post.css';
import Filmgif from '../tools/loading.gif';
// import { deletemovieById } from "../features/movies/moviesSlice";
import ReactPlayer from 'react-player/youtube';
const Upcomingpost = ({ movie, getvid, vidKey, loadvid }) => {
  // window.onclick = function (event) {
  //   console.log('closed');
  //   var iframe = document.querySelector('iframe');
  //   var iframeSrc = iframe.src;
  //   iframe.src = iframeSrc;

  // }
  // const close = () => {
  //   console.log('closed');
  //   var iframe = document.querySelector('iframe');
  //   var iframeSrc = iframe.src;
  //   iframe.src = iframeSrc;
  // }
  // const whtDisplay = () => {
  //   if (vidKey == null) {
  //     return <h5 height={'40px'}>Not Found :(</h5>
  //   } else if (vidKey === '<i className="fa fa-spinner fa-4" aria-hidden="true"></i>') {
  //     return <img width={'50px'} height={'60px'} src={Filmgif} alt='loadingvideo' />;
  //   } else {
  //     console.log('test');
  //     <ReactPlayer url={`https://www.youtube.com/embed/${vidKey}`} />
  //     return 
  //   }

  // }

  return (
    <div className="col">
      <article className="card w-30">
        <img className="img" data-bs-toggle="modal" onClick={() => { getvid(movie.id) }} data-bs-target="#exampleModal" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.original_title} />
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content modal-fullscreen-bg-down">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Official Trailer Upcoming</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex justify-content-center">
                {/* {whtDisplay()} */}
                {vidKey===null?<i className="fa fa-spinner fa-4" aria-hidden="true"></i>:<ReactPlayer url={`https://www.youtube.com/embed/${vidKey}`} />}
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
    </div>

  );
};

export default Upcomingpost;