import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    
    const {isAuthenticated, loading} = useSelector(state=>state.userReducer)
    const navigate = useNavigate()
    useEffect(() =>{
        // Check if user is authenticated before rendering children
        if(!isAuthenticated && !loading){
            navigate('/login')
        }
    },[isAuthenticated, loading]);

  return children // returns home component(refer main.jsx)
}

export default ProtectedRoute
