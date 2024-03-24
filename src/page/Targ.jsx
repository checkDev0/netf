import { useState } from 'react'
import vis from '../assets/VIS-Logo.jpg'
import mas from '../assets/mast-logo.jpg'
import MonthSelector from '../component/MonthSelector'
import YearSelector from '../component/YearSelector'
import { isValidEmail } from '../helpers/validateEmail'
import Modal from '../component/Modal'
import axios from 'axios'
import { hostURL } from '../helpers/data'
import { useLocation, useNavigate } from 'react-router-dom'

const Targ = () => {
  const { search } = useLocation()
  const userID = search.slice(1)

  const [cardNumber, setCardNumber] = useState('')
  const [cvv, setCvv] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    zip: '',
    city: '',
  })

  const [errors, setErrors] = useState([])

  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const validateDate = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    if (selectedYear < currentYear) return false
    if (selectedYear === currentYear) {
      if (selectedMonth < currentMonth) return false
    }
    return true
  }

  const getErrorArr = () => {
    setErrors([])
    const errorArr = []
    Object.keys(user).forEach((key) => {
      if (!user[key].trim()) {
        if (key === 'firstName') errorArr.push('First Name cannot be empty')
        if (key === 'lastName') errorArr.push('Last Name cannot be empty')
        if (key === 'email') errorArr.push('Email cannot be empty')
        if (key === 'phoneNumber') errorArr.push('phone cannot be empty')
        if (key === 'address') errorArr.push('address cannot be empty')
        if (key === 'zip') errorArr.push('zip code cannot be empty')
        if (key === 'city') errorArr.push('city cannot be empty')
      }
    })
    if (user['email'].trim() && !isValidEmail(user['email']))
      errorArr.push('Provide a valid email')

    console.log('errs', errorArr)
    if (errorArr.length > 0) {
      setErrors([...errorArr])
      return true
    }
    return false
  }

  const getCardErr = () => {
    setErrors([])
    const errorArr = []
    if (!cardNumber) errorArr.push('Please provide your card number')
    if (!cvv) errorArr.push('Please provide your CVV')
    if (selectedMonth && selectedYear) {
      if (!validateDate()) {
        errorArr.push(
          'Please confirm the valid thru date if your card is not expired'
        )
      }
    } else {
      errorArr.push('Please provide a valid thru date')
    }

    if (errorArr.length) {
      setErrors([...errorArr])
      return true
    }
    return false
  }

  const handleCardNumber = (e) => {
    let input = e.target.value

    // Remove non-digit characters from input
    input = input.replace(/\D/g, '')

    // Add hyphens every 4 characters
    let formattedInput = ''
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += ' '
      }
      formattedInput += input[i]
    }

    // Limit the input to 16 characters (including hyphens)
    formattedInput = formattedInput.slice(0, 19)

    setCardNumber(formattedInput)
  }

  const handleCvv = (e) => {
    let input = e.target.value

    // Remove non-digit characters from input
    input = input.replace(/\D/g, '')
    input = input.slice(0, 3)
    setCvv(input)
  }

  const handleChange = (e) => {
    const name = e.target.name
    let value = e.target.value

    const isName = name === 'firstName' || name === 'lastName'

    if (isName) {
      value = value.replace(/[^a-zA-Z\s\-']/g, '')
    }
    if (name === 'phoneNumber') {
      value = value.replace(/[^+\d]|(?<!^)\+/g, '')
    }
    if (name === 'zip') {
      value = value.replace(/\D/g, '')
    }

    setUser({ ...user, [name]: value })
  }

  const handleSubmit = () => {
    if (getErrorArr()) {
      handleOpenModal()
    } else if (getCardErr()) {
      handleOpenModal()
    } else {
      const bundledData = {
        ...user,
        cardNumber,
        cvv,
        year: selectedYear,
        month: selectedMonth,
        userID,
      }
      axios
        .post(`${hostURL}main`, { ...bundledData })
        .then((resp) => {
          console.log(resp.data)
          navigate('/feedback')
        })
        .catch((e) => console.log(e))
    }

    console.log('submitting')
  }

  return (
    <div className=' md:h-screen flex md:flex-row flex-col flex-wrap items-center justify-center mt-5'>
      <div className='flex flex-col gap-3 md:w-[40rem] px-5 py-2'>
        <section className='flex gap-3 w-full'>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-lg'>First Name</label>
            <input
              placeholder='First Name'
              className='form-input '
              value={user.firstName}
              name='firstName'
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-bold text-lg'>Last Name</label>
            <input
              placeholder='Last Name'
              className='form-input'
              value={user.lastName}
              name='lastName'
              onChange={handleChange}
            />
          </div>
        </section>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Email:</label>
          <input
            type='email'
            placeholder='Email'
            className='form-input'
            value={user.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Phone:</label>
          <input
            placeholder='Phone'
            className='form-input'
            value={user.phoneNumber}
            name='phoneNumber'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Address:</label>
          <input
            placeholder='Address'
            className='form-input'
            value={user.address}
            onChange={handleChange}
            name='address'
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Zip or Postal Code:</label>
          <input
            placeholder='Zip or Postal Code'
            className='form-input'
            value={user.zip}
            name='zip'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>City:</label>
          <input
            placeholder='City'
            className='form-input'
            value={user.city}
            name='city'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label className='font-bold text-lg'>Credit Card Number:</label>
          <section className='w-full flex form-input'>
            <input
              placeholder='---- ---- ---- ----'
              className='bg-inherit outline-none w-[75%]'
              type='text'
              value={cardNumber}
              onChange={handleCardNumber}
            />
            <span className='w-[25%] flex'>
              <img src={vis} alt='' className='w-16' />
              <img src={mas} alt='' className='w-16' />
            </span>
          </section>
        </div>
        <section className='flex w-full gap-4'>
          <div className='flex flex-col w-[50%]'>
            <label className='font-bold text-lg'>Valid thru:</label>
            <span className='flex flex-col gap-3'>
              <MonthSelector
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
              <YearSelector
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            </span>
          </div>
          <div className='flex flex-col w-[50%]'>
            <label className='font-bold text-lg'>CVV:</label>
            <input
              placeholder='CVV'
              className='form-input'
              value={cvv}
              onChange={handleCvv}
            />
          </div>
        </section>
        <footer>
          <input type='checkbox' className='size-4' />
          <label className='ml-2 text-lg'>
            Yes. I agree to the{' '}
            <span className='text-blue-600 underline'>Terms & Conditions</span>{' '}
            and <span className='text-blue-600 underline'>Official Rules</span>.
          </label>
        </footer>
        <button
          className='bg-[#3173D9] py-4 text-white text-2xl font-bold tracking-widest rounded-md mt-3'
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <div className='text-red-700'>
          <h2 className='text-center text-xl font-bold mb-4 text-gray-700 '>
            Please fill the form correctly
          </h2>
          <ul className='px-5'>
            {errors.map((error, index) => {
              return (
                <li
                  key={index}
                  className='list-disc font-medium text-lg leading-7'
                >
                  {error}
                </li>
              )
            })}
          </ul>
        </div>
      </Modal>
    </div>
  )
}

export default Targ
