import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeature from './CardFeature'
import { useSelector } from 'react-redux'

const AllProduct = ({heading}) => {
    const productData=useSelector((state)=>state.product.productList)

    const categoryList=[...new Set(productData.map(el=>el.category))]  //filter data of category wise
  console.log(categoryList)

    //filter data display
    const [filterby, setFilterBy]=useState("")
    const [dataFilter, setDataFilter]=useState([])
  
    useEffect(()=>{
      setDataFilter(productData)
    },[productData])
  
   
  
    const handleFilterProduct=(catagory)=>{
      setFilterBy(catagory)
      const filter=productData.filter(el=>el.category.toLowerCase()=== catagory.toLocaleLowerCase())
      setDataFilter(()=>{
        return [
          ...filter
  
        ]
      })
  
    }
  return (
    <div className='my-5'>
    <h2 className='font-bold text-2xl text-slate-800 mb-4'>
      {heading}
    </h2>
    <div className='flex gap-2 justify-center overflow-scroll scrollbar-none'>
        {/* this for the catagory wise displaye  and Filter product is the another component*/ }
        
        {
          categoryList[0] ? categoryList.map(el=>{
            return (
              <FilterProduct category={el}
                   key={el}
                   isActive={el.toLowerCase()===filterby.toLowerCase()} 
                   onClick={()=>handleFilterProduct(el)}/>
                   )      
          })
          :
          <div className='min-h-[150px] flex justify-center items-center'>
            <p>Loading...</p>
          </div>
        }
      
       
    </div>

    <div className='flex flex-wrap justify-center gap-3 my-4'>
          {
            dataFilter.map(el=>{
              return (

              <CardFeature
                key={el._id}
                id={el._id}    
                image={el.image}
                name={el.name}
                category={el.category}
                price={el.price}

              />
              )
            })
          }


    </div>

</div>
  )
}

export default AllProduct