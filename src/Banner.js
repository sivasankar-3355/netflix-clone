import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
    const [movie, setMovie] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length)]
            )
            return request
        }

        fetchData()
    }, [])
    console.log(movie)
    function truncate(str, n){
        return str?.length > n ? str.substring(0,n-1) + "..." : str;
    }
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      
      const handleClick = (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          movieTrailer(movie?.name || "")
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error) => console.log(error));
        }
      };
    return (
        <div>
            <header className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                }}
            >
                {/* background */}
                <div className="banner_contents">
                    {/* title */}
                    <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    {/* buttons */}
                    <div className="banner_buttons">
                        <button className="banner_button" onClick={()=>handleClick(movie)}>Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    {/* description */}
                    <h1 className="banner_description">
                        {truncate(movie?.overview,150)}
                    </h1>
                </div>
                <div className="banner-fadebottom"></div>
            </header>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Banner