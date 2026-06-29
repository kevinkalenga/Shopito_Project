const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel")

 // Create Product  
const createProduct = asyncHandler(async (req, res) => {

    const {name, sku, category, brand, quantity, price, description, image, regularPrice, color} = req.body

    if(!name || !category || !brand || !quantity || !price || !description) {
        res.status(400)
        throw new Error("Please fill in all fields")
    }

    
    const product = await Product.create({
        name, 
        sku, 
        category, 
        brand, 
        quantity, 
        price, 
        description, 
        image, 
        regularPrice, 
        color
    })

    res.status(200).json(product)

})

 // get Products 
 const getProducts = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const products = await Product.find().sort("-createdAt")
    res.status(200).json(products)
})
 

// get single product 
 const getProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   if(!product) {
       res.status(400)
        throw new Error("Product not found")
   }

   res.status(200).json(product);
})
// delete product 
 const deleteProduct = asyncHandler(async (req, res) => {
    
   const product = await Product.findById(req.params.id);
   if(!product) {
       res.status(400)
        throw new Error("Product not found")
   }
    await Product.findByIdAndDelete(req.params.id)

   res.status(200).json({
    message: "Product has been deleted"
   });
})
// update product 
 const updateProduct = asyncHandler(async (req, res) => {
    const {name, category, brand, quantity, price, description, image, regularPrice, color} = req.body

    const product = await Product.findById(req.params.id);
    if(!product) {
       res.status(400)
        throw new Error("Product not found")
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: req.params.id  
        },
        {name, category, brand, quantity, price, description, image, regularPrice, color},
        {
            new: true,
            runValidators: true
        },

       

    );

     res.status(200).json(updatedProduct);
})

// review product
const reviewProduct = asyncHandler(async (req, res) => {
   const {star, review, reviewDate} = req.body
   const {id} = req.params 
   
    // Validation    
    if(star < 1 || !review) {
        res.status(400)
        throw new Error("Please add a star and review")
    }

    const product = await Product.findById(id);

    if(!product) {
       res.status(400)
        throw new Error("Product not found")
    }
    // update rating 
    product.ratings.push(
        {
            star, 
            review, 
            reviewDate,
            name: req.user.name,
            userId: req.user._id
        }
    )
    product.save()

    res.status(200).json({
        message: "Product review has been added."
    })
})

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    reviewProduct
}