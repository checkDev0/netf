import { useState, useEffect } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    setModalOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setModalOpen(false)
    onClose()
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
        modalOpen ? '' : 'hidden'
      } transition-opacity duration-300`}
    >
      <div className='bg-white rounded-lg overflow-hidden shadow-md w-full max-w-md p-6 transform transition-transform duration-300'>
        <button
          onClick={handleClose}
          className='absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none'
        >
          <svg
            className='h-6 w-6 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path
              fillRule='evenodd'
              d='M5.293 5.293a1 1 0 011.414 0L12 10.586l5.293-5.293a1 1 0 111.414 1.414L13.414 12l5.293 5.293a1 1 0 01-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 12 5.293 6.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
