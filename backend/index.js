const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()


const app=express()

app.use(express.urlencoded({extended: false}));

app.use(cors())
app.use(express.json({limit : "10mb"}))
const PORT=process.env.PORT || 8080

//connect to mongodb
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to Database"))
.catch((err)=>console.log(err))


//Schema of user
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type: String,
        unique: true,
    },
    password:String,
    confirmPassword:String,
    image:String,
})


//create a model of userSchema type

const userModel=mongoose.model("user", userSchema)




app.get("/",(req, res)=>{           // this the api
    res.send("server is running")
})



//sign up api
app.post("/signup", async(req,res)=>{
    console.log(req.body)

    const {email}=req.body

    userModel.findOne({email:email}).then(result=>{
        if(result){
            res.send({message:"email is already registered", alert:false})
        }
        else{
            const data=userModel(req.body)
            const save=data.save()
            res.send({message:"Successfully sign up", alert:true})
        }

    })
    .catch(err=>{
        console.log(err)
    })
    
})


//login api

app.post("/login", (req,res)=>{
    console.log(req.body)
    const {email}=req.body

    userModel.findOne({email:email}).then(result=>{

        if(result){

            const dataSend={
                _id:result._id,
                firstName:result.firstName,
                lastName:result.lastName,
                email:result.email,
                image:result.image
            }
            console.log(dataSend)
            res.send({message:"login is Successfuly", alert:true,data:dataSend})
        }
        else{
            res.send({message:"This email id is not available", alert :false})
        }

    }).catch(err=>{
        console.log(err)
    })

})


//section of product

const schemaProduct=mongoose.Schema({

    name:String,
    category:String,
    image:String,
    price:String,
    description:String
});

const productModel=mongoose.model("product", schemaProduct)


// for the save product in database
//api
app.post("/uploadProduct", async (req, res)=>{
    console.log(req.body)
    const data= await productModel(req.body)
    const dataSave=await data.save()



    res.send({message:"Upload successfully"})
})

//for getting the product from the databe
//get api
app.get("/product", async(req,res)=>{

    const data=await productModel.find({})
     res.send(JSON.stringify(data))
   
})
 



app.listen(PORT, ()=> console.log("server is running at port :" +PORT))