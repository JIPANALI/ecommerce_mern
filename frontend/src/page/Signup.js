import React from 'react'
import loginSignupImage from "../assets/login-animation.gif"
import {BiHide, BiShow} from 'react-icons/bi'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const Signup = () => {

  const navigate=useNavigate()

  const [showPassword, setshowPassword] = useState(false)
  const [confirmshowPassword, setconfirmshowPassword] = useState(false)

  const [data, setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    image:"",
  });
  console.log(data)

  const handleShowPassword=()=>{
    setshowPassword(preve=> !preve)
  }


  

  const handleShowConfirmPassword=()=>{
    setconfirmshowPassword(preve=>!preve)
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

  const handleUploadProfileImage=async (e)=>{
        
        const data=await ImagetoBase64(e.target.files[0])

        setData((preve)=>{
          return{
            ...preve,
            image:data
          }
        })
  }

console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit=async (e)=>{
    e.preventDefault()

    const {firstName, email, password, confirmPassword}=data  //for checking the you have mandatory put the value and also check
          //also check password and confirm password are same or not if not then it will going to be submit 

    if(firstName && email && password && confirmPassword){
      if(password===confirmPassword){
        const fetchData=await fetch(`http://localhost:8080/signup`, {
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify(data)
        })

        const dataRes=await fetchData.json()
        console.log(dataRes)


       // alert(dataRes.message)
        toast(dataRes.message)

        if(dataRes.alert)
        {
          navigate("/login") 
        }
       

      }else{
        alert("check password and confirm password are not equal")
      }
    }
    else{
      alert("Please enter required fields")
    }      


  }
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-md bg-white m-auto flex items-center flex-col p-4'>
            {/*<h1 className='text-center text-2xl font-bold'>Sign Up</h1>  */}

            <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow shadow-md relative '>
                <img src={data.image? data.image : loginSignupImage} className='w-full h-full'/>

                <label htmlFor='profileImage'>
                    <div className=' absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-30 w-full text-center cursor-pointer'>
                      <p className='text-sm p-1 text-white'>upload</p>
                    </div>

                    <input type={"file"} id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage}/>

                </label>
                

            </div>


            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
              <label htmlFor='firstName'> First Name</label>
              <input type={"text"} id="firstName" name="firstName" className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange}/>

              <label htmlFor='lastName'>Last Name</label>
              <input type={"text"} id="lastName" name="lastName" className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleOnChange}/>

              <label htmlFor='email'>Email</label>
              <input type={"email"} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

              <label htmlFor='password'>Password</label>

              <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ' >
                  <input type={showPassword ? "text":"password"} id="password" name='password' className='mt-1 mb-2 w-full bg-slate-200 border-none outline-none 'value={data.password} onChange={handleOnChange}/>
                  <spa className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ?<BiShow/> :<BiHide/> }  </spa>

              </div>

              
              <label htmlFor='password'>Confirm Password</label>

              <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 ' >
                 <input type={confirmshowPassword ? "text":"password"} id="confirmPassword" name='confirmPassword' className='mt-1 mb-2 w-full bg-slate-200 border-none outline-none 'value={data.confirmPassword} onChange={handleOnChange}/>
                  <spa className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{confirmshowPassword ?<BiShow/> :<BiHide/> }  </spa>

               </div>

              <button type='submit' className='max-w-[150px] w-full  m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Sign Up</button>

             
              

            </form>
            <p>Already have account? <Link to={"/login"} className='text-red-500 underline'>Login</Link></p>

        </div>

    </div>
  )
}

export default Signup