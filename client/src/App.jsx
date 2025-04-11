import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { getUserProfileThunk } from './store/slice/user/userThunk';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    ( async () =>{
       await dispatch(getUserProfileThunk());
    })()
  }, [])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
