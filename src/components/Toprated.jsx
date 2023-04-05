import React, { useEffect } from "react";
import Topmovie from './Topmovie';
import loadinggif from '../tools/snoopdog.gif';

import {
  fetchtoprated,
  getoprated,
  getTopstatus,
  sortByGender,
  fetchvideo,
  getvid,
  getvidstatus,
  mfiltred
} from "../features/posts/postsSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Toprated() {
  const dispatch = useDispatch();
  const poststoprated = useSelector(getoprated);
  const filtred = useSelector(mfiltred);
  const status = useSelector(getTopstatus);
  const [Gif, setGif] = useState('d-none');
  const [currentGender, setcurrentGender] = useState('none');
  const [Display, setDisplay] = useState(['', 'd-none']);
  const [Genders, setGenders] = useState([{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]);
  const video = useSelector(getvid);
  const [vidKey, setvidKey] = useState(null);
  const [loadingvideo, setloadingvideo] = useState('d-none');
  const videoStatus = useSelector(getvidstatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchtoprated());
    } else if (status === "loading") {
      setGif('d-block align-items-center mx-auto')
    } else { setGif('d-none') }
  });
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
      dispatch(sortByGender([poststoprated, gender]));

      return;
    }
  }

  useEffect(() => {
    if (videoStatus === 'loading') {
      // setloadingvideo('fa fa-spinner fa-4');
      setvidKey('<i className="fa fa-spinner fa-4" aria-hidden="true"></i>');
    }
    if (videoStatus === 'succeeded') {
      // setloadingvideo('d-none');
      console.log('hada vid', video);
      const copy = { ...video };
      if (copy.results.length === 0) {
        setvidKey(null);
      } else {
        // console.log(copy.results.find((ele) => ele.name === 'Official Trailer'));
        const parts = copy.results.find((ele) => ele.name === 'Official Trailer');
        // console.log('type',key);
        if (parts) {
          console.log(parts.key)
          setvidKey(parts.key);
          console.log('found!!')
        } else {
          setvidKey(null);
        }
      }

    } else if (videoStatus === 'failed') {
      setvidKey(null)
    }

  });
  const triggervideo = (vidx) => {
    console.log(vidx);
    dispatch(fetchvideo(vidx));


    return
  }
  return (
    <>
      <img className={Gif} src={loadinggif} width='30px' alt='loadinggif' />
      {/* <select onChange={sortBy}>
        <option>Sort</option>
        <option value='popularity'>Popularity</option>
        <option value='daterelease'>Date Release</option>
      </select> */}
      <select onChange={sortBygender}>
        <option value='none'>Sort By Gender</option>
        {Genders.map((gender) => <option value={gender.id}>{gender.name}</option>)}
      </select>
      <section className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-3">
        {/* {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))} */}
        {/* <h6>{status}</h6> */}

        {poststoprated.length!==0&&currentGender==='none'?poststoprated.results.map((movie) => <Topmovie loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />):(poststoprated.length!==0 && filtred.length!==0&&currentGender!=='none'?filtred.map((movie) => <Topmovie loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />) :<span>No Movie</span>)}






        {/* {poststoprated.length===0?poststoprated:poststoprated.results.map((movie)=><Topmovie key={movie.id} movie={movie}/>)} */}
      </section>
    </>
  );
}
