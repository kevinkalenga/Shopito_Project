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


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct
}