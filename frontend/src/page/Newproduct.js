import React, {useState} from 'react'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const Newproduct = () => {
const [data,setData]=useState({
  name:"",
  category:"",
  Image:"",
  price:"",
  description:""
})
const handleOnChange=(e)=>{
   
    const {name, value}=e.target
    setData((preve)=>{
      return {
        ...preve,
        [name]: value
      }
    })
                    }


  const uploadImage=async(e)=>{
    console.log(e.files)    
    const data=await ImagetoBase64(e.target.files[0])
    //console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image:data
      }
    })

  }

  const handleSubmi=async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name, image, category}=data

    if (name && image && category)
    {

      const fetchData=await fetch(`http://localhost:8080/uploadProduct`,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
  
      const fetchRes=await fetchData.json()
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name:"",
          category:"",
          image:"",
          price:"",
          description:"",
        }
      })
    }
    else{
      toast("Enter required field")
    }

   
  }
  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmi}>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name='name' className='bg-slate-200 p-1 my-2' onChange={handleOnChange} value={data.name}/>

        <label className='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icecream"}>Iceream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>cake</option>
          <option value={"burger"}>burger</option>
          <option value={"paneer"}>paneer</option>
          <option value={"sandwich"}>sandwich</option>
        </select>
        <label htmlFor='image'> Image
            <div className='h-40 w-full bg-slate-300  rounded flex items-center justify-center cursor-pointer'>

              {
                data.image ? <img src={data.image} className='h-full'/> :<span className='text-5xl'><BsCloudUpload/> </span>
               
              }

            
               <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className='hidden'/> 
           
             </div>

        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price'  onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description0'> Description</label>
        <textarea rows={3} value={data.description} className='bg-slate-200 p-1 my-1 resize-none' name='description' onChange={handleOnChange} />

        <button className='bg-red-500 hover:bg-red-600 text-white font-bold drop-shadow my-2'>Save</button>
      </form>
    </div>
  )
}

export default Newproduct