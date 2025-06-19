import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import TopCounsellors from '../components/TopCounsellors'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopCounsellors />
      <Banner />
    </div>
  )
}

export default Home
