import React, { useState } from 'react'
import Freshfood from "../assets/Freshfood.png"
import { Link } from 'react-router-dom'
import {HiOutlineUserCircle} from 'react-icons/hi'
import {BsFillCartFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'

const Header = () => {

  const [showMenu, setshowMenu]=useState(false)
  const userData=useSelector((state)=>state.user)
  console.log(userData.email)

  const dispatch=useDispatch()


  const handleShowMenu=()=>{

    setshowMenu(preve=> !preve)     //In useStae there is false then that will be change using preve=> !preve the is going to  true
  }
 
  const handleLogout=()=>{


    dispatch(logoutRedux())
    toast("Logout Successfuly")
  }

    console.log(process.env.REACT_APP_ADMIN_EMAIL)

    const cartItemNumber=useSelector((state)=>state.product.cartItem)

  return (
    <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50'>
      {/* desktop*/ }

      <div className='flex items-center h-full justify-between bg-blue-600'>
        <Link to={""}>
          <div className=' h-16'>
            <img src={Freshfood} className='h-full'/>

          </div>
        </Link>

        <div className='flex item-center gap-4 md:gap-7'>
          <nav className='flex gap-4 md:gap-6 text-base md:text-lg text-white hidden md:flex'>
              <Link to={""}> Home</Link>
              <Link to={"menu/645dfb4b1532bca54e759b5c"}>Menu</Link>
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>

          </nav>
          <div className='text-2xl text-slate-600 relative '>
              <Link to={"cart"}>
              <BsFillCartFill/>
              <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartItemNumber.length}</div>
              </Link>  
          </div>
          <div className=' text-slate-600'  onClick={handleShowMenu}>
              <div className='text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow'>
                 {userData.image ? <img src={userData.image} className='h-full w-full'/> :<HiOutlineUserCircle/> } 
              </div>

              {
                showMenu && (
                  <div className='absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>

                  {
                    userData.email===process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer px-2'>New Product</Link>
                  }
                  
                  {
                    userData.image ? <p className='cursor-pointer text-white px-2 bg-red-500' onClick={handleLogout}> Logout ({userData.firstName})</p> :<Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>
                  }


                  <nav className='flex  text-base md:text-lg  flex flex-col md:hidden '>
                      <Link to={""} className='px-2 py-1'> Home</Link>
                      <Link to={"menu/645dfb4b1532bca54e759b5c"} className='px-2 py-1'>Menu</Link>
                      <Link to={"about"} className='px-2 py-1'>About</Link>
                      <Link to={"contact"} className='px-2 py-1'>Contact</Link>

                  </nav>


                  
        

              </div>

                )
              }
            
              
          </div>
        </div>

      </div>

      {/* mobile*/ }
    </header>
  )
}

export default Header