import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context,server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
  const{isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context); 
  const logoutHandler = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.get(`${server}/users/logout`,{
       
      },{
        
        withCredentials:true
      })
      toast.success("Logged out successfuly");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };
  // console.log(isAuthenticated);
  return <nav className='header'>
    <div>
        <h2>TODO APP</h2>
    </div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>{
          isAuthenticated? (<button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>):(<Link to={"/login"}>Login</Link>)
        }
    </article>
  </nav>
}

export default Header