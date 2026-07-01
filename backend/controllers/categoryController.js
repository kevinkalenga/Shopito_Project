const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify")

const createCategory = asyncHandler(async (req, res) => {
   const {name} = req.body || {}
   if(!name) {
     res.status(400);
        throw new Error("Please fill in category name")
   }

   const categoryExists = await Category.findOne({name});
    if(categoryExists) {
     res.status(400);
        throw new Error("Category name already exists")
    }

    const category = await Category.create({
       name,
       slug: slugify(name)
    })

    res.status(201).json(category);
});



module.exports = {
  createCategory
}