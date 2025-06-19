import React from 'react'
import aboutpic from '../assets/about.webp'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src={aboutpic} slt="" className='w-auto' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'> 
          <p>At StudentCounsel, we believe that every student deserves the right guidance to navigate academic, personal, and career challenges. Our platform is dedicated to providing accessible, confidential, and expert counseling support to help students thrive in all aspects of their lives.</p>
          <b className='text-gray-800'>Who We Are</b>
          <p>We are a team of certified counselors, psychologists, educators, and career advisors committed to student well-being. Whether you're feeling overwhelmed by studies, uncertain about your future career, or facing personal struggles — we're here to listen and guide you.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>To empower students through holistic counseling support, helping them overcome obstacles, discover their potential, and achieve their goals with confidence and clarity.</p>
          <b className='text-gray-800'>What We Offer</b>
          <ul>
            <li>Academic Counseling: Help with study stress, exam anxiety, and time management.</li>
            <li>Career Guidance: Personalized career assessments, planning, and skill-building.</li>
            <li>Mental Health Support: Confidential sessions for stress, anxiety, depression, and more.</li>
            <li>Personal Development: Building self-confidence, decision-making, and communication skills.</li>
            <li>Workshops & Webinars: Regular online events on relevant student issues.</li>
          </ul>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p className="font-medium text-gray-900">WHY CHOOSE US</p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
      <div className='flex-1 border px-8 py-8  flex flex-col gap-5 text-[15px] hover:bg-orange-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Trusted Experts</b>
        <p>Our counselors are trained professionals with years of experience.</p>
      </div>
      <div className='flex-1 border px-8 py-8  flex flex-col gap-5 text-[15px] hover:bg-orange-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Confidential & Safe</b>
        <p>Your privacy is our top priority.</p>
      </div>
      <div className='flex-1 border px-8 py-8  flex flex-col gap-5 text-[15px] hover:bg-orange-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Flexible Access</b>
        <p>Schedule sessions at your convenience — online or in person.</p>
      </div>
      <div className='flex-1 border px-8 py-8  flex flex-col gap-5 text-[15px] hover:bg-orange-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Student-Focused</b>
        <p>All our services are tailored specifically for school and college students.</p>
      </div>
      </div>
    </div>
  )
}

export default About
