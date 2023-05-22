import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/CardFeature'
import {GrPrevious} from "react-icons/gr"
import { GrNext } from 'react-icons/gr'
import FilterProduct from '../component/FilterProduct'
import AllProduct from '../component/AllProduct'



const Home = () => {
  
  const productData=useSelector((state)=>state.product.productList)
  console.log(productData)
  const homeProductCartList=productData.slice(1,7)
  const homeProductCartListVegetables=productData.filter(el=>el.category==="vegetable",[])
  console.log(homeProductCartListVegetables)

  const loadingArray=new Array(4).fill(null) /// when before loading the page that will be showwing in picture

  const slideProductRef=useRef()

  const nextProduct=()=>{
    slideProductRef.current.scrollLeft +=200

  }

  const previousProduct=()=>{
    slideProductRef.current.scrollLeft -=200

  }

  


  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2 py-4'>
        <div className='flex gap-3 bg-red-400 w-36 px-2 item-center rounded-full'>
          <p className='text-sm font-bold text-white'>Bike Deilvery</p>
          <img src="data:image/png;base64,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" className='h-7 rounded-full item-center mt-1'/>

        </div>
          <h2 className='py-3 text-7xl font-bold'>The Fastest Delivery at <span className='text-red-500 text-'>Your Door Step</span> </h2>
          <p className='py-3 text-base '>A courier service in which a restaurant, store, or independent food-delivery company delivers food to a customer. An order is typically made either through a restaurant or grocer's website or mobile app, or through a food ordering company.</p>
          <button className='font-bolf bg-red-500 text-white rounded-full p-2'>Oerder Now</button>
        
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>

        { 
          homeProductCartList[0] ? homeProductCartList.map(el=>{
            return(
              <HomeCard
              key={el._id +"vegetable"}
              id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />

            )
          })
          :loadingArray.map((el,index)=>{
            return (
              <HomeCard
                key={index +"cartLoading"}
                loading={"Loading..."}
              />
            )
          })
        }
           
        </div>
        
      </div>
      <div className=' '>
            <div className='flex w-full'>
                <h2 className='font-bold text-2xl text-slate-700 mb-2'>Fresh Vegetble</h2>
                <div className='ml-auto flex gap-4'>
                  <button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious/></button>
                  <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext/></button>
                </div>
            </div>
   
            <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
            {
              homeProductCartListVegetables.map(el=>{
                return(
                  <CardFeature 
                    key={el._id +"category"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />

                )
              })
            }
            

            </div>

        </div>

        <AllProduct heading={"Your Product"}/>


      
    </div>
  )
}

export default Home