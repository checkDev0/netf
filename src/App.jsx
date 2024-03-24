import './App.css'
import FeedBack from './component/FeedBack'
import Body from './page/Body'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Body />} />
          <Route path='feedback' element={<FeedBack />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
