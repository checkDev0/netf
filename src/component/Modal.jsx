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
        {children}
        <button
          onClick={handleClose}
          className='outline-none bg-red-700 w-20 rounded-md py-1 text-white font-medium text-lg mt-5'
        >
          Okay
        </button>
      </div>
    </div>
  )
}

export default Modal
