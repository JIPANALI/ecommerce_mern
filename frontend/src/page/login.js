import React from 'react'
import loginSignupImage from "../assets/login-animation.gif"
import {BiHide, BiShow} from 'react-icons/bi'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {loginRedux} from "../redux/userSlice"
const Login = () => {

  const [showPassword, setshowPassword] = useState(false)


  const [data, setData]=useState({
    
    email:"",
    password:"",
  })

  const usenavigate=useNavigate()

  const userData=useSelector(state=>state)
 

  // to send data to redux

  const dispatch=useDispatch()

  const handleShowPassword=()=>{
    setshowPassword(preve=> !preve)
  }


  



  const handleOnChange=(e)=>{
    const {name, value}=e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })


  } 

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const {email, password}=data  //for checking the you have mandatory put the value and also check
          //also check password and confirm password are same or not if not then it will going to be submit 

    if(email && password){
      const fetchData=await fetch(`http://localhost:8080/login`, {
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })

      const dataRes=await fetchData.json()
      console.log(dataRes)
     
      toast( dataRes.message)

      if(dataRes.alert){
        dispatch(loginRedux(dataRes))  
        setTimeout(()=>{
          
          usenavigate("/")
        },1000)
        console.log(userData)
      }
      
      else{
        alert("please enter the required field")
      }

      

    }else
    {
      alert("Please enter required fields")
    }      


  }
  return (
    <div className='p-3 md:p-4'>
    <div className='w-full max-w-md bg-white m-auto flex items-center flex-col p-4'>
        {/*<h1 className='text-center text-2xl font-bold'>Sign Up</h1>  */}

        <div className='w-20 overflow-hidden rounded-full drop-shadow shadow-md'>
            <img src={loginSignupImage} className='w-full'/>

        </div>


        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
       
          <label htmlFor='email'>Email</label>
          <input type={"email"} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

          <label htmlFor='password'>Password</label>

          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ' >
              <input type={showPassword ? "text":"password"} id="password" name='password' className='mt-1 mb-2 w-full bg-slate-200 border-none outline-none 'value={data.password} onChange={handleOnChange}/>
              <spa className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<BiShow/> :<BiHide/> }  </spa>

          </div>

          <button type='submit' className='max-w-[150px] w-full  m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Login</button>

         
          

        </form>
        <p>Don't  have account? <Link to={"/signup"} className='text-red-500 underline'>Signup</Link></p>

    </div>

</div>

  )
}

export default Login