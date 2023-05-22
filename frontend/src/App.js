import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import  { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import {setDataProduct} from "./redux/productSlide"
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch=useDispatch()
  const prodctData=useSelector((state)=>state.product)
       
  console.log(prodctData)


  useEffect(()=>{
      (async()=>{
        const res=await fetch(`http://localhost:8080/product`)
        const resData=await res.json()
        console.log(resData)
        dispatch(setDataProduct(resData))
   
      })()
  },[])

 
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />{" "}
          {/*   it is for when you click on the home, about or contact ... then it will 
                            display home, contact , about  on the display*/}
        </main>
      </div>
    </>
  );
}

export default App;
