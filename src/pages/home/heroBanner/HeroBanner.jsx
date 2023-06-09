import React, { useState, useEffect } from 'react'
import './HeroBanner.scss'
import { useNavigate } from 'react-router-dom';

import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import Img from "../../../components/lazyLoadImage/img"
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
  const [background, setBeckground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBeckground(bg)
  }, [data])
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }
  return (
    <div className='heroBanner'>

      {!loading && <div className='backdrop-img'>
        <Img src={background} />
      </div>}
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>
            Milliaons of Movies, Tv shows and people to discover.
            Explore Now.
          </span>
          <div className='searchInput'>
            <input type='text' onChange={(e) => setQuery(e.target.value)} onKeyUp={searchQueryHandler} placeholder='Search for a Movie or Tv show....' />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner