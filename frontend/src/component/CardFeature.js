import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem , increaseQty} from '../redux/productSlide'
import { useDispatch } from 'react-redux'


const CardFeature = ({image, name,price, category,id}) => {
  const dispatch=useDispatch()
  const handleAddCartProduct=(e)=>{
  
      dispatch(addCartItem({
        _id:id,
        name:name,
        price:price,
        category:category,
        image:image
      }))
   
    //e.stopPropagation
  }
  return (
    <div className='w-full min-w-[180px] max-w-[200px] bg-white shadow-lg hover:shadow cursor-pointer drop-shadow-lg py-5 px-4 flex-col justify-center '>
        <Link to={`/menu/${id}`} onClick={window.scrollTo({top:"0", behavior:"smooth"})}>
        <div className='h-28 flex flex-col justify-center item-center'>
            <img src={image} className='h-full'/>
        </div>

        <h3 className="font-semibold text-slate-600  capitalize mt-4 item-center whitespace-nowrap overflow-hidden">
            {name}
          </h3>
          <p className=" text-slate-500 font-medium">{category}</p>
          <p className="font-bold  ">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          </Link> 
        
          <button className='bg-yellow-500 text-align-center px-6 ml-4 mt-2 rounded mb-2 hover:bg-yellow-600' onClick={handleAddCartProduct}>Add Cart</button>
         
    </div>
    
  )
}

export default CardFeature