import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";


const Menu = () => {
  const dispatch=useDispatch()
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  console.log(productDisplay);

  const handleAddCartProduct=(e)=>{
  
    dispatch(addCartItem(productDisplay))
 
  //e.stopPropagation
}
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl bg-white m-auto p-2 md:p-4 md:flex">
        <div className="max-w-md  bg-white  overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold   text-slate-600 capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className=" text-slate-500 font-medium text-2xl">{productDisplay.category}</p>
          <p className=" font-bold  md:text-2xl">
            <span className="text-red-500">₹</span>
            <span>{ productDisplay.price}</span>
          </p>

          <div className="flex gap-3">
              <button className='bg-yellow-500 text-align-center px-6 ml-4 mt-2 rounded mb-2 hover:bg-yellow-600 min-w-[100px]'>Buy</button>
              <button onClick={handleAddCartProduct} className='bg-yellow-500 text-align-center px-6 ml-4 mt-2 rounded mb-2 hover:bg-yellow-600 min-w-[100px]'>Add Cart</button>

          </div>
          <div>
              <p className="text-slate-600 font-medium">Description :</p>
              <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"}/>
    </div>
  );
};

export default Menu;
