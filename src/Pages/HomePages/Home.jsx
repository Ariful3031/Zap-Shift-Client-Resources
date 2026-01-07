// import React from 'react'

import React from 'react'
import Logo from '../../Shared/Logo'
import Banner from './Banner'
import HowWork from './HowWork'
import OurService from './OurService'
import Brands from './Brands/Brands'
import Reviews from './Reviews'
  const reviewsPromise =fetch('/reviews.json').then(res=>res.json());

export default function Home() {


  return (
    <div>
     <Banner></Banner>
     <HowWork></HowWork>
     <OurService></OurService>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  )
}

