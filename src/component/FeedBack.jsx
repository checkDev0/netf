import { useEffect, useState } from 'react'

const FeedBack = () => {
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    redirect && window.location.replace('https://www.netflix.com/')
  }, [redirect])

  const handleClick = () => setRedirect(true)
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl md:text-5xl font-bold text-red-700'>
        We are sorry!
      </h1>
      <h1 className='text-2xl md:text-4xl font-bold text-red-700'>
        Something went wrong
      </h1>
      <p className='text-2xl font-bold mt-3'>Please try again</p>
      <button
        className='w-[13rem] bg-red-800 text-white py-4 font-bold text-xl px-3 mt-5 rounded-xl shadow-lg'
        onClick={handleClick}
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default FeedBack
