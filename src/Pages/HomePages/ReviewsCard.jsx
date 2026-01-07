import React from 'react'
import reviewQuoteImg from '../../assets/reviewQuote.png'

const ReviewsCard = ({ reviewData }) => {
    const { user_photoURL, userName, review } = reviewData;
    return (
        <div className='px-10 py-5 bg-white rounded-2xl'>
            <div>
                <img src={reviewQuoteImg} alt="" />
                <p className='text-[#606060] my-3'>{review}</p>
                <div className='border-b-2 border-dashed dark:border-black'></div>
            </div>
            <div className='flex gap-2 items-center my-5'>
                <img className='w-15 h-15 rounded-full' src={user_photoURL} alt="" />
                <div>
                    <h1 className='text-xl dark:text-black font-extrabold'>{userName}</h1>
                    <p className='text-[#606060]'>Senior Product Designer</p>
                </div>
            </div>
        </div>
    )
}
export default ReviewsCard;