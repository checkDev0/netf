import NLogo from '../assets/netf2.webp'
import Logo from '../assets/Netf.png'
import { useState } from 'react'
import Targ from './Targ'

const Body = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(true)
  }
  return (
    <div className='text-[#333333]'>
      {!toggle ? (
        <div className='w-screen md:h-screen flex flex-col items-center  px-7'>
          <section className='flex flex-col items-center mt-3 text-center'>
            <img src={NLogo} className='w-24' />
            <p className='font-semibold text-4xl mt-7 md:mt-3'>
              Your membership has expired
            </p>
            <img src={Logo} className='w-[33rem] mt-[-3rem] md:mt-[-4rem]' />
          </section>
          <article className='text-center text-2xl leading-[2.2rem] md:leading-[2.6rem] mt-[-2rem] md:mt-[-3.5rem]'>
            <p className='text-2xl'>Dear Customer,</p>
            <p>Your membership has expired</p>
            <p>
              But as part of our loyalty program, you can now extend for 90 days
              for free.
            </p>
            <p>
              Enjoy unlimited movies, TV shows, and more. Ready to watch? Extend
              your membership.
            </p>
          </article>
          <button
            className='bg-[#3173D9] rounded-full w-56 py-3 text-2xl text-white mt-10'
            onClick={handleToggle}
          >
            Extend for free
          </button>
        </div>
      ) : (
        <Targ />
      )}
    </div>
  )
}

export default Body
