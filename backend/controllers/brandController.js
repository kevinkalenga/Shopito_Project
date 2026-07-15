const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const slugify = require("slugify")

// const createBrand = asyncHandler(async (req, res) => {
//    const {name, category} = req.body || {}
//    if(!name || !category) {
//      res.status(400);
//         throw new Error("Please fill in all fields")
//    }

//    const categoryExists = await Category.findOne({name:category});
//     if(!categoryExists) {
//      res.status(400);
//         throw new Error("Parent category not found")
//     }

    

//     const brand = await Brand.create({
//        name,
//        slug: slugify(name),
//        category
//     })

//     res.status(201).json(brand);
// });

const createBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body || {};

  if (!name || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

    const categoryExists = await Category.findOne({ name: category });

  if (!categoryExists) {
    res.status(400);
    throw new Error("Parent category not found");
  }

  const brand = await Brand.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json(brand);
});




const getBrands = asyncHandler(async (req, res) => {
    // sorting base on the creation date
   const Brands = await Brand.find().sort("-createdAt")
    res.status(200).json(Brands)
})

const deleteBrand = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  const brand = await Brand.findOneAndDelete({ slug });

  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }

  res.status(200).json({
    message: "Brand has been deleted",
  });
});


const updateBrand = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }

  brand.name = name || brand.name;
  brand.slug = slugify(brand.name);

  if (category) {
    const categoryExists = await Category.findOne({ name: category });

    if (!categoryExists) {
      res.status(400);
      throw new Error("Parent category not found");
    }

    brand.category = category;
  }

  const updatedBrand = await brand.save();

  res.status(200).json(updatedBrand);
});


module.exports = {
  createBrand,
  getBrands,
  deleteBrand,
  updateBrand
}