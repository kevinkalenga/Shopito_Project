const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const slugify = require("slugify")

const createBrand = asyncHandler(async (req, res) => {
   const {name} = req.body || {}
   if(!name) {
     res.status(400);
        throw new Error("Please fill in brand name")
   }

   const brandExists = await Brand.findOne({name});
    if(brandExists) {
     res.status(400);
        throw new Error("Brand name already exists")
    }

    const brand = await Brand.create({
       name,
       slug: slugify(name)
    })

    res.status(201).json(brand);
});


 const getBrands = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const Brands = await Brand.find().sort("-createdAt")
    res.status(200).json(Brands)
})

 const deleteBrand = asyncHandler(async (req, res) => {
   const slug = req.params.slug.toLowerCase()
   const category = await Category.findOneAndDelete({slug});
   if(!category) {
       res.status(400)
        throw new Error("Category not found")
   }
   

   res.status(200).json({
    message: "Category has been deleted"
   });
})

const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = name || category.name;
  category.slug = slugify(category.name);

  const updatedCategory = await category.save();

  res.status(200).json(updatedCategory);
});


module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
  updateBrand
}