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

 // Create Product 
 const getProducts = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const products = await Product.find().sort("-createdAt")
    res.status(200).json(products)
})

module.exports = {
    createProduct,
    getProducts
}