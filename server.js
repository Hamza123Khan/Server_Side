const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userDetails = require('./Models/ProductModels')
const bcrypt = require('bcrypt')
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
const Bus = require('./Models/busSchema')

app.get('/', (req,res) =>{
    res.render("Login")
})

app.get('/Signup', (req,res)=>{
    res.render("Signup")
})
app.post('/Signup', async (req, res) => {
    try {
      const data = {
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Password: req.body.password
      };
  
      const exitsint_user = await userDetails.findOne({Email: data.Email})
      if (exitsint_user) {
        return res.status(400).json({message: 'User with this email already exists.'})
      } else {

                const saltrounds =10
                const hashedpassword = await bcrypt.hash(data.Password, saltrounds)
                data.Password = hashedpassword
                const user = new userDetails(data);
                const userdata = await user.save();
                res.status(200).json(userdata);
                console.log(userdata);
      }
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  })



app.post('/Login', async (req,res) =>{
    try {
    // Check if a user with the provided username or email exists
    const user = await userDetails.findOne({Email: req.body.Email});
    const Admin = await userDetails.findOne({Paswword: req.body.Password})
    
    
    if (Admin ==="Admin")
    if (!user) {
      // User not found
      console.log(req.body)
      return res.status(401).json({ message: 'Invalid credentials' });

    //   (req.body.Password==="Admin" && req.body.Email==="Admin@gmail.com")
    }
    const ispasswordmatch = await bcrypt.compare(req.body.Password, user.Password)
    if (ispasswordmatch ) {
      // Password is incorrect
      console.log(req.body)
      res.render('Home')
      console.log(req.body)
    }
    else if(req.body.Paswword === 'Admin' && req.body.Email ==='Admin@gmail.com'){
        console.log(req.body)
        req.render('new')
    }
    else{
        res.send("wrong password")
    }
    // User is authenticated, you can generate a token or set a session here
    } catch (error) {
        res.send("wrong Detials try again")
    }
})
app.post('/buses', async (req, res) => {
    try {
      const bus = new Bus(req.body);
      await bus.save();
      res.status(201).json(bus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get('/buses', async (req, res) => {
    try {
      const buses = await Bus.find();
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// app.get('/signup', async(req, res) =>{
//     try {
//         const user_detaisl = await userDetails.find({})
//         res.status(200).json(user_detaisl)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })

// app.get('/signup/:id', async(req, res) =>{
//     try {
//         const {id} = req.params 
//         const UserDetails = await userDetails.findById(id)
//         res.status(200).json(UserDetails)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })


// app.put('signup/:id', async(req, res) => {
//     try {
//         const {id} = req.params
//         const user_details = await userDetails.findIdAndUpdate(id, req.body)
//         if(!userDetails){
//             return res.status(404).json({message:`Cannot find the data`})
            
//         }
//         res.status(200).json(userDetails)

//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }

// })

// app.post('/signup', async(req, res ) => {
//     try {
//         const userdetails = await userDetails.create(req.body)
//         res.status(200).json(userdetails)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({message: error.message})
//     }
// })
// app.get('/Admin', (req,res) =>{
//     res.send('hello Admin')
// })



// app.get('',async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })



mongoose.connect('mongodb+srv://AdminApi:Wxzn8MvNGQUBiyFY@trsapi.ngzvw34.mongodb.net/TRSAPI?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conndextef to mongoDB")
    app.listen(3020, () =>{
        console.log("appp is runnings")
    })

}).catch((error)=>{
    console.log(error)
})





