import React, { useEffect } from "react";
import Upcomingpost from './Topmovie';
import loadinggif from '../tools/snoopdog.gif';

import {
  fetchupcoming,
  upcoming,
  upcomingstatus,
  sortBypopularity,
  sortByGender,
  filtred,
  reSetStatus,
  sortBygendery,
  fetchvideo,
  getvid,
  getvidstatus,
  mfiltred,
} from "../features/posts/postsSlice";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Posts from "./Posts";

export default function Upcoming() {
  const dispatch = useDispatch();
  const upcomingmovies = useSelector(upcoming);
  const filtred = useSelector(mfiltred);//chof filtred PostSlco
  const status = useSelector(upcomingstatus);
  const [Gif, setGif] = useState('d-none');
  const [currentGender, setcurrentGender] = useState('none');
  const [newRes, setnewRes] = useState([]);
  const [Display, setDisplay] = useState(['', 'd-none'])
  const [Genders, setGenders] = useState([{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]);
  const video = useSelector(getvid);
  const [vidKey, setvidKey] = useState(null);
  const [loadingvideo, setloadingvideo] = useState('d-none');
  const videoStatus = useSelector(getvidstatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchupcoming());
    } else if (status === "loading") {
      setGif('d-block align-items-center mx-auto')
    } else { setGif('d-none') }
  });
  const sortBy = (event) => {
    console.log(event.target.value);
    const val = event.target.value;
    if (val === 'popularity') {
      const test = [...upcomingmovies.results]
      console.log(test.sort((a, b) => a.popularity - b.popularity))
    } else if (val === 'daterelease') {
      const test = [...upcomingmovies.results]
      console.log(test.sort((a, b) => a.release_date - b.release_date))
    }
    return
  }
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
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
      dispatch(sortByGender([upcomingmovies, gender]));

      return;
    }


    // console.log(gender);

    // if (newRes.length === 0) {
    //   const movie = upcomingmovies.results;
    //   for (let i = 0; i < movie.length; i++) {
    //     const genderids = movie[i].genre_ids;
    //     for (let x = 0; x < genderids.length; x++) {
    //       if (genderids[x] === parseInt(gender)) {
    //         console.log('hado mtsawyin', gender, genderids[x]);
    //         console.log(movie[i]);
    //         // newres.push(movie[i]);
    //         newRes.push(movie[i]);
    //         setnewRes(newRes);
    //         console.log('new', newRes);
    //       }
    //     }
    //   }
    // }

  }
  // const moVies=()=>{
  //   if(upcomingmovies.length!==0 && newRes!==0){
  //     newRes.map((movie) => <Upcomingpost key={movie.id} movie={movie} />);
  //  }else if(upcomingmovies.length===0){
  //     return <h1>No Movies</h1>;
  //   }else{
  //     return upcomingmovies.results.map((movie) => <Upcomingpost key={movie.id} movie={movie} />);
  //   }
  // }



  // const omg = () => {
  //   console.log('omg');
  //   return;
  // }
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
      setvidKey(null);
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

        {upcomingmovies.length!==0&&currentGender==='none'?upcomingmovies.results.map((movie) => <Upcomingpost loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />):(upcomingmovies.length!==0 && filtred.length!==0&&currentGender!=='none'?filtred.map((movie) => <Upcomingpost loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />) :<span>No Movie</span>)}

        {/* {filtred.length !== 0 && currentGender !== 'none'? filtred.map((movie) => <Upcomingpost loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />) : (filtred.length === 0 && currentGender !== 'none' ? <span>No Movie in this category</span> : '')}
        {upcomingmovies.length === 0 && currentGender === 'none'? '' : upcomingmovies.results.map((movie) => <Upcomingpost loadvid={loadingvideo} vidKey={vidKey} getvid={triggervideo} key={movie.id} movie={movie} />)} */}

      </section>
    </>

  );
}
