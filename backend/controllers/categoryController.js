const asyncHandler = require("express-async-handler");


const createCategory = asyncHandler(async (req, res) => {
   res.send("Create Category")

});



module.exports = {
  createCategory
}