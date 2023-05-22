import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/cartProduct'
import emptyCardImage from "../assets/empty.gif"


const Cart = () => {

    const productCartItem=useSelector((state)=>state.product.cartItem)
    console.log(productCartItem)

    const totalQty=productCartItem.reduce((acc,curr)=>acc+ parseInt(curr.qty),0)

    const totalPrice=productCartItem.reduce((acc,curr)=>acc + parseInt(curr.total), 0)
  return (
    <>
  
    <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-slate-700 font-bold text-black'> your Cart Items</h2>
        {productCartItem[0] ?
        <div className='my-4 flex gap-3'>
            {/*display cart items */}
            <div className='w-full max-w-3xl'>
                {
                    productCartItem.map(el=>{
                        return (
                          <CartProduct
                            key={el._id}
                            id={el._id}
                            name={el.name}
                            price={el.price}
                            image={el.image}
                            category={el.category}
                             qty={el.qty}
                             total={el.total}
                          />      
                        )
                    })
                }
            </div>

            {/* total cart items*/ }
            <div className='w-full max-w-md  ml-auto'>
                <h2 className='bg-blue-500 text-white p-3 text-lg'>Summary</h2>
                <div className='flex w-full py-2 text-lg border-b'>
                    <p>Total Qty</p>
                    <p className='ml-auto w-33 font-bold'>{totalQty}</p>
                </div>

                <div className='flex w-full py-2 text-lg border-b'>
                    <p>Total Price</p>
                    <p className='ml-auto w-33 font-bold'><span className='text-red-500'>₹</span>{totalPrice}</p>
                </div>
                <button className='bg-red-300 w-full text-lg font-bold py-3 text-white'>Payment</button>
            </div>
        </div>
        :<>
            <div className='flex w-full justify-center items-center flex-col'>
                <img src={emptyCardImage} className='w-full max-w-sm'/>
                <p  className='text-slate-500 text-3xl font-bold'>Empty Cart</p>
            </div>
        </>
    }
    </div>
 
    </>
    
  )
}

export default Cart