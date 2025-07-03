import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { IoStarSharp } from 'react-icons/io5'

const Rating = () => {
 const { appointmentId } = useParams()
  const { backendUrl, token } = useContext(AppContext)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const navigate = useNavigate()

  const submitRating = async () => {
    if (rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5")
      return
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/rate`, {
        appointmentId,
        rating,
        review
      }, {
        headers: { token }
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='bg-orange-100 py-10'>
    <div className=" p-6 bg-white  rounded-lg mx-50">
      <h2 className="text-xl font-bold mb-4 text-orange-600 ">Rate Your Appointment</h2>

      <div className="mb-4 text-xl flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
            <span
            key={star}
            onClick={() => setRating(star)}
            style={{ color: star <= rating ? 'gold' : 'gray', cursor: 'pointer', fontSize: '2rem' }}
            >
            <IoStarSharp />
            </span>
        ))}
        </div>

      <textarea
        className="w-full border p-2 rounded mb-4"
        rows="4"
        placeholder="Optional: write your feedback here"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-[40%]"
        onClick={submitRating}
      >
        Submit
      </button>
    </div>
    </div>
  )
}

export default Rating
