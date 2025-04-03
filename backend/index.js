// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');
// const { type } = require('os');
// const { error, log } = require('console');
// const jwt = require('jsonwebtoken');


// app.use(express.json());
// app.use(cors());
// const port = 4000;

// mongoose.connect("mongodb://localhost:27017/e-commerce", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("Could not connect to MongoDB...", err));

// // API creation
// app.get("/", (req, res) => {
//   res.send("Express App is Running");
// });

// // Image Storage Engine
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({ storage: storage });

// // Creating upload endpoints for images
// app.use('/images', express.static('upload/images'));
// app.post("/upload", upload.single('image'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}` // Ensure the correct filename is used
//   });
// });

// // Schema for Creating Products
// const productSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//     required: true,
//   },
//   old_price: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   }
// });

// const Product = mongoose.model("Product", productSchema);

// // Create a product
// app.post('/addproduct', async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product = products[products.length - 1];
//     id = last_product.id + 1;
//   } else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   console.log(product);
//   await product.save();
//   console.log("Saved");
//   res.json({
//     success: true,
//     name: req.body.name,
//   });
// });

// // Delete a product
// app.post('/removeproduct', async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({
//     success: true,
//     name: req.body.name
//   });
// });

// // Get all products
// app.get('/allproducts', async (req, res) => {
//   let products = await Product.find({});
//   console.log("All products fetched");
//   res.send(products);
// });

// //schema creating for User model
// const Users = mongoose.model('Users',{
//     name:{
//       type:String,
//     },
//     email:{
//       type:String,
//       unique:true,
//     },
//     password:{
//       type:String,
//     },
//     cartData:{
//       type:Object,
//     },
//     date:{
//       type:Date,
//       default:Date.now,
//     }
// })

// //Creating endpoint for registering users
// app.post('/signup',async(req,res)=>{

//   let check = await Users.findOne({email:req.body.email});
//   if(check){
//     return res.status(400).json({success:false,errors:'The User with same E-mail id Already Exists'})
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }

//   const user = new Users({
//     name:req.body.username,
//     email:req.body.email,
//     password:req.body.password,
//     cartData:cart,
//   })
//   await user.save();

//   //jwtauth

//   const data ={
//     user:{
//       id:user.id
//     }
//   }
  
//   const token = jwt.sign(data,'secret_ecom');
//   res.json({success:true,token})

// })

// //creating endpoint for user Login
// app.post('/login',async(req,res)=>{
//   let user = await Users.findOne({email:req.body.email});
//   if(user){
//     const passCompare = req.body.password === user.password;
//     if(passCompare){
//       const data = {
//         user:{
//           id:user.id
//         }
//       }
//       const token = jwt.sign(data,'secret_ecom');
//       res.json({success:true,token});
//     }
//     else{
//       res.json({success:false,errors:"Wrong Password"});
//     }
//   }
//   else{
//     res.json({success:false,errors:"Wrong Email Id"})
//   }
// })

// //creating endpoint for NewCollections data
// app.get('/newcollections',async(req,res)=>{
//       let products = await Product.find({});
//       let newcollection = products.slice(1).slice(-8);
//       console.log("New Collections fetched");
//       res.send(newcollection);
// })
  

// //creating endpoint for popular in women section
// app.get('/popularinwomen',async(req,res)=>{
//   let products = await Product.find({category:"women"});
//   let popular_in_women = products.slice(0,4);
//   console.log("Popular in women fetched")
//   res.send(popular_in_women);
// })

// //creating Middleware to fetch user
// const fetchUser = async (req,res,next)=>{
//   const token = req.header('auth-token');
//   if(!token){
//     res.status(401).send({errors:"Please authenticate using a valid token"})
//   }
//   else{
//       try {
//         const data = jwt.verify(token,'secret_ecom');
//         req.user = data.user;
//         next();
//       } catch (error) {
//         res.status(401).send({errors:"Please authenticate using a valid token"})
//       }
//   }
// }

// //creating endpoint for adding products to cartdata
// app.post('/addtocart',fetchUser,async(req,res)=>{

//   console.log("added",req.body.itemId);
//   let userData =await Users.findOne({_id:req.user.id});
//   userData.cartData[req.body.itemId] +=1;
//   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//   res.send("Added")
// })

// //creating endpoint to remove  prodect from cartdata
// app.post('/removefromcart',fetchUser,async (req,res)=>{
//   console.log("removed",req.body.itemId);
//   let userData =await Users.findOne({_id:req.user.id});
//   if(userData.cartData[req.body.itemId] >0)
//   userData.cartData[req.body.itemId] -=1;
//   await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//   res.send("Removed")
// })

// //creating endpoint for get cartdata
// app.post('/getcart',fetchUser,async(req,res)=>{
//   console.log("GetCart");
//   let userData = await Users.findOne({_id:req.user.id});
//   res.json(userData.cartData);
// })

// // Endpoint to get related products by category
// app.get('/relatedproducts/:category', async (req, res) => {
//   try {
//     const category = req.params.category;
//     const relatedProducts = await Product.find({ category: category }).limit(4); // Limit to 4 related products for display
//     res.json(relatedProducts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch related products" });
//   }
// });


// app.listen(port, (error) => {
//   if (!error) {
//     console.log("Server running on Port " + port);
//   } else {
//     console.log("Error: " + error);
//   }
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());
const port = 4000;

mongoose.connect("mongodb://localhost:27017/e-commerce", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB...", err));

// API creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('image'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Schema for Creating Products
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true, // Initially products are available
  }
});

const Product = mongoose.model("Product", productSchema);

//Admin
//creating a product

app.post('/addproduct', async (req, res) => {  // <-- The route is now async
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log("Saved");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});



// Delete a product
app.delete('/removeproduct/:id', async (req, res) => {
  console.log("Received request to remove product with ID:", req.params.id);
  const productId = req.params.id;  // Get the product ID from the URL
  try {
    // Try to find and delete the product by ID
    const deletedProduct = await Product.findOneAndDelete({ id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("Removed product:", deletedProduct.name);
    res.json({
      success: true,
      message: `Product ${deletedProduct.name} removed successfully`,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ error: "Failed to remove product" });
  }
});


// Mark product as out of stock
app.post('/mark-out-of-stock', fetchUser, async (req, res) => {
  const { productId } = req.body;

  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Mark the product as out of stock
    product.available = false;
    await product.save();

    res.json({ success: true, message: 'Product marked as out of stock' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error marking product as out of stock" });
  }
});

// Add to cart
app.post('/addtocart', fetchUser, async (req, res) => {
  const { itemId } = req.body;

  // Fetch product to check stock availability
  const product = await Product.findOne({ id: itemId });
  if (!product || !product.available) {
    return res.status(400).json({ error: "Product is out of stock" });
  }

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

  // After adding to cart, mark product as out of stock
  product.available = false;  // Mark the product as unavailable
  await product.save();

  res.send("Added to cart and marked as out of stock");
});

// Remove from cart
app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

// Get all products
app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// Create User Schema
const Users = mongoose.model('Users', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// User Registration
app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: 'The User with same E-mail id Already Exists' });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

// User Login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id
        }
      }
      const token = jwt.sign(data, 'secret_ecom');
      res.json({ success: true, token });
    }
    else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  }
  else {
    res.json({ success: false, errors: "Wrong Email Id" })
  }
});

// New collections endpoint
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

// Popular in women section
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

// Get Cart Data
app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Get related products by category
app.get('/relatedproducts/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const relatedProducts = await Product.find({ category: category }).limit(4); // Limit to 4 related products
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
