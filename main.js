const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
const leas=require('./model/user')
const serviceflye=require('./model/user_serv')
const up=require('./signup_schema')
const nodemailer=require('nodemailer')
const app=express()
const bp=require('body-parser')
const cors=require('cors')
app.use(cors())
app.use(bp.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://livinkumar8march2003:livinkumar@cluster0.mxvdyuo.mongodb.net/rentogo', { useNewUrlParser: true ,useUnifiedTopology: true});
const con=mongoose.connection
con.on('open',()=>{
    console.log('connected...')
})
app.use("/lease", require("./routes/user"));
app.use("/servi", require("./routes/user_servicef"));
app.use(express.json())
app.post('/signup',async(req,res)=>{
    const sign_up=new up({
        name:req.body.name,
        mail:req.body.email,
        phno:req.body.mno,
        aadhar:req.body.aadhar,
        location:req.body.loc,
        password:req.body.pass
    })
    await sign_up.save()
    res.sendFile(__dirname+"/index.html")
})
app.post('/signin',async (req,res)=>{
    const nam=req.body.name
    const pas=req.body.pass
    const data= await up.find({"name":nam});
    if(data[0].password==pas)
    {
       
        res.sendFile(__dirname+"/index.html")
    }
    else
    {  
        res.sendFile(__dirname+"/login.html")
    }
})
app.get('/leases',async(req,res)=>{
    res.sendFile(__dirname+"/leaser.html")
})
app.get('/index',async(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get('/rentyy',async(req,res)=>{
    res.sendFile(__dirname+"/renty.html")
})
app.get('/serv',async(req,res)=>{
    res.sendFile(__dirname+"/service.html")
})
app.get('/about',async(req,res)=>{
    res.sendFile(__dirname+"/policy.html")
})
app.get('/policy',async(req,res)=>{
    res.sendFile(__dirname+"/policy.html")
})
app.get('/pserv',async(req,res)=>{
    res.sendFile(__dirname+"/postserv.html")
})
app.get('/login',async(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.get('/contact',async(req,res)=>{
    res.sendFile(__dirname+"/policy.html")
})
app.get('/cart',async(req,res)=>{
    res.sendFile(__dirname+"/cart.html")
})


app.post('/cartt',async (req,res)=>{
    const data= await leas.find();
    console.log(data);
    console.log(data[0]);
    res.json(data);
 })
 app.post('/rentt',async (req,res)=>{
    const data= await leas.find();
    console.log(data);
    console.log(data[0]);
    res.json(data);
 })
 app.post('/servic',async (req,res)=>{
    const data= await serviceflye.find();
    console.log(data);
    console.log(data[0]);
    res.json(data);
 })
 app.post('/rat',async(req,res)=>{
    var rat=Number(req.body.rating)
    var phonenum=req.body.bt1
    let data=await leas.find({"phno":phonenum})
    let r=Number(data[0].rating)
    console.log(r)
    if(r==0)
    {
        r=rat
    }
    else
    {
    r=Number((r+rat)/2)
    }
    data=await leas.findOneAndUpdate({"phno":phonenum},{$set:{"rating":r}}, {useFindAndModify: false})
   // res.json(data[0])
    res.sendFile(__dirname+"/renty.html")
})

app.post('/addc',async(req,res)=>{
    var userEmail=req.body.leasermail;
    let data=await leas.find({"mail":userEmail})
    let r=data[0].category
    let transporter = nodemailer.createTransport({
        service:"hotmail", 
        auth: {
            user: process.env.RENTOGO_MAIL_NAME, // user
            pass: process.env.MAIL_PASSWORD, // generated password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let message = {
        from: process.env.RENTOGO_MAIL_NAME, // sender address
        to: userEmail, // list of receivers
        subject: "Rentogo", // Subject line
        text: "Your "+r+" has been rented", // plain text body
      // html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {

        res.sendFile(__dirname+"/renty.html")
    
    }).catch(error => {
        
        return res.status(500).json({ error })
    })

})

app.listen(8000,()=>{
    console.log('Server Started')
})
