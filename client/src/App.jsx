import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { getUserProfileThunk } from './store/slice/user/userThunk';
import { useDispatch } from 'react-redux';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
