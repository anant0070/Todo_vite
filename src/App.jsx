import {BrowserRouter as Router,Route,Routes} from "react-router-dom"  
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./components/Profile"
import Login from "./components/Login"
import Register from "./components/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"
 
function App() {
  const {setUser,setIsAuthenticated,setLoading}=useContext(Context);
  useEffect(()=>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then(res=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch(()=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  },[])
    return <Router>
      <Header/>
      <Routes>
      
        <Route path="/"  element={<Home/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>
      </Routes>
      <Toaster/>
    </Router>
}

export default App