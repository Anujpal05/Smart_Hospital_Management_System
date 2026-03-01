import React from 'react'
import { FaArrowRight } from "react-icons/fa";


const Welcome = () => {
    return (
    <div className='  text-white py-10 lg:py-2'>
      <h1 className=' text-lg font-bold text-center text-blue-500'>Welcome to MEDDICAL</h1>
    <h2 className=' text-2xl lg:text-3xl font-bold text-center text-purple-900'>A Great Place to Receive Care.</h2>
    <p className=' text-center p-2 text-black  lg:w-1/3 mx-auto my-2 '>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. 
        Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim.
    </p>
    <div className=' flex justify-center items-center gap-2 my-4'><span className=' text-blue-400'>Learn More</span> <span className=' text-blue-700'><FaArrowRight /></span> </div>
    <div className=' flex justify-center items-center'>
        <img src="https://res.cloudinary.com/dcfy1v0ab/image/upload/v1771861269/Blackdoctors_1_zlhzrm.png" alt="welcome"  className='' />
    </div>
    </div>
  )
}

export default Welcome