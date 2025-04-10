import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfileThunk } from '../../store/slice/user/userThunk';

const UserProfile = () => {

    const dispatch = useDispatch()
    const { userProfile } = useSelector(state=> state.userReducer);
    console.log(userProfile)

    useEffect(()=>{
        dispatch(getUserProfileThunk())
    },[])
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your User Profile</p>
    </div>
  )
}

export default UserProfile
